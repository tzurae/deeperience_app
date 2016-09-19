'use strict'

const { Record } = require('immutable')

const InitialState = Record({
  tripContent: new (Record({
    guideId: '',
    name: '',
    startSites: [],
    tripInfo: [],
    siteStatus: [],
  }))(),
  displayInfo: new (Record({
    display: false,
    displayDay: 0,
    displayWhich: 0,
    displayInfoTitle: '',
    displayInfoIntroduction: '',
  }))(),
  mapInfo: new (Record({
    headerText: '',
    mainTitle: '',
    subTitle: '',
    content: '',
    pos: {
      lat: 0,
      lng: 0,
    },
    nowPos: {
      lat: 24.7859146,
      lng: 120.996735,
    },
    heading: 0,
    markers: [],
    polyline: [],
    audioLength: '3:00',
    distance: '0 m',
    address: '',
  }))(),
  isFetching: false,
  error: null,
})
export default InitialState
