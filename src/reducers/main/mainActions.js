// @flow
'use strict'
import type { Action, ThunkAction } from '../../lib/types'

const {
  SET_FEE,
} = require('../../lib/constants').default

export function setFee(type: string, fee: any):Action {
  return {
    type: SET_FEE,
    payload: {
      type,
      fee,
    },
  }
}

export function setFeeWrapper(type: string, fee: any):ThunkAction {
  return dispatch => dispatch(setFee(type, fee))
}
