'use strict'
import React from 'react'
import { AppRegistry, ToastAndroid } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import configureStore from './lib/configureStore'
import App from './containers/App'
import MainChoose from './containers/MainChoose'
import LoginRegister from './containers/LoginRegister'
import ForgotPassword from './containers/ForgotPassword'
import Main from './containers/Main'
import Custom from './containers/Custom'
import TripContent from './containers/Trip/TripContent'
import SiteContent from './containers/Trip/SiteContent'
import createStorageEngine from 'redux-storage-engine-reactnativeasyncstorage'
import { setPlatform, setVersion } from './reducers/device/deviceActions'
import { setStore } from './reducers/global/globalActions'
import AuthInitialState from './reducers/auth/authInitialState'
import DeviceInitialState from './reducers/device/deviceInitialState'
import GlobalInitialState from './reducers/global/globalInitialState'
import TripInitialState from './reducers/trip/tripInitialState'
import pack from '../package'
import I18n from './lib/i18n'
// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true
I18n.locale = 'zh-TW'
const VERSION = pack.version

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snowflake
 * @returns {Object} object with 4 keys
 */
function getInitialState() {
  const initState = {
    auth: new AuthInitialState(),
    device: (new DeviceInitialState()).set('isMobile', true),
    global: new GlobalInitialState(),
    trip: new TripInitialState(),
  }
  return initState
}

export default function native(platform) {
  class Deeperience extends React.Component {

    constructor(props) {
      super(props)
      this.exitOrNot = false
    }

    render() {
      const store = configureStore({
        initialState: getInitialState(),
        platformDeps: { createStorageEngine },
      })
      // configureStore will combine reducers from snowflake and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform))
      store.dispatch(setVersion(VERSION))
      store.dispatch(setStore(store))

      // setup the router table with App selected as the initial component
      // note: See https://github.com/aksonov/react-native-router-flux/issues/948

      return (
        <Provider store={store}>
          <Router
            onExitApp={() => {
              if (!this.exitOrNot) {
                ToastAndroid.show(I18n.t('Toast.pressAgainExit'), ToastAndroid.SHORT)
                this.exitOrNot = true
                setTimeout(() => { this.exitOrNot = false }, 3000)
                return true
              } else return false
            }}
          >
            <Scene key="root"
                   hideNavBar={true}
            >
              <Scene key="App"
                     component={App}
                     type="replace"
              />
              <Scene key="MainChoose"
                     component={MainChoose}
              />
              <Scene key="Main"
                     component={Main}
              />
              <Scene key="Custom"
                     component={Custom}
                     initial={true}
              />
              <Scene key="LoginRegister"
                     component={LoginRegister}
              />
              <Scene key="TripContent"
                     component={TripContent}
              />
              <Scene key="SiteContent"
                     component={SiteContent}
              />
              <Scene key="ForgotPassword"
                     component={ForgotPassword}
                     type="replace"
              />
            </Scene>
          </Router>
        </Provider>
      )
    }
  }

  Deeperience.childContextTypes = {
    store: React.PropTypes.object,
  }

  AppRegistry.registerComponent('deeperience', () => Deeperience)
}
