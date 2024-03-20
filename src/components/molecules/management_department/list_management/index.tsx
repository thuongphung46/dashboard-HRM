import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FC, useCallback, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

interface Props {
  listData: any[];
  handleClickItem: (item: any) => void;
}

export const ListDepartment: FC<Props> = ({ listData, handleClickItem }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleAddDepartment = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const renderPopup = useMemo(() => {
    const fieldData = [
      { id: "code", label: "Mã cấp quản lý", type: "text" },
      { id: "name", label: "Tên cấp quản lý", type: "text" },
      { id: "parent", label: "Trực thuộc cấp", type: "text" },
    ];
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div style={{ height: "400px", width: "600px", backgroundColor: "#fff", padding:"24px" }}>
          <h4>Thêm cấp quản lý</h4>
          <Button variant="outlined" onClick={handleClose}>
            Lưu
          </Button>
          {fieldData.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <input type={field.type} id={field.id} />
            </div>
          ))}
        </div>
      </Modal>
    );
  }, [handleClose, open]);
  return (
    <div
      style={{
        minWidth: "300px",
      }}
    >
      <Button onClick={handleAddDepartment}>Add</Button>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          "& ul": { padding: 0 },
          maxHeight: `calc(100vh - 120px)`,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {listData.map((item) => {
          return (
            <ListItemButton key={item.id} onClick={() => handleClickItem(item)}>
              <ListItemText primary={`${item.name}`} />
            </ListItemButton>
          );
        })}
      </List>
      {renderPopup}
    </div>
  );
};
