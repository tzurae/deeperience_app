'use strict'

const { Record } = require('immutable')

const InitialState = Record({
  tripContent: new (Record({
    guideId: '',
    name: '',
    startSites: [],
    tripInfo: [],
  }))(),
  displayInfo: new (Record({
    display: false,
    displayDay: 0,
    displayInfoTitle: '',
    displayInfoIntroduction: '',
  }))(),
  isFetching: false,
  error: null,
})
export default InitialState
