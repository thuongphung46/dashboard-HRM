import { FC, useState } from "react";
import { GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/molecules/base_grid";
import { Box, Typography } from "@mui/material";

interface Props{}
export const ScientificResearch: FC<Props> = () => {
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

    const [rows, setRows] = useState([
      { id: 1, student_name: 'Vũ Trung Kiên', training: 'CT4', num_decision:'1677 / QĐ-HVM', num_instructors:'2', main_instructors:'', num_lesion:'15'},
    //   { id: 2, student_name: 'Phạm Thị Kim', training: 'CT4', num_decision:'1677 / QĐ-HVM', num_instructors:'2', main_instructors:'', num_lesion:'15'},
    //   { id: 3, student_name: 'Phan Kim Liên', training: 'CT4', num_decision:'1677 / QĐ-HVM', num_instructors:'2', main_instructors:'', num_lesion:'15'},
    //   { id: 4, student_name: 'Trần Minh Đức', training: 'CT4', num_decision:'1677 / QĐ-HVM', num_instructors:'2', main_instructors:'', num_lesion:'15'},
    ]);
  
    const handleAddRow = () => {
        const newRow = {
          id: rows.length + 1,
          student_name: '',
          training: '',
          num_decision: '',
          num_instructors: '',
          main_instructors: '',
          num_lesion: '',
        };
        setRows([...rows, newRow]);
      };

    const handleAddRow2 = (data:any) =>{

    }
    
      const handleSave = () => {
        // Handle save logic here
      };
    
      const handleDelete = () => {
        const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
        setRows(updatedRows);
        setSelectedRows([]);
      };
    
      const handleRowSelectionChange = (selection: GridRowId[]) => {
        setSelectedRows(selection);
      };
  
    return (
        <div>
            <Box sx={{ height: 400, width: '100%' }}>
                <BaseGrid
                columns={[
                    { field: 'id', headerName: 'STT', width: 90 },
                    { field: 'topic_name', headerName: 'Tên đề tài', width: 150, editable: true },
                    { field: 'position', headerName: 'Chủ trì/ Thư ký/ Thành viên', width: 150, editable: true },
                    { field: 'topic_level', headerName: 'Cấp đề tài', width: 300, editable: true },
                    { field: 'accept_date', headerName: 'Ngày nghiệm thu', width: 150, editable: true },
                    { field: 'result', headerName: 'Kết quả xếp loại', width: 150, editable: true },
                    { field: 'hours', headerName: 'Số giờ quy đổi', width: 150, editable: true },
                ]}
                rows={rows}
                title="C.1 Đề tài, dự án (Phụ lục II.1 Quyết định số 1409/QĐ-HVM)"
                onSave={handleSave}
                onDelete={handleDelete}
                onAddRow={handleAddRow}
                onRowSelectionChange={handleRowSelectionChange}
                selectedRows={selectedRows}
                />
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                <BaseGrid
                columns={[
                    { field: 'id', headerName: 'STT', width: 90 },
                    { field: 'student_name', headerName: 'Tên NCS', width: 150, editable: true },
                    { field: 'training', headerName: 'Khóa đào tạo', width: 150, editable: true },
                    { field: 'num_decision', headerName: 'Số QĐ Giao Luận án, Luận văn, Đồ án', width: 300, editable: true },
                    { field: 'num_instructors', headerName: 'Số người HD', width: 150, editable: true },
                    { field: 'main_instructors', headerName: 'HD chính', width: 150, editable: true },
                    { field: 'num_lesion', headerName: 'Số tiết quy đổi', width: 150, editable: true },
                ]}
                rows={rows}
                title="C.2 Bài báo khoa học(Phụ lục II.3 Quyết định số 1409/QĐ-HVM)"
                onSave={handleSave}
                onDelete={handleDelete}
                onAddRow={handleAddRow}
                onRowSelectionChange={handleRowSelectionChange}
                selectedRows={selectedRows}
                />
            </Box>
        </div>
    );
};
