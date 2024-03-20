import { TokenInfo } from "constants/GlobalConstant";

export const toString = (data: any) => {
  return `${data}`;
};

export const setToken = (token: any) => {
  localStorage.setItem(TokenInfo.TokenKey, token);
};

export const getToken = () => {
  return localStorage.getItem(TokenInfo.TokenKey);
};

export const clearToken = () => {
  localStorage.removeItem(TokenInfo.TokenKey);
};
