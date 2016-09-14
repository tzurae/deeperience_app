/**
 * # app.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 *
 *
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import * as authActions from '../../reducers/auth/authActions'
import * as deviceActions from '../../reducers/device/deviceActions'
import * as globalActions from '../../reducers/global/globalActions'
import React from 'react'
import
{
  View,
  Image,
}
from 'react-native'
import styles from './styles'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
/**
 * ## Actions
 * 3 of our actions will be available as ```actions```
 */
const actions = [
  authActions,
  deviceActions,
  globalActions,
]

/**
 *  Save that state
 */
function mapStateToProps(state) {
  return {
    deviceVersion: state.device.version,
    auth: {
      form: {
        isFetching: state.auth.form.isFetching,
      },
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState,
    },
  }
}

/**
 * Bind all the functions from the ```actions``` and bind them with
 * ```dispatch```
 */
function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  }
}

class App extends React.Component {
  componentDidMount() {
    // Use a timer so App screen is displayed
    this.setTimeout(
      () => {
        this.props.actions.initAuth()
      },
      1500
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.mark} source={require('../../images/dpLogo.png')} />
      </View>
    )
  }
}
// Since we're using ES6 classes, have to define the TimerMixin
reactMixin(App.prototype, TimerMixin)
/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)
