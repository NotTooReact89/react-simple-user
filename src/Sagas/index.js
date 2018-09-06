//
// @flow
//

import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Services ---------- */

import LoginService from '../Services/LoginService'
import UserService from '../Services/UserService'

/* ------------- Types ------------- */

import { AuthenticationTypes } from '../Redux/AuthenticationRedux'
import { UsersTypes } from '../Redux/UsersRedux'

/* ------------- Sagas ------------- */

import { login, authenticate, registrationUser } from '../Sagas/LoginSagas'
import { getAllUsers, updateUser, deleteUser } from '../Sagas/UserSagas'

/* ------------- API --------------- */

const loginService = LoginService.create()
const userService = UserService.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root (): Generator<*, *, *> {
  yield all([
    takeLatest(AuthenticationTypes.REGISTRATION_REQUEST, registrationUser, loginService),
    takeLatest(AuthenticationTypes.LOGIN_REQUEST, login, authenticate, loginService),
    takeLatest(UsersTypes.GET_ALL_USER_ITEMS_REQUEST, getAllUsers, userService),
    takeLatest(UsersTypes.UPDATE_USER_ITEM_REQUEST, updateUser, userService),
    takeLatest(UsersTypes.DELETE_USER_ITEM_REQUEST, deleteUser, userService)
  ])
}
