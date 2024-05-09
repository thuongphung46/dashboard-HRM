import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { BaseGrid } from "components/atoms/datagrid";
import { FC, useEffect } from "react";

interface IGridTraining {
  handleSave: (data: any) => void;
  handleRowSelect: (e: any) => void;
  dataSelectRow: any;
  dataSource: any;
  gridRef: any;
}
export const GridTraining: FC<IGridTraining> = ({
  handleSave,
  dataSource,
  gridRef,
  dataSelectRow,
  handleRowSelect,
}) => {
  useEffect(() => {
    dataSource?.forEach((ele: any) => {
      if (ele.fromDate) {
        const fromDate = new Date(ele.fromDate);
        ele.fromDate = fromDate;
      }
      if (ele.toDate) {
        const toDate = new Date(ele.toDate);
        ele.toDate = toDate;
      }
    });
  }, [dataSource]);

  const columns2: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: false,
    },
    {
      field: "fromDate",
      headerName: "Từ tháng năm",
      width: 150,
      editable: true,
      type: "date",
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    {
      field: "toDate",
      headerName: "Đến tháng năm",
      width: 150,
      editable: true,
      type: "date",
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
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
        selectedRows={dataSelectRow}
      ></BaseGrid>
    </>
  );
};
