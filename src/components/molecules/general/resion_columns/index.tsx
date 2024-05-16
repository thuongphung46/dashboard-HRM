import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import {
  useGetListReasonReduce,
  useReasonReduce,
} from "services/hooks/useGetListReasonReduce";
import { MessageCode } from "types/enum/message_code";
import { toastMessage } from "components/molecules/toast_message";

interface Props {}
export const GeneralResion: FC<Props> = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const { createReasonReduce, updateReasonReduce, deleteReasonReduce } =
    useReasonReduce();
  const { data } = useGetListReasonReduce();
  const columns: GridColDef[] = [
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
    if (dataAdd?.isNew) {
      createReasonReduce({
        code: dataAdd.code,
        name: dataAdd.name,
        ratio: parseFloat(dataAdd.ratio),
      }).then((res) => {
        if (res.msg_code === MessageCode.Success) {
          toastMessage("Thành công", "success");
        } else {
          toastMessage(res.message, "error");
        }
      });
    } else {
      updateReasonReduce(dataAdd.id, {
        name: dataAdd.name,
        ratio: parseFloat(dataAdd.ratio),
      }).then((res) => {
        console.log("res", res);
        if (res.msg_code === MessageCode.Success) {
          toastMessage("Thành công", "success");
        } else {
          toastMessage(res.message, "error");
        }
      });
    }
  };

  const handleDel = async (dataDel: any) => {
    deleteReasonReduce(dataDel).then((res) => {
      if (res.msg_code === MessageCode.Success) {
        toastMessage("Thành công", "success");
      } else {
        toastMessage(res.message, "error");
      }
    });
  };

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns}
          rows={data}
          title="Lí do giảm trừ"
          onSave={handleSave}
          onDel={handleDel}
          onRowSelectionChange={setSelectedRows}
          selectedRows={selectedRows}
        />
      </Box>
    </div>
  );
};
