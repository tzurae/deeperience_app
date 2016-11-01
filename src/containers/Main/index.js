'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../reducers/auth/authActions'
import * as globalActions from '../../reducers/global/globalActions'
import * as tripActions from '../../reducers/trip/tripActions'
import * as mainActions from '../../reducers/main/mainActions'
import * as customActions from '../../reducers/custom/customActions'
import { setFirstTimeStorage } from '../../reducers/main/mainStorage'
import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'
import React, { Component } from 'react'
import Header from '../../components/Header'
import TabBar from '../../components/TabBar'
import Setting from '../Setting'
import Custom from '../Custom'
import { View } from 'react-native'
import I18n from '../../lib/i18n'
import styles from './styles'

const actions = [
  authActions,
  globalActions,
  tripActions,
  mainActions,
  customActions,
]

function mapStateToProps(state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching,
      },
    },
    global: state.global,
    trip: {
      mainIsFetching: state.trip.main.isFetching,
      mainContent: state.trip.main.tripContent,
    },
    main: state.main,
    custom: state.custom,
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

class Main extends Component {

  onTripPress(key) {
    this.props.actions.setTripKey(key)
    Actions.TripContent()
  }

  componentWillMount() {
    if (this.props.main.firstTime) {
      this.props.actions.setFirstTime()
      setFirstTimeStorage()
    }
    if (this.props.custom.notSendYet) {
      this.props.actions.sendPost(this.props.global.currentUser._id, this.props.custom)
    }
  }

  render() {
    if (this.props.global.currentUser === null) {
      return (
        <View style={styles.container}>
          <Custom/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Header
          headerText={I18n.t('Nav.mainPage')}
          back={false}
        />
        <TabBar initialPage={this.props.initialPage}>
          <View
            style={styles.innerView}
            tabLabel={I18n.t('Nav.custom')}
          >
            <Custom/>
          </View>
          <View
            style={styles.innerView}
            tabLabel={I18n.t('Nav.purchased')}
          />
          <View
            style={styles.innerView}
            tabLabel={I18n.t('Nav.setting')}
          >
            <Setting/>
          </View>
        </TabBar>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
