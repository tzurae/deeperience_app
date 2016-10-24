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
import { ScrollView, View, Text, Image, Platform } from 'react-native'
import I18n from '../../lib/i18n'
import styles from './styles'
import MainStyle from '../../styles'
import MultiSlider from 'react-native-multi-slider'
import { width } from '../../lib/dimensions'
import Header from '../../components/Header'
import { Actions } from 'react-native-router-flux'
import ModalPicker from 'react-native-modal-picker'
import { dayData, hotelType, tripLocation } from './options'

const {
  RESIDENT_FEE,
  TRIP_FEE,
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
      <View style={styles.outerContainer} >
        <Image
          source={require('../../images/city.jpg')}
          style={styles.backgroundImg}
        />
        <Header
          headerText={I18n.t('LoginMain.loginMain')}
          back={true}
          onReturn={() => Actions.pop()}
          rightIcon="user"
          rightIconSize={26}
          rightIconStyle={{ position: 'relative', right: 5 }}
          onPress={() => {}}
        />
        <View style={styles.container}>
          <ScrollView style={styles.customView}>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.travelDay')}</Text>
              </View>
              {getModelPicker(
                dayData,
                I18n.t('Custom.chooseDay'),
                option => this.props.actions.setDay(option.key))}
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.hotelFee')}</Text>
                <Text style={styles.optionText}>
                  {`${this.props.main.residentFee[0]} - ${this.props.main.residentFee[1]}`}
                </Text>
              </View>
              {getMultiSlider(
                [2500, 5000],
                0,
                10000,
                500,
                valuesArray => this.props.actions.setFee(RESIDENT_FEE, valuesArray))}
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.hotelType')}</Text>
              </View>
              {getModelPicker(
                hotelType,
                I18n.t('Custom.chooseHotelType'),
                option => this.props.actions.setHotelType(option.key))}
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.travelFee')}</Text>
                <Text style={styles.optionText}>
                  {`${this.props.main.tripFee[0]} - ${this.props.main.tripFee[1]}`}
                </Text>
              </View>
              {getMultiSlider(
                [2500, 5000],
                0,
                10000,
                500,
                valuesArray => this.props.actions.setFee(TRIP_FEE, valuesArray))}
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.travelAllFee')}</Text>
              </View>
              <View style={[styles.optionTextView, { justifyContent: 'center', marginBottom: 0 }]}>
                <Text style={[styles.optionText, { fontSize: MainStyle.font.large }]}>
                  {`${this.props.main.allFee[0]} - ${this.props.main.allFee[1]}`}
                </Text>
              </View>
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.tripLocation')}</Text>
              </View>
              {getModelPicker(
                tripLocation,
                I18n.t('Custom.chooseTripLocation'),
                option => this.props.actions.setTripLocation(option.key))}
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.tripElement')}</Text>
              </View>
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.otherDemand')}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

    )
  }
}

const getModelPicker = (data, initValue, onChange) => (
  <ModalPicker
    data={data}
    style={styles.modalPicker}
    selectTextStyle={styles.MPSelectTextStyle}
    overlayStyle={styles.MPOverlayStyle}
    optionStyle={styles.MPOptionStyle}
    optionTextStyle={styles.MPOptionTextStyle}
    cancelStyle={styles.MPCancelStyle}
    cancelTextStyle={styles.MPCancelTextStyle}
    sectionStyle={styles.MPSectionStyle}
    sectionTextStyle={styles.MPSectionTextStyle}
    cancelText={I18n.t('Custom.cancel')}
    initValue={initValue}
    onChange={onChange} />
)

const getMultiSlider = (values, min, max, step, onValuesChange) => (
  <MultiSlider
    values={values}
    min={min}
    max={max}
    step={step}
    onValuesChange={onValuesChange}
    sliderLength={Platform.OS === 'ios' ? width - 80 : width - 60}
    trackStyle={styles.trackStyle}
    selectedStyle={styles.selectedTrackStyle}
    unselectedStyle={styles.unselectedTrackStyle}
    markerStyle={styles.markerStyle}
    pressedMarkerStyle={styles.pressedMarkerStyle}
    style={styles.slider}
  />
)

export default connect(mapStateToProps, mapDispatchToProps)(Custom)
