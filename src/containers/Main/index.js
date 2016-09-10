/**
 * # Main.js
 *  This is the main app screen
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../reducers/auth/authActions'
import * as globalActions from '../../reducers/global/globalActions'
import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'
import Header from '../../components/Header'
import React, { Component } from 'react'
import
{
  View,
}
from 'react-native'
import I18n from '../../lib/i18n'

import styles from './styles'
const Button = require('apsl-react-native-button')

/**
 * Support for Hot reload
 *
 */
const actions = [
  authActions,
  globalActions,
]

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
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

/*
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

/**
 * ## App class
 */
class Main extends Component {

  handlePress() {
    Actions.Subview({
      title: 'Subview',
      // you can add additional props to be passed to Subview here...
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Header isFetching={this.props.auth.form.isFetching}
                  showState={this.props.global.showState}
                  currentState={this.props.global.currentState}
                  onGetState={this.props.actions.getState}
                  onSetState={this.props.actions.setState}
          />
          <Button style={styles.button} onPress={this.handlePress.bind(this)}>
            {I18n.t('Main.navigate')}
          </Button>
        </View>
      </View>
    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
