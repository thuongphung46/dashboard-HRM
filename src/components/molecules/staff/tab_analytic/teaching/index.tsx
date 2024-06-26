import React, { FC, useCallback, useEffect, useState } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";
import { StaffTeaching } from "types/ApplicationType";
import { StaffService } from "services/staff_service";
import { useParams } from "react-router-dom";
import { toastMessage } from "components/molecules/toast_message";

interface Props {
  data: StaffTeaching[];
  schoolYear: string;
}

export const Teaching: FC<Props> = ({ data, schoolYear }) => {
  const { id } = useParams();
  const [selectedRows1, setSelectedRows1] = useState<GridRowId[]>([]);
  const [filteredData, setFilteredData] = useState<StaffTeaching[]>([]);

  // Các cột cho lưới dữ liệu 1
  const columns1: GridColDef[] = [
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
      type: "date",
      width: 150,
      editable: true,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    {
      field: "endDate",
      headerName: "Ngày kết thúc",
      width: 150,
      type: "date",
      editable: true,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
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

  const handleAddNewORUpdate = useCallback(
    (data: any) => {
      const requestData = { ...data, schoolYear };
      if (data?.isNew && id) {
        StaffService.AddTeaching(requestData, id).then((res) => {
          if (res.msg_code === 200) {
            toastMessage("Thêm mới thành công", "success");
          } else {
            toastMessage("Thêm mới thất bại", "error");
          }
        });
      } else if (id) {
        StaffService.UpdateTeaching(requestData, id, data.id).then((res) => {
          if (res.msg_code === 200) {
            toastMessage("Cập nhật thành công", "success");
          } else {
            toastMessage("Cập nhật thất bại", "error");
          }
        });
      } else {
        toastMessage("Cập nhật thất bại", "error");
      }
    },
    [id, schoolYear]
  );

  const handleDelete = useCallback(
    (idRow: any) => {
      if (id) {
        StaffService.DeleteTeaching(id, idRow).then((res) => {
          if (res.msg_code === 200) {
            toastMessage("Xóa thành công", "success");
          } else {
            toastMessage("Xóa thất bại", "error");
          }
        });
      }
    },
    [id]
  );

  useEffect(() => {
    const filtered = data.filter((item) => item.schoolYear === schoolYear);
    setFilteredData(filtered);
  }, [data, schoolYear]);

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns1}
          rows={filteredData}
          title=""
          onSave={handleAddNewORUpdate}
          onRowSelectionChange={setSelectedRows1}
          selectedRows={selectedRows1}
          onDel={handleDelete}
        />
      </Box>
    </div>
  );
};
