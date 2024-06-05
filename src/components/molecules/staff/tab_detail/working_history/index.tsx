import { useCallback } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { Grid } from "@mui/material";
import { StaffDetail } from "types/ApplicationType";
import { Action } from "types/action";
import { useParams } from "react-router-dom";
import { StaffService } from "services/staff_service";
import { toastMessage } from "components/molecules/toast_message";
import moment from "moment";

interface Props extends Action {
  dataStaffDetail: StaffDetail;
  id: any;
  setDataWorkingHistory: (data: any) => void;
}
export const WorkingHistory = ({
  dataStaffDetail,
  action,
  setDataWorkingHistory,
}: Props) => {
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

  const handleAddNewORUpdate = useCallback(
    (data: any, type: string) => {
      const dataWorking = dataStaffDetail.staffWorkingHistoriesInAcademy;
      const params: any = {
        date: data.date,
        jobTitle: data.jobTitle,
        discipline: data.discipline,
        type: type,
      };
      if (params.date) {
        params.date = moment(params.date).format("YYYY-MM-DD HH:mm:ss");
      }
      if (data?.isNew && id) {
        StaffService.AddWorkingHistory(params, id)
          .then((res) => {
            // if (res.msg_code === 200) {
            toastMessage("Thêm mới thành công", "success");
            // update data in parent component
            const newData = [
              ...dataWorking,
              {
                id: res.id,
                date: res.date,
                jobTitle: res.jobTitle,
                discipline: res.discipline,
                type: res.type,
              },
            ];
            setDataWorkingHistory(newData);
            // } else {
            // toastMessage("Thêm mới thất bại", "error");
            // }
          })
          .catch((err) => {
            toastMessage("Thêm mới thất bại", "error");
            console.log(err);
          });
      } else if (id) {
        StaffService.UpdateWorkingHistory(params, id, data.id)
          .then((res) => {
            // if (res.msg_code === 200) {
            toastMessage("Cập nhật thành công", "success");
            // update data in parent component
            const newData = dataWorking.map((item: any) => {
              if (item.id === data.id) {
                return {
                  id: res.id,
                  date: res.date,
                  jobTitle: res.jobTitle,
                  discipline: res.discipline,
                  type: res.type,
                };
              }
              return item;
            });
            setDataWorkingHistory(newData);

            // } else {
            //   toastMessage("Cập nhật thất bại", "error");
            // }
          })
          .catch((err) => {
            toastMessage("Cập nhật thất bại", "error");
            console.log(err);
          });
      } else {
        toastMessage("Cập nhật thất bại", "error");
      }
    },
    [dataStaffDetail.staffWorkingHistoriesInAcademy, id, setDataWorkingHistory]
  );

  const handleDelete = useCallback(
    (idRow: any) => {
      if (id) {
        StaffService.DeleteWorkingHistory(id, idRow)
          .then((res) => {
            // if (res.msg_code === 200) {
            toastMessage("Xóa thành công", "success");
            const newData =
              dataStaffDetail.staffWorkingHistoriesInAcademy.filter(
                (item: any) => item.id !== idRow
              );
            setDataWorkingHistory(newData);
            // } else {
            //   toastMessage(res.message, "error");
            // }
          })
          .catch((err) => {
            toastMessage("Xóa thất bại", "error");
            console.log(err);
          });
      }
    },
    [dataStaffDetail.staffWorkingHistoriesInAcademy, id, setDataWorkingHistory]
  );

  return (
    <>
      <Grid sx={{ marginTop: "24px" }} container>
        <Grid width={"100%"} item>
          <BaseGrid
            title=""
            columns={columns}
            rows={dataStaffDetail.staffWorkingHistoriesInAcademy}
            checkboxSelection
            disableRowSelectionOnClick
            selectedRows={[]}
            onSave={(data: any) => handleAddNewORUpdate(data, "IN_ACADEMY")}
            onDel={handleDelete}></BaseGrid>
        </Grid>
      </Grid>
    </>
  );
};
