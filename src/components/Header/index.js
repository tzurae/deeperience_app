'use strict'

import React, { PropTypes } from 'react'
import
{
  Text,
  View,
} from 'react-native'
import styles from './styles'
import MainStyle from '../../styles'
import TouchableIcon from '../TouchableIcon'

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
        {(() => {
          if (this.props.back) {
            return (
              <TouchableIcon
                style={styles.backIcon}
                onPress={() => this.props.onReturn()}
                underlayColor={MainStyle.color.main}
                name="chevron-left"
                size={30}
                color="white"
              />
              )
          }
        })()}
        <Text style={styles.textStyle}>{this.props.headerText}</Text>
      </View>
    )
  }
}

export default Header
