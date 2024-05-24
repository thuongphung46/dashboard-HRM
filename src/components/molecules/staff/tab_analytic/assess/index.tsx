import { FC, useCallback, useState } from "react";
import { Box } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";
import { GridRowId } from "@mui/x-data-grid";
import { STAFF_EXAM } from "constants/global_data";
import { StaffExamCourse } from "types/ApplicationType";
import { StaffService } from "services/staff_service";
import { toastMessage } from "components/molecules/toast_message";
import { useParams } from "react-router-dom";

interface Props {
  data: StaffExamCourse[];
}

export const Assess: FC<Props> = ({ data }) => {
  const { id } = useParams();
  const [selectedRows1, setSelectedRows1] = useState<GridRowId[]>([]);
  const [selectedRows2, setSelectedRows2] = useState<GridRowId[]>([]);

  const middle = data.filter((item) => item.examName === STAFF_EXAM.MIDDLE);
  const end = data.filter((item) => item.examName === STAFF_EXAM.END);

  const columns1 = [
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

  const columns2 = [
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

  const handleAddNewORUpdate = useCallback((data: any, examName: string) => {
    const dataWithExamName = { ...data, examName };
    if (data?.isNew && id) {
      StaffService.AddExamCourse(dataWithExamName, id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Thêm mới thành công", "success");
        } else {
          toastMessage("Thêm mới thất bại", "error");
        }
      })
    }
    else if (id) {
      StaffService.UpdateExamCourse(dataWithExamName, id, data.id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Cập nhật thành công", "success");
        } else {
          toastMessage("Cập nhật thất bại", "error");
        }
      })
    } else {
      toastMessage("Cập nhật thất bại", "error");
    }
  }, [id])

  const handleDelete = useCallback((data:any) => {
    //
  }, []);

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns1}
          rows={middle}
          title="Đánh giá giữa học phần"
          onSave={(data: any) => handleAddNewORUpdate(data, "MIDDLE_EXAM")}
          onDel={handleDelete}
          onRowSelectionChange={setSelectedRows1}
          selectedRows={selectedRows1}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns2}
          rows={end}
          title="Đánh giá hết học phần"
          onSave={(data: any) => handleAddNewORUpdate(data, "END_EXAM")}
          onDel={handleDelete}
          onRowSelectionChange={setSelectedRows2}
          selectedRows={selectedRows2}
        />
      </Box>
    </div>
  );
};
