/* @flow */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../reducers/auth/authActions'
import * as globalActions from '../../reducers/global/globalActions'
import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'
import React, { Component } from 'react'
import Header from '../../components/Header'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import ThumbnailPlan from '../../components/ThumbnailPlan'
import
{
  View,
}
from 'react-native'
import I18n from '../../lib/i18n'
import styles from './styles'

/**
 * Support for Hot reload
 *
 */
const actions = [
  authActions,
  globalActions,
]

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching,
      },
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState,
    },
  }
}

/*
 * Bind all the functions from the ```actions``` and bind them with
 * ```dispatch```

 */
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

/**
 * ## App class
 */
class Main extends Component {

  state = {
    title: '城隍廟小吃大公開',
    dayInfo: '一日遊',
    guide: '邱比特',
    starNumber: 87,
    watchNumber: 87,
    numOfPurchase: 870,
    cost: 2800,
    unit: 'TWD',
  }

  handlePress() {
    Actions.Subview({
      title: 'Subview',
      // you can add additional props to be passed to Subview here...
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header Header_Text={I18n.t('Nav.planList')}/>
        <ScrollableTabView
          tabBarUnderlineStyle={{backgroundColor: '#F78B6D'}}
          tabBarActiveTextColor="#F78B6D"
        >
          <View style={styles.nav} tabLabel={I18n.t('Nav.recommendation')}>
            <ThumbnailPlan
              title = {this.state.title}
              dayInfo = {this.state.dayInfo}
              guide = {this.state.guide}
              starNumber = {this.state.starNumber}
              watchNumber = {this.state.watchNumber}
              numOfPurchase = {this.state.numOfPurchase}
              cost = {this.state.cost}
              unit = {this.state.unit}
            />
          </View>
          <View style={styles.nav} tabLabel={I18n.t('Nav.purchased')}>
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
