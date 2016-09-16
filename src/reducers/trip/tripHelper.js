'use strict'
import _ from 'underscore'

export function calculateLayer(routes, startSites, allSites) {
  const allPosition = [] // first step
  const sitePosition = [] // second step
  const newRoutes = []
  startSites.forEach((startSite, dayIndex) => {  // can have many days
    // frontQueue: {depart: {hour,minute,day}, from, xpos, ypos}
    // dailyPosition: {depart: {hour,minute,day}, from, xpos, ypos}
    // compare each root from with top of the queue, if match, we then compare the
    // destination with the site in the set
    const frontQueue = [{ ...startSite, xpos: 0, ypos: 0 }]
    const dailyPos = {}
    const dailyRoutes = []
    const layerArray = [0, -1, -1, -1, -1, -1, -1, -1, -1, -1] // get node of each layer

    sitePosition.push([])
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
    newRoutes.push({ ylayer, dailyRoutes })
    allPosition.push(dailyPos)
  })

  let hour
  let minute
  allPosition.forEach((dayPos, day) => {
    _.each(dayPos, (value, key) => { // key: dd-hh-mm-siteID
      hour = Number(key.substr(3, 2))
      minute = Number(key.substr(6, 2))

      if (sitePosition[day][value.ypos] === undefined) {
        sitePosition[day][value.ypos] = []
      }
      const siteId = key.substr(8)

      sitePosition[day][value.ypos][value.xpos] = {
        day, hour, minute, siteId,
        content: allSites[siteId],
      }
    })
  })

  return { newRoutes, sitePosition }
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
