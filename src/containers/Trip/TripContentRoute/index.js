/**
 * # TripContentRoute.js
 *  Display route of tripcontent
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import React from 'react'
import tripActions from '../../../reducers/trip/tripActions'
import { View } from 'react-native'
import styles from './styles'
import MainStyle from '../../../styles'
import Svg, { Line } from 'react-native-svg'
import SiteButton from '../../../components/Trip/SiteButton'

import Dimensions from 'Dimensions'
const { width, height } = Dimensions.get('window') // Screen dimensions in current orientation

const actions = [
  tripActions,
]

function mapStateToProps(state) {
  return {
    trip: {
      name: state.trip.tripContent.name,
      guideId: state.trip.tripContent.guideId,
      startSites: state.trip.tripContent.startSites,
      tripInfo: state.trip.tripContent.tripInfo,
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
    const { btnBigRadius } = MainStyle.TripSiteButton

    return (
      <View>
        {this.props.trip.tripInfo.map((dailyTrip, dIndex) => (
          <View
            style={styles.container, { height: height + 100 }}
            key = {`TripDay${dIndex}`}
          >
            {
              dailyTrip.sites.map(site => (
                <SiteButton
                  top = {site.pos.ypos * 100 + 50}
                  left = {(site.pos.xpos + 1) / (dailyTrip.ylayer[site.pos.ypos] + 1) * width - btnBigRadius}
                  siteInfo = {site}
                  key = {site.siteKey}
                >
                  {site.content.name}
                </SiteButton>
              ))
            }
          <Svg
            height={height}
            width={width}
          >
            {
              dailyTrip.routes.map(route => (
                <Line
                  x1={(route.posFrom.xpos + 1) / (dailyTrip.ylayer[route.posFrom.ypos] + 1) * width}
                  y1={route.posFrom.ypos * 100 + 50 + btnBigRadius}
                  x2={(route.posTo.xpos + 1) / (dailyTrip.ylayer[route.posTo.ypos] + 1) * width}
                  y2={route.posTo.ypos * 100 + 50 + btnBigRadius}
                  stroke={MainStyle.color.main}
                  strokeWidth="2"
                  key = {`(${route.posFrom.xpos},${route.posFrom.ypos})-(${route.posTo.xpos},${route.posTo.ypos})`}
                />
              ))
            }
          </Svg>
          </View>

        ))
        }
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripContentRoute)
