// @flow

import { createReducer, createActions } from 'reduxsauce'
import type { Error } from '..'

export type UserDetails = {
  userId: string,
  userEmail: string,
  password: string,
  userFirstName: string,
  userSurname: string,
  userType: string
}

export type AccessDetails = {
  isRegistering: boolean,
  isLoggingIn: boolean,
  accessToken: string,
  refreshToken: string,
  loginError: ?Error,
  refreshTokenError: ?Error,
  registrationError: ?Error
}

export type ErrorId = {
  login: ?string,
  refreshToken: ?string
}

export type State = {
  authentication: {
    userDetails: UserDetails,
    access: AccessDetails
  }
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registrationRequest: ['userFirstName', 'userSurname', 'userEmail', 'password', 'userType'],
  registrationSuccess: ['userId', 'userEmail', 'userFirstName', 'userSurname', 'userType', 'accessToken', 'refreshToken'],
  registrationFailure: ['registrationError'],
  loginRequest: ['username', 'password'],
  storeUserDetails: ['userId', 'userEmail', 'userFirstName', 'userSurname', 'userType', 'accessToken', 'refreshToken'],
  storeAuthenticationTokens: ['accessToken', 'refreshToken'],
  loginFailure: ['loginError'],
  refreshTokenRequest: ['refreshToken'],
  refreshTokenSuccess: ['accessToken', 'refreshToken'],
  refreshTokenFailure: ['refreshTokenError'],
  logout: [],
  resetValues: []
})

export const AuthenticationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const userDetailsInitialState = {
  userId: '',
  userEmail: '',
  userFirstName: '',
  userSurname: '',
  userType: ''
}
const accessDetailsInitialState = {
  loginError: null,
  isLoggingIn: false,
  refreshTokenError: null,
  accessToken: '',
  refreshToken: ''
}

export const INITIAL_STATE = ({
  userDetails: userDetailsInitialState,
  access: accessDetailsInitialState
})

/* ------------- Reducers ------------- */

const registrationRequest = state => ({
  ...state,
  access: {
    ...state.access,
    isRegistering: true,
    registrationError: null
  }
})

const registrationSuccess = (state, action) => {
  const {
    userId,
    userEmail,
    userFirstName,
    userSurname,
    userType,
    accessToken,
    refreshToken
  } = action

  return ({
    ...state,
    access: {
      ...state.access,
      accessToken,
      refreshToken,
      isRegistering: false,
      registrationError: null
    },
    userDetails: {
      ...state.userDetails,
      userId,
      userEmail,
      userFirstName,
      userSurname,
      userType
    }
  })
}

const registrationFailure = (state, { registrationError, errorId = null }) => ({
  ...state,
  access: {
    ...state.access,
    isRegistering: false,
    registrationError
  },
  userDetails: userDetailsInitialState
})

const loginRequest = state => ({
  ...state,
  access: {
    ...state.access,
    isLoggingIn: true,
    loginError: null
  }
})

const loginSuccess = (state, action) => {
  const {
    userId,
    userEmail,
    userFirstName,
    userSurname,
    userType,
    accessToken,
    refreshToken
  } = action

  return ({
    ...state,
    access: {
      ...state.access,
      accessToken,
      refreshToken,
      isLoggingIn: false,
      loginError: null,
      refreshTokenError: null
    },
    userDetails: {
      ...state.userDetails,
      userId,
      userEmail,
      userFirstName,
      userSurname,
      userType
    }
  })
}

const loginFailure = (state, { loginError, errorId = null }) => ({
  ...state,
  access: {
    ...state.access,
    isLoggingIn: false,
    loginError
  },
  userDetails: userDetailsInitialState
})

const refreshTokenRequest = state => ({
  ...state,
  access: {
    ...state.access,
    refreshTokenError: null,
    accessToken: '',
    refreshToken: ''
  }
})

const refreshTokenSuccess = (state, action) => {
  const { refreshToken, accessToken } = action
  return ({
    ...state,
    access: {
      ...state.access,
      refreshTokenError: null,
      accessToken,
      refreshToken
    }
  })
}

const refreshTokenFailure = (state, { refreshTokenError, errorId = null }) => ({
  ...state,
  access: {
    ...state.access,
    refreshTokenError
  }
})

const logout = state => INITIAL_STATE

const reset = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTRATION_REQUEST]: registrationRequest,
  [Types.REGISTRATION_SUCCESS]: registrationSuccess,
  [Types.REGISTRATION_FAILURE]: registrationFailure,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.STORE_USER_DETAILS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.REFRESH_TOKEN_REQUEST]: refreshTokenRequest,
  [Types.REFRESH_TOKEN_SUCCESS]: refreshTokenSuccess,
  [Types.REFRESH_TOKEN_FAILURE]: refreshTokenFailure,
  [Types.LOGOUT]: logout,
  [Types.RESET_VALUES]: reset
})

/* ------------- Selectors ------------- */

export const isLoggingIn = (state: State) => state.authentication.access.isLoggingIn
export const isRegistering = (state: State) => state.authentication.access.isRegistering

export const isAdminUser = (state: State) => state.authentication.userDetails.userType === 'Admin'
export const isLoggedIn = (state: State) => state.authentication.userDetails.userId !== ''
export const getLoggedInUserFirstName = (state: State) => state.authentication.userDetails.userFirstName
export const getLoginError = (state: State) => state.authentication.access.loginError
export const getRegistrationError = (state: State) => state.authentication.access.registrationError

export const getAccessToken = (state: State) => state.authentication.access.accessToken
export const getRefreshToken = (state: State) => state.authentication.access.refreshToken
export const getRefreshTokenError = (state: State) => state.authentication.access.refreshTokenError
