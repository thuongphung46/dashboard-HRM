import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'STT', width: 90 },
  { field: 'staff_id', headerName: 'Mã nhân viên', width: 150 },
  { field: 'fullName', headerName: 'Tên nhân viên', width: 150 },
  { field: 'jobTitle', headerName: 'Chức vụ', width: 150 },
  { field: 'rank_name', headerName: 'Hàm (Sĩ quan)', width: 150 },
  { field: 'level_name', headerName: 'Thuộc cấp quản lý', width: 150 },
  // { field: 'active', headerName: 'Trạng thái', width: 150 },
];
