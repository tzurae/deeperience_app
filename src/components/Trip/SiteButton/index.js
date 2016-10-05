'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import React, { PropTypes } from 'react'
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

  static propTypes = {
    status: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
    order: PropTypes.number,
  }
  static defaultProps = {
    status: 0,
    top: 0,
    left: 0,
    order: 0,
  }

  onPress() {
    if (this.props.status === 0) return

    const { name, introduction } = this.props.siteInfo.content
    this.props.dispatch(
      this.props.actions.setDisplayInfo({
        title: name, introduction,
      })
    )
    this.props.dispatch(this.props.actions.deactivateSiteBtn())
    this.props.dispatch(
      this.props.actions.activateSiteBtn({
        day: this.props.siteInfo.day,
        order: this.props.order,
      })
    )
    this.props.dispatch(this.props.actions.switchDisplayInfoCard(0))
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
            switch (this.props.status) {
              case 0: // locked
                return styles.siteDeactive
              case 1: // unlocked and unclick
              case 3: // pioneer and unclick
                return styles.siteActiveUnclick
              case 2: // unlocked and click
              case 4: // pioneer and click
              case 6: // frontier and click
                return styles.siteActiveClick
              case 5: // frontier and click
                return styles.siteFrontier
            }
          })()]}
        />
        <View style={styles.siteShadow}/>
        <View
          style={[styles.siteBackground, (() => {
            switch (this.props.status) {
              case 0:
                return styles.siteBackgroundDeactive
              case 1:
              case 3:
                return styles.siteBackgroundActiveUnclick
              case 2:
              case 4:
              case 6:
                return styles.siteBackgroundActiveClick
              case 5:
                return styles.siteFrontier
            }
          })()]}
        />
        <Text style={styles.siteName}>
          {this.props.status !== 0 ? this.props.children : ''}
        </Text>
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
