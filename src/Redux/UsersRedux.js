// @flow

import { createReducer, createActions } from 'reduxsauce'
import type { Error } from '..'

export type State = {
  users: {
    loading: boolean,
    userItems: Object[],
    userError: ?Error,
    updateError: ?Error,
    updating: boolean,
    deleteError: ?Error,
    deleting: boolean
  }
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getAllUserItemsRequest: [],
  getAllUserItemsSuccess: ['users'],
  getAllUserItemsFailure: ['userError'],
  updateUserItemRequest: ['userId', 'userFirstName', 'userSurname', 'userEmail', 'userType'],
  updateUserItemSuccess: ['userId', 'userFirstName', 'userSurname', 'userEmail', 'userType'],
  updateUserItemFailure: ['userId', 'deleteError'],
  deleteUserItemRequest: ['id'],
  deleteUserItemSuccess: ['id'],
  deleteUserItemFailure: ['id', 'deleteError'],
  resetValues: []
})

export const UsersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  loading: false,
  userItems: [],
  userError: null,
  updating: false,
  updateError: null,
  deleteError: null,
  deleting: false
}

const getAllUserItemsRequest = state => ({
  ...state,
  loading: true,
  userError: null
})

const getAllUserItemsSuccess = (state, { users }) => ({
  ...state,
  userItems: users,
  loading: false,
  userError: null
})

const getAllUserItemsFailure = (state, { userError }) => ({
  ...state,
  userError,
  loading: false
})

const updateUserItemRequest = (state, { userId }) => ({
  ...state,
  userItems: state.userItems.map((user) => {
    if (user.userId === userId) {
      return { ...user, updating: true }
    }
    return user
  }),
  updating: true
})

const updateUserItemSuccess = (state, { id }) => ({
  ...state,
  deleteError: null,
  updating: false
})

const updateUserItemFailure = (state, { deleteError }) => ({
  ...state,
  deleteError,
  updating: false
})

const deleteUserItemRequest = (state, { id }) => ({
  ...state,
  userItems: state.userItems.map((user) => {
    if (user.id === id) {
      return { ...user, deleting: true }
    }
    return user
  })
})

const deleteUserItemSuccess = (state, { id }) => ({
  ...state,
  userItems: state.userItems.filter(user => user.id !== id),
  deleting: false
})

const deleteUserItemFailure = (state, action) => {
  const { id, deleteError } = action
  return {
    ...state,
    userItems: state.userItems.map((user) => {
      if (user.id === id) {
        // make copy of user without 'deleting:true' property
        const { deleting, ...userCopy } = user
        // return copy of user with 'deleteError:[error]' property
        return { ...userCopy, deleteError }
      }

      return user
    })
  }
}

const reset = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ALL_USER_ITEMS_REQUEST]: getAllUserItemsRequest,
  [Types.GET_ALL_USER_ITEMS_SUCCESS]: getAllUserItemsSuccess,
  [Types.GET_ALL_USER_ITEMS_FAILURE]: getAllUserItemsFailure,
  [Types.UPDATE_USER_ITEM_REQUEST]: updateUserItemRequest,
  [Types.UPDATE_USER_ITEM_SUCCESS]: updateUserItemSuccess,
  [Types.UPDATE_USER_ITEM_FAILURE]: updateUserItemFailure,
  [Types.DELETE_USER_ITEM_REQUEST]: deleteUserItemRequest,
  [Types.DELETE_USER_ITEM_SUCCESS]: deleteUserItemSuccess,
  [Types.DELETE_USER_ITEM_FAILURE]: deleteUserItemFailure,
  [Types.RESET_VALUES]: reset
})

/* ------------- Selectors ------------- */

export const isLoadingUsersItems = (state: State) => state.users.loading
export const getUserItemsError = (state: State) => state.users.userError
export const getDeleteUserItemError = (state: State) => state.users.deleteError
export const getUserItems = (state: State) => state.users.userItems
export const isDeletingUserItem = (state: State) => state.users.deleting
export const getUpdateUserItemError = (state: State) => state.users.deleteError
export const isUpdatingUserItem = (state: State) => state.users.updating
