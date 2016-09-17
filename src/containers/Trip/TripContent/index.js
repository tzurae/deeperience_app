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
import { ScrollView, View } from 'react-native'
import I18n from '../../../lib/i18n'
import TabBar from '../../../components/TabBar'
import Header from '../../../components/Header'
import TripContentRoute from '../TripContentRoute'
import styles from './styles'

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
      <View style={styles.container}>
        <Header Header_Text={I18n.t('Nav.tripContent')}/>
        <TabBar>
          <View
            horizontal={false}
            width={width}
            tabLabel={I18n.t('TripTab.Introduction')}
          >
            <TripContentRoute/>
          </View>

          <ScrollView
            horizontal={false}
            width={width}
            tabLabel={I18n.t('TripTab.Route')}
          />

          <ScrollView
            horizontal={false}
            width={width}
            tabLabel={I18n.t('TripTab.Comment')}
          />

          <ScrollView
            horizontal={false}
            width={width}
            tabLabel={I18n.t('TripTab.Guide')}
          />
        </TabBar>
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TripContent)
