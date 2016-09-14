'use strict'

import React, { PropTypes } from 'react'
import
{
  Text,
  View,
} from 'react-native'
import styles from './styles'
// import I18n from '../../lib/i18n'

class Header extends React.Component {

  propTypes: {
    Header_Text: PropTypes.string,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Text}>{this.props.Header_Text}</Text>
      </View>
    )
  }
}

export default Header
