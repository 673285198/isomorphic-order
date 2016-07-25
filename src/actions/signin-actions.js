/**
 * by CntChen 2016.07.22
 */

import * as types from './action-types';

export function loginIn(){
  return {
    type: types.LOGIN_IN,
  }
}

export function loginOut(){
  return {
    type: types.LOGIN_OUT,
  }
}

export function setLoginStateToHasLogin(userName) {
  return {
    type: types.SET_LOGIN_STATE_TO_HAS_LOGIN,
    userName: userName,
  };
}

export function setLoginStateToHasLogout(userName) {
  return {
    type: types.SET_LOGIN_STATE_TO_HAS_LOGOUT,
    userName: userName,
  };
}

export function setLoginStateToRegister() {
  return {
    type: types.SET_LOGIN_STATE_TO_REGISTER,
  };
}