// @flow

import { createReducer, createActions } from 'reduxsauce'

export type State = {
  alert: {
    type: string,
    message: string
  }
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  alertSuccess: ['message'],
  alertError: ['message'],
  alertClear: []
})

export const AlertTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = ({
  type: '',
  message: ''
})

/* ------------- Reducers ------------- */

const alertSuccess = (state, { message }) => ({
  ...state,
  type: 'alert-success',
  message
})

const alertError = (state, { message }) => ({
  ...state,
  type: 'alert-danger',
  message
})

const alertClear = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALERT_SUCCESS]: alertSuccess,
  [Types.ALERT_ERROR]: alertError,
  [Types.ALERT_CLEAR]: alertClear
})

/* ------------- Selectors ------------- */

export const getAlertType = (state: State) => state.alert.type
export const getAlertMessage = (state: State) => state.alert.message
