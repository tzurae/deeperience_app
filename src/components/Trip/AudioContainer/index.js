'use strict'
import React, { PropTypes } from 'react'
import styles from './styles'
import { View, Text } from 'react-native'
import TouchableIcon from '../../TouchableIcon'
import { convertSecondToTime } from '../../../reducers/trip/tripHelper'
import Slider from 'react-native-slider'
import MainStyle from '../../../styles'

import Dimensions from 'Dimensions'
const { width } = Dimensions.get('window') // Screen dimensions in current orientation

class AudioContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    position: PropTypes.number,
    duration: PropTypes.number,
  }

  static defaultProps = {
    title: '',
    position: 0,
    duration: 1,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.title !== nextProps.title ||
            this.props.position !== nextProps.position ||
            this.props.duration !== nextProps.duration
  }

  render() {
    return (
      <View style={styles.titleContainer}>
        <View style={{ height: 50, flex: 1, padding: 5, justifyContent: 'center' }}>
          <Text style={styles.mainTitle}>{this.props.title}</Text>
          <TouchableIcon
            style={[styles.audioButton, {
              position: 'absolute',
              top: 10,
              right: 35,
            }]}
            onPress={this.props.onPlayPress}
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
            onPress={this.props.onPausePress}
            name={'pause'}
            size={16}
            color={'white'}
          />
        </View>
        <View>
          <Slider
            style={{ width: width - 120 }}
            value={this.props.position / this.props.duration}
            onSlidingStart={this.props.onSlidingStart}
            onSlidingComplete={this.props.onSlidingComplete}
            thumbStyle={styles.audioThumb}
            trackStyle={styles.audioTrack}
            minimumTrackTintColor={MainStyle.color.main}
          />
          <Text style={{
            position: 'absolute',
            top: 8,
            right: 0,
          }}>
            {`${convertSecondToTime(this.props.position)}` +
            '/' +
            `${convertSecondToTime(this.props.duration)}`}
          </Text>
        </View>
      </View>
    )
  }
}

export default AudioContainer
