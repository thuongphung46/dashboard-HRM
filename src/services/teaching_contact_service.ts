import { Request } from "./request";

interface IParam {
  id: string;
  data: any;
}
const controller = "staffs";
const TeachingContactService = {
  Save: async (param: IParam) => {
    return await Request(controller).postAsync(
      `${param.id}/contracts`,
      param.data
    );
  },
  Update: async () => {
    return await Request(controller).patchAsync("me");
  },
};

export { TeachingContactService };
