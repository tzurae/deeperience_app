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
  Text,
}
from 'react-native'
import styles from './styles'
import Header from '../../components/Header'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import I18n from '../../lib/i18n'
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
  /**
   * See if there's a sessionToken from a previous login
   *
   */
  componentDidMount() {
    // Use a timer so App screen is displayed
    this.setTimeout(
      () => {
        this.props.actions.initAuth()
      },
      2500
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header isFetching={this.props.auth.form.isFetching}
                showState={this.props.global.showState}
                currentState={this.props.global.currentState}
                onGetState={this.props.actions.getState}
                onSetState={this.props.actions.setState}
        />

        <Text style={styles.summary}>Snowflake {I18n.t('App.version')}:        {this.props.deviceVersion}</Text>
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
