'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as mainActions from '../../reducers/main/mainActions'
import { Map } from 'immutable'
import React from 'react'
import styles from './styles'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'

const actions = [
  mainActions,
]

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  }
}

class LoadingApp extends React.Component {

  componentDidMount() {
    this.props.actions.loadApp()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../images/mainBackground.jpeg')}
               resizeMode={Image.resizeMode.cover}
               style={styles.backgroundImg}/>
        <Animatable.View
          style={styles.dpLogoView}
          animation="fadeInUp"
          delay={500}
          duration={1500}
          easing="ease-out"
        >
          <Image
            source={require('../../images/dpLogoTransparent.png')}
            resizeMode={Image.resizeMode.contain}
            style={styles.dpLogo}/>
          <Text style={styles.dpLogoText}>Deeperience</Text>
          <ActivityIndicator
            color="white"
            size="small"
          />
        </Animatable.View>
      </View>
    )
  }
}

export default connect(null, mapDispatchToProps)(LoadingApp)
