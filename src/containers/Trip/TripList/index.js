/**
 * # TripList.js
 * Display all the trip
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import * as tripActions from '../../../reducers/trip/tripActions'
import React from 'react'
import { ScrollView, View } from 'react-native'
import I18n from '../../../lib/i18n'
import styles from './styles'
import { Actions } from 'react-native-router-flux'
import Loading from '../../../components/Loading'
import ThumbnailPlan from '../../../components/ThumbnailPlan'

const actions = [
  tripActions,
]

function mapStateToProps(state) {
  return {
    trip: {
      isFetching: state.trip.main.isFetching,
      tripContent: state.trip.main.tripContent,
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

class TripList extends React.Component {

  onTripPress(key) {
    this.props.actions.setTripKey(key)
    Actions.TripContent()
  }

  componentWillMount() {
    this.props.actions.getBuyTrip()
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading
          visible={this.props.trip.isFetching}
          text={I18n.t('TripList.fetchingTripContent')}
        />
          <ScrollView
            style={styles.innerView}
            tabLabel={I18n.t('Nav.recommendation')}
          >
            {
              this.props.trip.tripContent.map(trip => {
                return (
                  <ThumbnailPlan
                    backgroundImage={trip.coverPic}
                    title={trip.name}
                    dayInfo={trip.dayInfo}
                    starNum={trip.stats.star}
                    seenNum={trip.stats.seen}
                    purchaseNum={trip.stats.purchase}
                    price={trip.price}
                    unit={'TWD'}
                    tags={trip.tags}
                    key={trip._id}
                    onPress={() => this.onTripPress(trip._id)}
                  />
                )
              })
            }
          </ScrollView>
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TripList)
