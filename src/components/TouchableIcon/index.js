'use strict'

import React, { PropTypes } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MainStyle from '../../styles'

class TouchableIcon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    activeColor: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    active: PropTypes.bool,
    clickable: PropTypes.bool,
  }
  static defaultProps = {
    size: 20,
    color: 'white',
    activeColor: MainStyle.color.main,
    active: false,
    clickable: true,
  }
  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={() => this.props.onPress()}
        activeOpacity={0.7}
      >
        <View style={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Icon
            name={this.props.name}
            size={this.props.size}
            color={!this.props.active ? this.props.color : this.props.activeColor}
          />
          {this.props.children ?
            (<Text style={[
              this.props.textStyle,
                  { color: this.props.active ? this.props.activeColor : this.props.color },
            ]}>
              {this.props.children}
            </Text>) : null}
        </View>
      </TouchableOpacity>
    )
  }
}

export default TouchableIcon
