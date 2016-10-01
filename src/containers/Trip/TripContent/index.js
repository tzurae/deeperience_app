/**
 * # app.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 *
 *
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import * as tripActions from '../../../reducers/trip/tripActions'
import React from 'react'
import { ScrollView } from 'react-native'
import I18n from '../../../lib/i18n'
import TabBar from '../../../components/TabBar'
import TripContentRoute from '../TripContentRoute'

import Dimensions from 'Dimensions'
const { width } = Dimensions.get('window') // Screen dimensions in current orientation

const actions = [
  tripActions,
]

/**
 *  Save that state
 */
function mapStateToProps(state) {
  return {
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

class TripContent extends React.Component {

  constructor(props) {
    super(props)
    this.props.actions.getTripContentById('-KRU7JacRSqhywPrZ2sR')
  }

  render() {
    return (
      <TabBar>
        <ScrollView
          horizontal={false}
          width={width}
          tabLabel={I18n.t('TripTab.Introduction')}
        >
          <TripContentRoute></TripContentRoute>
        </ScrollView>

        <ScrollView
          horizontal={false}
          width={width}
          tabLabel={I18n.t('TripTab.Route')}
        >
        </ScrollView>

        <ScrollView
          horizontal={false}
          width={width}
          tabLabel={I18n.t('TripTab.Comment')}
        >
        </ScrollView>

        <ScrollView
          horizontal={false}
          width={width}
          tabLabel={I18n.t('TripTab.Guide')}
        >
        </ScrollView>
      </TabBar>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TripContent)
