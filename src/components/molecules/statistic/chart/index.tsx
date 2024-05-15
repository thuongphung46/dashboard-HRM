import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { StatisticData } from "services/hooks/useGetStatistic";
import { useGetListDepartment } from "services/hooks/useGetListDepartment";

interface Props {
  data: StatisticData;
  departmentData: any[];
}

const KEYS = ["teaching", "instructProject", "research"];
export const ChartsOverview: React.FC<Props> = ({ data, departmentData }) => {
  const listCode = Object.keys(data);
  const series = listCode.map((code) => {
    const obj: any = {};
    obj.dataKey = code;
    obj.label = departmentData.find((item: any) => item.code === code)?.name;
    return obj;
  });

  const datasetShow = KEYS.map((key, index) => {
    const obj: any = {};
    listCode.forEach((code) => {
      obj[code] = data[code][key];
    });
    return obj;
  });

  // const dataKey;

  return (
    <BarChart
      dataset={datasetShow}
      series={series}
      height={290}
      xAxis={[
        { data: ["Giảng dạy", "HD luận văn", "NCKH"], scaleType: "band" },
      ]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};
