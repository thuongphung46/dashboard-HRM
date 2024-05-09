import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import React, { useEffect, useRef, useState } from "react";
import { StaffDetail, StaffSummary } from "types/ApplicationType";

interface Props {
  data: StaffSummary[];
  all_data: StaffDetail;
}
export const Overview: React.FC<Props> = ({ data, all_data }) => {
  const [sum, setSum] = useState({
    Teaching: 0,
    Research: 0,
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 90 },
    { field: "schoolYear", headerName: "Năm học", width: 150 },
    { field: "contentWork", headerName: "Nội dung công việc", width: 400 },
    { field: "numberOfLesson", headerName: "Số tiết dạy", width: 150 },
    { field: "reasonReduce", headerName: "Lý do giảm trừ", width: 500 },
  ];

  useEffect(() => {
    //tính sum teaching
    let teachCount = 0;
    all_data.teaching.forEach((item) => (teachCount += item.roundStandard));
    setSum({ ...sum, Teaching: teachCount });
  }, []);

  const contentStt = ["I", "II", "III", "IV", "V"];
  const contentWorkValues = [
    "Tổng số tiết thực hiện (A+B)",
    "Số tiết phải giảng",
    "Số tiết chưa hoàn thành NCKH",
    "Số tiết được giảm trừ",
    "Tổng số tiết vượt giờ đề nghị thanh toán (I - II - III + IV)",
  ];

  //thay các giá trị tương tự vô mảng
  const numberOfLesson = [sum.Teaching + 0, 0, 0, 0, 0];

  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push({
      id: contentStt[i],
      schoolYear: "",
      contentWork: contentWorkValues[i],
      numberOfLesson: numberOfLesson[i],
      reasonReduce: "",
    });
  }

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
