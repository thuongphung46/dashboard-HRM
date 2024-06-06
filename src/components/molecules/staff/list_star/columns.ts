import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID nhân viên", width: 150 },
  { field: "username", headerName: "Mã nhân viên", width: 150 },
  { field: "fullName", headerName: "Tên nhân viên", width: 200 },
  { field: "jobTitle", headerName: "Chức vụ", width: 200 },
  { field: "rankName", headerName: "Hàm (Sĩ quan)", width: 150 },
  { field: "department", headerName: "Thuộc cấp quản lý", width: 200 },
  {
    field: "active",
    headerName: "Trạng thái",
    width: 150,
    type: "number",
    valueFormatter: (params) => {
      return params.value === 1 ? "Đang làm việc" : "Đã nghỉ việc";
    },
  },
];
