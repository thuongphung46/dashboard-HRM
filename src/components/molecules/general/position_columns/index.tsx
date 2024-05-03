import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { useGetListJobTitle } from "services/hooks/useGetListJobTitle";

interface Props {}
export const GeneralPosition: FC<Props> = () => {
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]); // State để lưu trữ các dòng được chọn
  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "code",
      headerName: "Mã chức  vụ",
      width: 150,
      editable: isAddingRow,
    },
    {
      field: "jobTitle",
      headerName: "Tên chức vụ",
      width: 150,
      editable: true,
    },
  ];
  const rows = [
    { id: 1, code: "giamdoc", jobTitle: "Giám đốc" },
    { id: 2, code: "phogiamdoc", jobTitle: "Phó giám đốc" },
    { id: 3, code: "chunhiem", jobTitle: "Chủ nhiệm" },
  ];
  const { jobTitles, loading } = useGetListJobTitle();

  const handleAddRow = () => {
    setIsAddingRow(true);

    const newRow = {
      id: rows.length + 1,
      code: "",
      jobTitle: "",
    };
    const index = rows.findIndex((row) => row.code === newRow.code);
    if (index !== -1) {
      alert("Dữ liệu đã tồn tại");
      return;
    }

    // Update dataSource with the new row
    // setDataSource([...jobTitles, newRow]);
  };

  const handleChange = (e: any) => {};

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns}
          rows={jobTitles}
          title="Chức vụ"
          onSave={handleAddRow}
          callBack={handleChange}
          onRowSelectionChange={setSelectedRows}
          selectedRows={selectedRows}
        />
      </Box>
    </div>
  );
};
