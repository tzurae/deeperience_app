/**
 * # SiteContent.js
 *  Display siteContent
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
import TouchableIcon from '../../../components/TouchableIcon'
import HTMLContent from '../../../components/HTMLContent'
import MapContainer from '../../../components/Trip/MapContainer'
import { width } from '../../../lib/dimensions'

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
      mapDisplayMode: state.trip.mapInfo.mapDisplayMode,
      contentDisplayMode: state.trip.mapInfo.contentDisplayMode,
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
    if (this.props.trip.contentDisplayMode === true) {
      this.props.actions.toggleContentMode()
    }
  }

  onMarkerPress({ name, introduction, position }) {
    try {
      console.log(name)
      console.log(introduction)
      console.log(position)
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
        <Button />
        <MapContainer
          displayMode={this.props.trip.mapDisplayMode}
          lat={this.props.trip.pos.lat}
          lng={this.props.trip.pos.lng}
          markers={this.props.trip.markers}
          polyline={this.props.trip.polyline}
          onMarkerPress={(marker) => this.onMarkerPress(marker)}
          toggleMap={() => this.props.actions.toggleMapMode()}
        />
        <View style={[
          styles.siteContentContainer,
          this.props.trip.contentDisplayMode ?
          styles.siteContentContainerExpand : {},
        ]}>
          <Text style={styles.subTitle}>{this.props.trip.subTitle}</Text>
          <Text style={styles.distance}>{this.props.trip.distance}</Text>
          <TouchableIcon
            style={styles.expandContentIcon}
            onPress={() => this.props.actions.toggleContentMode()}
            name={this.props.trip.contentDisplayMode ? 'compress' : 'expand'}
            size={18}
            color={'black'}
          />
          <ScrollView>
            <HTMLContent
              value={this.props.trip.content}
              width={width - 30}
            />
          </ScrollView>
        </View>
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SiteContent)
