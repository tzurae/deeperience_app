'use strict'

import React, { PropTypes } from 'react'
import { Text, View, Platform } from 'react-native'
import styles from './styles'
import TouchableIcon from '../TouchableIcon'

class Header extends React.Component {

  static propTypes = {
    headerText: PropTypes.string,
    back: PropTypes.bool,
  }
  static defaultProps = {
    back: true,
  }
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ? (
          <View style={styles.iosbar}/>
        ) : null}
        {this.props.back ? (
            <TouchableIcon
              style={styles.backIcon}
              onPress={() => this.props.onReturn()}
              name="chevron-left"
              size={30}
              color="white"
            />) : null}
        <Text style={styles.textStyle}>{this.props.headerText}</Text>
      </View>
    )
  }
}

export default Header
