'use strict'

const { Record } = require('immutable')

const InitialState = Record({
  tripContent: new (Record({
    guideId: '',
    name: '',
    startSites: [],
    tripInfo: [],
  }))(),
  isFetching: false,
  error: null,
})
export default InitialState
