'use strict'
import React, { PropTypes } from 'react'
import styles from './styles'
import Button from 'react-native-button'
import { View, Text } from 'react-native'

class SiteButton extends React.PureComponent {

  static propTypes = {
    status: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
  }

  static defaultProps = {
    status: 0,
    top: 0,
    left: 0,
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
          onPress={() => this.props.onPress()}
        />
      </View>
    )
  }
}

export default SiteButton
