'use strict'
import React from 'react'
import {
  AppRegistry,
  // Navigator,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import {
  Router,
  Scene,
  // TabBar,
} from 'react-native-router-flux'
import {
  Provider,
  // connect,
} from 'react-redux'
import configureStore from './lib/configureStore'
import App from './containers/App'
import Login from './containers/Login'
import Logout from './containers/Logout'
import Register from './containers/Register'
import ForgotPassword from './containers/ForgotPassword'
import Profile from './containers/Profile'
import Main from './containers/Main'
import Subview from './containers/Subview'
import Icon from 'react-native-vector-icons/FontAwesome'

import { setPlatform, setVersion } from './reducers/device/deviceActions'
import { setStore } from './reducers/global/globalActions'

import AuthInitialState from './reducers/auth/authInitialState'
import DeviceInitialState from './reducers/device/deviceInitialState'
import GlobalInitialState from './reducers/global/globalInitialState'
import ProfileInitialState from './reducers/profile/profileInitialState'

import pack from '../package'
import I18n from './lib/i18n'
import R from 'reactotron-react-native'
// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true
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
    global: (new GlobalInitialState()),
    profile: new ProfileInitialState(),
  }
  return initState
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
  },
})

/**
 * ## TabIcon
 *
 * Displays the icon for the tab w/ color dependent upon selection
 */
class TabIcon extends React.Component {
  render() {
    const color = this.props.selected ? '#FF3366' : '#FFB3B3'
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
        <Icon style={{ color }} name={this.props.iconName} size={30}/>
        <Text style={{ color }}>{this.props.title}</Text>
      </View>
    )
  }
}

/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native(platform) {
  class Snowflake extends React.Component {
    render() {
      const store = configureStore(getInitialState())

      // configureStore will combine reducers from snowflake and main application
      // it will then create the store based on aggregate state from all reducers
      R.log(typeof platform)
      store.dispatch(setPlatform(platform))
      store.dispatch(setVersion(VERSION))
      store.dispatch(setStore(store))

      // setup the router table with App selected as the initial component
      // note: See https://github.com/aksonov/react-native-router-flux/issues/948
      return (
        <Provider store={store}>

          <Router sceneStyle={{ backgroundColor: 'white' }}>
            <Scene key="root"
                   hideNavBar={true}
            >

              <Scene key="App"
                     component={App}
                     type="replace"
                     initial={true}
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

              <Scene key="Tabbar"
                     tabs={true}
                     hideNavBar={true}
                     tabBarStyle={styles.tabBar}
                     default="Main"
              >

                <Scene key="Logout"
                       title={I18n.t('Snowflake.logout')}
                       icon={TabIcon}
                       iconName={"sign-out"}
                       hideNavBar={true}
                       component={Logout}
                />

                <Scene key="Main"
                       title={I18n.t('Snowflake.main')}
                       iconName={"home"}
                       icon={TabIcon}
                       hideNavBar={true}
                       component={Main}
                       initial={true}
                />

                <Scene key="Profile"
                       title={I18n.t('Snowflake.profile')}
                       icon={TabIcon}
                       iconName={"gear"}
                       hideNavBar={true}
                       component={Profile}
                />
              </Scene>
            </Scene>
          </Router>
        </Provider>
      )
    }
  }
  /**
   * registerComponent to the AppRegistery and off we go....
   */

  AppRegistry.registerComponent('snowflake', () => Snowflake)
}
