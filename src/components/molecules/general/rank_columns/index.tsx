import { FC } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from '@mui/material/Typography';
import { useGetListRank } from "services/hooks/useGetListRank";

interface Props{}

export const GeneralRank: FC<Props> = () => {
    const columns: GridColDef[] = [
      { field: "id", headerName: "STT", width: 90 },
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

    const { data } = useGetListRank();
  
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          Tổ chức cán bộ
        </Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            // pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    );
  };
  