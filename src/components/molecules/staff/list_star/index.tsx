import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";
import { columns } from "./columns";

interface Props {}
export const ListStaff: FC<Props> = () => {

  const rows = [
    { id: 1, staff_id: 'GV0001', staff_name: 'Nguyễn Văn A', position_name: 'Giảng viên', rank_name: 'Thượng úy', level_name: 'Bộ môn A'},
    { id: 2, staff_id: 'GV0002', staff_name: 'Trần Văn B', position_name: 'Giảng viên', rank_name: '', level_name: 'Bộ môn B'},
    { id: 3, staff_id: 'GV0003', staff_name: 'Bùi Thị C', position_name: 'Giảng viên', rank_name: '', level_name: 'Bộ môn C'},
  ];

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Danh sách nhân viên
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};
