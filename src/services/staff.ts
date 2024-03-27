import { Request } from "./request";

const controller = "staffs";

const ListStaffService = {
  getListStaff: async (param: any) => {
    return await Request(controller).getAsync(`?query=${param.query}&active=${param.active}&page=${param.page}&size=${param.size}`, );
  }
};

const UploadDecStaffService = {
  upload: async ({file, id}: any) => {
      return await Request(controller).postAsync(`${id}/declaration`, file);
  },
};

export { ListStaffService };
export { UploadDecStaffService };