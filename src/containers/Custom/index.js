/**
 * # Custom.js
 *  The container to custom post
 */
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as customActions from '../../reducers/custom/customActions'
import { Map } from 'immutable'
import React from 'react'
import { ScrollView, View, Text, Image, Platform, TextInput } from 'react-native'
import I18n from '../../lib/i18n'
import styles from './styles'
import MainStyle from '../../styles'
import MultiSlider from 'react-native-multi-slider'
import { width } from '../../lib/dimensions'
import Header from '../../components/Header'
import { Actions } from 'react-native-router-flux'
import ModalPicker from 'react-native-modal-picker'
import { hotelType, tripLocation, tripElement, tripAll, foodElement } from './options'
import ItemCheckbox from '../../components/ItemCheckbox'
import Button from 'react-native-button'
import { validSubmit, getFormatDate } from '../../reducers/custom/customHelper'
import SimpleAlert from 'react-native-simpledialog-android'
import Calendar from '../../components/Calendar'

const {
  RESIDENT_FEE,
  TRIP_FEE,
  FOOD_FEE,
} = require('../../lib/constants').default

const actions = [
  customActions,
]

function mapStateToProps(state) {
  return {
    device: state.device,
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

class Custom extends React.Component {

  render() {
    const start = new Date()
    start.setMonth(start.getMonth() + 23)

    return (
      <View style={styles.outerContainer} >
        <Image
          source={require('../../images/city.jpg')}
          style={styles.backgroundImg}
        />
        <Header
          headerText={I18n.t('Custom.custom')}
          back={true}
          onReturn={() => Actions.pop()}
        />
        <View style={styles.container}>
          <ScrollView style={styles.customView}>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.tripDate')}</Text>
                <Text style={styles.optionText}>
                  {getFormatDate(this.props.custom.startDate, this.props.custom.endDate)}
                </Text>
              </View>
              <ScrollView style={styles.calendarView}>
                <Calendar
                  monthsCount={24}
                  startDate={start}
                  onSelectionChange={(current, previous) => {
                    if (current >= previous && this.props.custom.endDate === null) {
                      this.props.actions.setTripDate(previous, current)
                    } else {
                      this.props.actions.setTripDate(null, null)
                    }
                  }}
                />
              </ScrollView>
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.tripPeople')}</Text>
                <Text style={styles.optionText}>
                  <Text style={styles.optionText}>
                    {`${this.props.custom.people} `}
                  </Text>
                  <Text style={[styles.optionText,
                                { fontSize: MainStyle.font.medium, fontWeight: 'bold' }]}
                  >
                    {this.props.custom.people === 1 ?
                      `${I18n.t('Custom.person')}` :
                      `${I18n.t('Custom.people')}`}
                  </Text>
                </Text>
              </View>
              {getMultiSlider(
                [1],
                1,
                10,
                1,
                valuesArray => this.props.actions.setPeople(valuesArray[0]))}
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.hotelFee')}</Text>
                <Text style={styles.optionText}>
                  {`${this.props.custom.residentFee[0]} - ${this.props.custom.residentFee[1]}`}
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
              <View style={styles.checkboxView}>
                <ItemCheckbox
                  style={{ marginRight: 10, height: 30 }}
                  text={hotelType[0].label}
                  checked={this.props.custom.hotelType[0]}
                  color="white"
                  textStyle={{ fontWeight: 'bold' }}
                  iconViewStyle={this.props.custom.hotelType[0] ?
                                      { backgroundColor: MainStyle.color.weedGreen, borderWidth: 0 } :
                                      null}
                  onCheck={() => {
                    this.props.actions.toggleHotelType(0)
                  }}
                  onUncheck={() => {
                    this.props.actions.toggleHotelType(0)
                  }}
                />
                <ItemCheckbox
                  style={{ marginRight: 10, height: 30 }}
                  text={I18n.t('Custom.bookHotel')}
                  checked={this.props.custom.bookHotel}
                  color="white"
                  textStyle={{ fontWeight: 'bold' }}
                  iconViewStyle={this.props.custom.bookHotel ?
                                      { backgroundColor: MainStyle.color.weedGreen, borderWidth: 0 } :
                                      null}
                  onCheck={() => {
                    this.props.actions.toggleBookHotel()
                  }}
                  onUncheck={() => {
                    this.props.actions.toggleBookHotel()
                  }}
                />
              </View>
              {this.props.custom.hotelType[0] ? null : (
                <View style={styles.checkboxView}>
                  {hotelType.map((element, index) => (
                    index !== 0 ?
                      (<ItemCheckbox
                        style={{ marginRight: 10, height: 30 }}
                        text={element.label}
                        key={`hotelType_${element.key}`}
                        checked={this.props.custom.hotelType[index]}
                        color="white"
                        textStyle={{ fontWeight: 'bold' }}
                        iconViewStyle={this.props.custom.hotelType[index] ?
                                      { backgroundColor: MainStyle.color.weedGreen, borderWidth: 0 } :
                                      null}
                        onCheck={() => {
                          this.props.actions.toggleHotelType(index)
                        }}
                        onUncheck={() => {
                          this.props.actions.toggleHotelType(index)
                        }}
                      />) : null
                  ))}
                </View>
              )}
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.travelFee')}</Text>
                <Text style={styles.optionText}>
                  {`${this.props.custom.tripFee[0]} - ${this.props.custom.tripFee[1]}`}
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
              <View style={[styles.optionTextView, { justifyContent: 'center', marginTop: 5, marginBottom: -10 }]}>
                <Text style={[styles.optionText, { fontSize: MainStyle.font.large }]}>
                  {`${this.props.custom.allFee[0]} - ${this.props.custom.allFee[1]}`}
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
                <Text style={styles.optionText}>{I18n.t('Custom.foodFee')}</Text>
                <Text style={styles.optionText}>
                  {this.props.custom.foodFee}
                </Text>
              </View>
              {getMultiSlider(
                [500],
                100,
                3000,
                100,
                valuesArray => this.props.actions.setFee(FOOD_FEE, valuesArray))}
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.foodElement')}</Text>
              </View>
              <View style={styles.checkboxView}>
                <ItemCheckbox
                  style={{ marginRight: 10, height: 30 }}
                  text={foodElement[0].label}
                  checked={this.props.custom.foodElement[0]}
                  color="white"
                  textStyle={{ fontWeight: 'bold' }}
                  iconViewStyle={this.props.custom.foodElement[0] ?
                                      { backgroundColor: MainStyle.color.weedGreen, borderWidth: 0 } :
                                      null}
                  onCheck={() => {
                    this.props.actions.toggleFoodElement(0)
                  }}
                  onUncheck={() => {
                    this.props.actions.toggleFoodElement(0)
                  }}
                />
                <ItemCheckbox
                  style={{ marginRight: 10, height: 30 }}
                  text={I18n.t('Custom.bookRestaurant')}
                  checked={this.props.custom.bookRestaurant}
                  color="white"
                  textStyle={{ fontWeight: 'bold' }}
                  iconViewStyle={this.props.custom.bookRestaurant ?
                                      { backgroundColor: MainStyle.color.weedGreen, borderWidth: 0 } :
                                      null}
                  onCheck={() => {
                    this.props.actions.toggleBookRestaurant()
                  }}
                  onUncheck={() => {
                    this.props.actions.toggleBookRestaurant()
                  }}
                />
              </View>
              {this.props.custom.foodElement[0] ? null : (
                <View style={styles.checkboxView}>
                  {foodElement.map((element, index) => (
                    index === 0 ? null :
                      (<ItemCheckbox
                        style={{ marginRight: 10, height: 30 }}
                        text={element.label}
                        key={`hotelType_${element.key}`}
                        checked={this.props.custom.foodElement[index]}
                        color="white"
                        textStyle={{ fontWeight: 'bold' }}
                        iconViewStyle={this.props.custom.foodElement[index] ?
                                    { backgroundColor: MainStyle.color.weedGreen, borderWidth: 0 } :
                                    null}
                        onCheck={() => {
                          this.props.actions.toggleFoodElement(index)
                        }}
                        onUncheck={() => {
                          this.props.actions.toggleFoodElement(index)
                        }}
                      />)
                  ))}
                </View>)}
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.tripElement')}</Text>
              </View>
              <ItemCheckbox
                style={{ marginRight: 10, height: 30, marginBottom: 10 }}
                text={tripElement[0].label}
                key={'tripElement_0'}
                checked={this.props.custom.tripElement[0]}
                color="white"
                textStyle={{ fontWeight: 'bold' }}
                iconViewStyle={this.props.custom.tripElement[0] ?
                                      { backgroundColor: MainStyle.color.weedGreen, borderWidth: 0 } :
                                      null}
                onCheck={() => {
                  this.props.actions.toggleTripElement(0)
                }}
                onUncheck={() => {
                  this.props.actions.toggleTripElement(0)
                }}
              />
              {
                this.props.custom.tripElement[0] ? null : (
                  tripAll.map((tripClass, tripClassIndex) => (
                    <View
                      style={styles.tripClassView}
                      key={`tripClass_${tripClassIndex}`}
                    >
                      <Text style={styles.tripClassName}>{tripClass.name}</Text>
                      <View style={styles.checkboxView}>
                        {tripClass.element.map((element) => {
                          const { key, label } = tripElement[element]
                          return (
                            <ItemCheckbox
                              style={{ marginRight: 10, height: 30 }}
                              text={label}
                              key={`tripElement_${key}`}
                              checked={this.props.custom.tripElement[key]}
                              color="white"
                              textStyle={{ fontWeight: 'bold' }}
                              iconViewStyle={this.props.custom.tripElement[key] ?
                          { backgroundColor: MainStyle.color.weedGreen, borderWidth: 0 } :
                            null}
                              onCheck={() => {
                                this.props.actions.toggleTripElement(key)
                              }}
                              onUncheck={() => {
                                this.props.actions.toggleTripElement(key)
                              }}
                            />)
                        })}
                      </View>
                    </View>
                  )))
              }
            </View>
            <View style={styles.option}>
              <View style={styles.optionTextView}>
                <Text style={styles.optionText}>{I18n.t('Custom.otherDemand')}</Text>
              </View>
              <View style={styles.textInputView}>
                <TextInput
                  style={styles.textInput}
                  multiline={true}
                  selectionColor="white"
                  onChangeText={(text) => this.props.actions.setOtherDemand(text)}
                  value={this.props.otherDemand}
                />
              </View>
            </View>
            <View style={styles.option}>
              <Button
                containerStyle={styles.btnContainer}
                activeOpacity={0.7}
                style={styles.btn}
                onPress={() => {
                  const valid = validSubmit(this.props.custom)
                  if (valid === 0) Actions.LoginMain()
                  else SimpleAlert.alert(I18n.t('Custom.advice'), valid)
                }}
              >{I18n.t('Custom.submit')}</Button>
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
