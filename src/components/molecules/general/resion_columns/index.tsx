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
import { Message } from "@mui/icons-material";
import { MessageCode } from "types/enum/message_code";
import { toastMessage } from "components/molecules/toast_message";

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
      editable: true,
    },
    {
      field: "name",
      headerName: "Lý do giảm trừ",
      width: 150,
      editable: true,
    },
    {
      field: "ratio",
      type: "number",
      headerName: "Giảm (%)",
      width: 150,
      editable: true,
    },
  ];

  const handleSave = async (dataAdd: any) => {
    createReasonReduce({
      code: dataAdd.code,
      name: dataAdd.name,
      ratio:parseFloat(dataAdd.ratio),
    }).then((res)=>{
      if(res.msg_code === MessageCode.Success){
        toastMessage("Thành công", "success")
      }
      else{
        toastMessage(res.message, "error")
      }
    })
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
