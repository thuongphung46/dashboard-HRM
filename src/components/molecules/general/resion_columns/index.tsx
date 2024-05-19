import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import {
  ReasonReduceType,
  useGetListReasonReduce,
  useReasonReduce,
} from "services/hooks/useGetListReasonReduce";
import { MessageCode } from "types/enum/message_code";
import { toastMessage } from "components/molecules/toast_message";

interface Props {
  disable?: boolean;
}
export const GeneralResion: FC<Props> = ({ disable }) => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [dataRows, setDataRows] = useState<ReasonReduceType[]>([]);
  const { createReasonReduce, updateReasonReduce, deleteReasonReduce } =
    useReasonReduce();
  const { data } = useGetListReasonReduce();

  useEffect(() => {
    if (data) {
      setDataRows(data);
    }
  }, [data]);
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
          setDataRows([...dataRows, res.content]);
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
        if (res.msg_code === MessageCode.Success) {
          setDataRows(
            dataRows.map((row) => (row.id === dataAdd.id ? dataAdd : row))
          );
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
        setDataRows(dataRows.filter((row) => row.id !== dataDel));
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
          disable={disable}
          columns={columns}
          rows={dataRows}
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
