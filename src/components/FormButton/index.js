/**
 * # FormButton.js
 *
 * Display a button that responds to onPress and is colored appropriately
 */
'use strict'
import React from 'react'
import Button from 'react-native-button'
import styles from './styles'

class FormButton extends React.Component {
  render() {
    return (
      <Button style={styles.button}
              containerStyle={this.props.isDisabled ? styles.disContainer : styles.container}
              disabled={this.props.isDisabled}
              onPress={this.props.onPress}
              activeOpacity={0.7}
      >
        {this.props.buttonText}
      </Button>
    )
  }
}

export default FormButton
