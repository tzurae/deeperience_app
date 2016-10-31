'use strict'
import I18n from '../../lib/i18n'

export function validSubmit(state) {
  if (state.day === 0) {
    return I18n.t('Custom.noFillDay')
  } else if (state.hotelType.filter(value => value).length === 0) {
    return I18n.t('Custom.noFillHotelType')
  } else if (state.tripLocation === -1) {
    return I18n.t('Custom.noFillTripLocation')
  } else if (state.tripElement.filter(value => value).length === 0) {
    return I18n.t('Custom.noFillTripElement')
  } else if (state.foodElement.filter(value => value).length === 0) {
    return I18n.t('Custom.noFillFoodElement')
  } else {
    return 0
  }
}
