import { BaseGrid } from "components/atoms/datagrid";

export const GridStatistic = () => {
  const columns = [
    { field: "id", headerName: "STT", width: 90 },
    { field: "name", headerName: "Khoa/Bộ môn", width: 150, editable: true },
    { field: "sum_teaching", headerName: "Tổng giảng dạy", width: 150, editable: true, type: "number" },
    { field: "sum_guide", headerName: "Tổng HD luận văn/ Đồ án", width: 200, editable: true, type: "number" },
    { field: "sum_research", headerName: "Tổng NCKH", width: 150, editable: true, type: "number" },
  ];
  const rows = [
    { id: 1, name: "Khoa CNTT", sum_teaching: 100, sum_guide: 50, sum_research: 20 },
    { id: 2, name: "Khoa Toán", sum_teaching: 80, sum_guide: 40, sum_research: 10},
  ];

  return (
    <div>
      <BaseGrid
        columns={columns}
        rows={rows}
        onRowSelectionChange={(selection) => console.log(selection)}
        selectedRows={[]}
        title="Statistic"
      />
    </div>
  );
};
