'use strict'
import React, { PropTypes } from 'react'
import MainStyle from '../../styles'
import { View, ActivityIndicator, Text } from 'react-native'

class Loading extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large']),
    backgroundColor: PropTypes.string,
    text: PropTypes.string,
    textStyle: Text.propTypes.style,
  }
  static defaultProps = {
    visible: false,
    color: 'white',
    size: 'large',
    backgroundColor: MainStyle.color.main,
    text: '',
    textStyle: {},
  }
  render() {
    if (this.props.visible) {
      return (
        <View style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: this.props.backgroundColor,
          zIndex: 10000,
        }}>
          <ActivityIndicator
            color = {this.props.color}
            size = {this.props.size}
          />
          <Text style={[{
            color: 'white',
            fontSize: MainStyle.font.big,
            fontWeight: 'bold',
            marginTop: 20,
          }, this.props.textStyle]}>
            {this.props.text}
          </Text>
        </View>
      )
    } else return (<View/>)
  }
}

export default Loading
