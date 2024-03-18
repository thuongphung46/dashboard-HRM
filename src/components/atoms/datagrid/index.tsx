import React, { FC, forwardRef } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  DataGridProps,
} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface BaseGridProps extends DataGridProps {
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
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onDelete}>Delete</Button>
        <Button onClick={onAddRow}>Add Row</Button>

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
          {...rest}
        />
      </div>
    );
  }
);
