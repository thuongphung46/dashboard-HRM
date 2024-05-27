import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import { useGetListReasonReduce } from "services/hooks/useGetListReasonReduce";
import { StaffDetail, StaffSummary } from "types/ApplicationType";

interface Props {
  data: StaffSummary[];
  all_data: StaffDetail;
  schoolYear: string;
}

export const Overview: React.FC<Props> = ({ all_data, schoolYear }) => {
  const [sum, setSum] = useState({
    Teaching: 0,
    examCourses: 0,
    instructProject: 0,
    numOfclassesTaught: 270,
    numOfUnfinishedPeriods: 0,
    numOfPeriodsReduced: 0,
  });

  const { data: ListReason } = useGetListReasonReduce();

  const handleChangeRearon = useCallback((data: any) => {
    setSum((prevSum) => ({
      ...prevSum,
      numOfPeriodsReduced: Math.ceil((data.target.value * 270) / 100),
    }));
  }, []);

  const columns: GridColDef[] = [
    { field: "contentWork", headerName: "Nội dung công việc", width: 400 },
    { field: "numberOfLesson", headerName: "Số tiết dạy", width: 150 },
    {
      field: "reasonReduce",
      headerName: "Lý do giảm trừ",
      width: 500,
      renderCell: (params) => {
        if (params.id === "IV") {
          return (
            <Box sx={{ width: "500px" }}>
              <FormControl fullWidth>
                <Select
                  name="reason"
                  label="Lý do giảm trừ"
                  onChange={handleChangeRearon}
                >
                  {ListReason?.map((item, index) => (
                    <MenuItem key={index} value={item.ratio}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {item.name} <span>{item.ratio}%</span>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          );
        }
      },
    },
  ];

  useEffect(() => {
    const calculateSum = (
      key: keyof StaffDetail,
      condition: (item: any) => boolean
    ) =>
      all_data[key].reduce(
        (
          acc: any,
          item: {
            roundStandard: any;
            estimatedLesson: any;
            numberOfLesson: any;
            numberOfHours: any;
            numberOfHour: any;
          }
        ) =>
          acc +
          (condition(item)
            ? item.roundStandard ||
              item.estimatedLesson ||
              item.numberOfLesson ||
              item.numberOfHours ||
              item.numberOfHour
            : 0),
        0
      );

    const teachSum = calculateSum(
      "teaching",
      (item) => item.schoolYear === schoolYear
    );
    const examCoursesSum = calculateSum(
      "examCourses",
      (item) => item.schoolYear === schoolYear
    );
    const instructProjectSum = calculateSum(
      "instructProject",
      (item) => item.schoolYear === schoolYear
    );
    const numOfUnfinishedPeriodsSum = [
      "project",
      "magazine",
      "invention",
      "book",
      "training",
      "buildingProgram",
    ].reduce(
      (acc, key) =>
        acc +
        calculateSum(
          key as keyof StaffDetail,
          (item) => item.schoolYear === schoolYear
        ),
      0
    );

    setSum((prevSum) => ({
      ...prevSum,
      Teaching: teachSum,
      examCourses: examCoursesSum,
      instructProject: instructProjectSum,
      numOfUnfinishedPeriods: numOfUnfinishedPeriodsSum,
    }));
  }, [all_data, schoolYear]);

  const contentStt = ["I", "II", "III", "IV", "V"];
  const contentWorkValues = [
    "Tổng số tiết thực hiện (A+B)",
    "Số tiết phải giảng",
    "Số tiết chưa hoàn thành NCKH",
    "Số tiết được giảm trừ",
    "Tổng số tiết vượt giờ đề nghị thanh toán (I - II - III + IV)",
  ];

  const numOfImplementationPeriods =
    sum.Teaching + sum.examCourses + sum.instructProject;

  const numberOfLesson = [
    numOfImplementationPeriods,
    sum.numOfclassesTaught,
    Math.max(sum.numOfUnfinishedPeriods - 300, 0),
    sum.numOfPeriodsReduced,
    numOfImplementationPeriods -
      sum.numOfclassesTaught -
      sum.numOfUnfinishedPeriods +
      sum.numOfPeriodsReduced,
  ];

  const rows = contentStt.map((id, index) => ({
    id,
    schoolYear: "",
    contentWork: contentWorkValues[index],
    numberOfLesson: numberOfLesson[index],
    reasonReduce: "",
  }));

  return (
    <Box sx={{ marginTop: 2, height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
};
