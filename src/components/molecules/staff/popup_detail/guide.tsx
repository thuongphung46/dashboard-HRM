import { FC, useState, useRef } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";

interface Props{}
export const Guide: FC<Props> = () => {

    const [isAddingRow, setIsAddingRow] = useState(false);
    const gridRef = useRef<any>(null);
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'STT', width: 90 },
        { field: 'student_name', headerName: 'Tên NCS', width: 150 },
        { field: 'training', headerName: 'Khóa đào tạo', width: 150 },
        { field: 'num_decision', headerName: 'Số QĐ Giao Luận án, Luận văn, Đồ án', width: 150 },
        { field: 'num_instructors', headerName: 'Số QĐ Giao Luận án, Luận văn, Đồ án', width: 150 },
        { field: 'main_instructors', headerName: 'HD chính', width: 150 },
        { field: 'num_lesion', headerName: 'Số tiết quy đổi', width: 150 },
    ];

    const [dataSource, setDataSource] = useState([
      { id: 1, student_name: 'Vũ Trung Kiên', training: 'CT4', num_decision:'1677 / QĐ-HVM', num_instructors:'2', main_instructors:'', num_lesion:'15'},
      { id: 2, student_name: 'Phạm Thị Kim', training: 'CT4', num_decision:'1677 / QĐ-HVM', num_instructors:'2', main_instructors:'', num_lesion:'15'},
      { id: 3, student_name: 'Phan Kim Liên', training: 'CT4', num_decision:'1677 / QĐ-HVM', num_instructors:'2', main_instructors:'', num_lesion:'15'},
      { id: 4, student_name: 'Trần Minh Đức', training: 'CT4', num_decision:'1677 / QĐ-HVM', num_instructors:'2', main_instructors:'', num_lesion:'15'},
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
      setSelectedRows(selection);
    };
  
    const handleDelete = () => {
      const updatedDataSource = dataSource.filter((row: any) => !selectedRows.includes(row.id));
      setDataSource(updatedDataSource);
      setSelectedRows([]);
    };
  
  
    return (
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleAddRow}>Add Row</button>
  
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={dataSource}
            columns={columns}
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
