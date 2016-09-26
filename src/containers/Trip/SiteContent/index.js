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
import { View, Text } from 'react-native'
import Header from '../../../components/Header'
import styles from './styles'
import MapView from 'react-native-maps'
import { Actions } from 'react-native-router-flux'
import { convertSecondToTime } from '../../../reducers/trip/tripHelper'
import { Player } from 'react-native-audio-toolkit'
import Slider from 'react-native-slider'
import TouchableIcon from '../../../components/TouchableIcon'
import MainStyle from '../../../styles'

import Dimensions from 'Dimensions'
const { width } = Dimensions.get('window') // Screen dimensions in current orientation

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
      audioDuration: state.trip.mapInfo.audioDuration,
      distance: state.trip.mapInfo.distance,
      address: state.trip.mapInfo.address,
      audioPosition: state.trip.mapInfo.audioPosition,
      audioURL: state.trip.mapInfo.audioURL,
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

  constructor(props) {
    super(props)
    this.prepareAudio().then(res => {
      this.props.actions.setAudioWrapper(res)
    }).then(() => this.props.actions.setMapInfoSuccessWrapper())
      .catch(err => this.props.actions.setMapInfoFailureWrapper(err))
  }

  prepareAudio() {
    return new Promise((resolve, reject) => {
      this.audioPlayer = new Player(this.props.trip.audioURL, { autoDestroy: false })
      this.timerId = null
      this.audioPlayer.on('ended', () => {
        clearInterval(this.timerId)
        this.props.actions.setAudioWrapper({ audioPosition: 0 })
      })
      this.audioPlayer.prepare(err => {
        if (err === null) resolve({ audioDuration: this.audioPlayer.duration })
        else reject(err)
      })
    })
  }

  onMarkerPress({ name, introduction, address, audioURL }) {
    new Promise((resolve) => {
      this.props.actions.getMapInfoDirection({ name, introduction, address })
      resolve()
    }).then(() => new Promise((resolve) => {
      this.props.actions.setAudioWrapper({
        audioURL,
        audioPosition: 0,
      })
      resolve()
    }))
      .then(() => this.prepareAudio())
      .then((res) => {
        this.props.actions.setAudioWrapper(res)
      }).catch(err => this.props.actions.pressMarkerFailureWrapper(err))
  }

  onPausePress() {
    this.audioPlayer.pause((success) => {
      if (success === null) clearInterval(this.timerId)
    })
  }

  onPlayPress() {
    this.audioPlayer.play((success) => {
      clearInterval(this.timerId)
      this.timerId = setInterval(() => {
        this.props.actions.setAudioWrapper({ audioPosition: this.audioPlayer.currentTime })
      }, 250)
    })
  }

  audioPlay(percent) {
    this.audioPlayer.seek(percent * this.props.trip.audioDuration, () => {
      this.onPlayPress()
    })
  }

  onReturn() {
    clearInterval(this.timerId)
    this.audioPlayer.destroy((success) => {
      Actions.pop()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={this.props.trip.headerText}
          onReturn = {() => this.onReturn()}
        />
        <View style={styles.titleContainer}>
          <View style={{ height: 50, flex: 1, padding: 5, justifyContent: 'center' }}>
            <Text style={styles.mainTitle}>{this.props.trip.mainTitle}</Text>
            <TouchableIcon
              style={[styles.audioButton, {
                position: 'absolute',
                top: 10,
                right: 35,
              }]}
              onPress={() => this.onPlayPress()}
              name={'play'}
              size={16}
              color={'white'}
            />
            <TouchableIcon
              style={[styles.audioButton, {
                position: 'absolute',
                top: 10,
                right: -10,
              }]}
              onPress={() => this.onPausePress()}
              name={'pause'}
              size={16}
              color={'white'}
            />
          </View>
          <View>
            <Slider
              style={{ width: width - 120 }}
              value={this.props.trip.audioPosition / this.props.trip.audioDuration}
              onSlidingStart={() => clearInterval(this.timerId)}
              onSlidingComplete={(value) => this.audioPlay(value)}
              thumbStyle={styles.audioThumb}
              trackStyle={styles.audioTrack}
              minimumTrackTintColor={MainStyle.color.main}
            />
            <Text style={{
              position: 'absolute',
              top: 8,
              right: 0,
            }}>
              {`${convertSecondToTime(this.props.trip.audioPosition)}` +
                '/' +
                `${convertSecondToTime(this.props.trip.audioDuration)}`
              }
            </Text>
          </View>
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
