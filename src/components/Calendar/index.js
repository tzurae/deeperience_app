'use strict'

import React, {
  PropTypes,
} from 'react'
import {
  ListView,
  StyleSheet,
} from 'react-native'

import Month from './Month'

console.disableYellowBox = true

export default class Calendar extends React.Component {
  static defaultProps = {
    startDate: new Date(),
    monthsCount: 24,
    onSelectionChange: () => {
    },

    // monthsLocale: ['January', 'February', 'March', 'April', 'May', 'June',
    //   'July', 'August', 'September', 'October', 'November', 'December'],
    monthsLocale: ['一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'],
    weekDaysLocale: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    width: 280,

    bodyBackColor: 'white',
    bodyTextColor: 'black',
    headerSepColor: 'grey',

    dayCommonBackColor: 'white',
    dayCommonTextColor: 'black',

    dayDisabledBackColor: 'white',
    dayDisabledTextColor: 'grey',

    daySelectedBackColor: '#4169e1',
    daySelectedTextColor: 'white',

    dayInRangeBackColor: '#87cefa',
    dayInRangeTextColor: 'black',

    isFutureDate: false,
    rangeSelect: true,
  };

  static propTypes = {
    selectFrom: PropTypes.instanceOf(Date),
    selectTo: PropTypes.instanceOf(Date),

    monthsCount: PropTypes.number,
    startDate: PropTypes.instanceOf(Date),

    monthsLocale: PropTypes.arrayOf(PropTypes.string),
    weekDaysLocale: PropTypes.arrayOf(PropTypes.string),
    startFromMonday: PropTypes.bool,

    onSelectionChange: PropTypes.func,

    width: PropTypes.number,

    bodyBackColor: PropTypes.string,
    bodyTextColor: PropTypes.string,
    headerSepColor: PropTypes.string,

    dayCommonBackColor: PropTypes.string,
    dayCommonTextColor: PropTypes.string,

    dayDisabledBackColor: PropTypes.string,
    dayDisabledTextColor: PropTypes.string,

    daySelectedBackColor: PropTypes.string,
    daySelectedTextColor: PropTypes.string,

    dayInRangeBackColor: PropTypes.string,
    dayInRangeTextColor: PropTypes.string,

    isFutureDate: PropTypes.bool,
    rangeSelect: PropTypes.bool,
  };

  constructor(props) {
    super(props)

    this.changeSelection = this.changeSelection.bind(this)
    this.generateMonths = this.generateMonths.bind(this)

    const { selectFrom, selectTo, monthsCount, startDate } = this.props

    this.selectFrom = selectFrom
    this.selectTo = selectTo
    this.months = this.generateMonths(monthsCount, startDate)

    const dataSource = new ListView.DataSource({ rowHasChanged: this.rowHasChanged })

    this.state = {
      dataSource: dataSource.cloneWithRows(this.months),
    }
  }

  rowHasChanged(r1, r2) {
    for (let i = 0; i < r1.length; i++) {
      if (r1[i].status !== r2[i].status && !r1[i].disabled) {
        return true
      }
    }
  }

  generateMonths(count, startDate) {
    const months = []
    let dateUTC
    const monthIterator = startDate
    const { isFutureDate, startFromMonday } = this.props

    const startUTC = Date.UTC(startDate.getYear(), startDate.getMonth(), startDate.getDate())

    for (let i = 0; i < count; i++) {
      const month = this.getDates(monthIterator, startFromMonday)

      months.push(month.map((day) => {
        dateUTC = Date.UTC(day.getYear(), day.getMonth(), day.getDate())
        return {
          date: day,
          status: this.getStatus(day, this.selectFrom, this.selectTo),
          disabled: day.getMonth() !== monthIterator.getMonth() ||
          ((isFutureDate) ? startUTC > dateUTC : startUTC < dateUTC),
        }
      }))

      if (isFutureDate) {
        monthIterator.setMonth(monthIterator.getMonth())
      } else {
        monthIterator.setMonth(monthIterator.getMonth() - 1)
      }
    }

    return months
  }

  getDates(inmonth, startFromMonday) {
    const month = new Date(inmonth)
    month.setDate(1)

    let delta = month.getDay()
    if (startFromMonday) {
      delta--
      if (delta === -1) delta = 6
    }

    const startDate = new Date(month)
    startDate.setDate(startDate.getDate() - delta)

    month.setMonth(month.getMonth() + 1)
    month.setDate(0)

    delta = 6 - month.getDay()
    if (startFromMonday) {
      delta++
      if (delta === 7) delta = 0
    }

    const lastDate = new Date(month)
    lastDate.setDate(lastDate.getDate() + delta)

    const allDates = []
    while (true) {
      allDates.push(new Date(startDate))
      startDate.setDate(startDate.getDate() + 1)
      if (startDate > lastDate) break
    }
    return allDates
  }

  changeSelection(value) {
    let { selectFrom, selectTo, months } = this

    if (!selectFrom) {
      selectFrom = value
    } else if (!selectTo) {
      if (value > selectFrom) {
        selectTo = value
      } else {
        selectFrom = value
      }
    } else if (selectFrom && selectTo) {
      selectFrom = value
      selectTo = null
    }

    months = months.map((month) => {
      return month.map((day) => {
        return {
          date: day.date,
          status: this.getStatus(day.date, selectFrom, selectTo),
          disabled: day.disabled,
        }
      })
    })

    if (this.props.rangeSelect) {
      this.selectFrom = selectFrom
      this.selectTo = selectTo
    } else {
      this.selectFrom = this.selectTo = selectFrom
    }

    this.months = months

    this.props.onSelectionChange(value, this.prevValue)
    this.prevValue = value

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(months),
    })
  }

  getStatus(date, selectFrom, selectTo) {
    if (selectFrom) {
      if (selectFrom.toDateString() === date.toDateString()) {
        return 'selected'
      }
    }
    if (selectTo) {
      if (selectTo.toDateString() === date.toDateString()) {
        return 'selected'
      }
    }
    if (selectFrom && selectTo) {
      if (selectFrom < date && date < selectTo) {
        return 'inRange'
      }
    }
    return 'common'
  }

  render() {
    const { style, isFutureDate } = this.props
    let directionStyles = {}

    if (!isFutureDate) {
      directionStyles = {
        transform: [{ scaleY: -1 }],
      }
    }

    return (
      <ListView
        initialListSize={24}
        scrollRenderAheadDistance={1200}
        style={[styles.listViewContainer, directionStyles, style]}
        dataSource={this.state.dataSource}
        renderRow={(month) => (
          <Month
              {...this.props}
              showWeek={false}
              days={month}
              style={[styles.month, directionStyles]}
              changeSelection={this.changeSelection}
          />)}
      />
    )
  }
}

const styles = StyleSheet.create({
  listViewContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  month: {},
})
