import { FC, useState } from "react";
import Box from '@mui/material/Box';
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { useGetListReasonReduce } from "services/hooks/useGetListReasonReduce";

interface Props{}
export const GeneralResion: FC<Props> = () => {
  
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]); 

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'STT', width: 90 },
    {
      field: 'code',
      headerName: 'Mã lý do giảm trừ',
      width: 150,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Lý do giảm trừ',
      width: 150,
      editable: true,
    },
    {
      field: 'ratio',
      headerName: 'Giảm (%)',
      width: 150,
      editable: true,
    }
  ];

  const { reasonReduce, loading } = useGetListReasonReduce();
  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns}
          rows={reasonReduce}
          title="Lí do giảm trừ"
          onSave={() => {
            /* Logic lưu cho lưới dữ liệu  */
          }}
          onRowSelectionChange={setSelectedRows}
          selectedRows={selectedRows}
        />
      </Box>
    </div>
  );
};
