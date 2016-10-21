'use strict'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableHighlight,
} from 'react-native'
import I18n from '../../lib/i18n'
import MainStyle from '../../styles'
import Icon from 'react-native-vector-icons/FontAwesome'

const FBLoginManager = NativeModules.MFBLoginManager

const FBLogin = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    onPress: React.PropTypes.func,
    onLogin: React.PropTypes.func,
    onLogout: React.PropTypes.func,
  },

  componentWillMount() {
    const _this = this
    FBLoginManager.getCredentials(function(error, data) {
      if (!error) {
        _this.setState({ user: data })
      }
    })
  },

  handleLogin() {
    const _this = this
    FBLoginManager.login(function(error, data) {
      if (!error) {
        _this.setState({ user: data })
        _this.props.onLogin && _this.props.onLogin(data)
      } else {
        console.log(error, data)
      }
    })
  },


  handleLogout() {
    const _this = this
    FBLoginManager.logout(function(error, data) {
      if (!error) {
        _this.setState({ user: null })
        _this.props.onLogout && _this.props.onLogout()
      } else {
        console.log(error, data)
      }
    })
  },

  onPress() {
    this.props.loginOrNot ?
      this.handleLogout() :
      this.handleLogin()

    this.props.onPress && this.props.onPress()
  },

  render() {
    return (
      <TouchableHighlight
        style={[styles.btn, styles.fbBtn]}
        onPress={this.onPress}
      >
        <View style={styles.fbBtnInnerView}>
          <Icon
            name="facebook"
            size={18}
            color={MainStyle.color.main}
            style={styles.icon}
          />
          <Text style={[styles.btnText, styles.fbBtnText]}>{I18n.t('LoginMain.facebookLogin')}</Text>
        </View>
      </TouchableHighlight>
    )
  },
})

const styles = StyleSheet.create({
  btn: {
    padding: 5,
    height: 42,
    alignSelf: 'stretch',
    borderRadius: 21,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  fbBtn: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  fbBtnInnerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    backgroundColor: 'transparent',
  },
  btnText: {
    flex: 1,
    fontSize: MainStyle.font.medium + 2,
    textAlign: 'center',
    justifyContent: 'center',
  },
  fbBtnText: {
    color: MainStyle.color.main,
  },
})

module.exports = { FBLogin, FBLoginManager }
