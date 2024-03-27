import { Request } from "./request";

const controller = "file";

const FileTkbService = {
    upload: async (file: File) => {
        return await Request(controller).postAsync(`import-schedule-standard`, file);
    },
};

export { FileTkbService };