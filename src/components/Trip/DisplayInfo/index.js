'use strict'
import React, { PropTypes } from 'react'
import styles from './styles'
import { View, ScrollView, Text } from 'react-native'
import I18n from '../../../lib/i18n'
import HTMLContent from '../../HTMLContent'
import Loading from '../../../components/Loading'
import { width } from '../../../lib/dimensions'
import TouchableIcon from '../../../components/TouchableIcon'
import { tripElement } from '../../../containers/Custom/options'
import Icon from 'react-native-vector-icons/FontAwesome'

class DisplayInfo extends React.PureComponent {

  static propTypes = {
    isFetching: PropTypes.bool,
    whichCard: PropTypes.number,
    title: PropTypes.string,
    introduction: PropTypes.string,
    steps: PropTypes.array,
    tags: PropTypes.array,
  }

  static defaultProps = {
    isFetching: false,
    whichCard: 0,
    title: '',
    introduction: '',
    steps: [],
    tags: [],
  }

  render() {
    return (
      <View style={styles.infoContainer}>
        <Loading
          visible={this.props.isFetching}
          text={I18n.t('TripContent.fetchingTransitData')}
        />
        <View style={styles.displayInfoTitleView}>
          <Text style={styles.displayInfoTitle}>
            {this.props.title}
          </Text>
          <View style={styles.tagView}>
            {this.props.tags[0] ? (<Text style={styles.tag}>
              {tripElement[this.props.tags[0]].label}
            </Text>) : null }
            { this.props.tags[1] ? (<Text style={styles.tag}>
              {tripElement[this.props.tags[1]].label}
            </Text>) : null }
          </View>
          <View style={styles.closeIcon}>
            <TouchableIcon
              size={25}
              color="#999"
              onPress={this.props.closeFunc}
              name="close"
              underlayColor="white"
            />
          </View>
        </View>
        {(() => {
          switch (this.props.whichCard) {
            case 0:
              return (
                <ScrollView style={styles.displayInfoCard}>
                  <HTMLContent
                    width={width - 30}
                    value={this.props.introduction}
                  />
                </ScrollView>
              )
            case 1:
              return (
                <ScrollView style={[styles.displayInfoCard, { paddingLeft: 0, paddingRight: 0 }]}>
                  <View style={{ paddingLeft: 15, paddingRight: 10 }}>
                    <Text style={styles.displayInfoTitle}>
                      大眾運輸
                    </Text>
                  </View>
                  {(() => {
                    if (this.props.steps.length === 0) {
                      return (
                        <View style={styles.transitWhite}>
                          <Text style={styles.transitInstruction}>
                            {I18n.t('TripContent.noRoute')}
                          </Text>
                        </View>
                      )
                    }
                  })()}
                  {this.props.steps.map((step, index) => {
                    let styleBackground
                    if (index % 2 === 0) styleBackground = styles.transitGray
                    else styleBackground = styles.transitWhite
                    if (step.travel_mode === 'WALKING') {
                      return (
                        <View
                          style={styleBackground}
                          key={`route_${step.polyline.points}`}
                        >
                          <Text style={styles.transitListNumber}>
                            {`${index + 1}.`}
                          </Text>
                          <Text style={[{ flex: 3 }, styles.walkInstruction]}>
                            {`${step.html_instructions.replace(/(<([^>]+)>)/ig, '')}`}
                          </Text>
                          <View style={{ flex: 1 }}>
                            <Text style={[{ flex: 1 }, styles.transitDuration]}>
                              {step.duration.text}
                            </Text>
                            <Text style={[{ flex: 1 }, styles.transitDistance]}>
                              {step.distance.text}
                            </Text>
                          </View>
                        </View>
                      )
                    } else if (step.travel_mode === 'TRANSIT') {
                      const shortName = step.transit_details.line.short_name
                      const vehicle = step.transit_details.line.vehicle.name
                      const departureStop = step.transit_details.departure_stop.name
                      const arrivalStop = step.transit_details.arrival_stop.name
                      const departureTime = step.transit_details.departure_time.text
                      const arrivalTime = step.transit_details.arrival_time.text
                      return (
                        <View
                          style={styleBackground}
                          key = {`route_${step.polyline.points}`}
                        >
                          <Text style={styles.transitListNumber}>
                            {`${index + 1}.`}
                          </Text>
                          <View style={{ width: 45 }}>
                            <Text style={styles.transitHelpWord}>
                              {`${I18n.t('TripContent.ride')}`}
                            </Text>
                            <Text style={styles.transitHelpWord}>
                              {`${I18n.t('TripContent.from')}`}
                            </Text>
                            <Text style={styles.transitHelpWord}>
                              {`${I18n.t('TripContent.to')}`}
                            </Text>
                          </View>
                          <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text
                                numberOfLines={1}
                                style={styles.transitInstruction}
                              >
                                {`${shortName} ${vehicle}`}
                              </Text>
                              <Text style={styles.transitTimeInterval}>
                                {`${departureTime}~${arrivalTime}`}
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text
                                numberOfLines={1}
                                style={styles.transitInstruction}
                              >
                                {`${departureStop}`}
                              </Text>
                              <Text style={styles.transitDuration}>
                                {step.duration.text}
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text
                                numberOfLines={1}
                                style={styles.transitInstruction}
                              >
                                {`${arrivalStop}`}
                              </Text>
                              <Text style={styles.transitDistance}>
                                {step.distance.text}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )
                    } else return (<Text/>)
                  })}
                </ScrollView>
              )
            case 2:
              return (
                <ScrollView style={styles.displayInfoCard}>
                  <Text style={styles.displayInfoSubtitle}>{I18n.t('TripContent.fee')}</Text>
                  <Text style={styles.content}>{this.props.fee}</Text>
                  <Text style={styles.displayInfoSubtitle}>{I18n.t('TripContent.recentActivity')}</Text>
                  {this.props.recentActivity.map((activity, index) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon
                        name="circle"
                        size={9}
                        color="#777"
                        style={{ position: 'relative', top: -2 }}
                      />
                      <Text style={styles.content}>
                        {`        ${activity.date} :        ${activity.content}`}
                      </Text>
                    </View>
                  ))}
                  <Text style={styles.displayInfoSubtitle}>{I18n.t('TripContent.openPeriod')}</Text>
                  <Text style={styles.content}>{this.props.openPeriod}</Text>

                </ScrollView>
              )
          }
        })()}
      </View>
    )
  }
}

// <Text style={styles.displayInfoSubtitle}>{I18n.t('TripContent.openPeriod')}</Text>
// <Text style={styles.content}>{this.props.openPeriod}</Text>
export default DisplayInfo
