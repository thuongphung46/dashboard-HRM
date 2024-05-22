import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetListStaffParams,
  useGetListStaff,
} from "services/hooks/useGetListStaff";
import { columns } from "./columns";
import { DataGrid } from "@mui/x-data-grid";
import HRMStorage from "common/function";
import { KeyValue } from "constants/GlobalConstant";
import { toastMessage } from "components/molecules/toast_message";
import { useGetListRank } from "services/hooks/useGetListRank";
import { useGetListJobTitle } from "services/hooks/useGetListJobTitle";

interface Props {}

export const ListStaff: FC<Props> = () => {
  const navigate = useNavigate();
  const level = HRMStorage.get(KeyValue.Level);
  const [disable, setDisable] = useState<boolean>(true);
  const [params, setParams] = useState<GetListStaffParams>({
    query: "",
    active: undefined,
    page: 0,
    size: 25,
  });
  const { data: staffList, loading } = useGetListStaff(params);
  const { data: jobTitleData } = useGetListJobTitle();
  const { data: rankData } = useGetListRank(); // Fetching rank data

  useEffect(() => {
    if (level === "LEVEL_4") {
      setDisable(false);
    }
  }, [level]);

  const handleCellClick = useCallback(
    (e: any) => {
      if (!disable) {
        navigate(`/detail_employee/${e.id}`);
      } else if (e.id.toString() === HRMStorage.get(KeyValue.id)) {
        navigate(`/detail_me`);
      } else {
        toastMessage("Bạn không có quyền truy cập", "error");
        return;
      }
    },
    [disable, navigate]
  );
  const handleAddNew = useCallback(
    (e: any) => {
      if (!disable) {
        navigate(`/detail_employee/add`);
      } else {
        toastMessage("Bạn không có quyền thêm nhân viên!", "error");
        return;
      }
    },
    [disable, navigate]
  );

  // Create a mapping from job title code to job title name
  const jobTitleMap = useMemo(() => {
    if (!jobTitleData) return {};
    const map: { [key: string]: string } = {};
    jobTitleData.forEach((job) => {
      map[job.code] = job.jobTitle;
    });
    return map;
  }, [jobTitleData]);

  const rankMap = useMemo(() => {
    if (!rankData) return {};
    const map: { [key: string]: string } = {};
    rankData.forEach((rank) => {
      map[rank.id] = rank.rankName;
    });
    return map;
  }, [rankData]);

  const transformedStaffList = useMemo(() => {
    if (!staffList) return [];
    return staffList.map((staff) => ({
      ...staff,
      jobTitle:
        staff.jobTitle && jobTitleMap[staff.jobTitle]
          ? jobTitleMap[staff.jobTitle]
          : staff.jobTitle,
      rankName:
        staff.rankName && rankMap[staff.rankName]
          ? rankMap[staff.rankName]
          : staff.rankName,
    }));
  }, [staffList, jobTitleMap, rankMap]);

  return (
    <div>
      <Box>
        <Box
          sx={{
            maxWidth: "500px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Input
            value={params.query}
            onChange={(e) => setParams({ ...params, query: e.target.value })}
            placeholder="Tìm kiếm nhân viên"
          />
          <FormControl sx={{ m: "0px 4px", minWidth: 200 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={params.active}
              sx={{
                minWidth: "120px",
                width: "200px",
              }}
              label={"Trạng thái"}
              defaultValue={undefined}
              onChange={(e) => {
                setParams({ ...params, active: e.target.value as 0 | 1 });
              }}
            >
              <MenuItem value={undefined}>Tất cả</MenuItem>
              <MenuItem value={1}>Đang làm việc</MenuItem>
              <MenuItem value={0}>Đã nghỉ việc</MenuItem>
            </Select>
          </FormControl>
          <Button
            size="small"
            variant="outlined"
            sx={{ width: "80px" }}
            onClick={handleAddNew}
            disabled={disable}
          >
            Thêm
          </Button>
        </Box>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Typography variant="h5">Danh sách nhân viên</Typography>
            <DataGrid
              sx={{
                height: "calc(100vh - 250px)",
              }}
              columns={columns}
              rows={transformedStaffList}
              disableRowSelectionOnClick
              onCellClick={handleCellClick}
            />
          </>
        )}
      </Box>
    </div>
  );
};
