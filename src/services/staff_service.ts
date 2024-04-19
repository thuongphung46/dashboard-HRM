import { Update } from "@mui/icons-material";
import { API_URL, NetWork } from "./api";
import { RESPONSE_CODE } from "./api/config";
import { getRequestUrl } from "./api/utils";
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
  GetMyProfile: async () => {
    return await Request(controller).getAsync("me");
  },
  updateStaffWorkingHistory: async (id: number, data: any) => {
    try {
      const response = await NetWork.patch(
        getRequestUrl(API_URL.STAFFS, {
          parentId: id,
          partial: API_URL.WORKING_HISTORIES,
        }),
        {
          data,
        }
      );
      if (response.status === RESPONSE_CODE.SUCCESS) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);

      return false;
    }
  },
  
  addContract: async (id: number, data: any) => {
    try {
      const response = await NetWork.post(
        getRequestUrl(API_URL.STAFFS, {
          parentId: id,
          partial: API_URL.CONTRACTS,
        }),
        {
          data,
        }
      );
      if (response.status === RESPONSE_CODE.SUCCESS) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);

      return false;
    }
  },

};

export { StaffService };
