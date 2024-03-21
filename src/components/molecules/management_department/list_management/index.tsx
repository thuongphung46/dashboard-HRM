import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FC, useCallback, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ReusableField from "components/atoms/field";

interface Props {
  listData: any[];
  handleClickItem: (item: any) => void;
}

export const ListDepartment: FC<Props> = ({ listData, handleClickItem }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const hanldeOnChangefield = useCallback(
    (e: any) => {
      let value = e.target.value;
      let field = e.target.name;
      setFormData({ ...formData, [field]: value });
    },
    [formData]
  );

  const handleShowPopupAdd = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleAddModel = useCallback(() => {
    //call api here
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
        <div
          style={{
            height: "400px",
            width: "600px",
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "4px",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          }}
        >
          <h4>Thêm cấp quản lý</h4>
          <Button variant="outlined" onClick={handleAddModel}>
            Lưu
          </Button>
          {fieldData.map((field) => (
            <ReusableField
              field={field}
              formData={formData}
              hanldeOnChangefield={hanldeOnChangefield}
              key={field.id}
            ></ReusableField>
          ))}
        </div>
      </Modal>
    );
  }, [formData, handleAddModel, handleClose, hanldeOnChangefield, open]);
  return (
    <div
      style={{
        minWidth: "300px",
      }}
    >
      <Button onClick={handleShowPopupAdd}>Add</Button>
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
