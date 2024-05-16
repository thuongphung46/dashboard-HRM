import { FC, useState } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { Grid } from "@mui/material";
import { StaffDetail } from "types/ApplicationType";
import { StaffService } from "services/staff_service";
import { Action } from "types/action";

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
  const columns: GridColDef[] = [
    {
      field: "fromDate",
      headerName: "Từ ngày",
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
      field: "toDate",
      headerName: "Đến ngày",
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
        onSave={handleSave}></BaseGrid>
    </>
  );
};

export const WorkingHistory = ({ data, id, action }: Props) => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

  const handleSave = async (e: any) => {
    const isSuccess = await StaffService.updateStaffWorkingHistory(id, e.data);
    if (isSuccess) {
      alert("Lưu thành công");
    } else {
      alert("Lưu không thành công");
    }
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
