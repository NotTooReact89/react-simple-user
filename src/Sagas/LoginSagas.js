//
// @flow
//

import { put, call } from 'redux-saga/effects'
import AuthenticationActions from '../Redux/AuthenticationRedux'
import AlertActions from '../Redux/AlertRedux'
import type { LoginServiceType } from '../Services/LoginService'
import CreateApiHeaders from '../Lib/CreateApiHeaders'

type LoginParams = {
  username: string,
  password: string
}

type RegisterParams = {
  userFirstName: string,
  userSurname: string,
  userEmail: string,
  password: string,
  userType: string
}

export function * login (authenticator: Function, loginService: LoginServiceType, action: LoginParams): Generator<*, *, *> {
  const { username, password } = action

  yield * authenticator(loginService, username, password)
}

export function * authenticate (loginService: LoginServiceType, username: string, password: string): Generator<*, *, *> {
  const loginResponse = yield call(loginService.login, username, password, CreateApiHeaders({}))
  if (!loginResponse.ok) {
    yield put(AuthenticationActions.loginFailure(loginResolveError(loginResponse)))
    yield put(AlertActions.alertError(loginResolveError(loginResponse)))
    return
  }

  yield put(AuthenticationActions.storeUserDetails(
    loginResponse.data.userId,
    loginResponse.data.userEmail,
    loginResponse.data.userFirstName,
    loginResponse.data.userSurname,
    loginResponse.data.userType,
    loginResponse.data.accessToken,
    loginResponse.data.refreshToken
  ))

  localStorage.setItem('user', loginResponse)
}

export function * registrationUser (loginService: LoginServiceType, action: RegisterParams): Generator<*, *, *> {
  const {
    userFirstName, userSurname, userEmail, password, userType
  } = action

  const loginResponse = yield call(loginService.register, userFirstName, userSurname, userEmail, password, userType, CreateApiHeaders({}))
  if (!loginResponse.ok) {
    yield put(AuthenticationActions.loginFailure(loginResolveError(loginResponse)))
    yield put(AlertActions.alertError(loginResolveError(loginResponse)))
    return
  }

  yield put(AuthenticationActions.registrationSuccess(
    loginResponse.data.userId,
    loginResponse.data.userEmail,
    loginResponse.data.userFirstName,
    loginResponse.data.userSurname,
    loginResponse.data.userType,
    loginResponse.data.accessToken,
    loginResponse.data.refreshToken
  ))

  localStorage.setItem('user', loginResponse)
}

export function loginResolveError (loginResponse: Object) {
  let loginError

  // wrap everything in a try catch in case we get REALLY bad data back
  try {
    if (loginResponse.status === 401) {
      loginError = 'badCredentials'
    } else if (loginResponse.status === 500) {
      loginError = 'serverError'
    } else if (loginResponse.status === 400) {
      loginError = 'deviceAgentOrApplicationAgentError'
    } else if (loginResponse.status === 403 || loginResponse.status === 422) {
      loginError = 'appError'
    } else {
      loginError = 'unknownError'
    }
  } catch (err) {
    loginError = 'unknownError'
  }
  return loginError
}
