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
import { View, ScrollView, Text, Platform, Image } from 'react-native'
import styles from './styles'
import MainStyle, { HTMLStyle } from '../../../styles'
import HTMLRender from 'react-native-html-render'
import Svg, { Line, Rect } from 'react-native-svg'
import SiteButton from '../../../components/Trip/SiteButton'
import { Actions } from 'react-native-router-flux'
import TouchableIcon from '../../../components/TouchableIcon'
import Loading from '../../../components/Loading'
import I18n from '../../../lib/i18n'
import { setSiteStatusStorage } from '../../../reducers/trip/tripHelper'

import Dimensions from 'Dimensions'
const { width, height } = Dimensions.get('window') // Screen dimensions in current orientation

const actions = [
  tripActions,
]

function mapStateToProps(state) {
  return {
    trip: {
      tripKey: state.trip.tripContent.tripKey,
      name: state.trip.tripContent.name,
      guideId: state.trip.tripContent.guideId,
      startSites: state.trip.tripContent.startSites,
      tripInfo: state.trip.tripContent.tripInfo,
      siteStatus: state.trip.tripContent.siteStatus,
      isFetching: state.trip.tripContent.isFetching,
      displayDay: state.trip.displayInfo.displayDay,
      displayWhich: state.trip.displayInfo.displayWhich,
      displayWhichCard: state.trip.displayInfo.displayWhichCard,
      displayInfoOrNot: state.trip.displayInfo.display,
      displayInfoTitle: state.trip.displayInfo.displayInfoTitle,
      displayInfoIntroduction: state.trip.displayInfo.displayInfoIntroduction,
      displayInfoMode: state.trip.displayInfo.displayMode,
      sidebarDisplayMode: state.trip.displayInfo.sidebarDisplayMode,
      mapInfo: {
        isFetching: state.trip.mapInfo.isFetching,
      },
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

  componentWillMount() {
    this.props.actions.getTripContentById(this.props.trip.tripKey)
    // must delete
    setSiteStatusStorage(this.props.trip.tripKey, [[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
  }

  goToMap() {
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

  unlock() {
    const status = []

    this.props.trip.siteStatus.forEach(site => { // deep copy status
      status.push(site)
    })

    status[this.props.trip.displayDay][this.props.trip.displayWhich] = 3
    status[this.props.trip.displayDay] = status[this.props.trip.displayDay].map(site => {
      return site === 5 ? 0 : site
    })
    setSiteStatusStorage(this.props.trip.tripKey, status).then(() => { // store local first, then dispatch siteStatus
      status[this.props.trip.displayDay][this.props.trip.displayWhich] = 4
      this.props.dispatch(this.props.actions.setSiteStatus(status))
    })
  }

  setFrontier() {
    const status = []
    const routes = this.props.trip.tripInfo[this.props.trip.displayDay].routes
    const sites = this.props.trip.tripInfo[this.props.trip.displayDay].sites
    const frontier = []

    this.props.trip.siteStatus.forEach(site => { // deep copy status
      status.push(site)
    })
    let which
    this.props.trip.siteStatus[this.props.trip.displayDay].some((site, index) => {
      if (site === 4) {
        which = index
        return true
      }
      return false
    })
    if (which === undefined) return // no pioneer

    const { day, hour, minute, siteId } = sites[which]
    routes.forEach(route => { // find route and next Site
      if (route.from === siteId &&
        route.depart.day === day &&
        route.depart.hour === hour &&
        route.depart.minute === minute) {
        sites.forEach((site, index) => {
          if (route.to === site.siteId &&
            route.nextStopDepart.day === site.day &&
            route.nextStopDepart.hour === site.hour &&
            route.nextStopDepart.minute === site.minute) {
            frontier.push(index)
          }
        })
      }
    })
    if (frontier.length === 1) status[this.props.trip.displayDay][frontier[0]] = 3
    else {
      frontier.forEach((index) => {
        status[this.props.trip.displayDay][index] = 5
      })
    }

    status[this.props.trip.displayDay][this.props.trip.displayWhich] = 1
    this.props.dispatch(this.props.actions.setSiteStatus(status))
    this.props.dispatch(this.props.actions.closeDisplayInfo())

    setSiteStatusStorage(this.props.trip.tripKey, status)
  }

  render() {
    const { btnBigRadius } = MainStyle.TripSiteButton
    return (
      <View style={[
        styles.container,
        { height: Platform.OS === 'ios' ? height - 80 : height - 105, width }]}>
        <Loading
          visible={this.props.trip.isFetching || this.props.trip.mapInfo.isFetching}
          text={I18n.t('TripContent.fetchingData')}
        />
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/deeperience.appspot.com/o/images%2FtripBackground%2F25289242242_4ab3f6ef19_b.jpg?alt=media&token=23152136-5a4a-49c9-ab29-90f8109af481' }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: -1,
            opacity: 0.5,
            width,
          }}
          resizeMode="cover"
        />
        {this.props.trip.tripInfo.map((dailyTrip, dIndex) => (
          <ScrollView
            tabLabel={`DAY ${dIndex + 1}`}
            horizontal={false}
            key={`TripDay${dIndex}`}
          >
            <Svg
              height={dailyTrip.ylayer.length * 100 + 250} // the extra 250 is to make the ScrollView even higher
              width={width}
            >
              <Rect
                x="20"
                y="20"
                height={dailyTrip.ylayer.length * 100 + 10}
                width={width - 40}
                fill="rgba(0,0,0,0.55)"
              />
              {
                dailyTrip.routes.map(route => (
                  <Line
                    x1={(route.posFrom.xpos + 1) / (dailyTrip.ylayer[route.posFrom.ypos] + 1) * width}
                    y1={route.posFrom.ypos * 100 + 50 + btnBigRadius}
                    x2={(route.posTo.xpos + 1) / (dailyTrip.ylayer[route.posTo.ypos] + 1) * width}
                    y2={route.posTo.ypos * 100 + 50 + btnBigRadius}
                    stroke="#999"
                    strokeWidth="2"
                    key = {`(${route.posFrom.xpos},${route.posFrom.ypos})-(${route.posTo.xpos},${route.posTo.ypos})`}
                  />
                ))
              }
            </Svg>
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
          </ScrollView>
        ))
        }
        {
          (() => {
            if (this.props.trip.displayInfoOrNot) {
              return (
                <View style={[
                  styles.container,
                  styles.displayInfo,
                  this.props.trip.displayInfoMode ?
                  (Platform.OS === 'ios' ?
                    { height: height - 80, width } :
                    { height: height - 100, width }) :
                  { height: 200, width },
                ]}>
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
                                <HTMLRender
                                  stylesheet={HTMLStyle}
                                  value={this.props.trip.displayInfoIntroduction}
                                />
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
                                          key={`route_${step.polyline.points}`}
                                        >
                                          <Text style={styles.transitListNumber}>
                                            {`${index + 1}.`}
                                          </Text>
                                          <Text style={[{ flex: 3 }, styles.walkInstruction]}>
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
                                              <Text
                                                numberOfLines={1}
                                                style={styles.transitInstruction}
                                              >
                                                {`${shortName} ${vehicle}`}
                                              </Text>
                                              <Text style={styles.transitTimeInterval}>
                                                {`${departureTime}~${arrivalTime}`}
                                              </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                              <Text
                                                numberOfLines={1}
                                                style={styles.transitInstruction}
                                              >
                                                {`${departureStop}`}
                                              </Text>
                                              <Text style={styles.transitDuration}>
                                                {step.duration.text}
                                              </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                              <Text
                                                numberOfLines={1}
                                                style={styles.transitInstruction}
                                              >
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
                  <View style={styles.iconContainerFix}>
                    <TouchableIcon
                      style={styles.sideIcon2}
                      onPress={() => {
                        this.props.dispatch(this.props.actions.closeDisplayInfo())
                        this.props.dispatch(this.props.actions.deactivateSiteBtn())
                      }}
                      name="close"
                      size={25}
                      color="#999"
                      underlayColor="white"
                    />
                    <TouchableIcon
                      style={styles.sideIcon2}
                      onPress={() => this.props.actions.toggleSidebarWrapper()}
                      name="angle-double-left"
                      size={25}
                      color="#999"
                    />
                    <TouchableIcon
                      style={styles.sideIcon2}
                      onPress={() => this.props.actions.toggleDisplayInfoWrapper()}
                      name={this.props.trip.displayInfoMode ? 'angle-double-down' : 'angle-double-up'}
                      size={25}
                      color="#999"
                    />
                  </View>
                  <View style={[
                    styles.iconContainer,
                    this.props.trip.sidebarDisplayMode ? { right: 0 } : { right: -175 },
                    this.props.trip.displayInfoMode ?
                    { width: 60, justifyContent: 'center' } :
                    {},
                  ]}>
                    <TouchableIcon
                      style={styles.sideIcon}
                      textStyle={styles.sideIconText}
                      onPress={() => this.props.actions.toggleSidebarWrapper()}
                      name="angle-double-right"
                      size={20}
                      color="white"
                      activeColor="#FF8000"
                    >{I18n.t('IconSidebar.close')}</TouchableIcon>
                    <TouchableIcon
                      style={styles.sideIcon}
                      textStyle={styles.sideIconText}
                      onPress={() => {
                        this.switchDisplayInfoTab(0)
                        this.props.actions.toggleSidebarWrapper()
                      }}
                      name="info"
                      size={20}
                      color="white"
                      activeColor="#FF8000"
                      active={this.props.trip.displayWhichCard === 0}
                    >{I18n.t('IconSidebar.introduction')}</TouchableIcon>
                    {(() => {
                      if (this.props.trip.siteStatus[this.props.trip.displayDay][this.props.trip.displayWhich] !== 6) {
                        return (
                          <TouchableIcon
                            style={styles.sideIcon}
                            textStyle={styles.sideIconText}
                            onPress={() => {
                              this.goToMap()
                              this.props.actions.toggleSidebarWrapper()
                            }}
                            name="map-o"
                            size={20}
                            color="white"
                            activeColor="#FF8000"
                          >{I18n.t('IconSidebar.guide')}</TouchableIcon>
                        )
                      }
                    })()}
                    {(() => {
                      if (this.props.trip.siteStatus[this.props.trip.displayDay][this.props.trip.displayWhich] !== 6) {
                        return (
                          <TouchableIcon
                            style={styles.sideIcon}
                            textStyle={styles.sideIconText}
                            onPress={() => {
                              this.switchDisplayInfoTab(1)
                              this.props.actions.toggleSidebarWrapper()
                            }}
                            name="subway"
                            size={20}
                            color="white"
                            activeColor="#FF8000"
                            active={this.props.trip.displayWhichCard === 1}
                          >{I18n.t('IconSidebar.transportation')}</TouchableIcon>
                        )
                      }
                    })()}
                    {(() => {
                      if (this.props.trip.siteStatus[this.props.trip.displayDay][this.props.trip.displayWhich] === 4) {
                        return (
                          <TouchableIcon
                            style={styles.sideIcon}
                            textStyle={styles.sideIconText}
                            onPress={() => {
                              this.setFrontier()
                              this.props.actions.toggleSidebarWrapper()
                            }}
                            name="check"
                            size={20}
                            color="white"
                            activeColor="#FF8000"
                          >{I18n.t('IconSidebar.done')}</TouchableIcon>
                        )
                      }
                    })()}
                    {(() => {
                      if (this.props.trip.siteStatus[this.props.trip.displayDay][this.props.trip.displayWhich] === 6) {
                        return (
                          <TouchableIcon
                            style={styles.sideIcon}
                            textStyle={styles.sideIconText}
                            onPress={() => {
                              this.unlock()
                              this.props.actions.toggleSidebarWrapper()
                            }}
                            name="unlock"
                            size={20}
                            color="white"
                            activeColor="#FF8000"
                          >{I18n.t('IconSidebar.unlock')}</TouchableIcon>
                        )
                      }
                    })()}
                    <TouchableIcon
                      style={styles.sideIcon}
                      textStyle={styles.sideIconText}
                      onPress={() => {
                        this.props.actions.toggleSidebarWrapper()
                        this.props.actions.toggleDisplayInfoWrapper()
                      }}
                      name={this.props.trip.displayInfoMode ? 'angle-double-down' : 'angle-double-up'}
                      size={20}
                      color="white"
                      activeColor="#FF8000"
                    >
                      {this.props.trip.displayInfoMode ? I18n.t('IconSidebar.closeDown') : I18n.t('IconSidebar.openUp')}
                    </TouchableIcon>
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
