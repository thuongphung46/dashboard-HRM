import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { FC, useCallback, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ReusableField, { IFormData } from "components/atoms/field";
import { useCreateDepartment } from "services/hooks/useGetListDepartment";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DepartmentService } from "services/model_management_service";
import { MessageCode } from "types/enum/message_code";
import { toastMessage } from "components/molecules/toast_message";

interface Props {
  departmentList: any[];
  setDepartmentList: (data: any) => void;
  handleClickItem: (item: any) => void;
  active: any;
  disable?: boolean;
}

export const ListDepartment: FC<Props> = ({
  departmentList,
  handleClickItem,
  setDepartmentList,
  active,
  disable,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openPEdit, setOpenPEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [dataEdit, setDataEdit] = useState<any>({
    id: 0,
    name: "",
    parentDeptId: "",
    type: "",
  });
  const { createDepartment } = useCreateDepartment();

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
  const dataOptions = departmentList.map((department) => ({
    label: department.name,
    value: department.id,
  }));

  const renderPopup = useMemo(() => {
    const fieldData: IFormData[] = [
      { id: "name", label: "Tên cấp quản lý", type: "text" },
      {
        id: "parent",
        label: "Trực thuộc cấp",
        type: "select",
        options: [
          { value: undefined, label: "không thuộc cấp quản lý nào" },
          ...dataOptions,
        ],
      },
      {
        id: "type",
        label: "Loại",
        type: "select",
        options: [
          { value: "education", label: "Giảng dạy" },
          { value: "back_office", label: "Quản trị" },
        ],
      },
    ];
    const handleSave = async () => {
      // Kiểm tra xem tên cấp quản lý đã được nhập hay chưa
      const nameField = fieldData.find((field) => field.id === "name");
      if (nameField && !formData[nameField.id]) {
        toast("Vui lòng nhập Tên cấp quản lý");
        return;
      }
      // Define body here
      const body = {
        name: formData["name"],
        parentDeptId: formData["parent"],
        type: formData["type"],
      };
      // Tiếp tục xử lý lưu dữ liệu
      const response = await createDepartment(body);
      if (response && response?.message === "success") {
        toast("Thành công");
        setOpen(false);
        //add lại state
        setDepartmentList([...departmentList, body]);
        setFormData({});
      } else {
        toast(response?.message || "Tạo mới phòng ban không thành công");
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
  }, [
    dataOptions,
    open,
    handleClose,
    formData,
    createDepartment,
    setDepartmentList,
    departmentList,
    hanldeOnChangefield,
  ]);

  const handleOpenEdit = useCallback((e: any) => {
    setDataEdit({
      id: e.id,
      name: e.name,
      parentDeptId: e.parentDeptId,
      type: e.type,
    });
    setOpenPEdit(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setOpenPEdit(false);
  }, []);

  const handleDel = useCallback(
    (e: any) => {
      DepartmentService.Delete({
        id: e.id,
      }).then((res) => {
        if (res && res?.msg_code === MessageCode.Failed) {
          toastMessage(
            "Xóa thất bại! Phòng ban đang tồn tại nhân viên.",
            "error"
          );
        } else {
          setDepartmentList(departmentList.filter((item) => item.id !== e.id));
          toastMessage("Xóa thành công", "success");
        }
      });
    },
    [setDepartmentList, departmentList]
  );
  const handleEdit = useCallback(() => {
    DepartmentService.Update({
      id: dataEdit.id,
      name: dataEdit.name,
      parentDeptId: dataEdit.parentDeptId,
      type: dataEdit.type,
    }).then((res) => {
      if (res && res?.msg_code === MessageCode.Success) {
        setDepartmentList(
          departmentList.map((item) => {
            if (item.id === dataEdit.id) {
              return dataEdit;
            }
            return item;
          })
        );
        setOpenPEdit(false);
        toastMessage("Cập nhật thành công!", "success");
      } else {
        toastMessage("Thất bại", "error");
      }
    });
  }, [dataEdit, departmentList, setDepartmentList]);

  const handleOnChange = useCallback(
    (e: any) => {
      setDataEdit({ ...dataEdit, [e.target.name]: e.target.value });
    },
    [dataEdit]
  );

  const renderPopupEdit = useMemo(() => {
    const fieldPopupEdit: IFormData[] = [
      { id: "name", label: "Tên cấp quản lýP", type: "text" },
      {
        id: "type",
        label: "Loại",
        type: "select",
        options: [
          { value: "education", label: "Giảng dạy" },
          { value: "back_office", label: "Quản trị" },
        ],
      },
    ];
    return (
      <>
        <Modal
          open={openPEdit}
          onClose={handleCloseEdit}
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
            <Button onClick={handleEdit} variant="outlined">
              Lưu
            </Button>
            {fieldPopupEdit.map((field) => (
              <ReusableField
                field={field}
                formData={dataEdit}
                hanldeOnChangefield={handleOnChange}
                key={field.id}
              ></ReusableField>
            ))}
          </div>
        </Modal>
      </>
    );
  }, [openPEdit, dataEdit, handleCloseEdit, handleEdit, handleOnChange]);

  return (
    <div
      style={{
        width: "30%",
      }}
    >
      <Button
        disabled={disable}
        variant="outlined"
        onClick={handleShowPopupAdd}
      >
        Thêm cấp quản lý
      </Button>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          "& ul": { padding: 0 },
          maxHeight: `calc(100vh - 120px)`,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {departmentList.map((item) => {
          return (
            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                },
                backgroundColor:
                  active === item.id ? "rgba(0,0,0,0.1)" : "transparent",
                padding: "0px 4px",
                height: 54,
              }}
              key={item.id}
            >
              <ListItemText
                sx={{
                  height: "100%",
                  width: "76%",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => handleClickItem(item)}
              >
                {item.name}
              </ListItemText>
              <ListItemButton
                disabled={disable}
                onClick={() => handleOpenEdit(item)}
                sx={{ height: "100%", width: "14%" }}
              >
                <EditIcon />
              </ListItemButton>
              <ListItemButton
                disabled={disable}
                onClick={() => handleDel(item)}
                sx={{ height: "100%", width: "14%" }}
              >
                <DeleteIcon />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {renderPopup}
      {renderPopupEdit}
    </div>
  );
};
