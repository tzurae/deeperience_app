/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

/**
* ## Reducer
* The reducer contains the 4 reducers from
* device, global, auth, profile
*/
import reducer from '../reducers'

/**
 * ## creatStoreWithMiddleware
 * Like the name...
 */
const createStoreWithMiddleware = applyMiddleware(
  thunk
  // sagaMiddleware(sagas)
)(createStore)

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore(initialState) {
  console.log('reducer is',reducer);
  return createStoreWithMiddleware(reducer, initialState)
};
