'use strict'
import I18n from '../../lib/i18n'

export function validSubmit(state) {
  if (state.hotelType.filter(value => value).length === 0) {
    return I18n.t('Custom.noFillHotelType')
  } else if (state.tripLocation === -1) {
    return I18n.t('Custom.noFillTripLocation')
  } else if (state.tripElement.filter(value => value).length === 0) {
    return I18n.t('Custom.noFillTripElement')
  } else if (state.foodElement.filter(value => value).length === 0) {
    return I18n.t('Custom.noFillFoodElement')
  } else if (state.startDate === null || state.endDate === null) {
    return I18n.t('Custom.noFillTripDate')
  } else {
    return ''
  }
}

export function getFormatDate(start, end) {
  if (!start || !end) return ''
  else {
    const startStr = start.toISOString().substr(5, 5).replace(/-/g, '/')
    const endStr = end.toISOString().substr(5, 5).replace(/-/g, '/')
    return `${startStr} - ${endStr}`
  }
}

export function formatSendData(props) {
  // const allowedAttributes = [
  //   'people', 'residentFee', 'tripFee', 'allFee',
  //   'foodFee', 'hotelType', 'tripLocation', 'tripElement',
  //   'foodElement', 'otherDemand', 'bookHotel', 'bookRestaurant',
  //   'startDate', 'endDate',
  // ]
  const post = {}
  Object
    .keys(props)
    .forEach((attr) => {
      post[attr] = props[attr]
    })
  const attrChange = ['hotelType', 'tripElement', 'foodElement']
  attrChange.forEach(attr => {
    post[attr] = []
    console.log(props[attr])
    props[attr].forEach((value, index) => {
      if (value) post[attr].push(index)
    })
  })
  return post
}
