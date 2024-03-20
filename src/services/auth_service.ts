import axios from "axios";
import { Request } from "./request";
import { clearToken } from "common/function";

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
    return await Request(controller).postAsync("login", {
      username: param.UserName,
      password: param.Password,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    clearToken();
  },
};
export { AuthService };
