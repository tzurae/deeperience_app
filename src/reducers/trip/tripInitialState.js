/**
 * # tripInitialState.js
 *
 * control states in trip content display
 *
 */
'use strict'

import { Record } from 'immutable'

const InitialState = Record({
  main: new (Record({
    tripContent: [],
    isFetching: false,
  }))(),
  tripContent: new (Record({
    tripKey: '',
    guideId: '',
    name: '',
    startSites: [],
    tripInfo: [],
    siteStatus: [],
    isFetching: false,
  }))(),
  displayInfo: new (Record({
    display: false,
    displayDay: 0,
    displayWhich: 0,
    displayInfoTitle: '',
    displayInfoIntroduction: '',
    displayWhichCard: 0,
    displayMode: false, // false: half, true: whole mode
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
    distance: '0 m',
    address: '',
    audioDuration: 1,
    audioPosition: 0,
    audioURL: '',
    isFetching: false,
  }))(),
  isFetching: false,
  error: null,
})
export default InitialState
