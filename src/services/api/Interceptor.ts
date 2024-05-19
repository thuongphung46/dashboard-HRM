import HRMStorage from "common/function";
import { RESPONSE_CODE } from "./config";
import { KeyValue } from "constants/GlobalConstant";

export const AccessTokenInterceptor = {
  addAccessToken: async (config: any) => {
    const token = await HRMStorage.get(KeyValue.TokenKey);
    if (token) {
      const headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        Language: "vi",
      };
      config.headers = headers;
    }
    return config;
  },
  onRejected: (error: any) => {
    return Promise.resolve(error);
  },
};

export const RequestResponseInterceptor = {
  request: (response: any) => {
    return response;
  },
  requestErr: (error: any) => {
    const originalRequest = error.config;
    if (error?.response?.status === RESPONSE_CODE.UNAUTHORIZED) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        return Promise.reject(error?.response);
      }
      return Promise.reject(error?.response);
    }
    return Promise.resolve(error?.response);
  },
};
