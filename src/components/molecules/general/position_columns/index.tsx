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
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const { createJobTitle, updateJobTitle, deleteJobTitle } = useJobTitle();
  const { data } = useGetListJobTitle();
  const [originalData, setOriginalData] = useState<JobTitleType[]>([]);
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
      width: 300,
      editable: true,
    },
  ];

  const handleSave = async (dataAdd: JobTitleType[]) => {
    // Check for new rows
    const maxId = Math.max(...data.map((item) => item.id));
    const newJobTitles = dataAdd.filter((item) => item.id > maxId);

    // Create new rows
    if (!isNullOrEmpty(newJobTitles)) {
      for (let i = 0; i < newJobTitles.length; i++) {
        await createJobTitle(newJobTitles[i]);
      }
    }

    // Update existing rows
    const updatedJobTitles = dataAdd.filter((item, index) => {
      // Only update if the row has changed
      return (
        item.id <= maxId &&
        JSON.stringify(item) !== JSON.stringify(originalData[index])
      );
    });

    if (!isNullOrEmpty(updatedJobTitles)) {
      for (let i = 0; i < updatedJobTitles.length; i++) {
        await updateJobTitle(
          updatedJobTitles[i].id.toString(),
          updatedJobTitles[i]
        );
      }
    }

    // Delete rows
    const deletedJobTitles = originalData.filter((item) => {
      return !dataAdd.some((row) => row.id === item.id);
    });

    if (!isNullOrEmpty(deletedJobTitles)) {
      for (let i = 0; i < deletedJobTitles.length; i++) {
        await deleteJobTitle(deletedJobTitles[i].id.toString());
      }
    }

    // Clear selection and editing state
    setSelectedRows([]);
    setIsAddingRow(false);

    // Update the original data
    setOriginalData(dataAdd);
  };

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns}
          rows={data}
          title="Chức vụ"
          onSave={handleSave}
          onRowSelectionChange={setSelectedRows}
          selectedRows={selectedRows}
          // onPressAdd={() => setIsAddingRow(true)}
        />
      </Box>
    </div>
  );
};
