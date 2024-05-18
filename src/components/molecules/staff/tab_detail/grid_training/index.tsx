import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { BaseGrid } from "components/atoms/datagrid";
import { FC } from "react";

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

  const columns2: GridColDef[] = [
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
  return (
    <>
      <BaseGrid
        onRowSelectionChange={handleRowSelect}
        title="TÓM TẮT QUÁ TRÌNH CÔNG TÁC"
        columns={columns2}
        rows={dataSource}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        onSave={handleSave}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        selectedRows={dataSelectRow}></BaseGrid>
    </>
  );
};
