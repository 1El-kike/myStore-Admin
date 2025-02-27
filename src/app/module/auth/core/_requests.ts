import axios from 'axios'
import { port } from '../../../../config/env'
//import {AuthModel, UserModel} from './_models'

const API_URL = /* process.env.REACT_APP_API_URL */ port

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}auth/verify_token`
export const LOGIN_URL = `${API_URL}auth/login`
export const REGISTER_URL = `${API_URL}auth/register`
export const REQUEST_PASSWORD_URL = `${API_URL}auth/forgot_password`

// Server should return AuthModel
export function login(user: any) {
  return axios.post</* AuthModel */any>(LOGIN_URL, {
    user
  })
}

// Server should return AuthModel
export function register(
 user:any
) {
    console.log(user)
  return axios.post(REGISTER_URL,user, {
    headers: {
      'Content-Type': 'application/json',
    },})
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
    console.log(token)
  return axios.post</* UserModel */any>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
