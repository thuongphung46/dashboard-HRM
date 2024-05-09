import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import {
  ReasonReduceType,
  useGetListReasonReduce,
  useReasonReduce,
} from "services/hooks/useGetListReasonReduce";
import { isNullOrEmpty } from "common/validation";

interface Props {}
export const GeneralResion: FC<Props> = () => {
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const { createReasonReduce, updateReasonReduce, deleteReasonReduce } =
    useReasonReduce();
  const { data } = useGetListReasonReduce();
  const [originalData, setOriginalData] = useState<ReasonReduceType[]>([]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "code",
      headerName: "Mã lý do giảm trừ",
      width: 150,
      editable: isAddingRow,
    },
    {
      field: "name",
      headerName: "Lý do giảm trừ",
      width: 150,
      editable: true,
    },
    {
      field: "ratio",
      headerName: "Giảm (%)",
      width: 150,
      editable: true,
    },
  ];

  const handleSave = async (dataAdd: ReasonReduceType[]) => {
    // Check for new rows
    const maxId = Math.max(...data.map((item) => item.id));
    const newReasons = dataAdd.filter((item) => item.id > maxId);

    // Create new rows
    if (!isNullOrEmpty(newReasons)) {
      for (let i = 0; i < newReasons.length; i++) {
        await createReasonReduce(newReasons[i]);
      }
    }

    // Update existing rows
    const updatedReasons = dataAdd.filter((item, index) => {
      // Only update if the row has changed
      return (
        item.id <= maxId &&
        JSON.stringify(item) !== JSON.stringify(originalData[index])
      );
    });

    if (!isNullOrEmpty(updatedReasons)) {
      await Promise.all(
        updatedReasons.map((item) => updateReasonReduce(String(item.id), item))
      );
    }

    // Delete rows
    const deletedReasons = data
      .filter((itemData) => {
        return !originalData.some(
          (originalData) => originalData.id === itemData.id
        );
      })
      .map((item) => item.id);

    if (!isNullOrEmpty(deletedReasons)) {
      for (let i = 0; i < deletedReasons.length; i++) {
        await deleteReasonReduce(String(deletedReasons[i]));
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
          title="Lí do giảm trừ"
          onSave={handleSave}
          onRowSelectionChange={setSelectedRows}
          selectedRows={selectedRows}
          // onPressAdd={() => setIsAddingRow(true)}
        />
      </Box>
    </div>
  );
};
