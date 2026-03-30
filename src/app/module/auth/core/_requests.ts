import axios from "axios";
import {
  GET_USER_BY_ACCESSTOKEN_URL,
  LOGIN_URL,
  REFRESH_TOKEN,
  REQUEST_PASSWORD_URL,
} from "../../../../config/env";
import { AuthModel, UserModel } from "./_models";

// Server should return AuthModel
export function login(user: any) {
  return axios.post<AuthModel>(LOGIN_URL, user);
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, { token: token });
}

export function refreshToken() {
  return axios.get<UserModel>(REFRESH_TOKEN);
}
