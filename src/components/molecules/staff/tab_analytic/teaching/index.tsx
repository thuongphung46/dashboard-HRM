import React, { FC, useState } from "react";
import { GridRowId } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";

interface Props {}

export const Teaching: React.FC = () => {
  const [selectedRows1, setSelectedRows1] = useState<GridRowId[]>([]);

  // Các cột cho lưới dữ liệu 1
  const columns1 = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'semester', headerName: 'Học kỳ', width: 150, editable: true },
    { field: 'training_sys', headerName: 'Hệ đào tạo', width: 150, editable: true },
    { field: 'course_name', headerName: 'Tên học phần', width: 150, editable: true },
    { field: 'num_credits', headerName: 'Số tín chỉ', width: 200, editable: true },
    { field: 'class_course', headerName: 'Lớp học phần', width: 150, editable: true },
    { field: 'training_type', headerName: 'Loại hình đào tạo', width: 150, editable: true },
    { field: 'num_schedule', headerName: 'Số tiết theo TKB', width: 150, editable: true },
    { field: 'num_standard', headerName: 'Số tiết QC', width: 150, editable: true },
  ];
  const rows1 = [
    { id: 1, 
      semester: 'Học kỳ I', 
      training_sys: 'Đào tạo chuyên ngành Kỹ thuật mật mã', 
      course_name: 'Tin học văn phòng-1-22', 
      num_credits: '3',
      class_course:'TC25',
      training_type:'',
      num_schedule:'54',
      num_standard:'60',
    },
  ];


  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns1}
          rows={rows1}
          title=""
          onSave={() => { /* Logic lưu cho lưới dữ liệu 1 */ }}
          onDelete={() => { /* Logic xóa cho lưới dữ liệu 1 */ }}
          onAddRow={() => { /* Logic thêm dòng cho lưới dữ liệu 1 */ }}
          onRowSelectionChange={setSelectedRows1}
          selectedRows={selectedRows1}
        />
      </Box>
    </div>
  );
};
