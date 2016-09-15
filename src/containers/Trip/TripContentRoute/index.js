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

import { View } from 'react-native'

import styles from './styles'

// import Dimensions from 'Dimensions'
// const { width } = Dimensions.get('window') // Screen dimensions in current orientation

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
      startSite: state.trip.tripContent.startSite,
      allSites: state.trip.tripContent.allSites,
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
      <View style={styles.container}/>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TripContentRoute)
