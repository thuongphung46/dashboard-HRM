import axios, { AxiosRequestConfig } from "axios";
import { APP_CONFIG } from "constants/app_config";
import {
  AccessTokenInterceptor,
  RequestResponseInterceptor,
} from "./Interceptor";

const getInstance = () => {
  const BASE_URL = APP_CONFIG.API_URL;
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*",
    },
  });
  instance.interceptors.request.use(
    AccessTokenInterceptor.addAccessToken,
    AccessTokenInterceptor.onRejected
  );
  instance.interceptors.response.use(
    RequestResponseInterceptor.request,
    RequestResponseInterceptor.requestErr
  );
  return instance;
};

const networkInstance = { instance: getInstance() };

const post = async (
  urlApi: string,
  params: any = null,
  config?: AxiosRequestConfig
) => {
  return networkInstance.instance.post(urlApi, params, config);
};
const patch = async (
  urlApi: string,
  params: any = null,
  config?: AxiosRequestConfig
) => {
  return networkInstance.instance.patch(urlApi, params, config);
};
const postFormData = async (urlApi: string, params: any) => {
  return networkInstance.instance.post(urlApi, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const deleteMethod = async (urlApi: string, data: any = null) => {
  return networkInstance.instance.delete(urlApi, { data: data });
};

const get = async (
  urlApi: string,
  data: any = null,
  config?: AxiosRequestConfig
) => {
  return networkInstance.instance.get(urlApi, { params: data, ...config });
};

export const NetWork = {
  get,
  post,
  postFormData,
  patch,
  deleteMethod,
};

export { API_URL } from "./url";
