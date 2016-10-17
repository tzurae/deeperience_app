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
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import I18n from '../../lib/i18n'
import MainStyle from '../../styles'

const {
  LOGIN,
  REGISTER,
} = require('../../lib/constants').default

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

class LoginMain extends React.Component {

  render() {
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
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.btn, styles.fbBtn]}
            underlayColor="white"
            activeOpacity={0.7}
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
          </TouchableOpacity>
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
