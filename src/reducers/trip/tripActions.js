// @flow
'use strict'
import { Actions } from 'react-native-router-flux'
import ApiFactory from '../../api/apiFactory'
import type { ThunkAction, Action } from '../../lib/types'
import { promiseFor } from '../../lib/util'

const {
  GET_ALL_TRIP,
  GET_TRIP_BY_CLASS,
  GET_TRIP_CONTENT,
  GET_TRIP_CONTENT_SUCCESS,
  GET_TRIP_CONTENT_FAILURE,
  GET_ALL_SITE_CONTENT_SUCCESS,
  GET_ALL_SITE_CONTENT_FAILURE,
} = require('../../lib/constants').default

export function getAllTrip():Action {
  return {
    type: GET_ALL_TRIP,
  }
}

export function getTripByClass():Action {
  return {
    type: GET_TRIP_BY_CLASS,
  }
}

export function getTripContent():Action {
  return {
    type: GET_TRIP_CONTENT,
  }
}

export function getTripContentSuccess(res:any):Action {
  return {
    type: GET_TRIP_CONTENT_SUCCESS,
    payload: res,
  }
}

export function getTripContentFailure(res:any):Action {
  return {
    type: GET_TRIP_CONTENT_FAILURE,
    payload: res,
  }
}

export function getAllSiteContentSuccess(res:any):Action {
  return {
    type: GET_ALL_SITE_CONTENT_SUCCESS,
    payload: res,
  }
}

export function getAllSiteContentFailure(res:any):Action {
  return {
    type: GET_ALL_SITE_CONTENT_FAILURE,
    payload: res,
  }
}

export function getTripContentById(tripId:string):ThunkAction {
  return dispatch => {
    dispatch(getTripContent())

    return new ApiFactory().readDataBaseOnce(`/trips/${tripId}`)
      .then(res => {
        dispatch(getTripContentSuccess(res.val()))
        const allSites = res.val().allSites

        promiseFor(
          (index) => { return index < allSites.length },
          (index, payload) => {
            return new ApiFactory()
                        .readDataBaseOnce(`/site/${allSites[index]}`)
                        .then((res) => {
                          payload[allSites[index]] = res.val()
                        })
          },
          0,
          (data) => { dispatch(getAllSiteContentSuccess(data)) },
          (err) => { dispatch(getAllSiteContentFailure(err)) },
          {},
        )
      })
      .catch((error) => {
        dispatch(getTripContentFailure(error))
      })
  }
}
