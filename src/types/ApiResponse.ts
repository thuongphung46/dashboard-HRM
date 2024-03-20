export type ErrorResponse = {
  data: any;
  status: number;
  statusText: string;
  message?: string;
};

export type ApiResponse<T> = {
  msg_code?: number;
  acknowledge?: boolean;
  data?: T;
  content?: T;
  message?: string;
};

export type ApiRes = {
  api_msg_detail: any;
  content?: any;
  status: any;
  data: any;
  message?: string;
  msg_array: string;
  msg_code: number;
};
