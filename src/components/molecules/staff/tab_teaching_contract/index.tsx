import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";
import { AddNewContract } from "./deatail_contract";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useGetListContractStaff } from "services/hooks/useGetListStaff";
import { storageAction } from "common/function";
import { KeyValue } from "constants/GlobalConstant";
import { GridColDef } from "@mui/x-data-grid/models/colDef";

export const TeachingContractPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedContract, setSelectedContract] = useState<any>({});
  const idUser = storageAction("get", KeyValue.id);
  const { data: TeachingContractPageData, loading } =
    useGetListContractStaff(idUser);

  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "contractName",
      headerName: "Tên hợp đồng",
      width: 300,
      editable: true,
      renderCell: (params: any) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{params.value}</div>
      ),
    },
    {
      field: "fromDate",
      headerName: "Từ ngày",
      width: 150,
      editable: true,
      type: "date",
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    {
      field: "toDate",
      headerName: "Đến ngày",
      width: 150,
      editable: true,
      type: "date",
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    {
      field: "presenter",
      headerName: "Người đại diện bên A",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["ds nhan vien cap 4"],
    },
    {
      field: "status",
      headerName: "Trạng thái hợp đồng",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "Chưa thực hiện",
        "Đang thực hiện",
        "Đã thực hiện",
        "Đã thanh lý",
      ],
    },
    {
      field: "file1",
      headerName: "File hợp đồng",
      width: 150,
      editable: true,
      type: "file",
    },
    {
      field: "file2",
      headerName: "File phụ lục",
      width: 150,
      editable: true,
      type: "file",
    },
  ];

  const handleClose = () => {
    setIsVisible(false);
    setSelectedContract({});
  };

  const RenderModal = useMemo(() => {
    return (
      <div>
        <Dialog
          fullScreen
          open={isVisible}
          onClose={() => {
            setIsVisible(false);
            setSelectedContract({});
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: "12px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </div>

          <div
            style={{
              padding: "12px",
              height: `calc(100vh - 50px)`,
              overflow: "auto",
            }}
          >
            <AddNewContract action="edit" contract={selectedContract} />
          </div>
        </Dialog>
      </div>
    );
  }, [isVisible, selectedContract]);

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns}
          rows={TeachingContractPageData} // Update rows with API data
          title=""
          onSave={() => {
            /* Logic lưu cho lưới dữ liệu 1 */
          }}
          onRowSelectionChange={setSelectedContract}
          selectedRows={selectedContract}
          onCellClick={(ele) => {
            setIsVisible(true);
            setSelectedContract(ele?.row);
          }}
        />
      </Box>
      {RenderModal}
    </div>
  );
};
