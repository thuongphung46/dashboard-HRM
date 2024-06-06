import { FC } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import { useGridApiRef } from "@mui/x-data-grid";

interface BaseGridProps extends DataGridProps {
  columns: GridColDef[];
  title: string;
  onSave?: (data: any, preData?: any) => void;
  onDel?: (id: any) => void;
  onRowSelectionChange?: (selection: any) => void;
  selectedRows: GridRowId[];
  rows: any[];
  disable?: boolean;
}

export const BaseGrid: FC<BaseGridProps> = ({
  columns,
  title,
  onSave,
  onRowSelectionChange,
  selectedRows,
  rows,
  onDel,
  disable,
  ...rest
}) => {
  const confirm = useConfirm();
  const apiRef = useGridApiRef();
  const [data, setData] = React.useState<any[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    const newData = rows.map((row, index) => ({ ...row, "#": index + 1 }));
    setData(newData);
  }, [rows]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    confirm({
      title: "Xác nhận xóa",
      description: `Bạn có chắc muốn xóa?`,
      confirmationText: "Đồng ý",
      cancellationText: "Hủy",
    })
      .then(() => {
        // setData(data.filter((row) => row.id !== id));
        onDel && onDel(id);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = data.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setData(data.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const previousRow = data.find((row) => row.id === newRow.id);
    setData(data.map((row) => (row.id === newRow.id ? updatedRow : row)));

    if (onSave) {
      if (newRow.isNew) {
        onSave({ ...updatedRow, isNew: true });
      } else {
        //update
        onSave(updatedRow, previousRow);
      }
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const Custcolumns: GridColDef[] = [
    { field: "#", headerName: "STT", width: 70 },
    ...columns,
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Lưu"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Xóa"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Sửa"
            className="textPrimary"
            disabled={disable}
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Xóa"
            disabled={disable}
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
        apiRef={apiRef}
        rows={data}
        columns={Custcolumns}
        editMode="row"
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
          toolbar: {
            data,
            setData,
            setRowModesModel,
            disable,
            apiRef,
            columns,
          },
        }}
        {...rest}
      />
    </div>
  );
};

interface EditToolbarProps {
  data: any[];
  setData: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  disable?: boolean;
  apiRef: React.MutableRefObject<any>;
  columns: GridColDef[];
}
function EditToolbar(props: EditToolbarProps) {
  const { setData, setRowModesModel, data, disable, apiRef, columns } = props;

  const handleClick = () => {
    const getRandomUniqueId = (): number => {
      return Math.floor(Math.random() * 100); // Generate a random ID
    };

    const generateUniqueRandomId = (): number => {
      const id = getRandomUniqueId();
      if (data.some((item) => item.id === id)) {
        return generateUniqueRandomId(); // If ID exists, recursively generate a new one
      }
      return id;
    };

    const id = generateUniqueRandomId();

    setData((oldRows) => [
      ...oldRows,
      { id, isNew: true, "#": data.length + 1 },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));

    // Set focus to the first cell of the new row after a short delay
    setTimeout(() => {
      //focus on the second cell of the new row
      apiRef.current.setCellFocus(id, columns[0].field);
    }, 100);
  };

  return (
    <GridToolbarContainer>
      <Button
        disabled={disable}
        color="primary"
        variant="outlined"
        size="small"
        startIcon={<AddIcon />}
        onClick={handleClick}>
        Tạo mới
      </Button>
    </GridToolbarContainer>
  );
}
