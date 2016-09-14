'use strict'

const { Record } = require('immutable')

const InitialState = Record({
  tripContent: new (Record({
    guideId: '',
    name: '',
    routes: null,
    allSites: null,
    startSite: null,
  }))(),
  isFetching: false,
  error: null,
})
export default InitialState
