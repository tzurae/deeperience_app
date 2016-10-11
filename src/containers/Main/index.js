'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../reducers/auth/authActions'
import * as globalActions from '../../reducers/global/globalActions'
import * as tripActions from '../../reducers/trip/tripActions'
import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'
import React, { Component } from 'react'
import Header from '../../components/Header'
import ThumbnailPlan from '../../components/ThumbnailPlan'
import { View, ScrollView } from 'react-native'
import I18n from '../../lib/i18n'
import styles from './styles'
import TabBar from '../../components/TabBar'

const actions = [
  authActions,
  globalActions,
  tripActions,
]

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
    trip: {
      mainIsFetching: state.trip.main.isFetching,
      mainContent: state.trip.main.tripContent,
    },
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

  constructor(props) {
    super(props)
    this.props.actions.getAllTrip()
  }

  onTripPress(key) {
    this.props.actions.setTripKeyWrapper(key)
    Actions.TripContent()
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={I18n.t('Nav.planList')}
          back={false}
        />
        <TabBar>
          <ScrollView
            style={styles.innerView}
            tabLabel={I18n.t('Nav.recommendation')}
          >
            {
              this.props.trip.mainContent.map(trip => {
                return (
                  <ThumbnailPlan
                    backgroundImage={trip.backgroundPic}
                    avatar={trip.guideInfo.avatar}
                    title={trip.name}
                    dayInfo={trip.dayInfo}
                    guideName={trip.guideInfo.name}
                    starNum={trip.star}
                    seenNum={trip.seen}
                    purchaseNum={trip.purchase}
                    price={trip.price}
                    unit={'TWD'}
                    tags={trip.tags}
                    key={trip.tripKey}
                    onPress={() => this.onTripPress(trip.tripKey)}
                  />
                )
              })
            }
          </ScrollView>
          <View
            style={styles.innerView}
            tabLabel={I18n.t('Nav.purchased')}
          />
        </TabBar>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
