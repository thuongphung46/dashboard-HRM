import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";

export const columns: GridColDef[] = [
  // { field: 'id', headerName: 'STT', width: 90 },
  { field: 'id', headerName: 'ID nhân viên', width: 150 },
  { field: 'username', headerName: 'Mã nhân viên', width: 150 },
  { field: 'fullName', headerName: 'Tên nhân viên', width: 150 },
  { field: 'jobTitle', headerName: 'Chức vụ', width: 150 },
  { field: 'rankName', headerName: 'Hàm (Sĩ quan)', width: 150 },
  { field: 'department', headerName: 'Thuộc cấp quản lý', width: 150 },
  // { field: 'active', headerName: 'Trạng thái', width: 150, type: "boolean" , valueFormatter: (params: GridCellParams) => {
  //   return params.value ? "Đang hoạt động" : "Ngừng hoạt động";
  // }},
];
 