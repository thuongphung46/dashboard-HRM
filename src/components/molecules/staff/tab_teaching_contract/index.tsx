import React from "react";
import { Box, Button } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";
import { useGetListContractStaff } from "services/hooks/useGetListStaff";
import { storageAction } from "common/function";
import { KeyValue } from "constants/GlobalConstant";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { useNavigate } from "react-router-dom";

export const TeachingContractPage: React.FC = () => {
  const navigate = useNavigate();
  const idUser = storageAction("get", KeyValue.id);
  const { data: TeachingContractPageData } = useGetListContractStaff(idUser);

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

  return (
    <div>
      <Button>Add contact</Button>
      <Box>
        <BaseGrid
          columns={columns}
          rows={TeachingContractPageData} // Update rows with API data
          title=""
          onSave={() => {
            /* Logic lưu cho lưới dữ liệu 1 */
          }}
          onRowSelectionChange={(e) => {}}
          selectedRows={[]}
          onCellClick={(e) => {
            navigate(`edit/${e.row.id}`);
          }}
        />
      </Box>
    </div>
  );
};
