/**
 * # Logout.js
 *
 *
 *
 */
'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../reducers/auth/authActions'
import * as globalActions from '../../reducers/global/globalActions'
import { Map } from 'immutable'
import Header from '../../components/Header'
import FormButton from '../../components/FormButton'
import React, { Component } from 'react'
import I18n from '../../lib/i18n'
import
{
  StyleSheet,
  View,
}
  from 'react-native'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
})

const actions = [
  authActions,
  globalActions,
]

function mapStateToProps(state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching,
        isValid: state.auth.form.isValid,
      },
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState,
    },
  }
}

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

class Logout extends Component {

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    const onButtonPress = () => {
      this.props.actions.logout()
    }

    return (
      <View style={styles.container}>
        <View>
          <Header isFetching={this.props.auth.form.isFetching}
                  showState={this.props.global.showState}
                  currentState={this.props.global.currentState}
                  onGetState={this.props.actions.getState}
                  onSetState={this.props.actions.setState}
          />
          <FormButton
            isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
            onPress={onButtonPress.bind(this)}
            buttonText={I18n.t('Snowflake.logout')}
          />
        </View>
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
