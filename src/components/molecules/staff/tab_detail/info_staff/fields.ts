import { IFormData } from "components/atoms/field";

export const fieldsData: IFormData[] = [
  { id: "username", label: "Mã nhân viên", type: "text" },
  { id: "fullName", label: "Họ và tên", type: "text" },
  { id: "password", label: "Mật khẩu", type: "password" },
  {
    id: "level",
    label: "Level",
    type: "select",
    options: [
      {
        value: "LEVEL_1",
        label: "level1",
      },
      {
        value: "LEVEL_2",
        label: "level2",
      },
      {
        value: "LEVEL_3",
        label: "level3",
      },
      {
        value: "LEVEL_4",
        label: "level4 ",
      },
    ],
  },
  {
    id: "gender",
    label: "Giới tính",
    type: "select",
    options: [
      {
        value: 1,
        label: "Nam",
      },
      {
        value: 2,
        label: "Nữ",
      },
    ],
  },
  { id: "dateOfBirth", label: "Ngày sinh", type: "date" },
  { id: "personalEmail", label: "Email", type: "text" },
  { id: "phoneNumber", label: "Số điện thoại", type: "text" },
  { id: "currentWorking", label: "Đơn vị công tác", type: "text" },
  { id: "departmentId", label: "Cấp quản lý", type: "select", options: [] },
  {
    id: "groupId",
    label: "Bộ môn (nếu có)",
    type: "select",
    options: [
      {
        value: "1",
        label: "Đây là bộ môn (phòng ban cấp 2)",
      },
    ],
  },
  { id: "jobTitle", label: "Chức vụ", type: "select", options: [] },
  { id: "rankId", label: "Hàm (Sĩ quan)", type: "select", options: [] },
  { id: "ratio", label: "Hệ số lương", type: "number" },
  { id: "country", label: "Quốc tịch", type: "text" },
  { id: "identityBirthPlace", label: "Nơi sinh", type: "text" },
  { id: "identityBirthPlace2", label: "Nguyên quán", type: "text" },
  { id: "currentPlace", label: "Chỗ ở hiện nay", type: "text" },

  {
    id: "identityPlace",
    label: "Nơi đăng ký hộ khẩu thường trú",
    type: "text",
  },
  { id: "identityCode", label: "CMND/CCCD", type: "text" },
  { id: "identityDate", label: "Ngày cấp", type: "date" },
  { id: "placeOfIssue", label: "Nơi cấp", type: "text" },
  { id: "bankAccount", label: "Số tài khoản", type: "text" },
  { id: "bankName", label: "Ngân hàng", type: "text" },
  { id: "favorite", label: "Sở thích", type: "text" },
  {
    id: "active",
    label: "Trạng thái",
    type: "select",
    options: [
      {
        value: 1,
        label: "Đang làm việc",
      },
      {
        value: 0,
        label: "Đã nghỉ việc",
      },
    ],
  },

  { id: "ethnicity", label: "Dân tộc", type: "text" },
  { id: "religion", label: "Tôn giáo", type: "text" },
  { id: "education_level", label: "Trình độ văn hóa", type: "text" },
  { id: "doan_tncs_hcm", label: "Kết nạp Đoàn TNCS HCM tại", type: "text" },
  { id: "dang_csvn", label: "Kết nạp Đảng CSVN tại", type: "text" },
];
