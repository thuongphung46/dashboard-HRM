import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import React, { useEffect, useState } from "react";
import { StaffDetail, StaffSummary } from "types/ApplicationType";

interface Props {
  data: StaffSummary[];
  all_data: StaffDetail;
}
export const Overview: React.FC<Props> = ({ data, all_data }) => {
  const [sum, setSum] = useState({
    Teaching: 0, // giảng dạy
    examCourses: 0, //đánh giá học phần
    instructProject: 0, //hợp đồng luận án,
    numOfclassesTaught: 270, //số tiết phải giảng
    numOfUnfinishedPeriods: 0, //số tiết chưa hoàn thành nghiên cứu KH
    numOfPeriodsReduced: 0, //số tiết được giảm trừ
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 90 },
    { field: "schoolYear", headerName: "Năm học", width: 150 },
    { field: "contentWork", headerName: "Nội dung công việc", width: 400 },
    { field: "numberOfLesson", headerName: "Số tiết dạy", width: 150 },
    { field: "reasonReduce", headerName: "Lý do giảm trừ", width: 500 },
  ];

  useEffect(() => {
    let teachSum = 0;
    let examCoursesSum = 0;
    let instructProjectSum = 0;
    let numOfUnfinishedPeriodsSum = 0;
    all_data.teaching.forEach((item) => (teachSum += item.roundStandard));
    all_data.examCourses.forEach(
      (item) => (examCoursesSum += item.estimatedLesson)
    );
    all_data.instructProject.forEach(
      (item) => (instructProjectSum += item.numberOfLesson)
    );
    all_data.project.forEach(
      (item) => (numOfUnfinishedPeriodsSum += item.numberOfHours)
    );
    all_data.magazine.forEach(
      (item) => (numOfUnfinishedPeriodsSum += item.numberOfHour)
    );
    all_data.invention.forEach(
      (item) => (numOfUnfinishedPeriodsSum += item.numberOfHour)
    );
    all_data.book.forEach(
      (item) => (numOfUnfinishedPeriodsSum += item.numberOfHour)
    );
    all_data.training.forEach(
      (item) => (numOfUnfinishedPeriodsSum += item.numberOfHour)
    );
    all_data.buildingProgram.forEach(
      (item) => (numOfUnfinishedPeriodsSum += item.numberOfHour)
    );

    setSum((prevSum) => ({
      ...prevSum,
      Teaching: teachSum,
      examCourses: examCoursesSum,
      instructProject: instructProjectSum,
      numOfUnfinishedPeriods: numOfUnfinishedPeriodsSum,
    }));
  }, [all_data]);

  const contentStt = ["I", "II", "III", "IV", "V"];
  const contentWorkValues = [
    "Tổng số tiết thực hiện (A+B)",
    "Số tiết phải giảng",
    "Số tiết chưa hoàn thành NCKH",
    "Số tiết được giảm trừ",
    "Tổng số tiết vượt giờ đề nghị thanh toán (I - II - III + IV)",
  ];
  //số tiết thực hiện
  const numOfImplementationPeriods =
    sum.Teaching + sum.examCourses + sum.instructProject;

  //thay các giá trị tương tự vô mảng
  const numberOfLesson = [
    numOfImplementationPeriods,
    sum.numOfclassesTaught,
    sum.numOfUnfinishedPeriods - 300 < 0
      ? Math.abs(sum.numOfUnfinishedPeriods - 300)
      : 0,
    sum.numOfPeriodsReduced,
    numOfImplementationPeriods -
      sum.numOfclassesTaught -
      sum.numOfUnfinishedPeriods +
      sum.numOfPeriodsReduced,
  ];

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
