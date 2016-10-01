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
        renderTabBar={() =>
        <DefaultTabBar
          activeTextColor = {MainStyle.color.main}
          underlineStyle = {styles.underline}
          tabStyle = {styles.tabStyle}
          style = {styles.tabBar}
          textStyle = {styles.text}
        />}
      >
        {this.props.children}
      </ScrollableTabView>
    )
  }
}

export default TabBar
