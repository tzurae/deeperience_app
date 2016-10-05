'use strict'
import React, { PropTypes } from 'react'
import styles from './styles'
import I18n from '../../../lib/i18n'
import { View } from 'react-native'
import TouchableIcon from '../../TouchableIcon'

class MenuDrawer extends React.Component {

  static propTypes = {
    whichCard: PropTypes.number,
    status: PropTypes.number,
    sidebarDisplayMode: PropTypes.bool,
    displayInfoMode: PropTypes.bool,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.whichCard === nextProps.whichCard ||
            !this.props.status === nextProps.status ||
            !this.props.sidebarDisplayMode === nextProps.sidebarDisplayMode ||
            !this.props.displayInfoMode === nextProps.displayInfoMode
  }

  render() {
    return (
      <View style={[
        styles.iconContainer,
        this.props.sidebarDisplayMode ? { right: 0 } : { right: -175 },
        this.props.displayInfoMode ?
        { width: 60, justifyContent: 'center' } :
        {},
      ]}>
        <Icon
          onPress={this.props.closeFunc}
          name="angle-double-right"
        >{I18n.t('IconSidebar.close')}</Icon>
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
        <Icon
          onPress={this.props.closeExpandFunc}
          name={this.props.displayInfoMode ? 'angle-double-down' : 'angle-double-up'}
        >
          {this.props.displayInfoMode ?
            I18n.t('IconSidebar.closeDown') :
            I18n.t('IconSidebar.openUp')}</Icon>
      </View>
    )
  }
}

class Icon extends React.Component {

  render() {
    return (
      <TouchableIcon
        style={styles.sideIcon}
        textStyle={styles.sideIconText}
        size={20}
        color="white"
        activeColor="#FF8000"
        onPress={this.props.onPress}
        name={this.props.name}
        active={this.props.active}
      >
        {this.props.children}
      </TouchableIcon>
    )
  }
}

export default MenuDrawer
