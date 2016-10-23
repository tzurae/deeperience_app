'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tripActions from '../../reducers/trip/tripActions'
import { Map } from 'immutable'
import React from 'react'
import styles from './styles'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Actions } from 'react-native-router-flux'

const actions = [
  tripActions,
]

function mapStateToProps(state) {
  return {
    trip: {
      isFetching: state.trip.main.isFetching,
    },
  }
}

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
    setTimeout(() => {
      Actions.Introduction()
    }, 4000)
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingApp)
