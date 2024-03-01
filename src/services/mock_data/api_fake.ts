import { MessageCode } from "types/enum/message_code";

export const Get = (data_list: any[]) => {
  return {
    msg_code: MessageCode.Success,
    content: {
      pagination: [
        {
          page_index: 1,
          page_total: data_list.length,
          page_size: 50,
          total: data_list.length,
        },
      ],
      object_data: data_list,
    },
    message: "",
  };
};

export const GetByID = (id: any, data_list: any[], column_id = "code") => {
  let data = data_list.find((x) => x[column_id] === id);
  return {
    msg_code: MessageCode.Success,
    content: {
      ...data,
      data_line1: data.data_line1,
      data_line2: data.data_line2,
      data_line3: data.data_line3,
    },
    message: "Thành công",
    msg_array: null,
    api_msg_detail: null,
    msg_info: {
      message: "Thành công",
      msg_code: 200,
    },
  };
};

export const success_result = {
  msg_code: MessageCode.Success,
  content: null,
  message: "",
  msg_info: { msg_code: MessageCode.Success, message: "Thành công" },
};
