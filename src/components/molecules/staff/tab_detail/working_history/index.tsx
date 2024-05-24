import { FC, useCallback, useState } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { Grid } from "@mui/material";
import { StaffDetail } from "types/ApplicationType";
import { Action } from "types/action";
import { useParams } from "react-router-dom";
import { StaffService } from "services/staff_service";
import { toastMessage } from "components/molecules/toast_message";
import moment from "moment";

interface Props extends Action {
  data: StaffDetail;
  id: any;
}
interface IGridWorkingHistory {
  handleSave: (data: any) => void;
  handleRowSelect: (e: any) => void;
  dataSelectRow: any;
  dataSource: any;
}

export const GridWorkingHistory: FC<IGridWorkingHistory> = ({
  handleSave,
  dataSource,
  dataSelectRow,
  handleRowSelect,
}) => {
  const { id } = useParams();
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Ngày",
      width: 150,
      editable: true,
      type: "date",
      valueGetter: (params) => {
        return params.value ? new Date(params.value) : null;
      },
      renderCell: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    // {
    //   field: "toDate",
    //   headerName: "Đến ngày",
    //   width: 150,
    //   editable: true,
    //   type: "date",
    //   valueGetter: (params) => {
    //     return params.value ? new Date(params.value) : null;
    //   },
    //   renderCell: (params) => {
    //     return params.value ? new Date(params.value).toLocaleDateString() : "";
    //   },
    // },
    {
      field: "jobTitle",
      headerName: "Chức vụ",
      width: 300,
      editable: true,
      type: "text",
    },
    {
      field: "content",
      headerName: "Nội dung",
      width: 400,
      editable: true,
      type: "text",
    },
  ];

  const handleAddNewORUpdate = useCallback((data: any, type: string) => {
    const dataWorkingHistory = { ...data, type };
    if (dataWorkingHistory.date) {
      dataWorkingHistory.date = moment(dataWorkingHistory.date).format('YYYY-MM-DD HH:mm:ss');
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

  const handleDelete = useCallback((idRow:any) => {
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
        title=""
        columns={columns}
        rows={dataSource}
        checkboxSelection
        disableRowSelectionOnClick
        selectedRows={dataSelectRow}
        onSave={(data: any) => handleAddNewORUpdate(data, "IN_ACADEMY")}
        onDel={handleDelete}
      ></BaseGrid>
    </>
  );
};

export const WorkingHistory = ({ data, id, action }: Props) => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

  const handleSave = async (data: any) => {
    console.log("data", data);
    // const res = await StaffService.updateStaffWorkingHistory(id, {
    //   jobTitle: data?.jobTitle,
    //   date: data?.date,
    //   bonus: data?.bonus,
    //   discipline: data?.discipline,
    // });
    // if (isSuccess) {
    //   alert("Lưu thành công");
    // } else {
    //   alert("Lưu không thành công");
    // }
  };

  const handleRowSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection);
  };

  return (
    <>
      <Grid sx={{ marginTop: "24px" }} container>
        <Grid width={"100%"} item>
          <GridWorkingHistory
            dataSelectRow={selectedRows}
            dataSource={
              action === "edit" ? data.staffWorkingHistoriesInAcademy : []
            }
            handleRowSelect={handleRowSelectionChange}
            handleSave={handleSave}
          />
        </Grid>
      </Grid>
    </>
  );
};
