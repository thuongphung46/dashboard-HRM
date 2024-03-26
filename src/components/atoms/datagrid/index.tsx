import { ForwardedRef, forwardRef, useCallback } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  DataGridProps,
  GridActionsCellItem,
  GridToolbarContainer,
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModel,
} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";

interface BaseGridProps extends DataGridProps {
  columns: GridColDef[];
  title: string;
  rows: any[];
  onSave?: (data: any) => void;
  onRowSelectionChange: (selection: any) => void;
  selectedRows: GridRowId[];
  callBack?: (data: any) => void;
}

export const BaseGrid = forwardRef<any, BaseGridProps>(
  (
    {
      columns,
      title,
      onSave,
      onRowSelectionChange,
      selectedRows,
      rows,
      callBack,
      ...rest
    },
    ref: ForwardedRef<any>
  ) => {
    const [dataSource, setDataSource] = React.useState<any[]>([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
      {}
    );

    React.useEffect(() => {
      setDataSource(rows);
    }, [rows]);

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
      params,
      event
    ) => {

      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };

    const handleDeleteClick = (id: GridRowId) => () => {
      setDataSource(dataSource.filter((row) => row.id !== id));
    };

    const processRowUpdate = (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      setDataSource(
        dataSource.map((row) => (row.id === newRow.id ? updatedRow : row))
      );
      return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };

    const Custcolumns: GridColDef[] = [
      ...columns,
      {
        field: "actions",
        type: "actions",
        headerName: "",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <DataGrid
          rows={dataSource}
          onStateChange={callBack}
          columns={Custcolumns}
          ref={ref}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onRowSelectionModelChange={onRowSelectionChange}
          rowSelectionModel={selectedRows}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setDataSource, setRowModesModel, dataSource, onSave },
          }}
          {...rest}
        />
      </div>
    );
  }
);

interface EditToolbarProps {
  dataSource: any[];
  onSave: (data: any) => void;
  setDataSource: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}
function EditToolbar(props: EditToolbarProps) {
  const { setDataSource, setRowModesModel, dataSource, onSave } = props;

  const handleClick = () => {
    const id = dataSource.length + 1;
    setDataSource((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View, fieldToFocus: "name" },
    }));
  };

  const handleClickSave = useCallback(() => {
    onSave(dataSource);
  }, [dataSource, onSave]);

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add row
      </Button>
      <Button
        color="primary"
        startIcon={<SaveIcon />}
        onClick={handleClickSave}
      >
        Save
      </Button>
    </GridToolbarContainer>
  );
}
