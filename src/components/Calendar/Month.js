'use strict'

import React from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'
import Day from './Day'

export default class Month extends React.Component {
  constructor(props) {
    super(props)

    this.weekDaysLocale = props.weekDaysLocale.slice()

    if (props.startFromMonday) {
      this.weekDaysLocale.push(this.weekDaysLocale.shift())
    }
  }

  render() {
    const {
      days, changeSelection, style, monthsLocale,
      bodyBackColor, bodyTextColor, headerSepColor, width,
    } = this.props

    const monthHeader = `${days[15].date.getFullYear()}  ${monthsLocale[days[15].date.getMonth()]}`

    return (
      <View style={[style, { width, backgroundColor: bodyBackColor }]}>
        <Text style={[styles.monthHeader, { color: bodyTextColor }]}>
          {monthHeader}
        </Text>
        <View style={styles.monthDays}>
          {this.props.showWeek ? this.weekDaysLocale.map((dayName, i) => {
            return (
              <View key={i}
                    style={[styles.weekDay, { borderColor: headerSepColor, width: width / 7, height: width / 7 }]}>
                <Text style={{ color: bodyTextColor }}>{dayName}</Text>
              </View>
            )
          }) : null
          }
          {days.map((day, i) => {
            return (
              <Day
                key={i}
                {...this.props}
                disabled={day.disabled}
                status={day.status}
                date={day.date}
                onDayPress={changeSelection}
              />
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  monthHeader: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  monthDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekDay: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
