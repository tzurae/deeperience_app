'use strict'
import React, { PropTypes } from 'react'
import styles from './styles'
import I18n from '../../../lib/i18n'
import { View } from 'react-native'
import TouchableIcon from '../../TouchableIcon'

class BottomBar extends React.Component {

  static propTypes = {
    whichCard: PropTypes.number,
    status: PropTypes.number,
  }

  static defaultProps = {
    whichCard: 0,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.whichCard !== nextProps.whichCard
  }

  render() {
    return (
      <View style={[
        styles.iconContainer,
      ]}>
        <Icon
          onPress={this.props.introductionFunc}
          name="info"
          active={this.props.whichCard === 0}
        >{I18n.t('IconSidebar.introduction')}</Icon>
        {this.props.status !== 6 ? (
          <Icon
            onPress={this.props.guideFunc}
            name="map-o"
          >{I18n.t('IconSidebar.guide')}</Icon>) : null}
        {this.props.status !== 6 ? (
          <Icon
            onPress={this.props.transportationFunc}
            name="subway"
            active={this.props.whichCard === 1}
          >{I18n.t('IconSidebar.transportation')}</Icon>) : null}
        {this.props.status === 4 ? (
          <Icon
            onPress={this.props.doneFunc}
            name="check"
          >{I18n.t('IconSidebar.done')}</Icon>) : null}
        {this.props.status === 6 ? (
          <Icon
            onPress={this.props.unlockFunc}
            name="unlock"
          >{I18n.t('IconSidebar.unlock')}</Icon>) : null}
      </View>
    )
  }
}

class Icon extends React.PureComponent {

  render() {
    return (
      <TouchableIcon
        style={styles.sideIcon}
        textStyle={styles.sideIconText}
        size={16}
        color="white"
        activeColor="#FF8000"
        {...this.props}
      >
        {this.props.children}
      </TouchableIcon>
    )
  }
}

export default BottomBar
