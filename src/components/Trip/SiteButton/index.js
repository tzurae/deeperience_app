'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import React from 'react'
import styles from './styles'
import Button from 'react-native-button'
import { View, Text } from 'react-native'
import * as tripActions from '../../../reducers/trip/tripActions'

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
  onPress() {
    console.log(this.props)
    const { name, introduction } = this.props.siteInfo.content
    this.props.dispatch(
      this.props.actions.setDisplayInfo({
        title: name, introduction,
      })
    )
    this.props.dispatch(this.props.actions.deactivateSiteBtn({
      day: this.props.siteInfo.day,
    }))
    this.props.dispatch(
      this.props.actions.activateSiteBtn({
        day: this.props.siteInfo.day,
        order: this.props.order,
      })
    )
  }

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
        <View
          style={[styles.site, (() => {
            if (this.props.active) return styles.siteActive
            else return styles.siteDeactive
          })()]}
        />
        <View style={styles.siteShadow}/>
        <View
          style={[styles.siteBackground, (() => {
            if (this.props.active) return styles.siteBackgroundActive
            else return styles.siteBackgroundDeactive
          })()]}
        />
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
            zIndex: 10,
          }}
          onPress={() => this.onPress()}
        />
      </View>
    )
  }
}

export default connect(null, mapDispatchToProps)(SiteButton)
