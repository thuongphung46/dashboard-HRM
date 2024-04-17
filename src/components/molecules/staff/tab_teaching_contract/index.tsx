import React, { useMemo, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";
import { AddNewContract } from "./add_contract/indext";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  useGetListContractStaff,
  useGetDetailContract,
} from "services/hooks/useGetListStaff";
import { useNavigate } from "react-router-dom";
import { storageAction } from "common/function";
import { KeyValue } from "constants/GlobalConstant";
import { GridColDef } from "@mui/x-data-grid/models/colDef";

export const TeachingContractPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedContract, setSelectedContract] = useState<any>({});
  const idUser = storageAction("get", KeyValue.id);
  const { data: TeachingContractPageData, loading } =
    useGetListContractStaff(idUser); // Pass the required argument
  const navigate = useNavigate();

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
      valueOptions: [
        "ds nhan vien cap 4",
      ],
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
    { field: "file1", headerName: "File hợp đồng", width: 150, editable: true , type: "file"},
    { field: "file2", headerName: "File phụ lục", width: 150, editable: true , type: "file"},
  ];
  const rows = [
    {
      id: 1,
      semester: "Học kỳ I",
      year: "2023-2024",
      contract_name: "Hợp đồng giao khoán chuyên môn",
      from_date: "",
      to_date: "",
      status: "",
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
            <AddNewContract contract={selectedContract} />
          </div>
        </Dialog>
      </div>
    );
  }, [isVisible, selectedContract]);

  // Xử lý khi tải file
  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files && event.target.files[0];
  //   if (file) {
  //     // Xử lý file ở đây, ví dụ: đọc nội dung file
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const content = e.target?.result as string;
  //       setSelectedContract(content);
  //     };
  //     reader.readAsText(file);
  //   }
  // };

  //Xử lý

  return (
    <div>
      <Box>
        {/* <label>Thêm hợp đồng </label>
        <input
          type="file"
          accept=".csv,.xlsx,.xls,.docx"
          onChange={handleFileUpload}
        /> */}
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
