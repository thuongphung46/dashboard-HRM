import { BaseGrid } from "components/atoms/datagrid";
import { FC } from "react";

interface Props {
  data: any;
}
export const GridStatistic: FC<Props> = ({ data }) => {
  const columns = [
    { field: "id", headerName: "STT", width: 90 },
    { field: "name", headerName: "Khoa/Bộ môn", width: 150, editable: true },
    {
      field: "sum_teaching",
      headerName: "Tổng giảng dạy",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "sum_guide",
      headerName: "Tổng HD luận văn/ Đồ án",
      width: 200,
      editable: true,
      type: "number",
    },
    {
      field: "sum_research",
      headerName: "Tổng NCKH",
      width: 150,
      editable: true,
      type: "number",
    },
  ];

  return (
    <div>
      <BaseGrid
        columns={columns}
        rows={data}
        onRowSelectionChange={(selection) => console.log(selection)}
        selectedRows={[]}
        title="Statistic"
      />
    </div>
  );
};
