import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import {
  JobTitleType,
  useGetListJobTitle,
  useJobTitle,
} from "services/hooks/useGetListJobTitle";
import { isNullOrEmpty } from "common/validation";

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
  const { createJobTitle, updateJobTitle } = useJobTitle();

  const { data } = useGetListJobTitle();

  const handleSave = async (dataAdd: JobTitleType[]) => {
    // getList id của các dòng mới thêm vào
    const maxId = Math.max(...data.map((item) => item.id));
    const newJobTitles = dataAdd.filter((item) => item.id > maxId);
    if (!isNullOrEmpty(newJobTitles)) {
      for (let i = 0; i < newJobTitles.length; i++) {
        await createJobTitle(newJobTitles[i]);
      }
    }
    setSelectedRows([]);
    setIsAddingRow(false);
  };

  const handleChange = (e: any) => {
    // console.log("e", e);
  };

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns}
          rows={data}
          title="Chức vụ"
          onSave={handleSave}
          callBack={handleChange}
          onRowSelectionChange={setSelectedRows}
          selectedRows={selectedRows}
          onPressAdd={() => setIsAddingRow(true)}
        />
      </Box>
    </div>
  );
};
