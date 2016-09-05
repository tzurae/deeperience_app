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
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native'

let Icon = require('react-native-vector-icons/FontAwesome')

class ItemCheckbox extends React.Component {
  static propTypes = {
    onCheck: PropTypes.func,
    onUncheck: PropTypes.func,
    iconCheck: PropTypes.string,
    iconOpen: PropTypes.string,
    size: PropTypes.number,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    iconSize: PropTypes.string,
    checked: PropTypes.bool,
    style: PropTypes.func,
    text: PropTypes.string,
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    onCheck: null,
    onUncheck: null,
    iconCheck: 'check-square',
    iconOpen: 'square-o',
    size: 30,
    backgroundColor: 'white',
    color: 'grey',
    iconSize: 'normal',
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
      bgColor: this.props.backgroundColor,
    }
  }
  /**
   * ### _getCircleCheckSytel
   * merge the props styles w/ some defaults
   */
  getCircleCheckStyle() {
    return {
      width: this.props.size,
      height: this.props.size,
      backgroundColor: this.state.bg_color,
      borderColor: this.props.color,
      borderWidth: 2,
      borderRadius: this.props.size / 2,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    }
  }
  /**
   * ### _completeProgress
   * If the checkbox is pressable, figure out what state it's in and
   * what the display should look like
   */
  completeProgress() {
    if (this.state.checked) {
      this.setState({
        checked: false,
        bgColor: this.props.backgroundColor,
      })
      if (this.props.onUncheck) {
        this.props.onUncheck()
      }
    } else {
      this.setState({
        checked: true,
        bgColor: this.props.color,
      })
      if (this.props.onCheck) {
        this.props.onCheck()
      }
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
    let iconName = this.props.iconOpen
    if (this.state.checked) {
      iconName = this.props.iconCheck
    }
    if (this.props.disabled) {
      iconName = this.props.checked ? this.props.iconCheck : this.props.iconOpen
      return (
        <View style={this.props.style}>
          <TouchableWithoutFeedback>
            <View style={{
              flexDirection: 'row',
              flex: 1,
            }}>
              <Icon
                  name={iconName}
                  size={20}
              />
              <Text> {this.props.text}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        )
    } else {
      return (
          <View style={this.props.style}>
            <TouchableHighlight
                onPress={this.completeProgress}
            >
              <View style={{
                flexDirection: 'row',
                flex: 1,
              }}>
                <Icon
                    name={iconName}
                    size={20}
                />
                <Text> {this.props.text}</Text>
              </View>
            </TouchableHighlight>
          </View>
        )
    }
  }
}

export default ItemCheckbox
