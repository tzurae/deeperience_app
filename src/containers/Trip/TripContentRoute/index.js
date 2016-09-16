/**
 * # app.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 *
 *
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import React from 'react'
import tripActions from '../../../reducers/trip/tripActions'
import { View, Text } from 'react-native'
import styles from './styles'

import Dimensions from 'Dimensions'
const { width } = Dimensions.get('window') // Screen dimensions in current orientation

const actions = [
  tripActions,
]

/**
 *  Save that state
 */
function mapStateToProps(state) {
  return {
    trip: {
      name: state.trip.tripContent.name,
      routes: state.trip.tripContent.routes,
      guideId: state.trip.tripContent.guideId,
      startSites: state.trip.tripContent.startSites,
      sitePosition: state.trip.tripContent.sitePosition,
      isFetching: state.trip.isFetching,
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

class TripContentRoute extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {
          this.props.trip.sitePosition.map(
            (day) => day.map((ylayer, yindex) => ylayer.map((site, xindex) => (
              <SiteButton
                top={yindex * 100 + 50}
                left={(xindex + 1) / (ylayer.length + 1) * width - 14}
              >
                {site.content.name}
              </SiteButton>
            ))))
        }
      </View>
    )
  }
}

class SiteButton extends React.Component {
  render() {
    return (
      <View style={{ position: 'absolute',
                    top: this.props.top,
                    left: this.props.left }}>
        <View style={styles.site}/>
        <View style={styles.siteShadow}/>
        <View style={styles.siteBackground}/>
        <Text>{this.props.children}</Text>
      </View>
      )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TripContentRoute)
