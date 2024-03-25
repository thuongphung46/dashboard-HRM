import { BaseGrid } from "components/atoms/datagrid";

export const GridStatistic = () => {
  return (
    <div>
      <BaseGrid
        columns={[
          { field: "id", headerName: "STT", width: 90 },
          { field: "name", headerName: "Name", width: 150, editable: true },
          { field: "age", headerName: "Age", width: 150, editable: true },
          { field: "job", headerName: "Job", width: 150, editable: true },
        ]}
        rows={[
          { id: 1, name: "John", age: 35, job: "Engineer" },
          { id: 2, name: "Jane", age: 24, job: "Doctor" },
          { id: 3, name: "Doe", age: 45, job: "Teacher" },
        ]}
        onRowSelectionChange={(selection) => console.log(selection)}
        selectedRows={[]}
        title="Statistic"
      />
    </div>
  );
};
