import React, { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useGetListContractStaff } from "services/hooks/useGetListStaff";
import HRMStorage from "common/function";
import { KeyValue } from "constants/GlobalConstant";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { toastMessage } from "components/molecules/toast_message";

export const TeachingContract: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const level = HRMStorage.get(KeyValue.Level);
  const [disable, setDisable] = useState<boolean>(true);
  const { data: TeachingContractPageData } = useGetListContractStaff(id);
  useEffect(() => {
    if (level === "LEVEL_4") {
      setDisable(false);
    }
  }, [level]);

  const columns: GridColDef[] = [
    {
      field: "contractName",
      headerName: "Tên hợp đồng",
      width: 300,
      editable: false,
      renderCell: (params: any) => (
        <Link
          style={{
            whiteSpace: "pre-wrap",
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold",
          }}
          to={`/teaching_contract/edit/${params.row.id}`}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "fromDate",
      headerName: "Từ ngày",
      width: 150,
      editable: false,
      type: "date",
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    {
      field: "toDate",
      headerName: "Đến ngày",
      width: 150,
      editable: false,
      type: "date",
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    {
      field: "status",
      headerName: "Trạng thái hợp đồng",
      width: 200,
      editable: false,
      type: "singleSelect",
      getOptionValue: (value: any) => value.code,
      getOptionLabel: (value: any) => value.label,
      valueOptions: [
        { code: 0, label: "chưa thực hiện" },
        { code: 1, label: "đang thực hiện" },
        { code: 2, label: "đã thực hiện" },
        { code: 3, label: "đã thanh lý" },
      ],
    },
  ];

  const hanldAdd = useCallback(() => {
    if (disable) {
      toastMessage("Bạn không có quyền thêm hợp đồng!", "error");
      return;
    }
    navigate(`/teaching_contract/add`);
  }, [disable, navigate]);

  return (
    <div>
      <Button variant="outlined" size="small" onClick={hanldAdd}>
        Tạo mới
      </Button>
      <Box marginTop={2}>
        <DataGrid columns={columns} rows={TeachingContractPageData} />
      </Box>
    </div>
  );
};
