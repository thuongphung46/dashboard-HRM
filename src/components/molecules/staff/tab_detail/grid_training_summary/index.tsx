import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { BaseGrid } from "components/atoms/datagrid";
import { FC } from "react";

interface IGridTraining {
  handleDel: () => void;
  handleAddRow: () => void;
  handleSave: () => void;
  handleRowSelect: (e: any) => void;
  dataSelectRow: any;
  dataSource: any;
  gridRef: any;
}
export const GridTrainingSummary: FC<IGridTraining> = ({
  handleDel,
  handleAddRow,
  handleSave,
  dataSource,
  gridRef,
  dataSelectRow,
  handleRowSelect,
}) => {
  const columns1: GridColDef[] = [
    {
      field: "from_date",
      headerName: "Từ tháng năm",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      field: "to_date",
      headerName: "Đến tháng năm",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      field: "school_name",
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
      field: "forms_of_training",
      headerName: "Hình thức đào tạo",
      width: 200,
      editable: true,
    },
    {
      field: "certificates",
      headerName: "Văn bằng chứng chỉ",
      width: 200,
      editable: true,
    },
  ];
  const columns2: GridColDef[] = [
    {
      field: "from_date",
      headerName: "Từ tháng năm",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      field: "to_date",
      headerName: "Đến tháng năm",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      field: "work_unit",
      headerName: "Đơn vị công tác",
      width: 400,
      editable: true,
    },
    {
      field: "position",
      headerName: "Chức vụ",
      width: 200,
      editable: true,
    },
  ];

  return (
    <>
      <BaseGrid
        onRowSelectionChange={handleRowSelect}
        title="TÓM TẮT QUÁ TRÌNH ĐÀO TẠO"
        columns={columns1}
        rows={dataSource}
        ref={gridRef}
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
        // onRowSelectionModelChange={handleRowSelect}
        // rowSelectionModel={dataSelectRow}
        selectedRows={dataSelectRow}
      ></BaseGrid>
      <BaseGrid
        onRowSelectionChange={handleRowSelect}
        title="TÓM TẮT QUÁ TRÌNH CÔNG TÁC"
        columns={columns2}
        rows={dataSource}
        ref={gridRef}
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
      ></BaseGrid>
    </>
  );
};
