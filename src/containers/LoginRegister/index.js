/**
 * # LoginRegister.js
 *
 *  The container to display Login, Register, ForgotPassword form
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../reducers/auth/authActions'
import * as customActions from '../../reducers/custom/customActions'
import { Map } from 'immutable'
import LoginRegisterRender from '../../components/LoginRegisterRender'
import React from 'react'
import I18n from '../../lib/i18n'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
} = require('../../constants/actions').default

const actions = [
  authActions,
  customActions,
]

function mapStateToProps(state) {
  return {
    auth: {
      username: state.auth.form.fields.username,
      email: state.auth.form.fields.email,
      password: state.auth.form.fields.password,
    },
    global: state.global,
    custom: {
      startDate: state.custom.startDate,
      endDate: state.custom.endDate,
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

class LoginRegister extends React.Component {

  render() {
    switch (this.props.formType) {
      case REGISTER:
        return (
          <LoginRegisterRender
            formType={REGISTER}
            buttonText={I18n.t('LoginRegister.register')}
            onButtonPress={() => {
              this.props.actions.signup(
                this.props.auth.username,
                this.props.auth.email,
                this.props.auth.password)
              if (this.props.custom.startDate && this.props.custom.endDate) {
                // means there exists post
                this.props.actions.toggleNotSendYet()
              }
            }}
          />
        )
      case LOGIN:
        return (
          <LoginRegisterRender
            formType={LOGIN}
            buttonText={I18n.t('LoginRegister.login')}
            onButtonPress={() => {
              this.props.actions.login(
                this.props.auth.email,
                this.props.auth.password)
            }}
          />
        )
      case FORGOT_PASSWORD:
        return (
          <LoginRegisterRender
            formType={FORGOT_PASSWORD}
            buttonText={I18n.t('LoginRegister.resetPassword')}
            onButtonPress={() => {
              this.props.actions.resetPassword(this.props.auth.email)
            }}
          />
        )
      default:
        return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister)
