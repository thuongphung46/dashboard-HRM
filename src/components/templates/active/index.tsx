import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toastMessage } from "components/molecules/toast_message";
import { useCallback, useEffect, useState } from "react";
import { StaffService } from "services/staff_service";
import { MessageCode } from "types/enum/message_code";

interface IData {
  id: number;
  staffId: number;
  status: number;
  metaData: string;
}
enum STATUS {
  PENDING = 0,
  APPROVED = 1,
  DEPRECATED = 2,
  REJECTED = 3,
}

export const ActiveTemplates = () => {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await StaffService.GetListStaffPending(0);
      if (response.msg_code === MessageCode.Success) {
        setData(response.content);
      }
    };
    fetchData();
  }, []);
  const handleActive = useCallback(async (data: any, status: 0 | 1 | 2 | 3) => {
    let id = data.staffId;
    if (!id) return;
    let response = await StaffService.ConfirmStaff(id, status);
    if (response.msg_code === MessageCode.Success) {
      let newData = data.filter((item: any) => item.id !== id);
      setData(newData);
      toastMessage("Thành công", "success");
    } else {
      toastMessage(response.message, "error");
    }
  }, []);

  const Columns: GridColDef[] = [
    {
      field: "staffId",
      headerName: "ID nhân viên",
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      type: "singleSelect",
      getOptionValue: (value: any) => value.code,
      getOptionLabel: (value: any) => value.label,
      valueOptions: [
        { code: 0, label: "Chờ duyệt" },
        { code: 1, label: "Đã duyệt" },
      ],
    },
    {
      field: "metaData",
      headerName: "Dữ liệu",
      minWidth: 200,
    },
    {
      field: "action",
      headerName: "",
      minWidth: 200,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              onClick={() => handleActive(params.row, STATUS.APPROVED)}
              variant="outlined"
              size="small"
            >
              Đồng ý
            </Button>
            <Button
              onClick={() => handleActive(params.row, STATUS.REJECTED)}
              variant="outlined"
              size="small"
            >
              Từ chối
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <div
      style={{
        padding: "8px",
      }}
    >
      <>
        <DataGrid
          sx={{ height: "calc(100vh - 90px)", width: "calc(100vw - 270px)" }}
          rows={data}
          columns={Columns}
        ></DataGrid>
      </>
    </div>
  );
};
