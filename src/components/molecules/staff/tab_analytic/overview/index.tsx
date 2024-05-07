import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { latinToRoman } from "common/function";
import { isNullOrEmpty } from "common/validation";
import React, { useRef } from "react";
import { ContentWork, StaffSummary } from "types/ApplicationType";

interface Props {
  data: StaffSummary[];
}
export const Overview: React.FC<Props> = ({ data }) => {
  const gridRef = useRef<any>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 90 },
    { field: "schoolYear", headerName: "Năm học", width: 150 },
    { field: "contentWork", headerName: "Nội dung công việc", width: 400 },
    { field: "numberOfLesson", headerName: "Số tiết dạy", width: 150 },
    { field: "reasonReduce", headerName: "Lý do giảm trừ", width: 500 },
  ];

  const contentStt = ["I", "II", "III", "IV", "V"];
  const contentWorkValues = ["Tổng số tiết thực hiện (A+B)", "Số tiết phải giảng", "Số tiết chưa hoàn thành NCKH", "Số tiết được giảm trừ", "Tổng số tiết vượt giờ đề nghị thanh toán (I - II - III + IV)"];
  
  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push({
      id: contentStt[i % contentStt.length],
      schoolYear: "",
      contentWork: contentWorkValues[i % contentWorkValues.length],
      numberOfLesson: "",
      reasonReduce: "",
    });
  }
  
  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
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
