import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createLoggerMiddleware from 'redux-logger'
import createStorageMiddleware from './configureStorage'
import devTools from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import reducer from '../reducers'

type Options = {
  initialState: Object,
  platformDeps: Object,
}

const injectMiddleware = services => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function' ?
    action({ ...services, dispatch, getState }) :
    action
  )

export default function configureStore(options: Options) {
  const {
    initialState,
    platformDeps = {},
  } = options

  // ------------------------middleware setting start-------------------------

  const saga = createSagaMiddleware()

  const logger = createLoggerMiddleware({
    collapsed: true,
    stateTransformer: state => JSON.parse(JSON.stringify(state)),
  })

  const storage = createStorageMiddleware(platformDeps.createStorageEngine)

  const middlewares = [
    saga,
    thunk,
    injectMiddleware(platformDeps),
    storage,
    logger,
  ]
  // ------------------------middleware setting end-------------------------

  const enhancer = compose(applyMiddleware(...middlewares), devTools({ realtime: true }))

  const store = createStore(
    reducer,
    initialState,
    enhancer
  )

  store.runSaga = saga.run
  devTools.updateStore(store)

  return store
};
