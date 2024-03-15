import { FC, useState, useRef } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import{columns} from "./columns"
import { DataGrid, GridRowId } from "@mui/x-data-grid";

interface Props{}
export const GeneralResion: FC<Props> = () => {
  
  const [isAddingRow, setIsAddingRow] = useState(false);
  const gridRef = useRef<any>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]); // State để lưu trữ các dòng được chọn
  
  const [dataSource, setDataSource] = useState([
    { id: 1, resion_id: 'cnbm', resion: 'Chủ nhiệm bộ môn', reduce: '20%'},
    { id: 2, resion_id: 'cvht', resion: 'Cố vấn học tập', reduce: '15%'},
    { id: 3, resion_id: 'dh', resion: 'Đi học', reduce: '10%'},
  ]);


  const handleAddRow = () => {
    setIsAddingRow(true); // Set isAddingRow to true when adding a new row

    const newRow = {
      id: dataSource.length + 1, // Sửa lại thành dataSource.length + 1 để đảm bảo ID duy nhất
      resion_id: '',
      resion: '',
      reduce: ''
    };
    setDataSource([...dataSource, newRow]);
  };

  const handleSave = () => {

  };

  const handleRowSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection); // Cập nhật state khi có sự thay đổi trong việc chọn dòng
  };

  const handleDelete = () => {
    const updatedDataSource = dataSource.filter((row: any) => !selectedRows.includes(row.id));
    setDataSource(updatedDataSource);
    setSelectedRows([]); // Clear selected rows after delete
  };


  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Lý do giảm trừ
      </Typography>

      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleAddRow}>Add Row</button>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={dataSource}
          columns={columns(isAddingRow)}
          ref={gridRef}
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
          onRowSelectionModelChange={handleRowSelectionChange}
          rowSelectionModel={selectedRows}
        />
      </Box>
    </div>
  );
};
