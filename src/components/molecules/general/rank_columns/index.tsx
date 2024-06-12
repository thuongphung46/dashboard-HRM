import { FC } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { useGetListRank } from "services/hooks/useGetListRank";

interface Props { }

export const GeneralRank: FC<Props> = () => {
  const { data } = useGetListRank();
  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Mã hàm",
      width: 150,
    },
    {
      field: "rankName",
      headerName: "Tên hàm",
      width: 150,
    },
    {
      field: "ratio",
      headerName: "Hệ số lương",
      width: 150,
    },
    {
      field: "year",
      headerName: "Thời hạn thăng cấp (năm)",
      width: 200,
    },
  ];




  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Tổ chức cán bộ
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};
