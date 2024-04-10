import { NetWork } from "./api";

// const controller = "file";

const FileTkbService = {
  uploadFile: async (file: File, term: string, schoolYear: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("term", term);
      formData.append("schoolYear", schoolYear);
      const response = await NetWork.postFormData(
        "file/import-schedule-standard",
        formData
      );
      console.log("Response: ", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { FileTkbService };
