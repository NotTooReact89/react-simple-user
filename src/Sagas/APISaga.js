//
// @flow
//

import { put, call, select } from 'redux-saga/effects'
import CreateApiHeaders from '../Lib/CreateApiHeaders'
import AuthenticationAction, { getAccessToken, getRefreshToken } from '../Redux/AuthenticationRedux'
import UsersAction from '../Redux/UsersRedux'
import RefreshTokenService from '../Services/RefreshTokenService'
import type { RefreshTokenServiceType, apiResponse } from '../Services/RefreshTokenService'
import history from '../Helpers/History'

export default function * apiCall (serviceCall: *, ...args: *): Generator<*, *, *> {
  const refreshTokenService: RefreshTokenServiceType = RefreshTokenService.create()

  let accessToken: string = yield select(state => getAccessToken(state))
  let serviceCallResponse = yield call(serviceCall, ...args, CreateApiHeaders({ accessToken }))

  if (hasSessionTimedOut(serviceCallResponse.status)) {
    yield put(AuthenticationAction.loginFailure('sessionTimeout'))

    const refreshToken: string = yield select(state => getRefreshToken(state))

    const refreshTokenResponse: apiResponse = yield call(refreshTokenService.getRefreshedTokens, ...args, CreateApiHeaders({ refreshToken }))

    if (refreshTokenResponse.ok) {
      yield put(AuthenticationAction.refreshTokenSuccess(refreshTokenResponse.data.accessToken, refreshTokenResponse.data.refreshToken))
      accessToken = yield select(state => getAccessToken(state))

      // Retry api with the new access token.
      serviceCallResponse = yield call(serviceCall, ...args, CreateApiHeaders({ accessToken }))

      if (hasSessionTimedOut(serviceCallResponse.status)) {
        yield put(AuthenticationAction.loginFailure('reauthenticationFailure'))
        yield * returnToLoginScreen()
      }
    } else {
      yield put(AuthenticationAction.refreshTokenFailure(RefreshTokenResolveError(refreshTokenResponse)))

      if (refreshTokenResponse.status === 401) {
        yield * returnToLoginScreen()
      }
    }
  }
  return serviceCallResponse
}

function * returnToLoginScreen () {
  yield put(UsersAction.resetValues())
  yield put(AuthenticationAction.resetValues())
  yield history.push('/login')
}

const hasSessionTimedOut = (statusCode: number) => {
  if (statusCode === 401) {
    return true
  }
  return false
}

function RefreshTokenResolveError (refreshTokenResponse: Object) {
  let refreshTokenError

  try {
    if (refreshTokenResponse.status === 401) {
      refreshTokenError = 'unauthorizedError'
    } else if (refreshTokenResponse.status === 500) {
      refreshTokenError = 'serverError'
    } else if (refreshTokenResponse.status === 400) {
      refreshTokenError = 'deviceAgentOrApplicationAgentError'
    } else if (refreshTokenResponse.status === 403 || refreshTokenResponse.status === 422) {
      refreshTokenError = 'appError'
    } else {
      refreshTokenError = 'unknownError'
    }
  } catch (err) {
    refreshTokenError = 'unknownError'
  }

  return refreshTokenError
}
