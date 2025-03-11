import axios from 'axios'
import { port } from '../../../../config/env'
import {AuthModel, UserModel} from './_models'

const API_URL = /* process.env.REACT_APP_API_URL */ port

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}auth/verify_token`
export const LOGIN_URL = `${API_URL}auth/login`
export const REGISTER_URL = `${API_URL}auth/registration`
export const REQUEST_PASSWORD_URL = `${API_URL}auth/forgot_password`
export const REFRESH_TOKEN = `${API_URL}auth/refreshToken`

// Server should return AuthModel
export function login(user: any) {
  return axios.post<AuthModel>(LOGIN_URL,user)
}

// Server should return AuthModel
export function register(
 user:any
) {
  return axios.post(REGISTER_URL,user)
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL,{token:token} )
}

export function refreshToken(token:string)  {
  return axios.post<UserModel>(REFRESH_TOKEN,token)
}
