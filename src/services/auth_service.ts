import { Request } from "./request";

const Controller = "Auth";
export const AuthService = {
  Login: async (values: any) => {
    return await Request(Controller).postAsync("Login", values);
  },
  Register: async (values: any) => {
    return await Request(Controller).postAsync("Register", values);
  },
  Logout: async (values: any) => {
    return await Request(Controller).postAsync("Logout", values);
  },
  GetProfile: async (values: any) => {
    return await Request(Controller).postAsync("GetProfile", values);
  },
};
