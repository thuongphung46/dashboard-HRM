import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";

export const columns: GridColDef[] = [
  { field: "id", headerName: "STT", width: 90 },
  {
    field: "rank_id",
    headerName: "Mã hàm",
    width: 150,
  },
  {
    field: "rank_name",
    headerName: "Tên hàm",
    width: 150,
  },
  {
    field: "coefficients",
    headerName: "Hệ số lương",
    width: 150,
  },
  {
    field: "promotion_period",
    headerName: "Thời hạn thăng cấp (năm)",
    width: 200,
  },
];
