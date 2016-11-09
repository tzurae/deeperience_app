/**
 * # tripInitialState.js
 *
 * control states in trip content display
 *
 */
'use strict'

import { Record } from 'immutable'

const InitialState = Record({
  main: new Record({
    tripContent: [],
    isFetching: false,
  })(),
  tripContent: new Record({
    tripKey: '',
    guideId: '',
    name: '',
    startSite: [],
    tripInfo: [],
    siteStatus: [],
    isFetching: false,
    dailyRemind: [],
    period: [],
  })(),
  displayInfo: new Record({
    display: false,
    displayDay: 0,
    displayWhich: 0,
    displayWhichCard: 0,
    displayMode: false, // false: half, true: whole mode
    info: new Record({
      name: '',
      introduction: '',
      tags: [],
      fee: '',
      recentActivity: [],
      openPeriod: {},
    })(),
    transit: new Record({
      departureTime: '',
      arrivalTime: '',
      duration: '',
      steps: [],
      fare: '',
      fetched: false, // if true, means have fetched before
      isFetching: false,
    })(),
    navigation: new Record({
      from: {
        lat: 0,
        lng: 0,
      },
      to: {
        lat: 0,
        lng: 0,
      },
      polyline: [],
    })(),
  })(),
  mapInfo: new Record({
    headerText: '',
    mainTitle: '',
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
    website: '',
    fee: '',
    remind: '',
    phone: '',
    openPeriod: {},
    audioDuration: 1,
    audioPosition: 0,
    audioURL: '',
    isFetching: false,
  })(),
  isFetching: false,
  error: null,
})
export default InitialState
