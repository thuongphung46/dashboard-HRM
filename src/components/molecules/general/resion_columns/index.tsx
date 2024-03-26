import { FC, useState } from "react";
import Box from '@mui/material/Box';
import { GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";

interface Props{}
export const GeneralResion: FC<Props> = () => {
  
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]); 

  const columns = [
    { field: 'id', headerName: 'STT', width: 90 },
    {
      field: 'resion_id',
      headerName: 'Mã lý do giảm trừ',
      width: 150,
      editable: true,
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
  const rows = [
    { id: 1, resion_id: 'cnbm', resion: 'Chủ nhiệm bộ môn', reduce: '20%'},
    { id: 2, resion_id: 'cvht', resion: 'Cố vấn học tập', reduce: '15%'},
    { id: 3, resion_id: 'dh', resion: 'Đi học', reduce: '10%'},
  ];

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns}
          rows={rows}
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
