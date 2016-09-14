/* @flow */
import {
  Text,
  TouchableHighlight,
  Image,
} from 'react-native'
import styles from './styles'
import React, { Component, PropTypes } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

class ThumbnailPlan extends Component {
  propTypes: {
    title: PropTypes.string,
    dayInfo: PropTypes.string,
    guide: PropTypes.string,
    starNumber: PropTypes.number,
    watchNumber: PropTypes.number,
    numOfPurchase: PropTypes.number,
    cost: PropTypes.number,
    unit: PropTypes.string,
  }

  render() {
    return (
      <TouchableHighlight>
        <Image source={require('../../images/trip1.png')} style={styles.Image}>
          <Text style={styles.Title}>{this.props.title}</Text>
          <Image source={require('../../images/author.png')} style={styles.thumbnailImage} />
          <Text style={styles.dayInfo}>{this.props.dayInfo}</Text>
          <Text style={styles.guide}>{this.props.guide}</Text>
          <Icon name="star" size={10} style={styles.star} />
          <Text style={styles.starNumber}>{this.props.starNumber}</Text>
          <Icon name="eye" size={12} style={styles.watch} />
          <Text style={styles.watchNumber}>{this.props.watchNumber}</Text>
          <Icon name="shopping-cart" style={styles.shoppingCart} />
          <Text style={styles.numOfPurchase}>{this.props.numOfPurchase}</Text>
          <Text style={styles.cost}>{this.props.cost}</Text>
          <Text style={styles.unit}>{this.props.unit}</Text>
        </Image>
      </TouchableHighlight>
    )
  }
}

export default ThumbnailPlan
