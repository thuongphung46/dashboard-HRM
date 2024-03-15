import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";

export const columns = (isAddingRow: boolean): GridColDef[] => {
  return [
    { field: 'id', headerName: 'STT', width: 90 },
    {
      field: 'resion_id',
      headerName: 'Mã lý do giảm trừ',
      width: 150,
      editable: isAddingRow,
    },
    {
      field: 'resion',
      headerName: 'Lý do giảm trừ',
      width: 150,
      editable: true,
    },
    {
      field: 'reduce',
      headerName: 'Giảm (%)',
      width: 150,
      editable: true,
    }
  ];
};
