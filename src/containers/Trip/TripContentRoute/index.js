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
import { View, ScrollView, Image, BackAndroid, PanResponder } from 'react-native'
import styles from './styles'
import MainStyle from '../../../styles'
import Svg, { Line, Rect } from 'react-native-svg'
import SiteButton from '../../../components/Trip/SiteButton'
import { Actions } from 'react-native-router-flux'
import Loading from '../../../components/Loading'
import I18n from '../../../lib/i18n'
import { setSiteStatusStorage } from '../../../reducers/trip/tripHelper'
import BottomBar from '../../../components/Trip/BottomBar'
import DisplayInfo from '../../../components/Trip/DisplayInfo'
import { SingleTrip } from '../../../reducers/trip/fakeTripData'
import { width, height } from '../../../lib/dimensions'

const actions = [
  tripActions,
]

function mapStateToProps(state) {
  return {
    device: state.device,
    trip: {
      tripContent: state.trip.main.tripContent,
      tripKey: state.trip.tripContent.tripKey,
      name: state.trip.tripContent.name,
      guideId: state.trip.tripContent.guideId,
      startSite: state.trip.tripContent.startSite,
      tripInfo: state.trip.tripContent.tripInfo,
      siteStatus: state.trip.tripContent.siteStatus,
      isFetching: state.trip.tripContent.isFetching,
      displayDay: state.trip.displayInfo.displayDay,
      displayWhich: state.trip.displayInfo.displayWhich,
      displayWhichCard: state.trip.displayInfo.displayWhichCard,
      displayInfoOrNot: state.trip.displayInfo.display,
      displayInfo: state.trip.displayInfo.info,
      displayInfoMode: state.trip.displayInfo.displayMode,
      mapInfo: {
        isFetching: state.trip.mapInfo.isFetching,
      },
      transit: {
        steps: state.trip.displayInfo.transit.steps,
        fetched: state.trip.displayInfo.transit.fetched,
        isFetching: state.trip.displayInfo.transit.isFetching,
      },
      navigation: state.trip.displayInfo.navigation,
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
    BackAndroid.removeEventListener('hardwareBackPress', () => this.onReturn())
    // const tripContent =
    //   this.props.trip.tripContent
    //     .filter(trip => trip._id === this.props.trip.tripKey)[0]
    const tripContent = SingleTrip
    this.props.actions.setTripContent(tripContent)

    this.moveUp = false
    this.moveDown = true

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => {
        if (!this.props.trip.displayInfoMode &&
          this.props.trip.displayInfoOrNot &&
          gestureState.dy < -60 &&
          Math.abs(gestureState.dx) < 100 &&
          gestureState.vy < -1.2 &&
          !this.moveUp) {
          this.props.actions.toggleDisplayInfo()
          this.moveUp = true
        } else if (this.props.trip.displayInfoMode &&
          this.props.trip.displayInfoOrNot &&
          gestureState.dy > 60 &&
          Math.abs(gestureState.dx) < 100 &&
          gestureState.vy > 1.2 &&
          !this.moveDown) {
          this.props.actions.toggleDisplayInfo()
          this.moveDown = true
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (this.moveUp && this.moveDown) {
          if (this.props.trip.displayInfoMode) {
            this.moveDown = false
            this.moveUp = true
          } else {
            this.moveUp = false
            this.moveDown = true
          }
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    })
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => this.onReturn())
  }

  onReturn() {
    this.props.actions.deactivateSiteBtn()
    this.props.actions.closeDisplayInfo()
  }

  switchDisplayInfoTab(tab) {
    if (tab === 0) {
      this.props.actions.switchDisplayInfoCard(0)
    } else if (tab === 1) { // public transportation
      if (!this.props.displayInfoMode) this.props.actions.toggleDisplayInfo()
      if (!this.props.trip.transit.fetched) {
        this.props.actions.getDisplayInfoDirectionStart({
          mode: 0, // transit
          position: this.props.trip.tripInfo[this.props.trip.displayDay]
            .sites[this.props.trip.displayWhich]
            .content.mapSite[0].position,
        })
      } else {
        this.props.actions.switchDisplayInfoCard(1)
      }
    } else if (tab === 2) {
      this.props.actions.switchDisplayInfoCard(2)
    }
  }

  setFrontier() { // set frontier site of the tree
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
    this.props.actions.setSiteStatus(status)
    this.props.actions.closeDisplayInfo()

    setSiteStatusStorage(this.props.trip.tripKey, status)
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
      this.props.actions.setSiteStatus(status)
    })
  }

  siteBtnClick(status, content, day, order) {
    if (status === 0) return
    console.log(content)
    this.props.actions.setDisplayInfo(content)
    this.props.actions.deactivateSiteBtn()
    this.props.actions.activateSiteBtn({ day, order })
    this.props.actions.switchDisplayInfoCard(0)
  }

  render() {
    const { btnBigRadius } = MainStyle.TripSiteButton
    return (
      <View
        style={[
          styles.container,
          { height: this.props.device.platform === 'ios' ?
                  height - 80 : height - 105, width }]}
      >
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
                height={dailyTrip.ylayer.length * 100 + 280} // the extra 250 is to make the ScrollView even higher
                width={width}
              >
                <Rect
                  x="15"
                  y="15"
                  height={dailyTrip.ylayer.length * 100 - 5}
                  width={width - 30}
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
                    status = {this.props.trip.siteStatus[dIndex][siteOrder]}
                    onPress = {() =>
                    this.siteBtnClick(
                      this.props.trip.siteStatus[dIndex][siteOrder],
                      site.content,
                      dIndex,
                      siteOrder
                  )}
                    key = {site.siteKey}
                  >
                    {site.content.name}
                  </SiteButton>
                ))
              }
            </ScrollView>
          ))}
          {this.props.trip.displayInfoOrNot ? (
            <View style={[
              styles.container,
              styles.displayInfo,
              this.props.trip.displayInfoMode ?
              (this.props.device.platform === 'ios' ?
                { height: height - 80, width } :
                { height: height - 100, width }) :
              { height: 260, width },
            ]}
            >
              <View
                style={styles.panResponderView}
                {...this.panResponder.panHandlers}
              />
              <DisplayInfo
                isFetching={this.props.trip.transit.isFetching}
                whichCard={this.props.trip.displayWhichCard}
                title={this.props.trip.displayInfo.name}
                introduction={this.props.trip.displayInfo.introduction}
                tags={this.props.trip.displayInfo.tags}
                steps={this.props.trip.transit.steps}
                closeFunc={() => {
                  this.props.actions.closeDisplayInfo()
                  this.props.actions.deactivateSiteBtn()
                }}
                fee={this.props.trip.displayInfo.fee}
                recentActivity={this.props.trip.displayInfo.recentActivity}
                openPeriod={this.props.trip.displayInfo.openPeriod}
                polyline={this.props.trip.navigation.polyline}
                from={this.props.trip.navigation.from}
                to={this.props.trip.navigation.to}
                onMarkerPress={() => {
                  this.props.actions.setNavigation({
                    from: this.props.trip.navigation.from,
                    to: this.props.trip.navigation.to,
                    polyline: [],
                  })
                }}
              />
              <BottomBar
                whichCard={this.props.trip.displayWhichCard}
                status={this.props.trip.siteStatus[this.props.trip.displayDay][this.props.trip.displayWhich]}
                introductionFunc={() => this.switchDisplayInfoTab(0)}
                guideFunc={() => Actions.SiteContent()}
                transportationFunc={() => this.switchDisplayInfoTab(1)}
                remindFunc={() => this.switchDisplayInfoTab(2)}
                doneFunc={() => this.setFrontier()}
                unlockFunc={() => this.unlock()}
              />
            </View>
          ) : null}
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripContentRoute)
