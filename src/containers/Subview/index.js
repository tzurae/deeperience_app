/**
 * # Subview.js
 *
 *  This is called from main to demonstrate the back button
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar'
import React from 'react'
import
{
  View,
  Text,
}
from 'react-native'
import styles from './styles'

/**
 * Use device options so we can reference the Version
 *
 */
import * as deviceActions from '../../reducers/device/deviceActions'
import I18n from '../../lib/i18n'

/**
 * ## Redux boilerplate
 */
const actions = [
  deviceActions,
]

/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
    deviceVersion: state.device.version,
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
 * ## Subview class
 */
class Subview extends React.Component {

  render() {
    let titleConfig = {
      title: I18n.t('Subview.subview'),
    }

    let leftButtonConfig = {
      title: I18n.t('Subview.back'),
      handler: Actions.pop,
    }

    return (
      <View>
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig}
        />
        <View style={styles.container}>
          <Text style={styles.summary}>
            {I18n.t('Subview.subview')} {I18n.t('App.version')}: {this.props.deviceVersion}
          </Text>
        </View>
      </View>
    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Subview)
