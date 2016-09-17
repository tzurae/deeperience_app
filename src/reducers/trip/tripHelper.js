'use strict'
import _ from 'underscore'

export function calculateTripInfo(routes, startSites, allSites) {
  const allInfo = [] // array by day
  startSites.forEach((startSite, dayIndex) => {  // can have many days
    // frontQueue: {depart: {hour,minute,day}, from, xpos, ypos}
    // dailyPosition: {depart: {hour,minute,day}, from, xpos, ypos}
    // compare each root from with top of the queue, if match, we then compare the
    // destination with the site in the set
    const frontQueue = [{ ...startSite, xpos: 0, ypos: 0 }]
    const dailyPos = {}
    const dailyRoutes = []
    const layerArray = [0, -1, -1, -1, -1, -1, -1, -1, -1, -1] // get node of each layer

    dailyPos[getStartId(startSite)] = { xpos: 0, ypos: 0 }

    while (frontQueue.length !== 0) {
      const ypos = frontQueue[0].ypos + 1
      const filterRoutes = routes.filter((route) => siteEqual(route, frontQueue[0]))
      filterRoutes.forEach((filterRoute) => {
        const destString = getDestId(filterRoute)
        const xpos = layerArray[ypos] + 1
        if (dailyPos[destString] === undefined) {
          dailyPos[destString] = { xpos, ypos }

          frontQueue.push(destToStart({ ...filterRoute, xpos, ypos }))

          layerArray[ypos]++
        } else {
          const oldyPos = dailyPos[destString].ypos
          if (ypos > oldyPos) {
            dailyPos[destString] = { xpos, ypos }
            layerArray[ypos]++
            layerArray[oldyPos]--
          }
        }
      })
      frontQueue.shift()
    }

    // get all routes for rendering
    routes.filter(route => route.depart.day === dayIndex)
      .forEach(route => {
        dailyRoutes.push({
          ...route,
          posFrom: dailyPos[getStartId(route)],
          posTo: dailyPos[getDestId(route)],
        })
      })

    const ylayer = layerArray.filter(layer => layer > -1)
                              .map(length => length + 1)

    // reshape dailyPos
    const sites = []
    let siteId
    _.each(dailyPos, (value, key) => {
      siteId = key.substr(8)
      sites.push({
        pos: { xpos: value.xpos, ypos: value.ypos },
        active: false,
        hour: Number(key.substr(3, 2)),
        minute: Number(key.substr(6, 2)),
        day: Number(key.substr(0, 2)),
        siteId,
        content: allSites[siteId],
        siteKey: key,
      })
    })
    allInfo.push({ ylayer, sites, routes: dailyRoutes })
  })

  console.log(allInfo)
  return allInfo
}

function getDestId(dest) {
  return getStartId(destToStart(dest))
}
// change destination to depart
function destToStart({ nextStopDepart, to, xpos, ypos }) {
  return {
    depart: nextStopDepart,
    from: to,
    xpos,
    ypos,
  }
}

function getStartId({ depart, from }) {
  const { day, hour, minute } = depart
  return `${formatNumber(day)}-${formatNumber(hour)}-${formatNumber(minute)}${from}`
}

function siteEqual(site1, site2) {
  return site1.from === site2.from &&
    site1.depart.day === site2.depart.day &&
    site1.depart.hour === site2.depart.hour &&
    site1.depart.minute === site2.depart.minute
}

function formatNumber(n) {
  return n > 9 ? `${n}` : `0${n}`
}
