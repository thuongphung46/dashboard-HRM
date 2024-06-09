import { NetWork } from "./api";

const AIService = {
  Scan: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await NetWork.postFormData("ai/parse", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { AIService };
