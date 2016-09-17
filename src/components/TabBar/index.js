// https://github.com/skv-headless/react-native-scrollable-tab-view/blob/master/DefaultTabBar.js
'use strict'
import React from 'react'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import styles from './styles'
import MainStyle from '../../styles'

class TabBar extends React.Component {
  render() {
    return (
      <ScrollableTabView
        tabBarPosition = {this.props.tabBarPosition || 'top'}
        renderTabBar={() =>
        <DefaultTabBar
          activeTextColor = {this.props.activeTextColor || MainStyle.color.main}
          underlineStyle = {this.props.underline || styles.underline}
          tabStyle = {this.props.tabStyle || styles.tabStyle}
          style = {this.props.style || styles.tabBar}
          textStyle = {this.props.textStyle || styles.text}
        />}
      >
        {this.props.children}
      </ScrollableTabView>
    )
  }
}

export default TabBar
