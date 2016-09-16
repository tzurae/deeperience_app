'use strict'

const { Record } = require('immutable')

const InitialState = Record({
  tripContent: new (Record({
    guideId: '',
    name: '',
    routes: [],
    startSites: [],
    sitePosition: [],
  }))(),
  isFetching: false,
  error: null,
})
export default InitialState
