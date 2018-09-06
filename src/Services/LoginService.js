//
// @flow
//

import apisauce from 'apisauce'
import Config from '../Config/AppConfig'
import { type ServiceResponse } from '..'

export type LoginServiceType = {
  login: (string, string, { [string]: string }) => ServiceResponse,
  register: (string, string, string, string, string, { [string]: string }) => ServiceResponse
}

const loginUrl = 'login'

const create = (baseURL: string = Config.baseApiURL): LoginServiceType => {
  const login = (userEmail, password, headers) => {
    const api = apisauce.create({
      baseURL,
      timeout: Config.requestTimeout,
      headers
    })
    const requestBody = {
      userEmail,
      password
    }
    return api.post(loginUrl, requestBody)
  }

  const signupUrl = 'signup'

  const register = (userFirstName, userSurname, userEmail, password, userType, headers) => {
    const api = apisauce.create({
      baseURL,
      timeout: Config.requestTimeout,
      headers
    })
    const requestBody = {
      userEmail,
      password,
      userFirstName,
      userSurname,
      userType
    }

    return api.post(signupUrl, requestBody)
  }

  return {
    login,
    register
  }
}

export default {
  create
}
