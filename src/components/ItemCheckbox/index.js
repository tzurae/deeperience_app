/**
 * # ItemCheckbox.js
 *
 * This class was initially written by
 * https://github.com/mhollweck/react-native-item-checkbox
 *
 * I've opened an issue to attempt to merge this back in
 */
'use strict'

import React, { PropTypes } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

class ItemCheckbox extends React.Component {
  static propTypes = {
    onCheck: PropTypes.func,
    onUncheck: PropTypes.func,
    iconCheck: PropTypes.string,
    backgroundColor: PropTypes.string,
    iconSize: PropTypes.number,
    color: PropTypes.string,
    checked: PropTypes.bool,
    style: View.propTypes.style,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    textStyle: Text.propTypes.style,
    iconViewStyle: View.propTypes.style,
  }
  static defaultProps = {
    onCheck: () => {},
    onUncheck: () => {},
    iconCheck: 'check',
    backgroundColor: 'transparent',
    iconSize: 14,
    color: 'black',
    checked: false,
    style: {},
    text: '',
    disabled: false,
    textStyle: {},
    iconViewStyle: {},
  }

  render() {
    return (
      <View style={this.props.style}>
        <TouchableWithoutFeedback
          onPress={this.props.disabled ?
                    null :
                    this.props.checked ?
                      this.props.onUncheck :
                      this.props.onCheck}
        >
          <View style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
            <View
              style={[
                {
                  height: 16,
                  width: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'white',
                  borderWidth: 1,
                  borderRadius: 2,
                },
                { borderColor: this.props.color,
                  backgroundColor: this.props.backgroundColor },
                this.props.iconViewStyle,
              ]}>
              {this.props.checked ? (
                  <Icon
                    name={this.props.iconCheck}
                    size={this.props.iconSize}
                    color={this.props.color}
                  />
                ) : null}
            </View>
            <Text
              style={{ color: this.props.color,
                          marginLeft: 5,
                          fontSize: this.props.iconSize + 1 }}
            >
              {this.props.text}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default ItemCheckbox
