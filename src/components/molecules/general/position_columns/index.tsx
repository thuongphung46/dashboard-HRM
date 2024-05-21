import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import {
  JobTitleType,
  useGetListJobTitle,
  useJobTitle,
} from "services/hooks/useGetListJobTitle";
import { toastMessage } from "components/molecules/toast_message";
import { MessageCode } from "types/enum/message_code";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  disable?: boolean;
}

export const GeneralPosition: FC<Props> = ({ disable }) => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [dataRows, setDataRows] = useState<JobTitleType[]>([]);
  const { createJobTitle, updateJobTitle, deleteJobTitle } = useJobTitle();
  const { data } = useGetListJobTitle();

  useEffect(() => {
    if (data) {
      setDataRows(data);
    }
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Mã chức vụ",
      width: 150,
      editable: true,
    },
    {
      field: "jobTitle",
      headerName: "Tên chức vụ",
      width: 300,
      editable: true,
    },
    {
      field: "level",
      headerName: "Level",
      width: 150,
      renderCell: (params) => {
        const handleChange = (event: any) => {
          // const newValue = event.target.value;
          // const updatedRows = dataRows.map((row) => 
          //   row.id === params.row.id ? { ...row, level: newValue } : row
          // );
          // setDataRows(updatedRows);
        };

        return (
          <Select
            fullWidth
            value={params.row.level ? params.row.level : ""}
            onChange={handleChange}
          >
            <MenuItem value="LEVEL_1">LEVEL_1</MenuItem>
            <MenuItem value="LEVEL_2">LEVEL_2</MenuItem>
            <MenuItem value="LEVEL_3">LEVEL_3</MenuItem>
            <MenuItem value="LEVEL_4">LEVEL_4</MenuItem>
          </Select>
        );
      },
    }
  ];

  const handleSave = async (dataAdd: any) => {
    if (dataAdd?.isNew) {
      createJobTitle({
        code: dataAdd.code,
        jobTitle: dataAdd.jobTitle,
        level: dataAdd.level,
      }).then((res) => {
        if (res.msg_code === MessageCode.Success) {
          setDataRows([...dataRows, res.content]);
          toastMessage("Thành công", "success");
        } else {
          toastMessage(res.message, "error");
        }
      });
    } else {
      updateJobTitle(dataAdd.id, {
        jobTitle: dataAdd.jobTitle,
        level: dataAdd.level,
      }).then((res) => {
        if (res.msg_code === MessageCode.Success) {
          const index = dataRows.findIndex((row) => row.id === dataAdd.id);
          dataRows[index] = res.content;
          setDataRows([...dataRows]);
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
        setDataRows(dataRows.filter((row) => row.id !== dataDel));
        toastMessage(res.message, "success");
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
