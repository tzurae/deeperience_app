/**
 * # Custom.js
 *
 *  The container to custom post
 *
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as mainActions from '../../reducers/main/mainActions'
import { Map } from 'immutable'
import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import I18n from '../../lib/i18n'
import styles from './styles'
import TouchableIcon from '../../components/TouchableIcon'
import * as Animatable from 'react-native-animatable'
import MultiSlider from 'react-native-multi-slider'
import { width } from '../../lib/dimensions'

const {
  RESIDENT_FEE,
  ALL_FEE,
} = require('../../lib/constants').default

const actions = [
  mainActions,
]

function mapStateToProps(state) {
  return {
    device: state.device,
    main: state.main,
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

class Custom extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignSelf: 'stretch' }}>
          <TouchableIcon
            onPress={() => {}}
            name="user"
            color="black"
            size={25}
          />
        </View>
        <ScrollView>
          <View style={styles.customView}>
            <View style={styles.option}>
              <Text style={styles.optionText}>
                {`旅館預算 (NT)   ${this.props.main.residentFee[0]} - ${this.props.main.residentFee[1]}`}
              </Text>
              <MultiSlider
                values={[2500, 7500]}
                min={0}
                max={10000}
                step={500}
                onValuesChange={valuesArray => this.props.actions.setFeeWrapper(RESIDENT_FEE, valuesArray)}
                sliderLength={this.props.device.platform === 'ios' ? width - 80 : width - 60}
                trackStyle={styles.trackStyle}
                selectedStyle={styles.selectedTrackStyle}
                unselectedStyle={styles.unselectedTrackStyle}
                markerStyle={styles.markerStyle}
                pressedMarkerStyle={styles.pressedMarkerStyle}
                style={styles.slider}
              />
            </View>
            <View style={styles.option}>
              <Text style={styles.optionText}>旅館預算 (NT)</Text>
            </View>
            <View style={styles.option}>
              <Text style={styles.optionText}>旅館預算 (NT)</Text>
              <MultiSlider/>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Custom)
