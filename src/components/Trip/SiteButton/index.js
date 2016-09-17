'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import React from 'react'
import styles from './styles'
import Button from 'react-native-button'
import { View, Text } from 'react-native'
import tripActions from '../../../reducers/trip/tripActions'

const actions = [
  tripActions,
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

class SiteButton extends React.Component {
  render() {
    return (
      <View style={{
        position: 'absolute',
        width: 100,
        height: 50,
        alignItems: 'center',
        top: this.props.top,
        left: this.props.left - 50 + 14,
      }}>
        <View style={styles.site}/>
        <View style={styles.siteShadow}/>
        <View style={styles.siteBackground}/>
        <Text style={styles.siteName}>{this.props.children}</Text>
        <Button
          containerStyle={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 36,
          }}
        />
      </View>
    )
  }
}

export default connect(null, mapDispatchToProps)(SiteButton)
