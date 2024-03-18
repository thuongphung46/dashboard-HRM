import React, { FC, forwardRef } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

interface BaseGridProps {
  columns: GridColDef[];
  rows: any[];
  title: string;
  onSave: () => void;
  onDelete: () => void;
  onAddRow: () => void;
  onRowSelectionChange: (selection: any) => void;
  selectedRows: GridRowId[];
}

export const BaseGrid = forwardRef<any, BaseGridProps>(
  (
    {
      columns,
      rows,
      title,
      onSave,
      onDelete,
      onAddRow,
      onRowSelectionChange,
      selectedRows,
    },
    ref
  ) => {
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <button onClick={onSave}>Save</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onAddRow}>Add Row</button>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            ref={ref}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={onRowSelectionChange}
            rowSelectionModel={selectedRows}
          />
        </Box>
      </div>
    );
  }
);
