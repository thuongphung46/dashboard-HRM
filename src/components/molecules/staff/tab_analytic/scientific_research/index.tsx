import React, { FC, useCallback, useState } from "react";
import { GridRowId } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";
import { StaffDetail } from "types/ApplicationType";
import { useParams } from "react-router-dom";
import { toastMessage } from "components/molecules/toast_message";
import { StaffService } from "services/staff_service";

interface Props {
  data: StaffDetail;
  schoolYear: string;
}

export const ScientificResearch: FC<Props> = ({ data, schoolYear }) => {
  const { id } = useParams();
  const [selectedRows1, setSelectedRows1] = useState<GridRowId[]>([]);
  const [selectedRows2, setSelectedRows2] = useState<GridRowId[]>([]);
  const [selectedRows3, setSelectedRows3] = useState<GridRowId[]>([]);
  const [selectedRows4, setSelectedRows4] = useState<GridRowId[]>([]);
  const [selectedRows5, setSelectedRows5] = useState<GridRowId[]>([]);
  const [selectedRows6, setSelectedRows6] = useState<GridRowId[]>([]);
  const [selectedRows7, setSelectedRows7] = useState<GridRowId[]>([]);

  const project = data.project;
  const magazine = data.magazine;
  const invention = data.invention;
  const book = data.book;
  const training = data.training;
  const building = data.buildingProgram;
  // Đề tài dự án
  const columns1 = [
    {
      field: "projectName",
      headerName: "Tên đề tài",
      width: 300,
      editable: true,
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{params.value}</div>
      ),
    },
    {
      field: "role",
      headerName: "Chủ trì/ Thư ký/ Thành viên",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Chủ trì", "Thư ký", "Thành viên"],
    },
    {
      field: "projectLevel",
      headerName: "Cấp đề tài",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Cơ sở (Học viện)", "Ban", "Nhà nước"],
    },
    {
      field: "endDate",
      headerName: "Ngày nghiệm thu",
      width: 150,
      editable: true,
      // type: "date",
    },
    {
      field: "result",
      headerName: "Kết quả xếp loại",
      width: 150,
      editable: true,
    },
    {
      field: "numberOfHours",
      headerName: "Số giờ quy đổi",
      width: 150,
      editable: true,
      type: "number",
    },
  ];

  const handleAddNewORUpdateProject = useCallback((data: any) => {
    const requestData = { ...data, schoolYear };
    if (data?.isNew && id) {
      StaffService.AddProject(requestData, id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Thêm mới thành công", "success");
        } else {
          toastMessage("Thêm mới thất bại", "error");
        }
      })
    }
    else if (id) {
      StaffService.UpdateProject(requestData, id, data.id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Cập nhật thành công", "success");
        } else {
          toastMessage("Cập nhật thất bại", "error");
        }
      })
    } else {
      toastMessage("Cập nhật thất bại", "error");
    }
}, [id, schoolYear])

const handleDeleteProject = useCallback((idRow:any) => {
  if (id) {
    StaffService.DeleteProject(id, idRow).then((res) => {
      if (res.msg_code === 200) {
        toastMessage("Xóa thành công", "success");
      } else {
        toastMessage("Xóa thất bại", "error");
      }
    })
  }
}, [id]);

  // bài báo khoa học
  const columns2 = [
    {
      field: "magazineName",
      headerName: "Tên bài báo",
      width: 150,
      editable: true,
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{params.value}</div>
      ),
    },
    {
      field: "magazineType ",
      headerName: "Loại tạp chí/ hội nghị",
      width: 200,
      editable: true,
    },
    {
      field: "magazineIndex",
      headerName: "Chỉ số tạp chí/ hội nghị",
      width: 200,
      editable: true,
    },
    {
      field: "numberOfPeople",
      headerName: "Số người",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "authorName",
      headerName: "Tác giả chính/ Thành viên",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Tác giả chính", "Thành viên"],
    },
    {
      field: "numberOfHour",
      headerName: "Số giờ quy đổi",
      width: 150,
      editable: true,
      type: "number",
    },
  ];

  const handleAddNewORUpdateMagazine = useCallback((data: any) => {
    const requestData = { ...data, schoolYear };
    if (data?.isNew && id) {
      StaffService.AddMagazine(requestData, id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Thêm mới thành công", "success");
        } else {
          toastMessage("Thêm mới thất bại", "error");
        }
      })
    }
    else if (id) {
      StaffService.UpdateMagazine(requestData, id, data.id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Cập nhật thành công", "success");
        } else {
          toastMessage("Cập nhật thất bại", "error");
        }
      })
    } else {
      toastMessage("Cập nhật thất bại", "error");
    }
}, [id, schoolYear])

const handleDeleteMagazine = useCallback((idRow:any) => {
  if (id) {
    StaffService.DeleteMagazine(id, idRow).then((res) => {
      if (res.msg_code === 200) {
        toastMessage("Xóa thành công", "success");
      } else {
        toastMessage("Xóa thất bại", "error");
      }
    })
  }
}, [id]);
  // Bằng sáng chế, giải thưởng
  const columns3 = [
    {
      field: "inventionName",
      headerName: "Tên bằng sáng chế, giải thưởng",
      width: 300,
      editable: true,
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{params.value}</div>
      ),
    },
    {
      field: "decisionNumber",
      headerName: "Số QĐ công nhận",
      width: 150,
      editable: true,
    },
    {
      field: "dateDecision",
      headerName: "Ngày QĐ công nhận",
      width: 150,
      editable: true,
      // type: "date",
    },
    {
      field: "numberOfPeople",
      headerName: "Số người",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "authorName",
      headerName: "Tác giả chính/ Thành viên",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Tác giả chính", "Thành viên"],
    },
    {
      field: "numberOfHour",
      headerName: "Số giờ quy đổi",
      width: 150,
      editable: true,
      type: "number",
    },
  ];

  const handleAddNewORUpdateInvention = useCallback((data: any) => {
    const requestData = { ...data, schoolYear };
    if (data?.isNew && id) {
      StaffService.AddInvention(requestData, id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Thêm mới thành công", "success");
        } else {
          toastMessage("Thêm mới thất bại", "error");
        }
      })
    }
    else if (id) {
      StaffService.UpdateInvention(requestData, id, data.id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Cập nhật thành công", "success");
        } else {
          toastMessage("Cập nhật thất bại", "error");
        }
      })
    } else {
      toastMessage("Cập nhật thất bại", "error");
    }
}, [id, schoolYear])

const handleDeleteInvention = useCallback((idRow:any) => {
  if (id) {
    StaffService.DeleteInvention(id, idRow).then((res) => {
      if (res.msg_code === 200) {
        toastMessage("Xóa thành công", "success");
      } else {
        toastMessage("Xóa thất bại", "error");
      }
    })
  }
}, [id]);
  // Sách, giáo trình
  const columns4 = [
    {
      field: "bookName",
      headerName: "Tên sách, giáo trình",
      width: 300,
      editable: true,
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{params.value}</div>
      ),
    },
    {
      field: "numberOfPublish",
      headerName: "Số xuất bản",
      width: 150,
      editable: true,
    },
    {
      field: "numberOfPage",
      headerName: "Số trang",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "numberOfPeople",
      headerName: "Số người",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "authorName",
      headerName: "Tác giả chính/ Thành viên",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Tác giả chính", "Thành viên"],
    },
    {
      field: "numberOfHour",
      headerName: "Số giờ quy đổi",
      width: 150,
      editable: true,
      type: "number",
    },
  ];
  const handleAddNewORUpdateBook = useCallback((data: any) => {
    const requestData = { ...data, schoolYear };
    if (data?.isNew && id) {
      StaffService.AddBook(requestData, id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Thêm mới thành công", "success");
        } else {
          toastMessage("Thêm mới thất bại", "error");
        }
      })
    }
    else if (id) {
      StaffService.UpdateBook(requestData, id, data.id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Cập nhật thành công", "success");
        } else {
          toastMessage("Cập nhật thất bại", "error");
        }
      })
    } else {
      toastMessage("Cập nhật thất bại", "error");
    }
}, [id, schoolYear])

const handleDeleteBook = useCallback((idRow:any) => {
  if (id) {
    StaffService.DeleteBook(id, idRow).then((res) => {
      if (res.msg_code === 200) {
        toastMessage("Xóa thành công", "success");
      } else {
        toastMessage("Xóa thất bại", "error");
      }
    })
  }
}, [id]);

  // Hướng dẫn sinh viên NCKH
  const columns5 = [
    {
      field: "projectName",
      headerName: "Tên đề tài",
      width: 300,
      editable: true,
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{params.value}</div>
      ),
    },
    {
      field: "decisionNumber",
      headerName: "Số QĐ giao nhiệm vụ",
      width: 150,
      editable: true,
    },
    {
      field: "dateDecision",
      headerName: "Ngày ký QĐ giao nhiệm vụ",
      width: 150,
      editable: true,
      // type: "date",
    },
    {
      field: "resultFaculty",
      headerName: "Kết quả bảo vệ cấp Khoa",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Khoa", "Học viện"],
    },
    {
      field: "resultAcademy",
      headerName: "Kết quả bảo vệ cấp Học viện",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Khoa", "Học viện"],
    },
    {
      field: "numberOfHour",
      headerName: "Số giờ quy đổi",
      width: 150,
      editable: true,
      type: "number",
    },
  ];

  const handleAddNewORUpdateTraining = useCallback((data: any) => {
    const requestData = { ...data, schoolYear };
    if (data?.isNew && id) {
      StaffService.AddTraining(requestData, id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Thêm mới thành công", "success");
        } else {
          toastMessage("Thêm mới thất bại", "error");
        }
      })
    }
    else if (id) {
      StaffService.UpdateTraining(requestData, id, data.id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Cập nhật thành công", "success");
        } else {
          toastMessage("Cập nhật thất bại", "error");
        }
      })
    } else {
      toastMessage("Cập nhật thất bại", "error");
    }
}, [id, schoolYear])

const handleDeleteTraining = useCallback((idRow:any) => {
  if (id) {
    StaffService.DeleteTraining(id, idRow).then((res) => {
      if (res.msg_code === 200) {
        toastMessage("Xóa thành công", "success");
      } else {
        toastMessage("Xóa thất bại", "error");
      }
    })
  }
}, [id]);

  // Xây dựng chương trình đào tạo
  const columns6 = [
    {
      field: "buildingProgramName",
      headerName: "Tên chương trình đào tạo",
      width: 300,
      editable: true,
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{params.value}</div>
      ),
    },
    {
      field: "numberOfCredits",
      headerName: "Số tín chỉ",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "decisionNumber",
      headerName: "Số QĐ giao nhiệm vụ, ngày ký QĐ giao nhiệm vụ",
      width: 150,
      editable: true,
    },
    {
      field: "buildingType",
      headerName: "Số thành viên",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "buildingType",
      headerName: "Hình thức xây dựng",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Mới", "Tu chỉnh"],
    },
    {
      field: "numberOfHour",
      headerName: "Số giờ quy đổi",
      width: 150,
      editable: true,
    },
  ];

  const handleAddNewORUpdateBuildingProgram = useCallback((data: any) => {
    const requestData = { ...data, schoolYear };
    if (data?.isNew && id) {
      StaffService.AddBuildingProgram(requestData, id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Thêm mới thành công", "success");
        } else {
          toastMessage("Thêm mới thất bại", "error");
        }
      })
    }
    else if (id) {
      StaffService.UpdateBuildingProgram(requestData, id, data.id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Cập nhật thành công", "success");
        } else {
          toastMessage("Cập nhật thất bại", "error");
        }
      })
    } else {
      toastMessage("Cập nhật thất bại", "error");
    }
}, [id, schoolYear])

const handleDeleteBuildingProgram = useCallback((idRow:any) => {
  if (id) {
    StaffService.DeleteBuildingProgram(id, idRow).then((res) => {
      if (res.msg_code === 200) {
        toastMessage("Xóa thành công", "success");
      } else {
        toastMessage("Xóa thất bại", "error");
      }
    })
  }
}, [id]);

  // Biên soạn giáo trình, bài giảng
  const columns7 = [
    {
      field: "topic_name",
      headerName: "Tên giáo trình/ bài giảng",
      width: 300,
      editable: true,
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{params.value}</div>
      ),
    },
    {
      field: "num_decision",
      headerName: "Số QĐ giao nhiệm vụ",
      width: 150,
      editable: true,
    },
    {
      field: "date_decition",
      headerName: "Ngày ký QĐ giao nhiệm vụ",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      field: "num_credits",
      headerName: "Số tín chỉ",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "num_people",
      headerName: "Số thành viên",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "role",
      headerName: "Tác giả chính/ Thành viên",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Tác giả chính", "Thành viên"],
    },
    {
      field: "hours",
      headerName: "Số giờ quy đổi",
      width: 150,
      editable: true,
    },
  ];
  const handleAddNewORUpdateEditorProgram= useCallback((data: any) => {
    const requestData = { ...data, schoolYear };
    if (data?.isNew && id) {
      StaffService.AddEditorProgram(requestData, id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Thêm mới thành công", "success");
        } else {
          toastMessage("Thêm mới thất bại", "error");
        }
      })
    }
    else if (id) {
      StaffService.UpdateEditorProgram(requestData, id, data.id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Cập nhật thành công", "success");
        } else {
          toastMessage("Cập nhật thất bại", "error");
        }
      })
    } else {
      toastMessage("Cập nhật thất bại", "error");
    }
}, [id, schoolYear])

const handleDeleteEditorProgram = useCallback((idRow:any) => {
  if (id) {
    StaffService.DeleteEditorProgram(id, idRow).then((res) => {
      if (res.msg_code === 200) {
        toastMessage("Xóa thành công", "success");
      } else {
        toastMessage("Xóa thất bại", "error");
      }
    })
  }
}, [id]);

  const rows7 = [
    {
      id: 1,
      topic_name: "",
      num_decision: "",
      date_decition: "",
      num_credits: "",
      num_people: "",
      role: "",
      hours: "",
    },
  ];

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns1}
          rows={project}
          title="C.1 Đề tài, dự án (Phụ lục II.1 Quyết định số 1409/QĐ-HVM)"
          onSave={handleAddNewORUpdateProject}
          onDel={handleDeleteProject}
          onRowSelectionChange={setSelectedRows1}
          selectedRows={selectedRows1}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns2}
          rows={magazine}
          title="C.2 Bài báo khoa học(Phụ lục II.3 Quyết định số 1409/QĐ-HVM)"
          onSave={handleAddNewORUpdateMagazine}
          onDel={handleDeleteMagazine}
          onRowSelectionChange={setSelectedRows2}
          selectedRows={selectedRows2}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns3}
          rows={invention}
          title="C.3 Bằng sáng chế, giải thưởng khoa học trong năm (Phụ lục II.4 Quyết định số 1409/QĐ-HVM)"
          onSave={handleAddNewORUpdateInvention}
          onDel={handleDeleteInvention}
          onRowSelectionChange={setSelectedRows3}
          selectedRows={selectedRows3}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns4}
          rows={book}
          title="C.4 Sách, giáo trình xuất bản trong nước được Hội đồng GSNN tính điểm (Phụ lục II.5 Quyết định số 1409/QĐ-HVM)"
          onSave={handleAddNewORUpdateBook}
          onDel={handleDeleteBook}
          onRowSelectionChange={setSelectedRows4}
          selectedRows={selectedRows4}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns5}
          rows={training}
          title="C.5 Hướng dẫn sinh viên NCKH, huấn luyện đội tuyển (Phụ lục II.6 Quyết định số 1409/QĐ-HVM)"
          onSave={handleAddNewORUpdateTraining}
          onDel={handleDeleteTraining}
          onRowSelectionChange={setSelectedRows5}
          selectedRows={selectedRows5}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns6}
          rows={building}
          title="C.6 Xây dựng chương trình đào tạo (Phụ lục II.8 Quyết định số 1409/QĐ-HVM)"
          onSave={handleAddNewORUpdateBuildingProgram}
          onDel={handleDeleteBuildingProgram}
          onRowSelectionChange={setSelectedRows6}
          selectedRows={selectedRows6}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns7}
          rows={rows7}
          title="C.7 Biên soạn giáo trình, bài giảng (Phụ lục II.9 Quyết định số 1409/QĐ-HVM)"
          onSave={handleAddNewORUpdateEditorProgram}
          onDel={handleDeleteEditorProgram}
          onRowSelectionChange={setSelectedRows7}
          selectedRows={selectedRows7}
        />
      </Box>
    </div>
  );
};
