import React, { FC, useRef } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import Typography from '@mui/material/Typography';

interface BaseGridProps {
  columns: GridColDef[];
  rows: any[]; // Type should be replaced with your actual row type
  title: string;
  onSave: () => void;
  onDelete: () => void;
  onAddRow: () => void;
  onRowSelectionChange: (selection: GridRowId[]) => void;
  selectedRows: GridRowId[];
}

export const BaseGrid: FC<BaseGridProps> = ({
  columns,
  rows,
  title,
  onSave,
  onDelete,
  onAddRow,
  onRowSelectionChange,
  selectedRows,
}) => {
  const gridRef = useRef<any>(null);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <button onClick={onSave}>Save</button>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onAddRow}>Add Row</button>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
          onRowSelectionModelChange={onRowSelectionChange}
          rowSelectionModel={selectedRows}
        />
      </Box>
    </div>
  );
};
