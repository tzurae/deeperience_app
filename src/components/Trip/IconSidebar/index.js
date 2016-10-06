'use strict'
import React, { PropTypes } from 'react'
import styles from './styles'
import { View } from 'react-native'
import TouchableIcon from '../../TouchableIcon'

class IconSidebar extends React.Component {

  static propTypes = {
    displayInfoMode: PropTypes.bool,
  }

  static defaultProps = {
    displayInfoMode: false,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.displayInfoMode !== nextProps.displayInfoMode
  }

  render() {
    return (
      <View style={styles.iconContainerFix}>
        <Icon
          onPress={this.props.closeFunc}
          name="close"
          underlayColor="white"
        />
        <Icon
          onPress={this.props.openMenuFunc}
          name="angle-double-left"
        />
        <Icon
          onPress={this.props.closeExpandFunc}
          name={this.props.displayInfoMode ? 'angle-double-down' : 'angle-double-up'}
        />
      </View>
    )
  }
}

class Icon extends React.PureComponent {

  render() {
    return (
      <TouchableIcon
        style={styles.sideIcon2}
        size={25}
        color="#999"
        {...this.props}
      />
    )
  }
}

export default IconSidebar
