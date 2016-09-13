'use strict'

const { Record } = require('immutable')

const Form = Record({
  trip: new (Record({
    guideId: '',
    name: '',
    routes: null,
    startSite: null,
  }))(),
  isFetching: false,
  error: null,
})

const InitialState = Record({
  form: new Form(),

})
export default InitialState
