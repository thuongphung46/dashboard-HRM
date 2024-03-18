import React, { FC, useState } from "react";
import { GridRowId } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";

interface Props {}

export const Assess: React.FC = () => {
  const [selectedRows1, setSelectedRows1] = useState<GridRowId[]>([]);

  // Các cột cho lưới dữ liệu 1
  const columns1 = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'semester', headerName: 'Học kỳ', width: 150, editable: true },
    { field: 'training_sys', headerName: 'Hệ đào tạo', width: 150, editable: true },
    { field: 'course_name', headerName: 'Tên học phần', width: 150, editable: true },
    { field: 'role', headerName: 'Ra đề/ coi thi/chấm thi', width: 200, editable: true },
    { field: 'mid_course', headerName: 'Giữa học phần', width: 150, editable: true },
    { field: 'end_course', headerName: 'Kết thúc học phần', width: 150, editable: true },
    { field: 'class_course', headerName: 'Lớp học phần', width: 150, editable: true },
    { field: 'num_people', headerName: 'Số sinh viên của lớp', width: 150, editable: true },
    { field: 'num_topic', headerName: 'Số đề', width: 150, editable: true },
    { field: 'num_lesion', headerName: 'Số tiết quy đổi', width: 150, editable: true },
  ];
  const rows1 = [
    { id: 1, 
      semester: 'Học kỳ I', 
      training_sys: 'Đào tạo chuyên ngành Kỹ thuật mật mã', 
      course_name: 'Học phần abc', 
      role: 'Ra đề', 
      mid_course: 'x', 
      end_course: '' ,
      class_course:'L06',
      num_people:'50',
      num_topic:'50',
      num_lesion:'3',
    },
  ];


  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns1}
          rows={rows1}
          title="C.1 Đề tài, dự án (Phụ lục II.1 Quyết định số 1409/QĐ-HVM)"
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
