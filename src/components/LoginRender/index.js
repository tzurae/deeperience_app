/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../reducers/auth/authActions'
import * as globalActions from '../../reducers/global/globalActions'
import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'
import Header from '../Header'
import ErrorAlert from '../ErrorAlert'
import FormButton from '../FormButton'
import LoginForm from '../LoginForm'
import ItemCheckbox from '../ItemCheckbox'
import React from 'react'
import
{
  ScrollView,
  Text,
  TouchableHighlight,
  View,
}
  from 'react-native'
import I18n from '../../lib/i18n'
import styles from './styles'
import Dimensions from 'Dimensions'

let { height, width } = Dimensions.get('window') // Screen dimensions in current orientation

/**
 * The states were interested in
 */
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
  globalActions,
]

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

class LoginRender extends React.Component {
  constructor(props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      value: {
        username: this.props.auth.form.fields.username,
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password,
        passwordAgain: this.props.auth.form.fields.passwordAgain,
      },
      selectedTab: 'Social Login',
    }
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextprops) {
    this.setState({
      value: {
        username: nextprops.auth.form.fields.username,
        email: nextprops.auth.form.fields.email,
        password: nextprops.auth.form.fields.password,
        passwordAgain: nextprops.auth.form.fields.passwordAgain,
      },
    })
  }

  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  onChange(value) {
    if (value.username !== '') {
      this.props.actions.onAuthFormFieldChange('username', value.username)
    }
    if (value.email !== '') {
      this.props.actions.onAuthFormFieldChange('email', value.email)
    }
    if (value.password !== '') {
      this.props.actions.onAuthFormFieldChange('password', value.password)
    }
    if (value.passwordAgain !== '') {
      this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain)
    }
    this.setState(
      { value }
    )
  }
  /**
   *  Get the appropriate message for the current action
   *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
   *  @param actions the action for the message type
   */
  getMessage(messageType, actions) {
    const forgotPassword =
      (<TouchableHighlight
        onPress={() => {
          actions.forgotPasswordState()
          Actions.ForgotPassword()
        }}
       >
        <Text>{I18n.t('LoginRender.forgot_password')}</Text>
      </TouchableHighlight>)

    const alreadyHaveAccount =
      (<TouchableHighlight
        onPress={() => {
          actions.loginState()
          Actions.Login()
        }}
       >
        <Text>{I18n.t('LoginRender.already_have_account')}</Text>
      </TouchableHighlight>)

    const register =
      (<TouchableHighlight
        onPress={() => {
          actions.registerState()
          Actions.Register()
        }}
       >
        <Text>{I18n.t('LoginRender.register')}</Text>
      </TouchableHighlight>)

    switch (messageType) {
      case FORGOT_PASSWORD:
        return forgotPassword
      case LOGIN:
        return alreadyHaveAccount
      case REGISTER:
        return register
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    let formType = this.props.formType
    let loginButtonText = this.props.loginButtonText
    let onButtonPress = this.props.onButtonPress
    const displayPasswordCheckbox = this.props.displayPasswordCheckbox
    const leftMessageType = this.props.leftMessageType
    const rightMessageType = this.props.rightMessageType

    let passwordCheckbox = <Text/>
    let leftMessage = this.getMessage(leftMessageType, this.props.actions)
    let rightMessage = this.getMessage(rightMessageType, this.props.actions)

    const self = this

    // display the login / register / change password screens
    this.errorAlert.checkError(this.props.auth.form.error)

    /**
     * Toggle the display of the Password and PasswordAgain fields
     */
    if (displayPasswordCheckbox) {
      passwordCheckbox =
        (<ItemCheckbox
          text={I18n.t('LoginRender.show_password')}
          disabled={this.props.auth.form.isFetching}
          onCheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', true)
          }}
          onUncheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', false)
          }}
         />)
    }

    /**
     * The LoginForm is now defined with the required fields.  Just
     * surround it with the Header and the navigation messages
     * Note how the button too is disabled if we're fetching. The
     * header props are mostly for support of Hot reloading.
     * See the docs for Header for more info.
     */
    return (
      <View style={styles.container}>
        <ScrollView horizontal={false} width={width} height={height}>
          <View>
            <Header isFetching={this.props.auth.form.isFetching}
                    showState={this.props.global.showState}
                    currentState={this.props.global.currentState}
                    onGetState={this.props.actions.getState}
                    onSetState={this.props.actions.setState}
            />

            <View style={styles.inputs}>
              <LoginForm
                formType={formType}
                form={this.props.auth.form}
                value={this.state.value}
                onChange={self.onChange.bind(self)}
              />
              {passwordCheckbox}
            </View>

            <FormButton
              isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
              onPress={onButtonPress}
              buttonText={loginButtonText}
            />

            <View >
              <View style={styles.forgotContainer}>
                {leftMessage}
                {rightMessage}
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    )
  }
}
export default connect(null, mapDispatchToProps)(LoginRender)
