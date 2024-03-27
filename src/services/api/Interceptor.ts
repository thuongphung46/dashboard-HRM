import { getToken } from "common/function";
import { RESPONSE_CODE } from "./config";

export const AccessTokenInterceptor = {
  addAccessToken: (config: any) => {
    const token = getToken();
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
