'use strict'
import _ from 'underscore'

export function calculateLayer(routes, startSites, allSites) {
  const allPosition = []
  const sitePosition = []
  startSites.forEach((startSite) => {  // can have many days
    // frontQueue: {depart: {hour,minute,day}, from, xpos, ypos}
    // dailyPosition: {depart: {hour,minute,day}, from, xpos, ypos}
    // compare each root from with top of the queue, if match, we then compare the
    // destination with the site in the set
    const frontQueue = [{ ...startSite, xpos: 0, ypos: 0 }]
    const dailyPos = {}
    const layerArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // get node of each layer

    sitePosition.push([])
    dailyPos[getSiteId(startSite)] = { xpos: 0, ypos: 0 }

    while (frontQueue.length !== 0) {
      const ypos = frontQueue[0].ypos + 1
      const filterRoutes = routes.filter((route) => siteEqual(route, frontQueue[0]))
      filterRoutes.forEach((filterRoute) => {
        const destString = getDestId(filterRoute)
        const xpos = layerArray[ypos]
        if (dailyPos[destString] === undefined) {
          dailyPos[destString] = { xpos, ypos }

          frontQueue.push(destToStart({ ...filterRoute, xpos, ypos }))
          layerArray[ypos]++
        } else {
          const oldyPos = dailyPos[destString].ypos
          if (ypos > oldyPos) {
            dailyPos[destString] = { xpos, ypos }
            layerArray[ypos]++
          }
        }
      })
      frontQueue.shift()
    }
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
      sitePosition[day][value.ypos][value.xpos] = {
        day, hour, minute, siteId: key.substr(8),
      }
    })
  })

  return sitePosition
}

function getDestId(dest) {
  return getSiteId(destToStart(dest))
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

function getSiteId({ depart, from }) {
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
