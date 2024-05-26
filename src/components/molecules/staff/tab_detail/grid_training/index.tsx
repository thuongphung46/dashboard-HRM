import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { BaseGrid } from "components/atoms/datagrid";
import { toastMessage } from "components/molecules/toast_message";
import moment from "moment";
import { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import { StaffService } from "services/staff_service";

interface IGridTraining {
  handleSave: (data: any) => void;
  handleRowSelect: (e: any) => void;
  dataSelectRow: any;
  dataSource: any;
}
export const GridTraining: FC<IGridTraining> = ({
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
      field: "workingPlace",
      headerName: "Đơn vị công tác",
      width: 400,
      editable: true,
    },
    {
      field: "jobTitle",
      headerName: "Chức vụ",
      width: 200,
      editable: true,
    },
  ];

  const handleAddNewORUpdate = useCallback((data: any, type: string) => {
    const dataWorkingHistory = { ...data, type };
    if (dataWorkingHistory.fromDate && dataWorkingHistory.toDate) {
      dataWorkingHistory.fromDate = moment(dataWorkingHistory.fromDate).format('YYYY-MM-DD HH:mm:ss');
      dataWorkingHistory.toDate = moment(dataWorkingHistory.toDate).format('YYYY-MM-DD HH:mm:ss');
    }
    if (data?.isNew && id) {
      StaffService.AddWorkingHistory(dataWorkingHistory, id).then((res) => {
        // if (res.msg_code === 200) {
        toastMessage("Thêm mới thành công", "success");
        // } else {
        //   toastMessage("Thêm mới thất bại", "error");
        // }
      })
    }
    else if (id) {
      StaffService.UpdateWorkingHistory(dataWorkingHistory, id, data.id).then((res) => {
        // if (res.msg_code === 200) {
        toastMessage("Cập nhật thành công", "success");
        // } else {
        //   toastMessage("Cập nhật thất bại", "error");
        // }
      })
    } else {
      toastMessage("Cập nhật thất bại", "error");
    }
  }, [id])

  const handleDelete = useCallback((idRow: any) => {
    if (id) {
      StaffService.DeleteWorkingHistory(id, idRow).then((res) => {
        // if (res.msg_code === 200) {
        toastMessage("Xóa thành công", "success");
        // } else {
        //   toastMessage("Xóa thất bại", "error");
        // }
      })
    }
  }, [id]);

  return (
    <>
      <BaseGrid
        onRowSelectionChange={handleRowSelect}
        title="TÓM TẮT QUÁ TRÌNH CÔNG TÁC"
        columns={columns}
        rows={dataSource}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        onSave={(data: any) => handleAddNewORUpdate(data, "OUT_ACADEMY")}
        onDel={handleDelete}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        selectedRows={dataSelectRow}
      />
    </>
  );
};
