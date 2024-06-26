import axios from "axios";
import HRMStorage from "common/function";
import { NetWork } from "./api";
import { getRequestUrl } from "./api/utils";

const controller = "auth";
interface Auth {
  UserName: string;
  Password: string;
}
const AuthService = {
  register: (username: string, email: string, password: string) => {
    return axios.post("signup", {
      username,
      email,
      password,
    });
  },
  LoginAdmin: async (param: Auth) => {
    return await NetWork.post(
      getRequestUrl(controller, {
        partial: "login",
      }),
      {
        username: param.UserName,
        password: param.Password,
      }
    );
  },

  logout: () => {
    HRMStorage.clear();
  },
};
export { AuthService };
