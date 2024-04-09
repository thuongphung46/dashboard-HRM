import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ReusableField from "components/atoms/field";
import { useGetListDepartment, useCreateDepartment } from 'services/hooks/useGetListDepartment';
import { toast } from "react-toastify";

interface Props {
  listData: any[];
  handleClickItem: (item: any) => void;
}
interface DepartmentData {
  id: number;
  name: string;
  parentDeptId: string;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  groups: Group[];
}
interface Group {
  id: number;
  name: string;
  parentDeptId: string;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  groups: any[];
}

export const ListDepartment: FC<Props> = ({ listData, handleClickItem }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const {loading, data: departmentData } = useGetListDepartment();
  const [departmentList, setDepartmentList] = useState<DepartmentData[]>([]);

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

  const { createDepartment } = useCreateDepartment();

  const handleAddModel = useCallback(() => {
    //get list department

  }, []);

  useEffect(() => {
    if (!loading && departmentData) {
      setDepartmentList(departmentData);
    }
  }, [loading, departmentData]);

  const renderPopup = useMemo(() => {
    const fieldData = [
      // { id: "code", label: "Mã cấp quản lý", type: "text" },
      { id: "name", label: "Tên cấp quản lý", type: "text" },
      { id: "parent", label: "Trực thuộc cấp", type: "text" },
    ];

    const handleSave = async () => {
      // Kiểm tra xem tên cấp quản lý đã được nhập hay chưa
      const nameField = fieldData.find(field => field.id === 'name');
      if (nameField && !formData[nameField.id]) {
        toast('Vui lòng nhập Tên cấp quản lý');
        return;
      }
      // Define body here
      const body = {
        name: formData['name'],
        parentDeptId: formData['parent'],
      }; 
      // Tiếp tục xử lý lưu dữ liệu
      const response = await createDepartment(body);
      if (response && response.message === 'success') {
        toast('Thành công');
        handleClose();
      } else {
        toast('Tạo phòng không thành công');
      }
    };

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
          <Button variant="outlined" onClick={handleSave}>
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
  }, [formData, handleClose, hanldeOnChangefield, open, createDepartment]);

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
