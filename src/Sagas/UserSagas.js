//
// @flow
//

import { call, put } from 'redux-saga/effects'
import apiCall from './APISaga'
import UsersAction from '../Redux/UsersRedux'
import type { UserServiceType } from '../Services/UserService'

export function * getAllUsers (userService: UserServiceType): Generator<*, *, *> {
  const userItemsResponse = yield call(apiCall, userService.getAllUsers)
  if (!userItemsResponse.ok) {
    yield put(UsersAction.getAllUserItemsFailure(UsersResolveError(userItemsResponse)))
    return
  }

  if (userItemsResponse.ok && userItemsResponse.data) {
    yield put(UsersAction.getAllUserItemsSuccess(userItemsResponse.data))
  }
}

type UserParams = {
  userId: string,
  userFirstName: string,
  userSurname: string,
  userEmail: string,
  userType: string
}

export function * updateUser (userService: UserServiceType, action: UserParams): Generator<*, *, *> {
  const {
    userId, userFirstName, userSurname, userEmail, userType
  } = action

  const userItemResponse = yield call(
    apiCall,
    userService.updateUser,
    userId,
    userFirstName,
    userSurname,
    userEmail,
    userType
  )
  if (!userItemResponse.ok) {
    yield put(UsersAction.updateUserItemFailure(UsersResolveError(userItemResponse)))
    return
  }

  if (userItemResponse.ok && userItemResponse.data) {
    yield put(UsersAction.updateUserItemSuccess(userItemResponse.data))
    yield * getAllUsers(userService)
  }
}

type Params = {
  id: string
}

export function * deleteUser (userService: UserServiceType, action: Params): Generator<*, *, *> {
  const { id } = action

  const userItemsResponse = yield call(apiCall, userService.deleteUser, id)
  if (!userItemsResponse.ok) {
    yield put(UsersAction.deleteUserItemFailure(UsersResolveError(userItemsResponse)))
    return
  }

  if (userItemsResponse.ok && userItemsResponse.data) {
    yield put(UsersAction.deleteUserItemSuccess(userItemsResponse.data))
    yield * getAllUsers(userService)
  }
}

function UsersResolveError (response: Object) {
  let userItemsError

  try {
    if (response.status === 401) {
      userItemsError = 'unauthorizedError'
    } else if (response.status === 500) {
      userItemsError = 'serverError'
    } else if (response.status === 400) {
      userItemsError = 'deviceAgentOrApplicationAgentError'
    } else if (response.status === 403 || response.status === 422) {
      userItemsError = 'appError'
    } else {
      userItemsError = 'unknownError'
    }
  } catch (err) {
    userItemsError = 'unknownError'
  }

  return userItemsError
}
