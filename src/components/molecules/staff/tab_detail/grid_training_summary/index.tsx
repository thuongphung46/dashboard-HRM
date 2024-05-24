import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { BaseGrid } from "components/atoms/datagrid";
import { toastMessage } from "components/molecules/toast_message";
import { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import { StaffService } from "services/staff_service";

interface IGridTraining {
  handleSave: (data: any) => void;
  handleRowSelect: (e: any) => void;
  dataSelectRow: any;
  dataSource: any;
}
export const GridTrainingSummary: FC<IGridTraining> = ({
  handleSave,
  dataSource,
  dataSelectRow,
  handleRowSelect,
}) => {
  const { id } = useParams();
  const columns: GridColDef[] = [
    {
      field: "fromDate",
      headerName: "Từ tháng năm",
      width: 150,
      editable: true,
      type: "date",
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    {
      field: "toDate",
      headerName: "Đến tháng năm",
      width: 150,
      editable: true,
      type: "date",
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    {
      field: "schoolName",
      headerName: "Tên trường hoặc cơ sở đào tạo",
      width: 250,
      editable: true,
    },
    {
      field: "major",
      headerName: "Ngành học",
      width: 200,
      editable: true,
    },
    {
      field: "formOfTraining",
      headerName: "Hình thức đào tạo",
      width: 200,
      editable: true,
    },
    {
      field: "certificate",
      headerName: "Văn bằng chứng chỉ",
      width: 200,
      editable: true,
    },
  ];

  const handleAddNewORUpdate = useCallback((data: any) => {
    const requestData = { ...data };
    if (data?.isNew && id) {
      StaffService.AddTrainingSummary(requestData, id).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Thêm mới thành công", "success");
        } else {
          toastMessage("Thêm mới thất bại", "error");
        }
      })
    }
    else if (id) {
      StaffService.UpdateTrainingSummary(requestData, id, data.id).then((res) => {
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

  const handleDelete = useCallback((idRow:any) => {
    if (id) {
      StaffService.DeleteTrainingSummary(id, idRow).then((res) => {
        if (res.msg_code === 200) {
          toastMessage("Xóa thành công", "success");
        } else {
          toastMessage("Xóa thất bại", "error");
        }
      })
    }
  }, [id]);

  return (
    <>
      <BaseGrid
        onRowSelectionChange={handleRowSelect}
        title="TÓM TẮT QUÁ TRÌNH ĐÀO TẠO"
        sx={{
          minHeight: "300px",
        }}
        columns={columns}
        rows={dataSource}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        selectedRows={dataSelectRow}
        onSave={handleAddNewORUpdate}
        onDel={handleDelete}
      />
    </>
  );
};
