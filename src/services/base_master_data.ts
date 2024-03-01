// import { BaseService } from "pyxis-suite/lib/px-app/service";
import { Request } from "./request";

const Controller = "basedata/BaseMasterData";
export const BaseMasterDataService = {
  Get: async (values: any) => {
    return await Request(Controller).postAsync("Get", values);
  },
  Create: async (values: any) => {
    return await Request(Controller).postAsync("Create", values);
  },
  Update: async (values: any) => {
    return await Request(Controller).postAsync("Update", values);
  },
  Delete: async (values: any) => {
    return await Request(Controller).postAsync("Delete", values);
  },
  GetById: async (values: any) => {
    return await Request(Controller).postAsync("GetById", values);
  },
};
