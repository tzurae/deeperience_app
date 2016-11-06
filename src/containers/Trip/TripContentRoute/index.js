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
import { View, ScrollView, Image, BackAndroid } from 'react-native'
import styles from './styles'
import MainStyle from '../../../styles'
import Svg, { Line, Rect } from 'react-native-svg'
import SiteButton from '../../../components/Trip/SiteButton'
import { Actions } from 'react-native-router-flux'
import Loading from '../../../components/Loading'
import I18n from '../../../lib/i18n'
import { setSiteStatusStorage } from '../../../reducers/trip/tripHelper'
import MenuDrawer from '../../../components/Trip/MenuDrawer'
import IconSidebar from '../../../components/Trip/IconSidebar'
import DisplayInfo from '../../../components/Trip/DisplayInfo'

import Dimensions from 'Dimensions'
const { width, height } = Dimensions.get('window') // Screen dimensions in current orientation

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
        steps: state.trip.displayInfo.transit.steps,
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
    BackAndroid.removeEventListener('hardwareBackPress', () => this.onReturn())
    const tripContent =
      this.props.trip.tripContent
        .filter(trip => trip._id === this.props.trip.tripKey)[0]
    this.props.actions.setTripContent(tripContent)
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
      this.props.actions.switchDisplayInfoCard(1)
      if (this.props.trip.transit.fetched === false) {
        this.props.actions.getDisplayInfoDirectionStart({
          mode: 0, // transit
          position: this.props.trip.tripInfo[this.props.trip.displayDay]
            .sites[this.props.trip.displayWhich]
            .content.mapSite[0].position,
        })
      }
    }
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

  siteBtnClick(status, name, introduction, day, order) {
    if (status === 0) return
    this.props.actions.setDisplayInfo({ title: name, introduction })
    this.props.actions.deactivateSiteBtn()
    this.props.actions.activateSiteBtn({ day, order })
    this.props.actions.switchDisplayInfoCard(0)
    if (this.props.trip.sidebarDisplayMode) {
      this.props.actions.toggleSidebar(0)
    }
  }

  render() {
    const { btnBigRadius } = MainStyle.TripSiteButton
    return (
      <View style={[
        styles.container,
        { height: this.props.device.platform === 'ios' ? height - 80 : height - 105, width }]}>
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
                  status = {this.props.trip.siteStatus[dIndex][siteOrder]}
                  onPress = {() =>
                    this.siteBtnClick(
                      this.props.trip.siteStatus[dIndex][siteOrder],
                      site.content.name,
                      site.content.introduction,
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
        ))
        }
        {
          this.props.trip.displayInfoOrNot ? (
            <View style={[
              styles.container,
              styles.displayInfo,
              this.props.trip.displayInfoMode ?
              (this.props.device.platform === 'ios' ?
                { height: height - 80, width } :
                { height: height - 100, width }) :
              { height: 200, width },
            ]}>
              <DisplayInfo
                isFetching={this.props.trip.transit.isFetching}
                whichCard={this.props.trip.displayWhichCard}
                title={this.props.trip.displayInfoTitle}
                introduction={this.props.trip.displayInfoIntroduction}
                steps={this.props.trip.transit.steps}
              />
              <IconSidebar
                displayInfoMode={this.props.trip.displayInfoMode}
                closeFunc={() => {
                  this.props.actions.closeDisplayInfo()
                  this.props.actions.deactivateSiteBtn()
                }}
                openMenuFunc={() => this.props.actions.toggleSidebar()}
                closeExpandFunc={() => this.props.actions.toggleDisplayInfo()}
              />
              <MenuDrawer
                whichCard={this.props.trip.displayWhichCard}
                status={this.props.trip.siteStatus[this.props.trip.displayDay][this.props.trip.displayWhich]}
                sidebarDisplayMode={this.props.trip.sidebarDisplayMode}
                displayInfoMode={this.props.trip.displayInfoMode}
                closeFunc={() => this.props.actions.toggleSidebar()}
                introductionFunc={() => {
                  this.switchDisplayInfoTab(0)
                  this.props.actions.toggleSidebar()
                }}
                guideFunc={() => {
                  Actions.SiteContent()
                  this.props.actions.toggleSidebar()
                }}
                transportationFunc={() => {
                  this.switchDisplayInfoTab(1)
                  this.props.actions.toggleSidebar()
                }}
                doneFunc={() => {
                  this.setFrontier()
                  this.props.actions.toggleSidebar()
                }}
                unlockFunc={() => {
                  this.unlock()
                  this.props.actions.toggleSidebar()
                }}
                closeExpandFunc={() => {
                  this.props.actions.toggleSidebar()
                  this.props.actions.toggleDisplayInfo()
                }}
              />
            </View>

          ) : null
        }
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripContentRoute)
