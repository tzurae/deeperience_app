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
    displayWhichCard: 0,
    transit: new (Record({
      departureTime: '',
      arrivalTime: '',
      duration: '',
      steps: [],
      fare: '',
      fetched: false,
      isFetching: false,
    }))(),
  }))(),
  mapInfo: new (Record({
    headerText: '123',
    mainTitle: '123',
    subTitle: '',
    content: '',
    pos: {
      lat: 0,
      lng: 0,
    },
    heading: 0,
    markers: [],
    polyline: [],
    audioDuration: 0,
    distance: '0 m',
    address: '',
    audioPosition: 0,
    isFetching: false,
  }))(),
  isFetching: false,
  error: null,
})
export default InitialState
