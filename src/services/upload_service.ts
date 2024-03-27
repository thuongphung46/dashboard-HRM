import {  axiosInstance} from "./request";
import { getToken } from "common/function";

// const controller = "file";

const FileTkbService = {
    uploadFile: async (file:File) => {
        try {
            const jwt = await getToken();
          const formData = new FormData();
          formData.append('file', file);
      
          const response = await axiosInstance.post('file/import-schedule-standard', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${jwt}`,
            },
          });
          let data = JSON.parse(response.data)
          return data;
        } catch (error) {
          throw error;
        }
      },
};

export { FileTkbService };