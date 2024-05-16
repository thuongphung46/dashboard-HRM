import { FC, useState } from "react";
import { GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { StaffInstructProject } from "types/ApplicationType";

interface Row {
  id: number;
  student_name: string;
  training: string;
  num_decision: string;
  num_instructors: string;
  main_instructors: boolean;
  num_lesion: string;
}

interface Props {
  data: StaffInstructProject[];
}
export const Guide: FC<Props> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

  const columns = [
    {
      field: "studentName",
      headerName: "Họ tên NCS",
      width: 300,
      editable: true,
    },
    {
      field: "trainingCourse",
      headerName: "Khóa đào tạo",
      width: 150,
      editable: true,
    },
    {
      field: "decisionNumber",
      headerName: "Số QĐ Giao Luận án, Luận văn, Đồ án",
      width: 300,
      editable: true,
    },
    {
      field: "numberOfInstructors",
      headerName: "Số người HD",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "main_instructors",
      headerName: "HD chính",
      width: 150,
      type: "boolean",
      renderCell: (params: GridRenderCellParams<any, boolean>) => (
        <Checkbox
          checked={params.value}
          onChange={(event) => {
            const checked = event.target.checked;
            const updatedRows = rows.map((row) => {
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
    {
      field: "numberOfLesson",
      headerName: "Số tiết quy đổi",
      width: 150,
      editable: true,
      type: "number",
    },
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

  const handleSave = () => {
    // Handle save logic here
  };

  return (
    <Box>
      <BaseGrid
        columns={columns}
        rows={data}
        title=""
        onSave={handleSave}
        onRowSelectionChange={setSelectedRows}
        selectedRows={selectedRows}
      />
    </Box>
  );
};
