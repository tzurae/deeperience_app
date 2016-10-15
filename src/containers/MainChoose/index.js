'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tripActions from '../../reducers/trip/tripActions'
import { Map } from 'immutable'
import React from 'react'
import styles from './styles'
import { View, Text, Image, ActivityIndicator, TouchableHighlight } from 'react-native'
import I18n from '../../lib/i18n'
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

class MainChoose extends React.Component {
  constructor(props) {
    super(props)
    this.props.actions.getAllTrip()
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../images/mainBackground.jpeg')}
               resizeMode={Image.resizeMode.cover}
               style={styles.backgroundImg}/>
        {
          this.props.trip.isFetching ? (
            <Animatable.View
              style={styles.dpLogoView}
              animation="fadeInUp"
              delay={1500}
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
          ) : (
            <Animatable.View
              style={styles.logoViewBackground}
              animation="fadeInUp"
              duration={1000}
              delay={500}
              easing="ease-out"
            >
              <TouchableHighlight
                onPress={() => { Actions.Main({ initialPage: 0 }) }}
              >
                <View
                  style={styles.logoView}
                >
                  <Image source={require('../../images/custom.png')} style={styles.logo}/>
                  <Text style={styles.logoText}>
                    {I18n.t('MainChoose.custom')}
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => { Actions.Main({ initialPage: 1 }) }}
              >
                <View
                  style={styles.logoView}
                >
                  <Image source={require('../../images/custom.png')} style={styles.logo}/>
                  <Text style={styles.logoText}>
                    {I18n.t('MainChoose.walkAround')}
                  </Text>
                </View>
              </TouchableHighlight>
            </Animatable.View>)
        }
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainChoose)
