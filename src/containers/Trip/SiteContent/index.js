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
import { View, Text, ScrollView } from 'react-native'
import Header from '../../../components/Header'
import styles from './styles'
import { Actions } from 'react-native-router-flux'
import { Player } from 'react-native-audio-toolkit'
import TouchableIcon from '../../../components/TouchableIcon'
import { HTMLStyle } from '../../../styles'
import HTMLRender from 'react-native-html-render'
import AudioContainer from '../../../components/Trip/AudioContainer'
import MapContainer from '../../../components/Trip/MapContainer'

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
      this.props.actions.getMapInfoDirection({ name, introduction, position })
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
        this.props.actions.setAudioWrapper({ // for ios
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

  onReturn() {
    clearInterval(this.timerId)
    if (this.props.trip.contentDisplayMode === true) {
      this.props.actions.toggleContentModeWrapper()
    }
    if (this.audioPlayer) {
      this.audioPlayer.destroy((success) => {
        this.props.actions.resetAudioWrapper()
        Actions.pop()
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={this.props.trip.headerText}
          onReturn = {() => this.onReturn()}
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
            underlayColor="#ccc"
            onPress={() => this.props.actions.toggleContentModeWrapper()}
            name={this.props.trip.contentDisplayMode ? 'compress' : 'expand'}
            size={18}
            color={'black'}
          />
          <ScrollView>
            <HTMLRender
              stylesheet={HTMLStyle}
              value={this.props.trip.content}
            />
          </ScrollView>
        </View>
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SiteContent)
