/**
 * # TripContentRoute.js
 *  Display route of tripcontent
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import React from 'react'
import * as tripActions from '../../../reducers/trip/tripActions'
import { View, ScrollView, Text, TouchableHighlight } from 'react-native'
import styles from './styles'
import MainStyle from '../../../styles'
import Svg, { Line } from 'react-native-svg'
import SiteButton from '../../../components/Trip/SiteButton'
import TabBar from '../../../components/TabBar'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'react-native-button'

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
      siteStatus: state.trip.tripContent.siteStatus,
      isFetching: state.trip.isFetching,
      displayDay: state.trip.displayInfo.displayDay,
      displayInfoOrNot: state.trip.displayInfo.display,
      displayInfoTitle: state.trip.displayInfo.displayInfoTitle,
      displayInfoIntroduction: state.trip.displayInfo.displayInfoIntroduction,
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
  goToMap() {

  }
  render() {
    const { btnBigRadius } = MainStyle.TripSiteButton

    return (
      <View style={[styles.container, { height: height - 114, width }]}>
        <TabBar>
          {this.props.trip.tripInfo.map((dailyTrip, dIndex) => (
              <ScrollView
                style={{ backgroundColor: '#eaeaea' }}
                tabLabel={`第${dIndex + 1}天`}
                horizontal={false}
                key={`TripDay${dIndex}`}
              >
                {
                  dailyTrip.sites.map((site, siteOrder) => (
                    <SiteButton
                      top = {site.pos.ypos * 100 + 50}
                      left = {(site.pos.xpos + 1) / (dailyTrip.ylayer[site.pos.ypos] + 1) * width - btnBigRadius}
                      siteInfo = {site}
                      order = {siteOrder}
                      status = {this.props.trip.siteStatus[dIndex][siteOrder]}
                      key = {site.siteKey}
                    >
                      {site.content.name}
                    </SiteButton>
                  ))
                }
              <Svg
                height={dailyTrip.ylayer.length * 100 + 250} // the extra 250 is to make the ScrollView even higher
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
              </ScrollView>
          ))
          }
        </TabBar>
        {
          (() => {
            if (this.props.trip.displayInfoOrNot) {
              return (
                <View style={[styles.container, styles.displayInfo, { height: 200, width }]}>
                  <TouchableHighlight
                    style={styles.closeIcon}
                    onPress={() => {
                      this.props.dispatch(this.props.actions.closeDisplayInfo())
                      this.props.dispatch(this.props.actions.deactivateSiteBtn())
                    }}
                  >
                    <Icon
                      name="close"
                      size={20}
                      color="#999"
                    />
                  </TouchableHighlight>
                  <TabBar
                    tabBarPosition={'bottom'}
                  >
                    <View
                      tabLabel={'簡介'}
                      style={styles.displayInfoCard}
                    >
                      <Text style={styles.displayInfoTitle}>
                        {this.props.trip.displayInfoTitle}
                      </Text>
                      <Text style={styles.displayInfoIntroduction}>
                        {this.props.trip.displayInfoIntroduction}
                      </Text>
                      <Button
                        containerStyle={styles.mapBtnContainer}
                        style={styles.mapBtn}
                        onPress={() => this.goToMap()}
                      >
                        {'導  覽'}
                      </Button>
                    </View>
                    <View
                      tabLabel={'大眾運輸'}
                      style={styles.displayInfoCard}
                    >
                      <Text style={styles.displayInfoTitle}>
                        南寮漁港
                      </Text>
                      <Text style={styles.displayInfoIntroduction}>
                        這邊可以看海這邊可以看海這邊可以看海這邊可以看海這邊可以看海這邊可以看海這邊可以看海這邊可以看海這邊可以看海這邊可以看海這邊可以看海
                      </Text>
                    </View>
                  </TabBar>
                </View>
              )
            }
          })()
        }
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripContentRoute)
