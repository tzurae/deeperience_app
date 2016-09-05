/**
 * # FormButton.js
 *
 * Display a button that responds to onPress and is colored appropriately
 */
'use strict'
import React from 'react'
import
{
  View,
} from 'react-native'

import styles from './styles'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

class FormButton extends React.Component {
  render() {
    return (
      <View style={styles.signin}>
        <Button style={styles.button}
                textStyle={{ fontSize: 18 }}
                isDisabled={this.props.isDisabled}
                onPress={this.props.onPress}
        >
          {this.props.buttonText}
        </Button>
      </View>
    )
  }
}

export default FormButton
