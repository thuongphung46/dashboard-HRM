import { FC, useState } from "react";
import { GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box/Box";

interface Row {
  id: number;
  student_name: string;
  training: string;
  num_decision: string;
  num_instructors: string;
  main_instructors: boolean;
  num_lesion: string;
}

interface Props {}
export const Guide: FC<Props> = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

  const columns = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'student_name', headerName: 'Họ tên NCS', width: 300, editable: true },
    { field: 'training', headerName: 'Khóa đào tạo', width: 150, editable: true },
    { field: 'num_decision', headerName: 'Số QĐ Giao Luận án, Luận văn, Đồ án', width: 300, editable: true},
    { field: 'num_instructors', headerName: 'Số người HD', width: 150, editable: true, type:'number' },
    { field: 'main_instructors', headerName: 'HD chính', width: 150, type: 'boolean',
      renderCell: (params: GridRenderCellParams<any, boolean>) => (
        <Checkbox
          checked={params.value} // Use value from cell data for checked state
          onChange={(event) => {
            const checked = event.target.checked;
            const updatedRows = rows.map(row => {
              if (row.id === params.row.id) {
                return { ...row, main_instructors: checked };
              }
              return row;
            });
            setRows(updatedRows);
          }}
        />
      ),
    },
    { field: 'num_lesion', headerName: 'Số tiết quy đổi', width: 150, editable: true, type:'number' },
  ];

  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      student_name: "Vũ Trung Kiên",
      training: "CT4",
      num_decision: "1677 / QĐ-HVM",
      num_instructors: "2",
      main_instructors: false,
      num_lesion: "15",
    },
    {
      id: 2,
      student_name: "Phạm Thị Kim",
      training: "CT4",
      num_decision: "1677 / QĐ-HVM",
      num_instructors: "2",
      main_instructors: true,
      num_lesion: "15",
    },
    {
      id: 3,
      student_name: "Phan Kim Liên",
      training: "CT4",
      num_decision: "1677 / QĐ-HVM",
      num_instructors: "2",
      main_instructors: true,
      num_lesion: "15",
    },
    {
      id: 4,
      student_name: "Trần Minh Đức",
      training: "CT4",
      num_decision: "1677 / QĐ-HVM",
      num_instructors: "2",
      main_instructors: true,
      num_lesion: "15",
    },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      student_name: "",
      training: "",
      num_decision: "",
      num_instructors: "",
      main_instructors: false,
      num_lesion: "",
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

  // const handleRowSelectionChange = (selection: GridRowId[]) => {
  //   setSelectedRows(selection);
  // };

  return (
    <Box>
        <BaseGrid
          columns={columns}
          rows={rows}
          title=""
          onSave={handleSave}
          onDelete={handleDelete}
          onAddRow={handleAddRow}
          onRowSelectionChange={setSelectedRows}
          selectedRows={selectedRows}
        />
      </Box>
  );
};
