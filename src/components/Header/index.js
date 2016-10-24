'use strict'

import React, { PropTypes } from 'react'
import { Text, View, Platform } from 'react-native'
import styles from './styles'
import TouchableIcon from '../TouchableIcon'

class Header extends React.Component {

  static propTypes = {
    headerText: PropTypes.string,
    back: PropTypes.bool,
    onReturn: PropTypes.func,
    rightIcon: PropTypes.string,
    rightIconSize: PropTypes.number,
    rightIconColor: PropTypes.string,
    rightIconStyle: View.propTypes.style,
    onPress: PropTypes.func,
  }
  static defaultProps = {
    headerText: '',
    back: true,
    onReturn: () => {},
    rightIcon: 'chevron-left',
    rightIconSize: 30,
    rightIconColor: 'white',
    rightIconStyle: {},
    onPress: () => {},
  }
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ? (
          <View style={styles.iosbar}/>
        ) : null}
        <View style={styles.contentView}>
          {this.props.back ? (
            <TouchableIcon
              onPress={() => this.props.onReturn()}
              name="chevron-left"
              size={30}
              color="white"
            />) : null}
          <Text style={styles.textStyle}>{this.props.headerText}</Text>
          <TouchableIcon
            style={this.props.rightIconStyle}
            onPress={() => this.props.onPress()}
            name={this.props.rightIcon}
            size={this.props.rightIconSize}
            color={this.props.rightIcon === '' ? 'transparent' : this.props.rightIconColor}
          />
        </View>
      </View>
    )
  }
}

export default Header
