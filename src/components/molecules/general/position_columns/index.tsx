import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import {
  useGetListJobTitle,
  useJobTitle,
} from "services/hooks/useGetListJobTitle";
import { toastMessage } from "components/molecules/toast_message";
import { MessageCode } from "types/enum/message_code";

interface Props {}
export const GeneralPosition: FC<Props> = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const { createJobTitle, updateJobTitle, deleteJobTitle } = useJobTitle();
  const { data } = useGetListJobTitle();
  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "code",
      headerName: "Mã chức  vụ",
      width: 150,
      editable: true,
    },
    {
      field: "jobTitle",
      headerName: "Tên chức vụ",
      width: 300,
      editable: true,
    },
  ];

  const handleSave = async (dataAdd: any) => {
    if (dataAdd?.isNew) {
      createJobTitle({
        code: dataAdd.code,
        jobTitle: dataAdd.jobTitle,
      }).then((res) => {
        if (res.msg_code === MessageCode.Success) {
          toastMessage("Thành công", "success");
        } else {
          toastMessage(res.message, "error");
        }
      });
    } else {
      updateJobTitle(dataAdd.id, {
        jobTitle: dataAdd.jobTitle,
      }).then((res) => {
        if (res.msg_code === MessageCode.Success) {
          toastMessage("Thành công", "success");
        } else {
          toastMessage(res.message, "error");
        }
      });
    }
  };
  
  const handleDel = async (dataDel: any) => {
    deleteJobTitle(dataDel).then((res) => {
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
          title="Chức vụ"
          onSave={handleSave}
          onDel={handleDel}
          onRowSelectionChange={setSelectedRows}
          selectedRows={selectedRows}
        />
      </Box>
    </div>
  );
};
