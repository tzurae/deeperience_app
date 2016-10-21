/**
 * # Custom.js
 *
 *  The container to custom post
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../reducers/auth/authActions'
import { Map } from 'immutable'
import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import I18n from '../../lib/i18n'
import styles from './styles'
import TouchableIcon from '../../components/TouchableIcon'
import * as Animatable from 'react-native-animatable'

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
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignSelf: 'stretch' }}>
          <TouchableIcon
            onPress={() => {}}
            name="user"
            color="black"
            size={25}
          />
        </View>
        <ScrollView>
          <View style={styles.innerView}>
            <View style={[styles.centerContainer, { flex: 3 }]}>
              <Image source={require('../../images/dpLogoTransparent.png')}
                     style={[styles.logo, { marginTop: 30 }]}
              />
              <Text style={[styles.title, { marginTop: 0 }]}>{I18n.t('Custom.name')}</Text>
              <Text style={[styles.title, { marginTop: 60, color: '#2493B5' }]}>{I18n.t('Custom.slogan')}</Text>
            </View>
            <View style={[styles.centerContainer, { flex: 2 }]}>
              <Text style={[styles.title, { marginTop: 30, color: '#FF4747' }]}>{I18n.t('Custom.slideDown')}</Text>
              <Animatable.View
                style={{ position: 'relative', top: 40, backgroundColor: 'transparent' }}
                animation="fadeInDown"
                delay={500}
                duration={1500}
                easing="ease-out"
                iterationCount="infinite"
                direction="alternate"
              >
                <TouchableIcon
                  onPress={() => {}}
                  name="angle-double-down"
                  color="#FF4747"
                  size={45}
                />
              </Animatable.View>

            </View>
          </View>
        </ScrollView>

      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginMain)
