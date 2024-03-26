import { Request } from "./request";

const controller = "staffs";
const ListStaffService = {
  getListStaff: async (param: any) => {
    return await Request(controller).getAsync(`?query=${param.query}&active=${param.active}&page=${param.page}&size=${param.size}`, );
  }
};

export { ListStaffService };
