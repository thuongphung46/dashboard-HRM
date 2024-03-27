import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { GlobalData } from "constants/global_data";
import { APP_CONFIG } from "constants/app_config";
import { jwtToken } from "./jwt";
import { getToken } from "common/function";

export declare const PX_CONSTANTS: {
  AUTH: string;
  API_URI: string;
  JWT: string;
  USER_ID: string;
  USER_CODE: string;
  USER_NAME: string;
  USER_ROLE_CODE: string;
  USER_ROLE_NAME: string;
  USER_COMPANIES: string;
  USER_MENU_FAVORITES: string;
  AUTO_MENU_HIDDEN: string;
  USER_MENU_OPENED: string;
  DATABASE_ID: string;
  DATABASE_CODE: string;
  DATABASE_NAME: string;
  COMPANY_CODE: string;
  COMPANY_NAME: string;
  WAREHOUSE_CODE: string;
  WAREHOUSE_NAME: string;
  SYSTEM_INFO: string;
  FORM_INFO: string;
  LANGUAGE: string;
  CONFIG_DISPLAY: string;
  MESSAGE_CODE: string;
  MAIN_CURRENCY: string;
  COMPANY_CURRENCY: string;
  LAST_ACCESS_MENU: string;
  DRILL_DOWN_CONFIGS: string;
};

export interface IFetchDataAny {
  msg_code: number;
  msg_detail?: string;
  message: string;
  content: any;
  msg_info?: IFetchDataMessage;
}
export interface IFetchDataMessage {
  msg_code?: number;
  msg_detail?: string;
  message?: string;
}

const baseUrl = APP_CONFIG.API_URL;
const INVALID_TOKEN = [401, 403, 404, 405, 406, 407, 203];
const INVALID_API = [500];
const CANNOT_CONNECT_API: IFetchDataAny = {
  message: "Không kết nối được hệ thống, vui lòng thử lại sau",
  msg_code: -1,
  content: null,
  msg_info: {
    message: "Không kết nối được hệ thống, vui lòng thử lại sau",
    msg_code: -1,
    msg_detail: undefined,
  },
};
const INVALID_TOKEN_MSG: IFetchDataAny = {
  message: "Phiên làm việc hết hạn",
  msg_code: -401,
  content: null,
  msg_info: {
    message: "Phiên làm việc hết hạn",
    msg_code: -401,
    msg_detail: undefined,
  },
};

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: GlobalData.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
  },
  transitional: { forcedJSONParsing: false },
});

const composeUri = (controller: string, action: string, obj: any) => {
  try {
    let arr = [];
    let controllerName = "";
    const actionName = action ? `/${action}` : "";
    if (controller !== "") {
      controllerName = "/" + controller;
    }
    if (obj === null || obj === undefined) {
      return controllerName + "/" + action;
    }
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        arr.push(key + "=" + encodeURIComponent(obj[key]));
      }
    }
    const params = arr.length ? `?${arr.join("&")}` : "";
    return controllerName + actionName + params;
  } catch (error) {
    throw error;
  }
};

const getResponseData = (response: AxiosResponse<any>) => {
  const data = response.data as IFetchDataAny;
  data.msg_info = {
    message: data.message,
    msg_code: data.msg_code,
  };
  return data;
};

interface RequestHandleParams {
  controller: string;
  action: string;
  params?: any;
  method: "post" | "get" | "delete" | "patch";
}

const requestHandle = async (data: RequestHandleParams) => {
  try {
    const { controller, action, params, method } = data;
    const jwt = await getToken();
    const paramsUri = method === "get" ? params : {};
    const uri = composeUri(controller, action, paramsUri);
    const requestMethod = axiosInstance[method];

    const headerConfig = {
      Authorization: `Bearer ${jwt}`,
      Language: "vi-VN",
      "Content-Type": "multipart/form-data",
    };

    if (method === "post" || method === "patch") {
      const formData = new FormData();
      for (let key in params) {
        formData.append(key, params[key]);
      }
      return await requestMethod(uri, formData, {
        headers: headerConfig,
      }).then((response: AxiosResponse<any>) => {
        if (response.status === HttpStatusCode.Ok) {
          return getResponseData(response);
        } else if (INVALID_TOKEN.includes(response.status)) {
          return INVALID_TOKEN_MSG;
        } else if (INVALID_API.includes(response.status)) {
          return CANNOT_CONNECT_API;
        }
      }).catch((error: any) => {
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
          console.log("Không kết nối được tới hệ thống. Vui lòng kiểm tra kết nối mạng");
        } else if (error.response) {
          console.log(error.response);
        }
        return CANNOT_CONNECT_API;
      });
    } else {
      return await requestMethod(uri, {
        headers: headerConfig,
      }).then((response: AxiosResponse<any>) => {
        if (response.status === HttpStatusCode.Ok) {
          return getResponseData(response);
        } else if (INVALID_TOKEN.includes(response.status)) {
          return INVALID_TOKEN_MSG;
        } else if (INVALID_API.includes(response.status)) {
          return CANNOT_CONNECT_API;
        }
      }).catch((error: any) => {
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
          console.log("Không kết nối được tới hệ thống. Vui lòng kiểm tra kết nối mạng");
        } else if (error.response) {
          console.log(error.response);
        }
        return CANNOT_CONNECT_API;
      });
    }
  } catch (error) {
    throw error;
  }
};

export const Request = (controller: string) => {
  return {
    getAsync: async (action: string, params?: any): Promise<any> => {
      return requestHandle({ action, controller, method: "get", params });
    },

    postAsync: async (action: string, params?: any): Promise<any> => {
      return requestHandle({ action, controller, method: "post", params });
    },

    patchAsync: async (action: string, params?: any): Promise<any> => {
      return requestHandle({ action, controller, method: "patch", params });
    },

    deleteAsync: async (action: string, params?: any): Promise<any> => {
      return requestHandle({ action, controller, method: "delete", params });
    },
  };
};