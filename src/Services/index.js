// @flow

import LoginService from './LoginService'
import UserService from './UserService'
import RefreshTokenService from './RefreshTokenService'

export type ServiceResponse = {
  ok: boolean,
  problem: ?string,
  data: any,
  status: ?number,
  headers?: Object,
  config?: Object,
  duration?: Object
}

export {
  LoginService,
  RefreshTokenService,
  UserService
}
