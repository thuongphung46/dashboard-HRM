import { Input, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import { BaseGrid } from "components/atoms/datagrid";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetListStaffParams,
  useGetListStaff,
} from "services/hooks/useGetListStaff";
import { columns } from "./columns";

interface Props {}

export const ListStaff: FC<Props> = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<GetListStaffParams>({
    query: "",
    active: undefined,
    page: 0,
    size: 25,
  });
  const { data: staffList, loading } = useGetListStaff(params);

  const handleCellClick = useCallback(
    (e: any) => {
      navigate(`/detail_employee/${e.id}`);
    },
    [navigate]
  );

  return (
    <div>
      <Box>
        <Input
          value={params.query}
          onChange={(e) => setParams({ ...params, query: e.target.value })}
          placeholder="Tìm kiếm nhân viên"
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={params.active}
          label="Age"
          onChange={(e) => {
            setParams({ ...params, active: e.target.value as 0 | 1 });
          }}
        >
          <MenuItem value={undefined}>Tất cả</MenuItem>
          <MenuItem value={1}>Đang làm việc</MenuItem>
          <MenuItem value={0}>Đã nghỉ việc</MenuItem>
        </Select>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <BaseGrid
            columns={columns}
            rows={staffList}
            title="Danh sách nhân viên"
            checkboxSelection
            disableRowSelectionOnClick
            onCellClick={handleCellClick}
            onRowSelectionChange={function (selection: any): void {
              throw new Error("Function not implemented.");
            }}
            selectedRows={[]}
          />
        )}
      </Box>
    </div>
  );
};
