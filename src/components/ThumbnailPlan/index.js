'use strict'
import {
  Text,
  TouchableHighlight,
  Image,
  View,
} from 'react-native'
import styles from './styles'
import React, { Component, PropTypes } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

class ThumbnailPlan extends Component {
  static propTypes = {
    title: PropTypes.string,
    dayInfo: PropTypes.string,
    guideName: PropTypes.string,
    starNum: PropTypes.number,
    watchNum: PropTypes.number,
    purchaseNum: PropTypes.number,
    price: PropTypes.number,
    unit: PropTypes.string,
    tags: PropTypes.array,
  }
  static defaultProps = {
    title: 'DeeperienceTrip',
    dayInfo: '1 Day',
    guideName: 'Deeperience',
    starNum: 0,
    watchNum: 0,
    purchaseNum: 0,
    price: 0,
    unit: 'TWD',
    tags: ['', ''],
  }

  render() {
    return (
      <TouchableHighlight>
        <View>
          <View style={styles.tripView}>
            <Image
              source={{ uri: this.props.backgroundImage }}
              style={styles.backgroundImage}
            />
            <View style={styles.titleView}>
              <Text
                numberOfLines={2}
                style={styles.titleOut}
              >
                <Text style={styles.title}>{this.props.title}</Text>
              </Text>
            </View>
            <Image
              source={{ uri: this.props.avatar }}
              style={styles.avatar}
            />
            <Text style={styles.dayInfo}>
              {this.props.dayInfo}
            </Text>
            <View style={styles.tagView}>
              <Text style={styles.tags}>
                {`${this.props.tags[0]}`}
              </Text>
              <Text style={styles.tags}>
                {`${this.props.tags[1]}`}
              </Text>
            </View>
            <Text style={styles.price}>
              {`${this.props.unit}${this.props.price}`}
            </Text>
          </View>
          <View style={styles.tripOverView}>
            <Text style={styles.guideName}>
              {this.props.guideName}
            </Text>
            <View style={styles.statView}>
              <Icon
                name="star"
                size={15}
                style={[styles.statIcon, { color: '#FFE600' }]}
              />
              <Text style={styles.statText}>
                {this.props.starNum}
              </Text>
              <Icon
                name="eye"
                size={15}
                style={[styles.statIcon, { color: '#FF00FF' }]}
              />
              <Text style={styles.statText}>
                {this.props.seenNum}
              </Text>
              <Icon
                name="shopping-cart"
                size={15}
                style={[styles.statIcon, { color: '#FF8000' }]}
              />
              <Text style={styles.statText}>
                {this.props.purchaseNum}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default ThumbnailPlan
