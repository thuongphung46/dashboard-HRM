import Box from "@mui/material/Box";
import { BaseGrid } from "components/atoms/datagrid";
import { FC, useCallback, useEffect, useState } from "react";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { ListStaffService } from "services/staff";

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
  const [staffList, setStaffList] = useState<StaffData[]>([]);

  useEffect(() => {
    // Gọi API để lấy danh sách nhân viên khi trang được tải lần đầu
    fetchStaffList();
  }, []); // Tham số thứ hai là một mảng rỗng, chỉ gọi API khi trang được tải lần đầu

  const fetchStaffList = async () => {
    try {
      const response = await ListStaffService.getListStaff({
        query: "",
        active: 1,
        page: 0,
        size: 1000,
      });
      if (response.msg_code ===   200) {
setStaffList(response.content.data);
      }
    
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  const handleCellClick = useCallback(
    (e: any) => {
      navigate(`/detail_employee/${e.id}`);
    },
    [navigate]
  );

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns}
          rows={staffList}
          title="Danh sách nhân viên"
          checkboxSelection
          disableRowSelectionOnClick
          onCellClick={handleCellClick} 
          onRowSelectionChange={function (selection: any): void {
            throw new Error("Function not implemented.");
          } } 
          selectedRows={[]}
        />
    </Box>
    </div>
  );
};
