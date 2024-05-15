import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";
import { useGetListDepartment } from "services/hooks/useGetListDepartment";
import { StatisticData } from "services/hooks/useGetStatistic";

interface Props {
  data: StatisticData;
}
export const GridStatistic: FC<Props> = ({ data }) => {
  const { data: departmentData } = useGetListDepartment();
  const columns = [
    { field: "id", headerName: "STT", width: 90 },
    { field: "name", headerName: "Khoa/Bộ môn", width: 300, editable: true },
    {
      field: "teaching",
      headerName: "Tổng giảng dạy",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "instructionProject",
      headerName: "Tổng HD luận văn/ Đồ án",
      width: 200,
      editable: true,
      type: "number",
    },
    {
      field: "research",
      headerName: "Tổng NCKH",
      width: 150,
      editable: true,
      type: "number",
    },
  ];

  const departmentMap = departmentData.reduce((acc, dept) => {
    acc[dept.code] = dept.name;
    return acc;
  }, {} as { [key: string]: string });

  const dataShow = Object.entries(data).map(([key, value], index) => {
    console.log(departmentData);
    return {
      id: index + 1,
      name: departmentMap[key] || key,
      teaching: value.teaching,
      instructionProject: value.instructProject,
      research: value.research,
    };
  });

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Thống kê
      </Typography>
      <DataGrid
        columns={columns}
        rows={dataShow}
        disableColumnFilter
        hideFooterPagination
      />
    </div>
  );
};
