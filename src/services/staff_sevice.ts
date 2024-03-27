import { Request } from "./request";

interface IParam {
  query: string;
  active: number;
  page: number;
  size: number;
}
const controller = "staffs";
const StaffService = {
  getListStaff: async (param: IParam) => {
    return await Request(controller).getAsync(
      `?query=${param.query}&active=${param.active}&page=${param.page}&size=${param.size}`
    );
  },
};
export { StaffService };
