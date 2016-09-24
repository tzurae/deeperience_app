// https://github.com/skv-headless/react-native-scrollable-tab-view/blob/master/DefaultTabBar.js
'use strict'
import React, { PropTypes } from 'react'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import styles from './styles'
import MainStyle from '../../styles'
import { View, Text } from 'react-native'

class TabBar extends React.Component {
  static propTypes = {
    tabBarPosition: PropTypes.string,
    activeTextColor: PropTypes.string,
    underline: View.propTypes.style,
    tabStyle: View.propTypes.style,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
  }
  static defaultProps = {
    tabBarPosition: 'top',
    activeTextColor: MainStyle.color.main,
    underline: styles.underline,
    tabStyle: styles.tabStyle,
    style: styles.tabBar,
    textStyle: styles.text,
  }
  render() {
    return (
      <ScrollableTabView
        tabBarPosition = {this.props.tabBarPosition}
        onChangeTab={this.props.onChangeTab}
        renderTabBar={() =>
        <DefaultTabBar
          activeTextColor = {this.props.activeTextColor}
          underlineStyle = {this.props.underline}
          tabStyle = {this.props.tabStyle}
          style = {this.props.style}
          textStyle = {this.props.textStyle}
        />}
      >
        {this.props.children}
      </ScrollableTabView>
    )
  }
}

export default TabBar
