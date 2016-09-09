'use strict'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createLoggerMiddleware from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers'

const injectMiddleware = services => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function' ?
    action({ ...services, dispatch, getState }) :
    action
  )

const saga = createSagaMiddleware()

export default function configureStore(initialState) {
  const logger = createLoggerMiddleware({
    collapsed: true,
    stateTransformer: state => JSON.parse(JSON.stringify(state)),
  })

  const middlewares = [
    saga,
    thunk,
    logger,
  ]

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  store.runSaga = saga.run

  return store
};
