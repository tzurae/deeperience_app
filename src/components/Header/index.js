'use strict'

import React, { PropTypes } from 'react'
import
{
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'

class Header extends React.Component {

  static propTypes = {
    headerText: PropTypes.string,
    back: PropTypes.bool,
  }
  static defaultProps = {
    back: true,
  }
  render() {
    return (
      <View style={styles.container}>
        {
          (() => {
            if (this.props.back) {
              return (
                <TouchableHighlight
                  style={styles.backIcon}
                  onPress={() => this.props.onReturn()}
                >
                  <Icon
                    name={"chevron-left"}
                    size={30}
                    color={"white"}
                  />
                </TouchableHighlight>
              )
            }
          })()
        }
        <Text style={styles.textStyle}>{this.props.headerText}</Text>
      </View>
    )
  }
}

export default Header
