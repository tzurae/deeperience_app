/**
 * # Login.js
 *
 *  The container to display the Login form
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../reducers/auth/authActions'
import { Map } from 'immutable'
import LoginRender from '../../components/LoginRender'
import React from 'react'

import I18n from '../../lib/i18n'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
} = require('../../lib/constants').default

/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
]

function mapStateToProps(state) {
  return {
    auth: state.auth,
    global: state.global,
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

function buttonPressHandler(login, username, password) {
  login(username, password)
}

class Login extends React.Component {

  render() {
    let loginButtonText = I18n.t('Login.login')
    let onButtonPress = buttonPressHandler.bind(null,
      this.props.actions.login,
      this.props.auth.form.fields.email,
      this.props.auth.form.fields.password
    )

    return (
      <LoginRender
        formType={LOGIN}
        loginButtonText={loginButtonText}
        onButtonPress={onButtonPress}
        displayPasswordCheckbox={true}
        leftMessageType={REGISTER}
        rightMessageType={FORGOT_PASSWORD}
        auth={this.props.auth}
        global={this.props.global}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
