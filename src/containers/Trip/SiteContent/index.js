/**
 * # SiteContent.js
 *  Display siteContent and map
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import * as tripActions from '../../../reducers/trip/tripActions'
import React from 'react'
import { View, Text, ScrollView, BackAndroid } from 'react-native'
import Header from '../../../components/Header'
import styles from './styles'
import { Actions } from 'react-native-router-flux'
import HTMLContent from '../../../components/HTMLContent'
import MapContainer from '../../../components/Trip/MapContainer'
import { width } from '../../../lib/dimensions'
import I18n from '../../../lib/i18n'
import TabBar from '../../../components/TabBar'

const actions = [
  tripActions,
]

function mapStateToProps(state) {
  return {
    trip: {
      name: state.trip.tripContent.name,
      guideId: state.trip.tripContent.guideId,
      tripInfo: state.trip.tripContent.tripInfo,
      headerText: state.trip.mapInfo.headerText,
      mainTitle: state.trip.mapInfo.mainTitle,
      subTitle: state.trip.mapInfo.subTitle,
      content: state.trip.mapInfo.content,
      pos: state.trip.mapInfo.pos,
      heading: state.trip.mapInfo.heading,
      markers: state.trip.mapInfo.markers,
      polyline: state.trip.mapInfo.polyline,
      distance: state.trip.mapInfo.distance,
      address: state.trip.mapInfo.address,
      displayDay: state.trip.displayInfo.displayDay,
      displayWhich: state.trip.displayInfo.displayWhich,
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

class SiteContent extends React.Component {

  componentWillMount() {
    BackAndroid.removeEventListener('hardwareBackPress', () => this.onReturn())
    const dispatchSite = this.props.trip.tripInfo[this.props.trip.displayDay]
      .sites[this.props.trip.displayWhich]
    this.props.actions.setMapInfo(dispatchSite)
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => this.onReturn())
  }

  onReturn() {
  }

  onMarkerPress({ name, introduction, position }) {
    try {
      this.props.actions.setMapDirection({ name, introduction, position })
    } catch (err) {
      this.props.actions.pressMarkerFailure(err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={this.props.trip.headerText}
          onReturn = {() => {
            this.onReturn()
            Actions.pop()
          }}
        />
        <TabBar>
          <View
            horizontal={false}
            width={width}
            tabLabel={I18n.t('SiteContent.mapBtn')}
          >
            <MapContainer
              lat={this.props.trip.pos.lat}
              lng={this.props.trip.pos.lng}
              markers={this.props.trip.markers}
              polyline={this.props.trip.polyline}
              onMarkerPress={(marker) => this.onMarkerPress(marker)}
            />
          </View>
          <View style={styles.siteContentContainer}
                width={width}
                tabLabel={I18n.t('TripTab.route')}
          >
            <Text style={styles.subTitle}>{this.props.trip.subTitle}</Text>
            <Text style={styles.distance}>{this.props.trip.distance}</Text>
            <ScrollView>
              <HTMLContent
                value={this.props.trip.content}
                width={width - 30}
              />
            </ScrollView>
          </View>
        </TabBar>
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SiteContent)
