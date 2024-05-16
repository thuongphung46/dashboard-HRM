import { Request } from "./request";

interface IParam {
  id: string;
}
const controller = "department";
const DepartmentService = {
  Delete: async (param: IParam) => {
    return await Request(controller).deleteAsync(`${param.id}`, {});
  },
  Update: async (param: any) => {
    return await Request(controller).patchAsync(`${param.id}`, {
      name: param.name,
      parentDeptId: param.parentDeptId,
      type: param.type,
    });
  },
};

export { DepartmentService };
