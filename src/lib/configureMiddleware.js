/* Middleware Import */
import createLoggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk'

/**
 * services:object, inject any packages you need
 */
const injectMiddleware = services => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({...services, dispatch, getState})
    : action
  )


const configureMiddleware = (Service, platformMiddleware)



