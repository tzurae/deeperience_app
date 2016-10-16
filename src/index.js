import React from 'react'
import {
  AppRegistry,
  ToastAndroid,
} from 'react-native'

import {
  Router,
  Scene,
  // TabBar,
} from 'react-native-router-flux'

import { Provider } from 'react-redux'
import configureStore from './lib/configureStore'
import App from './containers/App'
import MainChoose from './containers/MainChoose'
import Login from './containers/Login'
// import Logout from './containers/Logout'
import Register from './containers/Register'
import RegisterTest from './containers/RegisterTest'
import ForgotPassword from './containers/ForgotPassword'
// import Profile from './containers/Profile'
import Main from './containers/Main'
import Subview from './containers/Subview'
import TripContent from './containers/Trip/TripContent'
import SiteContent from './containers/Trip/SiteContent'

import createStorageEngine from 'redux-storage-engine-reactnativeasyncstorage'

import { setPlatform, setVersion } from './reducers/device/deviceActions'
import { setStore } from './reducers/global/globalActions'

import AuthInitialState from './reducers/auth/authInitialState'
import DeviceInitialState from './reducers/device/deviceInitialState'
import GlobalInitialState from './reducers/global/globalInitialState'
import ProfileInitialState from './reducers/profile/profileInitialState'
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
    profile: new ProfileInitialState(),
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
                     initial={true}
              />
              <Scene key="RegisterTest"
                     component={RegisterTest}
              />
              <Scene key="TripContent"
                     component={TripContent}
              />
              <Scene key="SiteContent"
                     component={SiteContent}
              />
              <Scene key="InitialLoginForm"
                     component={Register}
                     type="replace"
              />

              <Scene key="Login"
                     component={Login}
                     type="replace"
              />

              <Scene key="Register"
                     component={Register}
                     type="replace"
              />

              <Scene key="ForgotPassword"
                     component={ForgotPassword}
                     type="replace"
              />

              <Scene key="Subview"
                     component={Subview}
              />
            </Scene>
          </Router>
        </Provider>
      )
    }
  }
  // <Scene key="Profile"
  //        title={I18n.t('Nav.setting')}
  //        icon={TabIcon}
  //        iconName={"gear"}
  //        hideNavBar={true}
  //        component={Profile}
  // />
  //
  // <Scene key="Tabbar"
  //        tabs={true}
  //        hideNavBar={true}
  //        tabBarStyle={styles.tabBar}
  //        default="Main"
  //        initial={true}
  // >
  //   <Scene key="Logout"
  //          title={I18n.t('Nav.logout')}
  //          icon={TabIcon}
  //          iconName={"users"}
  //          hideNavBar={true}
  //          component={Logout}
  //   />
  // </Scene>

  Deeperience.childContextTypes = {
    store: React.PropTypes.object,
  }

  AppRegistry.registerComponent('deeperience', () => Deeperience)
}
