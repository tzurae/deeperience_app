'use strict'

import React, { PropTypes } from 'react'
import { TouchableHighlight } from 'react-native'
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
  }
  static defaultProps = {
    underlayColor: MainStyle.color.mainShadow,
    size: 20,
    color: 'white',
    activeColor: MainStyle.color.main,
    active: false,
  }
  render() {
    return (
      <TouchableHighlight
        style={this.props.style}
        onPress={() => this.props.onPress()}
        underlayColor={this.props.underlayColor}
      >
        <Icon
          name={this.props.name}
          size={this.props.size}
          color={(() => {
            if (!this.props.active) return this.props.color
            else return this.props.activeColor
          })()}
        />
      </TouchableHighlight>
    )
  }
}

export default TouchableIcon
