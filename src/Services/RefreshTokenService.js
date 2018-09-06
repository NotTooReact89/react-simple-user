//
// @flow
//

import apisauce from 'apisauce'
import Config from '../Config/AppConfig'
import { type ServiceResponse } from '..'

export type RefreshTokenServiceType = {
  getRefreshedTokens: (string, { [string]: string }) => ServiceResponse
}

export type authTokens = {
  accessToken: string,
  refreshToken: string
}

export type apiResponse = {
  ok : string,
  data : authTokens,
  status: number
}

const refreshTokenUrl = 'refresh'

const create = (baseURL: string = Config.baseApiURL): RefreshTokenServiceType => {
  const getRefreshedTokens = (headers): RefreshTokenServiceType => {
    const api = apisauce.create({
      baseURL,
      timeout: Config.requestTimeout,
      headers
    })

    return api.post(refreshTokenUrl)
  }

  return {
    getRefreshedTokens
  }
}

export default {
  create
}
