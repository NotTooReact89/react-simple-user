// @flow

import apisauce from 'apisauce'
import Config from '../Config/AppConfig'
import { type ServiceResponse } from '..'

export type UserServiceType = {
  getAllUsers: ({ [string]: string }) => ServiceResponse,
  getById: (string, { [string]: string }) => ServiceResponse,
  updateUser: (string, { [string]: string }) => ServiceResponse,
  deleteUser: (string, { [string]: string }) => ServiceResponse
}

const create = (baseURL: string = Config.baseApiURL): UserServiceType => {
  const getAllUsers = (headers) => {
    const api = apisauce.create({
      baseURL,
      timeout: Config.requestTimeout,
      headers
    })

    return api.get('users')
  }

  const getById = (id, headers) => {
    const api = apisauce.create({
      baseURL,
      timeout: Config.requestTimeout,
      headers
    })
    return api.get('users', id)
  }

  const updateUser = (userId, userFirstName, userSurname, userEmail, password, userType, headers) => {
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

    return api.put(`users/${userId}`, requestBody)
  }

  const deleteUser = (id, headers) => {
    const api = apisauce.create({
      baseURL,
      timeout: Config.requestTimeout,
      headers
    })

    return api.delete(`users/${id}`)
  }

  return {
    getAllUsers,
    getById,
    updateUser,
    deleteUser
  }
}

export default {
  create
}
