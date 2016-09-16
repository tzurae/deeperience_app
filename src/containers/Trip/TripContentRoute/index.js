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
import Svg, { Line } from 'react-native-svg'

import Dimensions from 'Dimensions'
const { width, height } = Dimensions.get('window') // Screen dimensions in current orientation

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
      <View>
        <View style={styles.container, { height: height + 100 }}>
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
        <Svg
          height={height}
          width={width}
        >
          {
            this.props.trip.routes.map(day => day.dailyRoutes.map(route => (
              <Line
                x1={(route.posFrom.xpos + 1) / (day.ylayer[route.posFrom.ypos] + 1) * width}
                y1={route.posFrom.ypos * 100 + 64}
                x2={(route.posTo.xpos + 1) / (day.ylayer[route.posTo.ypos] + 1) * width}
                y2={route.posTo.ypos * 100 + 64}
                stroke="red"
                strokeWidth="2"
              />
            )))
          }
        </Svg>
        </View>
      </View>
    )
  }
}

class SiteButton extends React.Component {
  render() {
    return (
      <View style={{ position: 'absolute',
                    top: this.props.top,
                    left: this.props.left - 36,
                    width: 100,
                    height: 50,
                    alignItems: 'center' }}>
        <View style={styles.site}/>
        <View style={styles.siteShadow}/>
        <View style={styles.siteBackground}/>
        <Text style={styles.siteName}>{this.props.children}</Text>
      </View>
      )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TripContentRoute)
