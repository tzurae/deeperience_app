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
import { Player } from 'react-native-audio-toolkit'
import TouchableIcon from '../../../components/TouchableIcon'
import HTMLContent from '../../../components/HTMLContent'
import AudioContainer from '../../../components/Trip/AudioContainer'
import MapContainer from '../../../components/Trip/MapContainer'
import Dimensions from 'Dimensions'
const { width } = Dimensions.get('window')

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

    const dispatchSite = this.props.trip.tripInfo[this.props.trip.displayDay].sites[this.props.trip.displayWhich]

    return new Promise((resolve) => {
      this.props.actions.setMapInfoWrapper(dispatchSite)
      this.props.actions.setAudioWrapper({
        audioURL: dispatchSite.content.audioURL,
        audioPosition: 0,
      })
      resolve()
    }).then(() => {
      setTimeout(() => {
        this.prepareAudio().then(res => {
          this.props.actions.setAudioWrapper(res)
        }).then(() => this.props.actions.setMapInfoSuccessWrapper())
          .catch(err => this.props.actions.setMapInfoFailureWrapper(err))
      }, 100) // because this action takes time to finish, so we must make it asynchronous
    })
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => this.onReturn())
  }

  onReturn() {
    clearInterval(this.timerId)
    if (this.props.trip.contentDisplayMode === true) {
      this.props.actions.toggleContentModeWrapper()
    }
    if (this.audioPlayer) {
      this.audioPlayer.destroy((success) => {
        this.props.actions.resetAudioWrapper()
      })
    }
  }

  prepareAudio() {
    return new Promise((resolve, reject) => {
      this.audioPlayer =
        new Player(this.props.trip.audioURL,
          { autoDestroy: false }
        ).prepare(err => {
          if (err === null) resolve({ audioDuration: this.audioPlayer.duration })
          else reject(err)
        })

      this.timerId = null
      this.audioPlayer.on('ended', () => {
        clearInterval(this.timerId)
        this.props.actions.setAudioWrapper({ audioPosition: 0 })
      })
    })
  }

  onMarkerPress({ name, introduction, position }) {
    try {
      console.log(name)
      console.log(introduction)
      console.log(position)
      this.props.actions.setMapDirection({ name, introduction, position })
    } catch (err) {
      this.props.actions.pressMarkerFailureWrapper(err)
    }
  }

  onPausePress() {
    if (this.audioPlayer) {
      this.audioPlayer.pause((success) => {
        if (success === null) clearInterval(this.timerId)
      })
    }
  }

  onPlayPress() {
    if (this.audioPlayer) {
      this.audioPlayer.play((success) => {
        clearInterval(this.timerId)
        // for ios, since the duration equals -1 in the constructor,
        // so we miust set the duration here for ios
        this.props.actions.setAudioWrapper({
          audioDuration: Math.floor(this.audioPlayer.duration),
        })
        this.timerId = setInterval(() => {
          this.props.actions.setAudioWrapper({
            audioPosition: this.audioPlayer.currentTime,
          })
        }, 250)
      })
    }
  }

  audioPlay(percent) {
    this.audioPlayer.seek(percent * this.props.trip.audioDuration, () => {
      this.onPlayPress()
    })
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
        <AudioContainer
          title={this.props.trip.mainTitle}
          position={this.props.trip.audioPosition}
          duration={this.props.trip.audioDuration}
          onPlayPress={() => this.onPlayPress()}
          onPausePress={() => this.onPausePress()}
          onSlidingStart={() => clearInterval(this.timerId)}
          onSlidingComplete={(value) => this.audioPlay(value)}
        />
        <MapContainer
          displayMode={this.props.trip.mapDisplayMode}
          lat={this.props.trip.pos.lat}
          lng={this.props.trip.pos.lng}
          markers={this.props.trip.markers}
          polyline={this.props.trip.polyline}
          onMarkerPress={(marker) => this.onMarkerPress(marker)}
          toggleMap={() => this.props.actions.toggleMapModeWrapper()}
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
            onPress={() => this.props.actions.toggleContentModeWrapper()}
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
