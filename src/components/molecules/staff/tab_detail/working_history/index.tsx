import Box from "@mui/material/Box/Box";
import React, { useState } from "react";
import { GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";

interface Props{}
export const WorkingHistory: React.FC = () => {

  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

  const [rows, setRows] = useState([
    { id: 1, from_date: new Date('2024-03-18'), to_date: new Date('2024-03-18'), content: 'Chủ nhiệm khoa'},
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      from_date: new Date(),
      to_date: new Date(),
      content:'',
    };
    setRows([...rows, newRow]);
  };

  const handleSave = () => {
    // Handle save logic here
  };

  const handleDelete = () => {
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(updatedRows);
    setSelectedRows([]);
  };

  const handleRowSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection);
  };


  return (
    <div>
      <Box sx={{ height: 400, width: '100%' }}>
        <BaseGrid
          columns={[
            { field: 'id', headerName: 'STT', width: 90, type: "text" },
            { field: 'from_date', headerName: 'Từ ngày', width: 150, editable: true, type: "date", valueGetter: (params) => new Date(params.value)},
            { field: 'to_date', headerName: 'Đến ngày', width: 150, editable: true, type: "date", valueGetter: (params) => new Date(params.value) },
            { field: 'content', headerName: 'Nội dung làm việc', width: 150, editable: true,  type: "text" },
          ]}
          rows={rows}
          title="" 
          onSave={handleSave}
          onDelete={handleDelete}
          onAddRow={handleAddRow}
          onRowSelectionChange={handleRowSelectionChange}
          selectedRows={selectedRows}  
        />
    </Box>
    </div>
  );
};
