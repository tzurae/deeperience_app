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
import
{
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

class ItemCheckbox extends React.Component {
  static propTypes = {
    onCheck: PropTypes.func.isRequired,
    onUncheck: PropTypes.func.isRequired,
    iconCheck: PropTypes.string,
    iconOpen: PropTypes.string,
    backgroundColor: PropTypes.string,
    iconSize: PropTypes.number,
    color: PropTypes.string,
    checked: PropTypes.bool,
    style: View.propTypes.style,
    text: PropTypes.string,
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    onCheck: null,
    onUncheck: null,
    iconCheck: 'check-square-o',
    iconOpen: 'square-o',
    backgroundColor: 'white',
    iconSize: 20,
    color: 'black',
    checked: false,
    style: {},
    text: 'MISSING TEXT',
    disabled: false,
  }

  render() {
    return (
      <View style={this.props.style}>
        <TouchableWithoutFeedback
          onPress={this.props.disabled ? null : this.props.checked ? this.props.onUncheck : this.props.onCheck}
        >
          <View style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
            <Icon
              name={this.props.checked ? this.props.iconCheck : this.props.iconOpen}
              size={this.props.iconSize}
              color={this.props.color}
            />
            <Text
              style={{ color: this.props.color,
                          marginLeft: 5,
                          fontSize: this.props.iconSize - 5,
                          position: 'relative',
                          top: -1 }}
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
