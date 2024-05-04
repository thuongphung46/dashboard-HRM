import { FC, useState } from "react";
import Box from '@mui/material/Box';
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { 
  ReasonReduceType, 
  useGetListReasonReduce, 
  useReasonReduce 
} from "services/hooks/useGetListReasonReduce";
import { isNullOrEmpty } from "common/validation";

interface Props{}
export const GeneralResion: FC<Props> = () => {
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]); 
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'STT', width: 90 },
    {
      field: 'code',
      headerName: 'Mã lý do giảm trừ',
      width: 150,
      editable: isAddingRow,
    },
    {
      field: 'name',
      headerName: 'Lý do giảm trừ',
      width: 150,
      editable: true,
    },
    {
      field: 'ratio',
      headerName: 'Giảm (%)',
      width: 150,
      editable: true,
    }
  ];
  const { createReasonReduce, updateReasonReduce } = useReasonReduce();
  const { data } = useGetListReasonReduce();

  const handleSave = async (dataAdd: ReasonReduceType[]) => {
    // getList id của các dòng mới thêm vào
    const maxId = Math.max(...data.map((item) => item.id));
    const newResionReduce = dataAdd.filter((item) => item.id > maxId);
    if (!isNullOrEmpty(newResionReduce)) {
      for (let i = 0; i < newResionReduce.length; i++) {
        await createReasonReduce(newResionReduce[i]);
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
          title="Lí do giảm trừ"
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
