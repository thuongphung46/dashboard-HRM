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
  AddWorkingHistory: async (param: any, id: string) => {
    return Request(controller).postAsync(`${id}/working-histories`, param);
  },
  UpdateWorkingHistory: async (
    param: any,
    id: string,
    idWorkingHistory: string
  ) => {
    return Request(controller).patchAsync(
      `${id}/working-histories/${idWorkingHistory}`,
      param
    );
  },
  DeleteWorkingHistory: async (id: string, idWorkingHistory: string) => {
    return Request(controller).deleteAsync(
      `${id}/working-histories/${idWorkingHistory}`
    );
  },
  AddTrainingSummary: async (param: any, id: string) => {
    return Request(controller).postAsync(`${id}/training-summary`, param);
  },
  UpdateTrainingSummary: async (param: any, id: string, idTraining: string) => {
    return Request(controller).patchAsync(
      `${id}/training-summary/${idTraining}`,
      param
    );
  },
  DeleteTrainingSummary: async (id: string, idTraining: string) => {
    return Request(controller).deleteAsync(
      `${id}/training-summary/${idTraining}`
    );
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
  UpdateTeaching: async (param: any, idStaff: string, idTeaching: string) => {
    return Request(controller).patchAsync(
      `${idStaff}/teaching/${idTeaching}`,
      param
    );
  },
  DeleteTeaching: async (idStaff: string, idTeaching: string) => {
    return Request(controller).deleteAsync(`${idStaff}/teaching/${idTeaching}`);
  },

  //thống kê - tạo mới, sửa thông tin đánh giá học phần,
  AddExamCourse: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/exam-course`, param);
  },
  UpdateExamCourse: async (
    param: any,
    idStaff: string,
    idExamCourse: string
  ) => {
    return Request(controller).patchAsync(
      `${idStaff}/exam-course/${idExamCourse}`,
      param
    );
  },
  DeleteExamCourse: async (idStaff: string, idExamCourse: string) => {
    return Request(controller).deleteAsync(
      `${idStaff}/exam-course/${idExamCourse}`
    );
  },

  // thống kê - tạo mới, sửa thông tin hướng dẫn đồ án
  AddInstructProject: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/instruct-project`, param);
  },
  UpdateInstructProject: async (
    param: any,
    idStaff: string,
    idInstructProject: string
  ) => {
    return Request(controller).patchAsync(
      `${idStaff}/instruct-project/${idInstructProject}`,
      param
    );
  },
  DeleteInstructProject: async (idStaff: string, idInstructProject: string) => {
    return Request(controller).deleteAsync(
      `${idStaff}/instruct-project/${idInstructProject}`
    );
  },

  // thống kê - tạo mới, sửa thông tin đề tài dự án
  AddProject: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/project`, param);
  },
  UpdateProject: async (param: any, idStaff: string, idProject: string) => {
    return Request(controller).patchAsync(
      `${idStaff}/project/${idProject}`,
      param
    );
  },
  DeleteProject: async (idStaff: string, idProject: string) => {
    return Request(controller).deleteAsync(`${idStaff}/project/${idProject}`);
  },

  // thống kê - tạo mới, sửa thông tin bài báo khoa học
  AddMagazine: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/magazine`, param);
  },
  UpdateMagazine: async (param: any, idStaff: string, idMagazine: string) => {
    return Request(controller).patchAsync(
      `${idStaff}/magazine/${idMagazine}`,
      param
    );
  },
  DeleteMagazine: async (idStaff: string, idMagazine: string) => {
    return Request(controller).deleteAsync(`${idStaff}/magazine/${idMagazine}`);
  },

  //thống kê - tạo mới, sửa thông tin bằng sáng chế
  AddInvention: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/invention`, param);
  },
  UpdateInvention: async (param: any, idStaff: string, idInvention: string) => {
    return Request(controller).patchAsync(
      `${idStaff}/invention/${idInvention}`,
      param
    );
  },
  DeleteInvention: async (idStaff: string, idInvention: string) => {
    return Request(controller).deleteAsync(
      `${idStaff}/invention/${idInvention}`
    );
  },

  //thống kê - tạo mới, sửa thông tin sách
  AddBook: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/book`, param);
  },
  UpdateBook: async (param: any, idStaff: string, idBook: string) => {
    return Request(controller).patchAsync(`${idStaff}/book/${idBook}`, param);
  },
  DeleteBook: async (idStaff: string, idBook: string) => {
    return Request(controller).deleteAsync(`${idStaff}/book/${idBook}`);
  },

  //thống kê - tạo mới, sửa thông tin hướng dẫn sv NCKH
  AddTraining: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/training`, param);
  },
  UpdateTraining: async (param: any, idStaff: string, idTraining: string) => {
    return Request(controller).patchAsync(
      `${idStaff}/training/${idTraining}`,
      param
    );
  },
  DeleteTraining: async (idStaff: string, idTraining: string) => {
    return Request(controller).deleteAsync(`${idStaff}/training/${idTraining}`);
  },

  //thống kê - tạo mới, sửa thông tin chương trình biên soạn
  AddBuildingProgram: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/building-program`, param);
  },
  UpdateBuildingProgram: async (
    param: any,
    idStaff: string,
    idBuildingProgram: string
  ) => {
    return Request(controller).patchAsync(
      `${idStaff}/building-program/${idBuildingProgram}`,
      param
    );
  },
  DeleteBuildingProgram: async (idStaff: string, idBuildingProgram: string) => {
    return Request(controller).deleteAsync(
      `${idStaff}/building-program/${idBuildingProgram}`
    );
  },

  //thống kê - tạo mới, sửa thông tin chương trình biên soạn
  AddEditorProgram: async (param: any, idStaff: string) => {
    return Request(controller).postAsync(`${idStaff}/editor-program`, param);
  },
  UpdateEditorProgram: async (
    param: any,
    idStaff: string,
    idEditorProgram: string
  ) => {
    return Request(controller).patchAsync(
      `${idStaff}/editor-program/${idEditorProgram}`,
      param
    );
  },
  DeleteEditorProgram: async (idStaff: string, idEditorProgram: string) => {
    return Request(controller).deleteAsync(
      `${idStaff}/editor-program/${idEditorProgram}`
    );
  },

  //lấy list đangg chờ duyệt /staffs/pending?status=1
  GetListStaffPending: async (status: 0 | 1) => {
    return await Request(controller).getAsync(`/pending?status=${status}`);
  },
  //duyệt nhân viên sửa /staffs/9/confirm
  ConfirmStaff: async (id: string) => {
    return await Request(controller).patchAsync(`${id}/confirm`);
  },
};

export { StaffService };
