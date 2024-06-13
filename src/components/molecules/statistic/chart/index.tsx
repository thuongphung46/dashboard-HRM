import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { StatisticData } from "services/hooks/useGetStatistic";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  bar: {
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    borderRadius: "4px",
  },
});

interface Props {
  data: StatisticData;
  departmentData: any[];
}

const KEYS = ["teaching", "instructProject", "research"];
export const ChartsOverview: React.FC<Props> = ({ data, departmentData }) => {
  const classes = useStyles();
  const listCode = Object.keys(data);
  const series = listCode.map((code) => {
    const obj: any = {};
    obj.dataKey = code;
    obj.label = departmentData.find((item: any) => item.code === code)?.name;
    return obj;
  });

  const datasetShow = KEYS.map((key) => {
    const obj: any = {};
    listCode.forEach((code) => {
      obj[code] = data[code][key];
    });
    return obj;
  });

  // Preprocess data to remove commas and ensure numbers are formatted correctly
  const formattedDataset = datasetShow.map((dataItem) => {
    const formattedItem: any = {};
    Object.keys(dataItem).forEach((key) => {
      formattedItem[key] = Number(dataItem[key].toString().replace(/,/g, ""));
    });
    return formattedItem;
  });

  return (
    <BarChart
      dataset={formattedDataset}
      series={series}
      height={300}
      xAxis={[
        { data: ["Giảng dạy", "HD luận văn", "NCKH"], scaleType: "band" },
      ]}
      yAxis={[
        {
          scaleType: "linear",
          valueFormatter: (value: number) => {
            if (value >= 1000 && value < 1000000) {
              return `${value / 1000}k`;
            }
            if (value >= 1000000) {
              return `${value / 1000000}m`;
            }
            return value.toString();
          },
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      slotProps={{
        bar: { className: classes.bar, rx: 4 },
      }}
    />
  );
};
