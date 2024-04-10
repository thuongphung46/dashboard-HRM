import Box from "@mui/material/Box/Box";
import { FC, useEffect, useRef, useState } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";
import { Grid } from "@mui/material";

type Props = {
  data: any;
};
interface IGridWorkingHistory {
  handleDel: () => void;
  handleAddRow: () => void;
  handleSave: () => void;
  handleRowSelect: (e: any) => void;
  dataSelectRow: any;
  dataSource: any;
  gridRef: any;
}

export const GridWorkingHistory: FC<IGridWorkingHistory> = ({
  handleDel,
  handleAddRow,
  handleSave,
  dataSource,
  gridRef,
  dataSelectRow,
  handleRowSelect,
}) => {
  useEffect(() => {
    dataSource?.forEach((ele: any) => {
      if (ele.fromDate) {
        const fromDate = new Date(ele.fromDate);
        ele.fromDate = fromDate;
      }
      if (ele.toDate) {
        const toDate = new Date(ele.toDate);
        ele.toDate = toDate;
      }
    });
  }, [dataSource]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 150 },
    {
      field: "fromDate",
      headerName: "Từ ngày",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      field: "toDate",
      headerName: "Đến ngày",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      field: "jobTitle",
      headerName: "Chức vụ",
      width: 300,
      editable: true,
      type: "text",
    },
    {
      field: "content",
      headerName: "Nội dung",
      width: 400,
      editable: true,
      type: "text",
    },
  ];

  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  return (
    <div>
      <BaseGrid
        onRowSelectionChange={handleRowSelect}
        title=""
        columns={columns}
        rows={dataSource}
        ref={gridRef}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row: any) => generateRandom()}
        selectedRows={dataSelectRow}
      ></BaseGrid>
    </div>
  );
};

export const WorkingHistory = ({ data }: Props) => {
  const gridRef = useRef<any>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [dataSource, setDataSource] = useState<any[]>(
    data?.staffWorkingHistories
  );

  data.staffWorkingHistories.forEach((item: any) => {
    if (item.bonus !== null) {
      item.content = item.bonus;
    }
    if (item.discipline !== null) {
      item.content = item.discipline;
    }
  });

  const handleAddRow = () => {
    const newRow = {
      id: dataSource.length + 1,
      from_date: new Date(),
      to_date: new Date(),
      content: "",
    };
    setDataSource([...dataSource, newRow]);
  };

  const handleSave = () => {
    // Handle save logic here
  };

  const handleDelete = () => {
    const updatedDataSource = dataSource.filter(
      (row: any) => !selectedRows.includes(row.id)
    );
    setDataSource(updatedDataSource);
    setSelectedRows([]); // Xóa hàng đã chọn sau khi xóa
  };

  const handleRowSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid sx={{ marginTop: "24px" }} container alignItems="center">
        <GridWorkingHistory
          dataSelectRow={selectedRows}
          dataSource={dataSource}
          gridRef={gridRef}
          handleAddRow={handleAddRow}
          handleDel={handleDelete}
          handleRowSelect={handleRowSelectionChange}
          handleSave={handleSave}
        />
      </Grid>
    </Box>
  );
};
