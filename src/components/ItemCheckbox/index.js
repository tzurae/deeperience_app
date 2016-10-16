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
    onCheck: PropTypes.func,
    onUncheck: PropTypes.func,
    iconCheck: PropTypes.string,
    iconOpen: PropTypes.string,
    backgroundColor: PropTypes.string,
    iconSize: PropTypes.number,
    color: PropTypes.string,
    checked: PropTypes.bool,
    style: PropTypes.func,
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
    text: 'MISSING TEXT',
    disabled: false,
  }
  /**
   * ### getInitialState
   *
   * Set the box to be checked or not
   */
  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.checked,
    }
  }
  /**
   * ### _completeProgress
   * If the checkbox is pressable, figure out what state it's in and
   * what the display should look like
   */
  completeProgress() {
    if (this.state.checked) {
      this.setState({ checked: false })
      if (this.props.onUncheck) this.props.onUncheck()
    } else {
      this.setState({ checked: true })
      if (this.props.onCheck) this.props.onCheck()
    }
  }
  /**
   * ### componentDidMount
   * If there is a ```checked``` property, set the UI appropriately
   */
  componentDidMount() {
    if (this.props.checked) {
      this.completeProgress()
    }
  }
  /**
   * ### render
   * Use Touchable with or without Feedback depending on
   * ```disabled```.
   * Set the ```iconName``` depending on if checked
   */
  render() {
    if (this.props.disabled) {
      return (
        <View style={this.props.style}>
          <TouchableWithoutFeedback>
            <View style={{
              flexDirection: 'row',
              flex: 1,
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
    } else {
      return (
        <View style={this.props.style}>
          <TouchableWithoutFeedback
            onPress={this.completeProgress.bind(this)}
          >
            <View style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}>
              <Icon
                name={this.state.checked ? this.props.iconCheck : this.props.iconOpen}
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
}

export default ItemCheckbox
