'use strict'

const { Record } = require('immutable')

const Form = Record({

})

/**
 * ## InitialState
 * The form is set
 */
const InitialState = Record({
  form: new Form(),
})
export default InitialState
