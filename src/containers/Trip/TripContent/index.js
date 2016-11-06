/**
 * # TripContent.js
 * Display tripContent
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import * as tripActions from '../../../reducers/trip/tripActions'
import React from 'react'
import { ScrollView, View } from 'react-native'
import I18n from '../../../lib/i18n'
import TabBar from '../../../components/TabBar'
import Header from '../../../components/Header'
import TripContentRoute from '../TripContentRoute'
import styles from './styles'
import { Actions } from 'react-native-router-flux'
import { width } from '../../../lib/dimensions'

const actions = [
  tripActions,
]

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

class TripContent extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={I18n.t('Nav.tripContent')}
          onReturn={() => {
            this.props.actions.closeDisplayInfo()
            this.props.actions.deactivateSiteBtn()
            Actions.pop()
          }}
        />
        <TabBar>
          <View
            horizontal={false}
            width={width}
            tabLabel={I18n.t('TripTab.introduction')}
          >
            <TripContentRoute/>
          </View>

          <ScrollView
            horizontal={false}
            width={width}
            tabLabel={I18n.t('TripTab.route')}
          />

          <ScrollView
            horizontal={false}
            width={width}
            tabLabel={I18n.t('TripTab.comment')}
          />

          <ScrollView
            horizontal={false}
            width={width}
            tabLabel={I18n.t('TripTab.guide')}
          />
        </TabBar>
      </View>
    )
  }
}
export default connect(null, mapDispatchToProps)(TripContent)
