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
import { View, ScrollView, Text } from 'react-native'
import styles from './styles'
import MainStyle from '../../../styles'
import Svg, { Line } from 'react-native-svg'
import SiteButton from '../../../components/Trip/SiteButton'
import TabBar from '../../../components/TabBar'
import { Actions } from 'react-native-router-flux'
import TouchableIcon from '../../../components/TouchableIcon'
import Loading from '../../../components/Loading'
import I18n from '../../../lib/i18n'

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
      displayWhich: state.trip.displayInfo.displayWhich,
      displayWhichCard: state.trip.displayInfo.displayWhichCard,
      displayInfoOrNot: state.trip.displayInfo.display,
      displayInfoTitle: state.trip.displayInfo.displayInfoTitle,
      displayInfoIntroduction: state.trip.displayInfo.displayInfoIntroduction,
      transit: {
        departureTime: state.trip.displayInfo.transit.departureTime,
        arrivalTime: state.trip.displayInfo.transit.arrivalTime,
        duration: state.trip.displayInfo.transit.duration,
        steps: state.trip.displayInfo.transit.steps,
        fare: state.trip.displayInfo.transit.fare,
        fetched: state.trip.displayInfo.transit.fetched,
        isFetching: state.trip.displayInfo.transit.isFetching,
      },
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
    this.props.dispatch(
      this.props.actions.setMapInfo(
        this.props.trip.tripInfo[this.props.trip.displayDay].sites[this.props.trip.displayWhich]
      )
    )
    Actions.SiteContent()
  }
  switchDisplayInfoTab(tab) {
    if (tab === 0) {
      this.props.dispatch(this.props.actions.switchDisplayInfoCard(0))
    } else if (tab === 1) { // public transportation
      this.props.dispatch(this.props.actions.switchDisplayInfoCard(1))
      if (this.props.trip.transit.fetched === false) {
        this.props.actions.getDisplayInfoDirection(
          0, // transit
          this.props.trip.tripInfo[this.props.trip.displayDay]
            .sites[this.props.trip.displayWhich]
            .content.mapSite[0].position
        )
      }
    }
  }
  render() {
    const { btnBigRadius } = MainStyle.TripSiteButton
    return (
      <View style={[styles.container, { height: height - 112, width }]}>
        <Loading
          visible={this.props.trip.isFetching}
          text={I18n.t('TripContent.fetchingData')}
        />
        <TabBar>
          {this.props.trip.tripInfo.map((dailyTrip, dIndex) => (
            <ScrollView
              style={{ backgroundColor: '#eaeaea' }}
              tabLabel={`DAY ${dIndex + 1}`}
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
                  <View style={styles.infoContainer}>
                    <Loading
                      visible={this.props.trip.transit.isFetching}
                      text={I18n.t('TripContent.fetchingTransitData')}
                    />
                    {
                      (() => {
                        switch (this.props.trip.displayWhichCard) {
                          case 0:
                            return (
                              <ScrollView style={styles.displayInfoCard}>
                                <Text style={styles.displayInfoTitle}>
                                  {this.props.trip.displayInfoTitle}
                                </Text>
                                <Text style={styles.displayInfoIntroduction}>
                                  {this.props.trip.displayInfoIntroduction}
                                </Text>
                              </ScrollView>
                            )
                          case 1:
                            return (
                              <ScrollView style={[styles.displayInfoCard, { paddingLeft: 0, paddingRight: 0 }]}>
                                <View style={{ paddingLeft: 15, paddingRight: 10 }}>
                                  <Text style={styles.displayInfoTitle}>
                                    大眾運輸
                                  </Text>
                                </View>
                                {(() => {
                                  if (this.props.trip.transit.steps.length === 0) {
                                    return (
                                      <View style={styles.transitWhite}>
                                        <Text style={styles.transitInstruction}>
                                          {I18n.t('TripContent.noRoute')}
                                        </Text>
                                      </View>
                                    )
                                  }
                                })()}
                                {
                                  this.props.trip.transit.steps.map((step, index) => {
                                    let styleBackground
                                    if (index % 2 === 0) styleBackground = styles.transitGray
                                    else styleBackground = styles.transitWhite
                                    if (step.travel_mode === 'WALKING') {
                                      return (
                                        <View
                                          style={styleBackground}
                                          key = {`route_${step.polyline.points}`}
                                        >
                                          <Text style={styles.transitListNumber}>
                                            {`${index + 1}.`}
                                          </Text>
                                          <Text style={[{ flex: 3 }, styles.transitInstruction]}>
                                            {`${step.html_instructions.replace(/(<([^>]+)>)/ig, '')}`}
                                          </Text>
                                          <View style={{ flex: 1 }}>
                                            <Text style={[{ flex: 1 }, styles.transitDuration]}>
                                              {step.duration.text}
                                            </Text>
                                            <Text style={[{ flex: 1 }, styles.transitDistance]}>
                                              {step.distance.text}
                                            </Text>
                                          </View>
                                        </View>
                                      )
                                    } else if (step.travel_mode === 'TRANSIT') {
                                      const shortName = step.transit_details.line.short_name
                                      const vehicle = step.transit_details.line.vehicle.name
                                      const departureStop = step.transit_details.departure_stop.name
                                      const arrivalStop = step.transit_details.arrival_stop.name
                                      const departureTime = step.transit_details.departure_time.text
                                      const arrivalTime = step.transit_details.arrival_time.text
                                      return (
                                        <View
                                          style={styleBackground}
                                          key = {`route_${step.polyline.points}`}
                                        >
                                          <Text style={styles.transitListNumber}>
                                            {`${index + 1}.`}
                                          </Text>
                                          <View style={{ width: 45 }}>
                                            <Text style={styles.transitHelpWord}>
                                              {`${I18n.t('TripContent.ride')}`}
                                            </Text>
                                            <Text style={styles.transitHelpWord}>
                                              {`${I18n.t('TripContent.from')}`}
                                            </Text>
                                            <Text style={styles.transitHelpWord}>
                                              {`${I18n.t('TripContent.to')}`}
                                            </Text>
                                          </View>
                                          <View style={{ flex: 1, flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                              <Text style={styles.transitInstruction}>
                                                {`${shortName} ${vehicle}`}
                                              </Text>
                                              <Text style={styles.transitTimeInterval}>
                                                {`${departureTime}~${arrivalTime}`}
                                              </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                              <Text style={styles.transitInstruction}>
                                                {`${departureStop}`}
                                              </Text>
                                              <Text style={styles.transitDuration}>
                                                {step.duration.text}
                                              </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                              <Text style={styles.transitInstruction}>
                                                {`${arrivalStop}`}
                                              </Text>
                                              <Text style={styles.transitDistance}>
                                                {step.distance.text}
                                              </Text>
                                            </View>
                                          </View>
                                        </View>
                                      )
                                    } else return (<Text/>)
                                  })
                                }
                              </ScrollView>
                            )
                        }
                      })()
                    }
                  </View>
                  <View style={styles.iconContainer}>
                    <TouchableIcon
                      style={styles.sideIcon}
                      onPress={() => {
                        this.props.dispatch(this.props.actions.closeDisplayInfo())
                        this.props.dispatch(this.props.actions.deactivateSiteBtn())
                      }}
                      name="close"
                      size={20}
                      color="#999"
                    />
                    <TouchableIcon
                      style={styles.sideIcon}
                      onPress={() => this.goToMap()}
                      name="map-o"
                      size={18}
                      color="#999"
                    />
                    <TouchableIcon
                      style={styles.sideIcon}
                      onPress={() => this.switchDisplayInfoTab(0)}
                      name="info"
                      size={20}
                      color="#999"
                      active={this.props.trip.displayWhichCard === 0}
                    />
                    <TouchableIcon
                      style={styles.sideIcon}
                      onPress={() => this.switchDisplayInfoTab(1)}
                      name="subway"
                      size={20}
                      color="#999"
                      active={this.props.trip.displayWhichCard === 1}
                    />
                    <TouchableIcon
                      style={styles.sideIcon}
                      onPress={() => {}}
                      name="arrows-alt"
                      size={20}
                      color="#999"
                    />
                  </View>
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
