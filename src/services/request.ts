import axios, { HttpStatusCode } from "axios";
import { storageAction } from "common/function";
import { KeyValue } from "constants/GlobalConstant";
import { APP_CONFIG } from "constants/app_config";

import { GlobalData } from "constants/global_data";

const baseUrl = APP_CONFIG.API_URL;
const INVALID_TOKEN = [401, 403, 404, 405, 406, 407, 203];
const INVALID_API = [500];
const CANNOT_CONNECT_API: any = {
  message: "Không kết nối được hệ thống, vui lòng thử lại sau",
  msg_code: -1,
  content: null,
  msg_info: {
    message: "Không kết nối được hệ thống, vui lòng thử lại sau",
    msg_code: -1,
    msg_detail: undefined,
  },
};
const INVALID_TOKEN_MSG: any = {
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
    const params = arr.length ? `? ${arr.join("&")}` : "";
    return controllerName + actionName + params;
  } catch (error) {
    throw error;
  }
};

const getResponseData = (response: any) => {
  const data = JSON.parse(response.data);
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
    const jwt = await storageAction("get", KeyValue.TokenKey);
    // const lang = await PxStorage.get(PX_CONSTANTS.LANGUAGE);
    const paramsUri = method === "get" ? params : {};
    const uri = composeUri(controller, action, paramsUri);
    const requestMethod = axiosInstance[method];
    const headerConfig = {
      Authorization: `Bearer ${jwt}`,
      // Language: lang,
    };
    return await (method === "get" || method === "delete"
      ? requestMethod(uri, {
          headers: headerConfig,
        })
      : requestMethod(uri, JSON.stringify(params), {
          headers: headerConfig,
        })
    )
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          return getResponseData(response);
        } else if (INVALID_TOKEN.includes(response.status)) {
          return INVALID_TOKEN_MSG;
        } else if (INVALID_API.includes(response.status)) {
          return CANNOT_CONNECT_API;
        }
      })
      .catch((error) => {
        if (error.response) {
          return error.response;
        }
        throw error;
      });
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
