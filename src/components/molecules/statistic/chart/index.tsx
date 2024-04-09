import * as React from "react";
import { BarChart } from '@mui/x-charts/BarChart';

const dataset = [
  { name: 'teaching', Mật_mã: 35, CNTT: 44, ATTT: 24 },
  { name: 'guide', Mật_mã: 51, CNTT: 6, ATTT: 49 },
  { name: 'research', Mật_mã: 15, CNTT: 25, ATTT: 30 },
];
export default function ChartsOverview() {
  return (
    <BarChart
      dataset={dataset}
      series={[
        {dataKey: 'Mật_mã', label: 'Mật mã'},
        {dataKey: 'CNTT', label: 'CNTT'},
        {dataKey: 'ATTT', label: 'ATTT'},
      ]}
      height={290}
      xAxis={[{ data: ['Giảng dạy', 'HD luận văn', 'NCKH'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
