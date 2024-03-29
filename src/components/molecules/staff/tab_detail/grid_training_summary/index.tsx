import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { BaseGrid } from "components/atoms/datagrid";
import { FC } from "react";

interface IGridTraining {
  handleSave: (data: any) => void;
  handleRowSelect: (e: any) => void;
  dataSelectRow: any;
  dataSource: any;
  gridRef: any;
}
export const GridTrainingSummary: FC<IGridTraining> = ({
  handleSave,
  dataSource,
  gridRef,
  dataSelectRow,
  handleRowSelect,
}) => {
  const columns1: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: true,
    },
    {
      field: "fromDate",
      headerName: "Từ tháng năm",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      field: "toDate",
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
        onSave={handleSave}
      />
    </>
  );
};
