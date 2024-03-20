import { FC, useState } from "react";
import { Box } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";
import { GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";

interface Row {
  id: number;
  semester: string;
  training_sys: string;
  course_name: string;
  role: string;
  mid_course: boolean;
  end_course: boolean;
  class_course: string;
  num_people: string;
  num_topic: string;
  num_lesion: string;
}

interface Props {}

export const Assess: FC<Props> = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

  const [rows, setRows] = useState<Row[]>([
    { 
      id: 1, 
      semester: 'Học kỳ I', 
      training_sys: 'Đào tạo chuyên ngành Kỹ thuật mật mã', 
      course_name: 'Học phần abc', 
      role: 'Ra đề', 
      mid_course: true, 
      end_course: false ,
      class_course:'L06',
      num_people:'50',
      num_topic:'50',
      num_lesion:'3',
    },
  ]);

  const columns = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'semester', headerName: 'Học kỳ', width: 100, editable: true,
      type: 'singleSelect',
      valueOptions: ['Học kỳ I', 'Học kỳ II'],
    },
    { field: 'training_sys',  headerName: 'Hệ đào tạo',  width: 200,  editable: true,
      type: 'singleSelect',
      valueOptions: ['Đào tạo chuyên ngành Kỹ thuật Mật Mã', 'Đào tạo hệ đóng phí'],
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {params.value}
        </div>
      )
    },
    { field: 'course_name',  headerName: 'Tên học phần',  width: 300,  editable: true,
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {params.value}
        </div>
      )
    },
    { field: 'role',   headerName: 'Ra đề/ Coi thi/ Chấm thi', width: 200, editable: true,
      type: 'singleSelect',
      valueOptions: ['Ra đề', 'Coi thi', 'Chấm thi'],
    },
    { field: 'mid_course', headerName: 'Giữa học phần', width: 150,
      renderCell: (params: GridRenderCellParams<any, boolean>) => (
        <Checkbox
          checked={params.value} // Use value from cell data for checked state
          onChange={(event) => {
            const checked = event.target.checked;
            const updatedRows = rows.map(row => {
              if (row.id === params.row.id) {
                return { ...row, mid_course: checked };
              }
              return row;
            });
            setRows(updatedRows);
          }}
        />
      ),
    },
    { field: 'end_course', headerName: 'Kết thúc học phần', width: 150,
      renderCell: (params: GridRenderCellParams<any, boolean>) => (
        <Checkbox
          checked={params.value} // Use value from cell data for checked state
          onChange={(event) => {
            const checked = event.target.checked;
            const updatedRows = rows.map(row => {
              if (row.id === params.row.id) {
                return { ...row, end_course: checked };
              }
              return row;
            });
            setRows(updatedRows);
          }}
        />
      ),
    },
    { field: 'class_course', headerName: 'Lớp học phần', width: 150, editable: true },
    { field: 'num_people', headerName: 'Số sinh viên của lớp', width: 150, editable: true, type: 'number' },
    { field: 'num_topic', headerName: 'Số đề', width: 150, editable: true, type: 'number' },
    { field: 'num_lesion', headerName: 'Số tiết quy đổi', width: 150, editable: true, type: 'number' },
  ];

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      semester: '',
      training_sys: '',
      course_name: '',
      role: '',
      mid_course: false,
      end_course: false,
      class_course: '',
      num_people: '',
      num_topic: '',
      num_lesion: '',
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

  return (
    <div>
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
    </div>
  );
};
