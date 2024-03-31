import { FC, useState } from "react";
import { Box } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";
import { GridRowId } from "@mui/x-data-grid";
import { STAFF_EXAM } from "constants/global_data";

interface Props {
  data: StaffExamCourse[];
}

export const Assess: FC<Props> = ({ data }) => {
  const [selectedRows1, setSelectedRows1] = useState<GridRowId[]>([]);
  const [selectedRows2, setSelectedRows2] = useState<GridRowId[]>([]);

  const middle = data.filter((item) => item.examName === STAFF_EXAM.MIDDLE);
  const end = data.filter((item) => item.examName === STAFF_EXAM.END);

  const [rows1, setRows1] = useState<any>([
    {
      id: 1,
      semester: "Học kỳ I",
      training_sys: "Đào tạo chuyên ngành Kỹ thuật mật mã",
      course_name: "Học phần abc",
      role: "Ra đề",
      class_course: "L06",
      num_people: "50",
      num_topic: "50",
      num_lesion: "3",
    },
  ]);

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
      field: "systemSchool",
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
      field: "action",
      headerName: "Ra đề/ Coi thi/ Chấm thi",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Ra đề", "Coi thi", "Chấm thi"],
    },
    {
      field: "courseCode",
      headerName: "Lớp học phần",
      width: 150,
      editable: true,
    },
    {
      field: "numberOfStudent",
      headerName: "Số sinh viên của lớp",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "numberOfExam",
      headerName: "Số đề",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "estimatedLesson",
      headerName: "Số tiết quy đổi",
      width: 150,
      editable: true,
      type: "number",
    },
  ];

  const [rows2, setRows2] = useState<any>([
    {
      id: 1,
      semester: "Học kỳ I",
      training_sys: "Đào tạo chuyên ngành Kỹ thuật mật mã",
      course_name: "Học phần abc",
      role: "Ra đề",
      class_course: "L06",
      num_people: "50",
      training_course: "",
      num_lesion: "3",
    },
  ]);

  const columns2 = [
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
      field: "systemSchool",
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
      field: "action",
      headerName: "Ra đề/ Coi thi/ Chấm thi",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Ra đề", "Coi thi", "Chấm thi"],
    },
    // {
    //   field: "courseName",
    //   headerName: "Lớp học phần",
    //   width: 150,
    //   editable: true,
    // },
    {
      field: "numberOfStudent",
      headerName: "Số sinh viên của lớp",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "trainingCourse",
      headerName: "Khóa ĐT",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "estimatedLesson",
      headerName: "Số tiết quy đổi",
      width: 150,
      editable: true,
      type: "number",
    },
  ];

  const handleAddRow = () => {
    const newRow = {
      id: rows1.length + 1,
      semester: "",
      training_sys: "",
      course_name: "",
      role: "",
      class_course: "",
      num_people: "",
      num_topic: "",
      num_lesion: "",
    };
    setRows1([...rows1, newRow]);
  };
  const handleSave = () => {
    // Handle save logic here
  };

  const handleDelete = () => {
    // const updatedRows = rows1.filter((row) => !selectedRows1.includes(row.id));
    // setRows1(updatedRows);
    // setSelectedRows1([]);
  };

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns1}
          rows={middle}
          title="Đánh giá giữa học phần"
          onSave={handleSave}
          onRowSelectionChange={setSelectedRows1}
          selectedRows={selectedRows1}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns2}
          rows={end}
          title="Đánh giá hết học phần"
          onSave={() => {}}
          onRowSelectionChange={setSelectedRows2}
          selectedRows={selectedRows2}
        />
      </Box>
    </div>
  );
};
