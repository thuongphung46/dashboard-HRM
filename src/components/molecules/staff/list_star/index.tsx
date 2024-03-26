import Box from "@mui/material/Box";
import { BaseGrid } from "components/atoms/datagrid";
import { FC, useCallback, useEffect, useState } from "react";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import {
  GetListStaffParams,
  useGetListStaff,
} from "services/hooks/useGetListStaff";

interface Props {}
interface StaffData {
  id: number;
  staff_id: string;
  staff_name: string;
  position_name: string;
  rank_name: string;
  level_name: string;
}

export const ListStaff: FC<Props> = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<GetListStaffParams>({
    query: "",
    active: 1,
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
