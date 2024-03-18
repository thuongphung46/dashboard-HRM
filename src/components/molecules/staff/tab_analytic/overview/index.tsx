import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import React, { useRef, useState } from "react";

interface Props {}
export const Overview: React.FC<Props> = () => {
  const gridRef = useRef<any>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 90 },
    { field: "content", headerName: "Nội dung công việc", width: 500 },
    { field: "num_lesion", headerName: "Số tiết dạy", width: 150 },
    { field: "resion", headerName: "Lý do giảm trừ", width: 150 },
  ];

  const [dataSource, setDataSource] = useState([
    {
      id: "I",
      content: "Tổng số tiết thực hiện (A+B)",
      num_lesion: "588",
      resion: "",
    },
    { id: "II", content: "Số tiêt phải giảng", num_lesion: "270", resion: "" },
    {
      id: "III",
      content: "Số tiết chưa hoàn thành NCKH",
      num_lesion: "0",
      resion: "",
    },
    {
      id: "IV",
      content: "Số tiết được giảm trừ",
      num_lesion: "54",
      resion: "",
    },
    {
      id: "V",
      content: "Tổng số tiết vượt giờ đề nghị thanh toán (I - II - III + IV)",
      num_lesion: "372",
      resion: "",
    },
  ]);

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={dataSource}
          columns={columns}
          ref={gridRef}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </div>
  );
};
