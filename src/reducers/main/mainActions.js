// @flow weak
'use strict'

const {
  SET_FEE,
} = require('../../lib/constants').default

export function setFee(type: string, fee: any) {
  return {
    type: SET_FEE,
    payload: {
      type,
      fee,
    },
  }
}

export function setFeeWrapper(type: string, fee: any) {
  return dispatch => dispatch(setFee(type, fee))
}
