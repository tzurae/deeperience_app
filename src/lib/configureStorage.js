/* @flow */
import storage from 'redux-storage'
import storageDebounce from 'redux-storage-decorator-debounce'
import { storage_key } from '../config'

const createStorageMiddleware = storageEngine => {
  let decoratedEngine = storageDebounce(storageEngine, 300)
  return storage.createMiddleware(decoratedEngine)
}

const configureStorage = createStoreEngine => {

  const storageEngine = createStoreEngine &&
                        createStoreEngine(storage_key)
  const storageMiddleware = storageEngine && createStorageMiddleware(storageEngine)

  return storageMiddleware
}

export default configureStorage
