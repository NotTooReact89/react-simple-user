import { combineReducers } from 'redux'

export type Error =
| 'sessionTimeoutError'
| 'appVersionDenied'
| 'deviceAgentOrApplicationAgentError'
| 'badRequestError'
| 'unauthorizedError'
| 'apiTimeoutError'
| 'clientError'
| 'dataError'
| 'serverError'
| 'genericError'
| 'noInternetConnection'

export const rootReducer = combineReducers({ // eslint-disable-line import/prefer-default-export
  authentication: require('./AuthenticationRedux').reducer,
  alert: require('./AlertRedux').reducer,
  users: require('./UsersRedux').reducer
})
