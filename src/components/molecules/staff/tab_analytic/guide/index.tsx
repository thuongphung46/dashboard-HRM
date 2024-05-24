import { FC, useCallback, useState } from "react";
import { GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { StaffInstructProject } from "types/ApplicationType";
import { useParams } from "react-router-dom";
import { toastMessage } from "components/molecules/toast_message";
import { StaffService } from "services/staff_service";

interface Row {
  id: number;
  student_name: string;
  training: string;
  num_decision: string;
  num_instructors: string;
  main_instructors: boolean;
  num_lesion: string;
}

interface Props {
  data: StaffInstructProject[];
  schoolYear: string;
}
export const Guide: FC<Props> = ({ data, schoolYear }) => {
  const { id } = useParams();
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

  const columns = [
    {
      field: "studentName",
      headerName: "Họ tên NCS",
      width: 300,
      editable: true,
    },
    {
      field: "trainingCourse",
      headerName: "Khóa đào tạo",
      width: 150,
      editable: true,
    },
    {
      field: "decisionNumber",
      headerName: "Số QĐ Giao Luận án, Luận văn, Đồ án",
      width: 300,
      editable: true,
    },
    {
      field: "numberOfInstructors",
      headerName: "Số người HD",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "main_instructors",
      headerName: "HD chính",
      width: 150,
      type: "boolean",
      renderCell: (params: GridRenderCellParams<any, boolean>) => (
        <Checkbox
          checked={params.value}
          onChange={(event) => {
            const checked = event.target.checked;
            const updatedRows = data.map((row) => {
              if (row.id === params.row.id) {
                return { ...row, main_instructors: checked };
              }
              return row;
            });
          }}
        />
      ),
    },
    {
      field: "numberOfLesson",
      headerName: "Số tiết quy đổi",
      width: 150,
      editable: true,
      type: "number",
    },
  ];


  const handleAddNewORUpdate = useCallback((data: any) => {
    // console.log(data);
    const requestData = { ...data, schoolYear };
    if (data?.isNew && id) {
      StaffService.AddInstructProject(requestData, id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Thêm mới thành công", "success");
        } else {
          toastMessage("Thêm mới thất bại", "error");
        }
      })
    }
    else if (id) {
      StaffService.UpdateInstructProject(requestData, id, data.id).then((res) => {
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

  const handleDelete = useCallback((idRow:any) => {
    if (id) {
      StaffService.DeleteInstructProject(id, idRow).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Xóa thành công", "success");
        } else {
          toastMessage("Xóa thất bại", "error");
        }
      })
    }
  }, [id]);

  return (
    <Box>
      <BaseGrid
        columns={columns}
        rows={data}
        title=""
        onSave={handleAddNewORUpdate}
        onDel={handleDelete}
        onRowSelectionChange={setSelectedRows}
        selectedRows={selectedRows}
      />
    </Box>
  );
};
