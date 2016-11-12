/**
 * # LoginForm.js
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
 */
'use strict'
import React, { PropTypes } from 'react'
import t from 'tcomb-form-native'
import stylesheet from './styles'
import I18n from '../../lib/i18n'

const Form = t.form.Form

const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,
} = require('../../constants/actions').default

class LoginForm extends React.Component {
  /**
   * ## LoginForm class
   *
   * * form: the properties to set into the UI form
   * * value: the values to set in the input fields
   * * onChange: function to call when user enters text
   */
  static propTypes = {
    formType: PropTypes.string,
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func,
  }

  render() {
    const options = {
      auto: 'none',
      stylesheet,
      fields: {
      },
    }

    const username = {
      label: I18n.t('LoginForm.username'),
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.usernameHasError,
      error: this.props.form.fields.usernameErrorMsg,
      underlineColorAndroid: '#FFFFFF',
    }

    const email = {
      label: I18n.t('LoginForm.email'),
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.emailHasError,
      error: this.props.form.fields.emailErrorMsg,
      underlineColorAndroid: '#FFFFFF',
    }

    const secureTextEntry = !this.props.form.fields.showPassword

    const password = {
      label: I18n.t('LoginForm.password'),
      maxLength: 20,
      secureTextEntry,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordHasError,
      error: this.props.form.fields.passwordErrorMsg,
      underlineColorAndroid: '#FFFFFF',
    }

    const passwordAgain = {
      label: I18n.t('LoginForm.passwordAgain'),
      secureTextEntry,
      maxLength: 15,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordAgainHasError,
      error: this.props.form.fields.passwordAgainErrorMsg,
      underlineColorAndroid: '#FFFFFF',
    }

    let loginForm
    switch (this.props.formType) {
      /**
       * ### Registration
       * The registration form has 4 fields
       */
      case (REGISTER):
        loginForm = t.struct({
          username: t.String,
          email: t.String,
          password: t.String,
          passwordAgain: t.String,
        })
        options.fields.username = username
        options.fields.username.autoCapitalize = 'none'
        options.fields.email = email
        options.fields.email.autoCapitalize = 'none'
        options.fields.password = password
        options.fields.passwordAgain = passwordAgain
        break

      /**
       * ### Login
       * The login form has only 2 fields
       */
      case (LOGIN):
        loginForm = t.struct({
          email: t.String,
          password: t.String,
        })
        options.fields.email = email
        options.fields.email.placeholder = I18n.t('LoginForm.email')
        options.fields.email.autoCapitalize = 'none'
        options.fields.password = password
        options.fields.password.placeholder = I18n.t('LoginForm.password')
        break

      /**
       * ### Reset password
       * The password reset form has only 1 field
       */
      case (FORGOT_PASSWORD):
        loginForm = t.struct({
          email: t.String,
        })
        options.fields.email = email
        options.fields.email.autoCapitalize = 'none'
        options.fields.email.placeholder = I18n.t('LoginForm.email')
        break
    } // switch

    return (
      <Form ref={ref => { this.form = ref }}
            type={loginForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />
    )
  }
}

export default LoginForm

