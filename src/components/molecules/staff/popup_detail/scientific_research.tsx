import { FC, useState } from "react";
import { GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/molecules/base_grid";
import { Box, Typography } from "@mui/material";

interface Props{}
export const ScientificResearch: FC<Props> = () => {
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

    const [rows, setRows] = useState([
        { 
            id: 1, 
            certificate_name: 'Nghiên cứu, tích hợp trợ giảng ảo vào hệ thống đào tạo kết hợp của HVKTMM', 
            num_validation: 'Chủ trì', 
            date_validation:'Cơ sở (Học viện)', 
            num_people:'2', 
            role:'', 
            hours:'',
        },
        { 
            id: 1, 
            topic_name: 'Nghiên cứu, tích hợp trợ giảng ảo vào hệ thống đào tạo kết hợp của HVKTMM', 
            position: 'Chủ trì', 
            topic_level:'Cơ sở (Học viện)', 
            accept_date:'2', 
            result:'', 
            hours:'',
        },
        
    ]);
  
    const handleAddRow1 = () => {
        const newRow = {
          id: rows.length + 1,
          certificate_name: '',
          num_validation: '',
          date_validation: '',
          num_people: '',
          role: '',
          hours: '',
        };
        setRows([...rows, newRow]);
      };

      const handleAddRow2 = () => {
        const newRow = {
          id: rows.length + 1,
          topic_name: '',
          position: '',
          topic_level: '',
          accept_date: '',
          result: '',
          hours:''
        };
        setRows([...rows, newRow]);
      };
    
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
                onAddRow={handleAddRow1}
                onRowSelectionChange={handleRowSelectionChange}
                selectedRows={selectedRows}
                />
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                <BaseGrid
                columns={[
                    { field: 'id', headerName: 'STT', width: 90 },
                    { field: 'certificate_name', headerName: 'Tên bằng sáng chế, giải thưởng', width: 150, editable: true },
                    { field: 'num_validation', headerName: 'Số QĐ công nhận', width: 150, editable: true },
                    { field: 'date_validation', headerName: 'Ngày QĐ công nhận', width: 300, editable: true },
                    { field: 'num_people', headerName: 'Số người', width: 150, editable: true },
                    { field: 'role', headerName: 'Tác giả chính/ Thành viên', width: 150, editable: true },
                    { field: 'hours', headerName: 'Số giờ quy đổi', width: 150, editable: true },
                ]}
                rows={rows}
                title="C.2 Bài báo khoa học(Phụ lục II.3 Quyết định số 1409/QĐ-HVM)"
                onSave={handleSave}
                onDelete={handleDelete}
                onAddRow={handleAddRow2}
                onRowSelectionChange={handleRowSelectionChange}
                selectedRows={selectedRows}
                />
            </Box>
        </div>
    );
};
