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
  createStaff: async (params: any) => {
    return await Request(controller).postAsync("", params);
  },
  getListStaff: async (param: IParam) => {
    return await Request(controller).getAsync(
      `?query=${param.query}&active=${param.active}&page=${param.page}&size=${param.size}`
    );
  },
  GetDetailStaff: async (id: string) => {
    return await Request(controller).getAsync(`${id}`);
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
  AddContracts: async (param: any, id: string) => {
    return Request(controller).postAsync(`${id}/contracts`, param);
  },
  UpdateContracts: async (param: any, id: number, contractId: string) => {
    return Request(controller).patchAsync(
      `${id}/contracts/${contractId}`,
      param
    );
  },
  UpdateInfoStaff: async (param: any, id: string) => {
    return Request(controller).patchAsync(`${id}`, param);
  },
  //thống kê - tạo mới, sửa giảng dạy 
  AddTeaching: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/teaching`, param);
  },
  UpdateTeaching: async (param: any, idStaff: string, idTeaching:string) => {
    return Request(controller).patchAsync(`${idStaff}/teaching/${idTeaching}`, param);
  },

  //thống kê - tạo mới, sửa thông tin đánh giá học phần,
  AddExamCourse: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/exam-course`, param);
  },
  UpdateExamCourse: async (param: any, idStaff: string, idExamCourse:string) => {
    return Request(controller).patchAsync(`${idStaff}/exam-course/${idExamCourse}`, param);
  },

  // thống kê - tạo mới, sửa thông tin hướng dẫn đồ án
  AddInstructProject: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/instruct-project`, param);
  },
  UpdateInstructProject: async (param: any, idStaff: string, idInstructProject:string) => {
    return Request(controller).patchAsync(`${idStaff}/instruct-project/${idInstructProject}`, param);
  },
  // thống kê - tạo mới, sửa thông tin đề tài dự án
  AddProject: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/project`, param);
  },
  UpdateProject: async (param: any, idStaff: string, idProject:string) => {
    return Request(controller).patchAsync(`${idStaff}/project/${idProject}`, param);
  },

  // thống kê - tạo mới, sửa thông tin bài báo khoa học
  AddMagazine: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/magazine`, param);
  },
  UpdateMagazine: async (param: any, idStaff: string, idMagazine:string) => {
    return Request(controller).patchAsync(`${idStaff}/magazine/${idMagazine}`, param);
  },

  //thống kê - tạo mới, sửa thông tin bằng sáng chế
  AddInvention: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/invention`, param);
  },
  UpdateInvention: async (param: any, idStaff: string, idInvention:string) => {
    return Request(controller).patchAsync(`${idStaff}/invention/${idInvention}`, param);
  },

  //thống kê - tạo mới, sửa thông tin sách
  AddBook: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/book`, param);
  },
  UpdateBook: async (param: any, idStaff: string, idBook:string) => {
    return Request(controller).patchAsync(`${idStaff}/book/${idBook}`, param);
  },
  
  //thống kê - tạo mới, sửa thông tin hướng dẫn sv NCKH
  AddTraining: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/training`, param);
  },
  UpdateTraining: async (param: any, idStaff: string, idTraining:string) => {
    return Request(controller).patchAsync(`${idStaff}/training/${idTraining}`, param);
  },

  //thống kê - tạo mới, sửa thông tin chương trình biên soạn
  AddBuildingProgram: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/building-program`, param);
  },
  UpdateBuildingProgram: async (param: any, idStaff: string, idBuildingProgram:string) => {
    return Request(controller).patchAsync(`${idStaff}/building-program/${idBuildingProgram}`, param);
  },

  //thống kê - tạo mới, sửa thông tin chương trình biên soạn
  AddEditorProgram: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/editor-program`, param);
  },
  UpdateEditorProgram: async (param: any, idStaff: string, idEditorProgram:string) => {
    return Request(controller).patchAsync(`${idStaff}/editor-program/${idEditorProgram}`, param);
  },

};

export { StaffService };
