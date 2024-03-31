import React, { FC, useState } from "react";
import { GridRowId } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";

interface Props {
  data: StaffTeaching[];
}

export const Teaching: React.FC<Props> = ({ data }) => {
  const [selectedRows1, setSelectedRows1] = useState<GridRowId[]>([]);

  // Các cột cho lưới dữ liệu 1
  const columns1 = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "term",
      headerName: "Học kỳ",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Học kỳ I", "Học kỳ II"],
    },
    {
      field: "training_sys",
      headerName: "Hệ đào tạo",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "Đào tạo chuyên ngành Kỹ thuật Mật Mã",
        "Đào tạo hệ đóng phí",
      ],
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{params.value}</div>
      ),
    },
    {
      field: "courseName",
      headerName: "Tên học phần",
      width: 300,
      editable: true,
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{params.value}</div>
      ),
    },
    {
      field: "numberOfCredit",
      headerName: "Số tín chỉ",
      width: 100,
      editable: true,
      type: "number",
    },
    {
      field: "startDate",
      headerName: "Ngày bắt đầu",
      width: 150,
      editable: true,
    },
    {
      field: "endDate",
      headerName: "Ngày kết thúc",
      width: 150,
      editable: true,
    },
    {
      field: "numberOfStudent",
      headerName: "Số sinh viên",
      width: 120,
      editable: true,
      type: "number",
    },
    {
      field: "roundStandard",
      headerName: "Quy chuẩn làm tròn",
      width: 100,
      editable: true,
      type: "number",
    },
  ];
  const rows1 = [
    {
      id: 1,
      semester: "Học kỳ I",
      training_sys: "Đào tạo chuyên ngành Kỹ thuật mật mã",
      course_name: "Tin học văn phòng-1-22",
      num_credits: "3",
      class_course: "TC25",
      training_type: "",
      num_schedule: "54",
      num_standard: "60",
    },
  ];

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns1}
          rows={data}
          title=""
          onSave={() => {
            /* Logic lưu cho lưới dữ liệu 1 */
          }}
          onRowSelectionChange={setSelectedRows1}
          selectedRows={selectedRows1}
        />
      </Box>
    </div>
  );
};
