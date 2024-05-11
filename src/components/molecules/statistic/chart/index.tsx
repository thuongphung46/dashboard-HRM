import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { StatisticData } from "services/hooks/useGetStatistic";

interface Props {
  data: StatisticData;
}
export const ChartsOverview: React.FC<Props> = ({ data }) => {
  // const dataset = data.map((item: any) => {
  //   return {
  //     id: item.id,
  //     name: item.name,
  //     cryptography: item.sum_teaching,
  //     cntt: item.sum_guide,
  //     attt: item.sum_research,
  //   };
  // });

  const keys = Object.keys(data.cryptography);
  const dataset = keys.map((key, index) => ({
    id: index + 1,
    cryptography: data.cryptography[key],
    cntt: data.cntt[key],
    attt: data.attt[key],
  }));

  return (
    <BarChart
      dataset={dataset}
      series={[
        { dataKey: "cryptography", label: "Mật mã" },
        { dataKey: "cntt", label: "CNTT" },
        { dataKey: "attt", label: "ATTT" },
      ]}
      height={290}
      xAxis={[
        { data: ["Giảng dạy", "HD luận văn", "NCKH"], scaleType: "band" },
      ]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};
