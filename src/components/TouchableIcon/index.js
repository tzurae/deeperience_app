'use strict'

import React, { PropTypes } from 'react'
import { TouchableHighlight, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MainStyle from '../../styles'

class TouchableIcon extends React.Component {
  static propTypes = {
    underlayColor: PropTypes.string,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    activeColor: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    active: PropTypes.bool,
    clickable: PropTypes.bool,
  }
  static defaultProps = {
    underlayColor: MainStyle.color.mainShadow,
    size: 20,
    color: 'white',
    activeColor: MainStyle.color.main,
    active: false,
    clickable: true,
  }
  render() {
    return (
      <TouchableHighlight
        style={this.props.style}
        onPress={() => this.props.onPress()}
        underlayColor={this.props.underlayColor}
      >
        <View style={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Icon
            name={this.props.name}
            size={this.props.size}
            color={(() => {
              if (!this.props.active) return this.props.color
              else return this.props.activeColor
            })()}
          />
          {(() => {
            if (this.props.children) {
              return (
                <Text style={[
                  this.props.textStyle,
                  { color: this.props.active ? this.props.activeColor : this.props.color },
                ]}>
                {this.props.children}
                </Text>
              )
            }
          })()}
        </View>
      </TouchableHighlight>
    )
  }
}

export default TouchableIcon
