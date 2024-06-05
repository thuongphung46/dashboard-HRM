import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toastMessage } from "components/molecules/toast_message";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StaffService } from "services/staff_service";
import { MessageCode } from "types/enum/message_code";
import FormField, { IFormField } from "components/atoms/form_value";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";

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
  const [dataRows, setDataRows] = useState<IData[]>([]);
  const [formFields, setFormFields] = useState<IFormField[]>([]);
  const [dataDetail, setDataDetail] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await StaffService.GetListStaffPending(0);
      if (response.msg_code === MessageCode.Success) {
        setDataRows(response.content);
      }
    };
    fetchData();
  }, []);
  const handleActive = useCallback(
    async (dataActive: any, status: 0 | 1 | 2 | 3) => {
      let id = dataActive.staffId;
      if (!id) return;
      let response = await StaffService.ConfirmStaff(id, status);
      if (response.msg_code === MessageCode.Success) {
        let newData = dataRows.filter((item) => item.id !== id);
        setDataRows(newData);
        toastMessage("Thành công", "success");
      } else {
        toastMessage(response.message, "error");
      }
    },
    [dataRows]
  );
  const handleOpen = useCallback((dataRow: any) => {
    let dataDetail = dataRow.metaData;
    setDataDetail(JSON.parse(dataDetail));
    let fields: IFormField[] = Object.keys(JSON.parse(dataDetail)).map(
      (item) => {
        return {
          id: item,
          label: item,
          type: "text",
          readonly: true,
        };
      }
    );
    setFormFields(fields);
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setFormFields([]);
    setDataDetail({});
    setOpen(false);
  }, []);

  const renderModelDetail = useMemo(() => {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}>
          <div
            style={{
              height: "400px",
              width: "600px",
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "4px",
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
            }}>
            <Grid container spacing={2}>
              <FormField
                fields={formFields}
                formData={dataDetail}
                handleOnChangeField={() => {}}
              />
            </Grid>
          </div>
        </Modal>
      </>
    );
  }, [dataDetail, formFields, handleClose, open]);

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
      minWidth: 300,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <Button
              onClick={() => handleOpen(params.row)}
              variant="outlined"
              size="small">
              Xem chi tiết
            </Button>
            <Button
              onClick={() => handleActive(params.row, STATUS.APPROVED)}
              variant="outlined"
              size="small">
              Đồng ý
            </Button>
            <Button
              onClick={() => handleActive(params.row, STATUS.REJECTED)}
              variant="outlined"
              size="small">
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
      }}>
      <>
        <DataGrid
          sx={{ height: "calc(100vh - 90px)", width: "calc(100vw - 270px)" }}
          rows={dataRows}
          columns={Columns}
        />
      </>
      {renderModelDetail}
    </div>
  );
};
