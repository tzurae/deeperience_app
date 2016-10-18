/**
 * # LoginMain.js
 *
 *  The container to display every Login form
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../reducers/auth/authActions'
import { Map } from 'immutable'
import React from 'react'
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import I18n from '../../lib/i18n'
import MainStyle from '../../styles'
import { FBLogin, FBLoginManager } from '../../components/FBLogin'

const {
  LOGIN,
  REGISTER,
} = require('../../lib/constants').default

const actions = [
  authActions,
]

function mapStateToProps(state) {
  return {
    device: {
      platform: state.device.platform,
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

class LoginMain extends React.Component {

  render() {
    // https://github.com/magus/react-native-facebook-login/blob/master/android/README.md
    const loginBehavior = {
      ios: FBLoginManager.LoginBehaviors.Native,
      android: FBLoginManager.LoginBehaviors.Native,
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Image source={require('../../images/dpLogoWhiteTransparent.png')}
               style={styles.logo}
          />
          <Text style={styles.title}>{I18n.t('LoginMain.notLoginYet')}</Text>
          <Text style={styles.title}>{I18n.t('LoginMain.deeperience')}</Text>
        </View>
        <View style={{ flex: 3,
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                        paddingTop: 10 }}
        >
          {
            Platform.OS === 'ios' ? null : (
              <FBLogin
                containerStyle={[styles.btn, styles.fbBtn]}
                buttonView={(
                  <View style={styles.fbBtnInnerView}>
                    <Icon
                      name="facebook"
                      size={18}
                      color={MainStyle.color.main}
                      style={styles.icon}
                    />
                    <Text style={[styles.btnText, styles.fbBtnText]}>{I18n.t('LoginMain.facebookLogin')}</Text>
                  </View>
                )}
                ref={(fbLogin) => { this.fbLogin = fbLogin }}
                loginBehavior={loginBehavior[this.props.device.platform]}
                permissions={['email', 'user_friends']}
                onLogin={e => console.log(e)}
                onLoginFound={e => console.log(e)}
                onLoginNotFound={e => console.log(e)}
                onLogout={e => console.log(e)}
                onCancel={e => console.log(e)}
                onPermissionsMissing={e => console.log(e)}
              />
            )
          }
          <TouchableOpacity
            onPress={() => Actions.LoginRegister({ formType: REGISTER })}
            style={[styles.btn, styles.normalBtn]}
            underlayColor="transparent"
            activeOpacity={0.7}
          >
            <Text style={[styles.btnText, styles.normalBtnText]}>{I18n.t('LoginMain.register')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.LoginRegister({ formType: LOGIN })}
            style={[styles.btn, styles.normalBtn]}
            underlayColor="transparent"
            activeOpacity={0.7}
          >
            <Text style={[styles.btnText, styles.normalBtnText]}>{I18n.t('LoginMain.login')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignSelf: 'stretch' }}>
          <Text style={styles.serviceText}>{I18n.t('LoginMain.serviceText')}</Text>
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginMain)
