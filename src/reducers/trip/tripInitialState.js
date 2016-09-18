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
    headerText: '城隍廟吃吃吃',
    mainTitle: '新竹都城隍廟',
    subTitle: '成家肉粽',
    content: '好吃的肉粽',
    pos: {
      lat: 24.8026591,
      lng: 120.9717417,
    },
    heading: 0,
    markers: [
      {
        coordinate: {
          latitude: 24.8045000,
          longitude: 120.9655150,
        },
        title: '新竹都城隍廟',
        description: '好吃',
        address: '300新竹市北區中山路75號',
      },
    ],
    polyline: [],
    audioLength: '3:00',
    distance: '0 m',
  }))(),
  isFetching: false,
  error: null,
})
export default InitialState
