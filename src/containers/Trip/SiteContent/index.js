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
import { ScrollView, View, Text, TouchableHighlight } from 'react-native'
import I18n from '../../../lib/i18n'
import Header from '../../../components/Header'
import styles from './styles'
import MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import { auth } from '../../../config'
import { convertPolyline } from '../../../reducers/trip/tripHelper'

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
      guideId: state.trip.tripContent.guideId,
      startSites: state.trip.tripContent.startSites,
      tripInfo: state.trip.tripContent.tripInfo,
      headerText: state.trip.mapInfo.headerText,
      mainTitle: state.trip.mapInfo.mainTitle,
      subTitle: state.trip.mapInfo.subTitle,
      content: state.trip.mapInfo.content,
      pos: state.trip.mapInfo.pos,
      nowPos: state.trip.mapInfo.nowPos,
      heading: state.trip.mapInfo.heading,
      markers: state.trip.mapInfo.markers,
      polyline: state.trip.mapInfo.polyline,
      audioLength: state.trip.mapInfo.audioLength,
      distance: state.trip.mapInfo.distance,
      address: state.trip.mapInfo.address,
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

  onMarkerPress({ name, introduction, address }) {
    console.log(address)
    fetch('https://maps.googleapis.com/maps/api/directions/json?' +
      `origin=${this.props.trip.nowPos.lat},${this.props.trip.nowPos.lng}` +
      `&destination=${address}` +
      '&region=tw' +
      '&mode=walking' +
      '&language=zh-TW' +
      `&key=${auth.firebase.apiKey}`)
      .then(res => res.json())
      .then(res => {
        const polyline = convertPolyline(res.routes[0].overview_polyline.points)
        this.props.dispatch(this.props.actions.setMapDirection({
          polyline,
          name,
          introduction,
          address,
        }))
      })
  }

  onPausePress() {

  }

  onPlayPress() {

  }

  onReturn() {
    Actions.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={this.props.trip.headerText}
          onReturn = {() => this.onReturn()}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>{this.props.trip.mainTitle}</Text>
          <View style={styles.audioLengthContainer}>
            <Text style={styles.audioLength}>{this.props.trip.audioLength}</Text>
          </View>
          <TouchableHighlight
            style={[styles.audioButton, {
              position: 'absolute',
              top: 16,
              right: 80,
            }]}
            onPress={() => this.onPlayPress()}
          >
            <Icon
              name={'play'}
              size={20}
              color={'white'}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.audioButton, {
              position: 'absolute',
              top: 16,
              right: 20,
            }]}
            onPress={() => this.onPausePress()}
          >
            <Icon
              name={'pause'}
              size={20}
              color={'white'}
            />
          </TouchableHighlight>
        </View>
        <View style={[styles.mapContainer, { height: 250, width }]}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.props.trip.pos.lat,
              longitude: this.props.trip.pos.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            rotateEnabled={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {this.props.trip.markers.map(marker => {
              const { lat, lng } = marker.position
              return (
                <MapView.Marker
                  coordinate={{ latitude: lat, longitude: lng }}
                  onPress={() => this.onMarkerPress(marker)}
                  title={marker.name}
                  key={marker.name}
                />
              )
            })}
            <MapView.Polyline
              coordinates = {this.props.trip.polyline}
              strokeWidth = {5}
              lineCap = {'round'}
              strokeColor = {'#00B3FD'}
              icons = {[{
                icon: {
                  path: 'M 0,-1 0,1',
                  strokeOpacity: 1,
                  scale: 4,
                },
                offset: '0',
                repeat: '20px',
              }]}
            />
          </MapView>
        </View>
        <View style={styles.siteContentContainer}>
          <Text style={styles.subTitle}>{this.props.trip.subTitle}</Text>
          <Text style={styles.content}>{this.props.trip.content}</Text>
          <Text style={styles.distance}>{this.props.trip.distance}</Text>
        </View>
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SiteContent)
