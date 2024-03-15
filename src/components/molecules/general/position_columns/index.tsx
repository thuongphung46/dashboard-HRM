import { FC, useState, useRef } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import Typography from '@mui/material/Typography';
import{columns} from "./columns"

interface Props{}
export const GeneralPosition: FC<Props> = () => {

    const [isAddingRow, setIsAddingRow] = useState(false);
    const gridRef = useRef<any>(null);
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]); // State để lưu trữ các dòng được chọn
  
    const [dataSource, setDataSource] = useState([
      { id: 1, position_id: 'giamdoc', position_name: 'Giám đốc'},
      { id: 2, position_id: 'phogiamdoc', position_name: 'Phó giám đốc'},
      { id: 3, position_id: 'chunhiem', position_name: 'Chủ nhiệm'},
    ]);
  
   
    const handleAddRow = () => {
        setIsAddingRow(true);     

        const newRow = {
        id: dataSource.length + 1,
        position_id: '',
        position_name: '',
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
          Chức vụ
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