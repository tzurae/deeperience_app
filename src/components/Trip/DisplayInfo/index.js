'use strict'
import React, { PropTypes } from 'react'
import styles from './styles'
import { View, ScrollView, Text, Image } from 'react-native'
import I18n from '../../../lib/i18n'
import { HTMLStyle } from '../../../styles'
import HTMLRender from 'react-native-html-render'
import Loading from '../../../components/Loading'
import Dimensions from 'Dimensions'
const { width } = Dimensions.get('window')

class DisplayInfo extends React.PureComponent {

  static propTypes = {
    isFetching: PropTypes.bool,
    whichCard: PropTypes.number,
    title: PropTypes.string,
    introduction: PropTypes.string,
    steps: PropTypes.array,
  }

  static defaultProps = {
    isFetching: false,
    whichCard: 0,
    title: '',
    introduction: '',
    steps: [],
  }

  constructor(props) {
    super(props)
    this.state = { size: {} }
  }

  componentWillMount() {
    console.log(this.props.introduction)
    const arr = this.props.introduction.match(/src="\S*"/g)
    if (arr) {
      arr.map((str) => str.substring(5, str.length - 1).replace('&amp;', '&'))
        .forEach((str) => {
          this.state.size[str] = { width: 100, height: 100 }
          Image.getSize(str, (wid, hei) => {
            this.setState({
              size: { ...this.state.size, [str]: { width: width - 60, height: hei / wid * (width - 60) } },
            })
          })
        })
    }
  }

  renderHTML(node, index, parent, type) {
    const name = node.name
    if (name === 'img') {
      let uri = node.attribs.src
      if (/^\/\/dn-cnode\.qbox\.me\/.*/.test(uri)) {
        uri = `https:${uri}`
      }
      return (
        <View
          key={index}
          style={styles.imgWrapper}>
          <Image source={{ uri }}
                 style={[styles.img, this.state.size[uri]]}/>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.infoContainer}>
        <Loading
          visible={this.props.isFetching}
          text={I18n.t('TripContent.fetchingTransitData')}
        />
        {
          (() => {
            switch (this.props.whichCard) {
              case 0:
                return (
                  <ScrollView style={styles.displayInfoCard}>
                    <Text style={styles.displayInfoTitle}>
                      {this.props.title}
                    </Text>
                    <HTMLRender
                      renderNode={this.renderHTML.bind(this)}
                      stylesheet={HTMLStyle}
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
                    {
                      this.props.steps.map((step, index) => {
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
                      })
                    }
                  </ScrollView>
                )
            }
          })()
        }
      </View>

    )
  }
}

export default DisplayInfo
