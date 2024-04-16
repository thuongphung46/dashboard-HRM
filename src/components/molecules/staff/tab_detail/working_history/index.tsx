import Box from "@mui/material/Box/Box";
import { FC, useRef, useState } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { Grid } from "@mui/material";
import { StaffDetail } from "types/ApplicationType";
import { StaffService } from "services/staff_service";

type Props = {
  data: StaffDetail;
  id: any;
};
interface IGridWorkingHistory {
  handleSave: (data: any) => void;
  handleRowSelect: (e: any) => void;
  dataSelectRow: any;
  dataSource: any;
  gridRef: any;
}

export const GridWorkingHistory: FC<IGridWorkingHistory> = ({
  handleSave,
  dataSource,
  gridRef,
  dataSelectRow,
  handleRowSelect,
}) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 150 },
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
    <div>
      <BaseGrid
        onRowSelectionChange={handleRowSelect}
        title="working history"
        columns={columns}
        rows={dataSource}
        ref={gridRef}
        checkboxSelection
        disableRowSelectionOnClick
        selectedRows={dataSelectRow}
        onSave={handleSave}
      ></BaseGrid>
    </div>
  );
};

export const WorkingHistory = ({ data, id }: Props) => {
  const gridRef = useRef<any>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

  const handleSave = async (e: any) => {
    console.log(e);
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid sx={{ marginTop: "24px" }} container alignItems="center">
        <GridWorkingHistory
          dataSelectRow={selectedRows}
          dataSource={data.staffWorkingHistoriesInAcademy}
          gridRef={gridRef}
          handleRowSelect={handleRowSelectionChange}
          handleSave={handleSave}
        />
      </Grid>
    </Box>
  );
};
