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
import { View } from 'react-native'
import styles from './styles'

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
      <View style={styles.container}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginMain)
