import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";


export const columns = (isAddingRow: boolean): GridColDef[] => {
  return[
    { field: 'id', headerName: 'STT', width: 90 },
    {
      field: 'position_id',
      headerName: 'Mã chức  vụ',
      width: 150,
      editable: isAddingRow,
    },
    {
      field: 'position_name',
      headerName: 'Tên chức vụ',
      width: 150,
      editable: true,
    },
  ];
};
