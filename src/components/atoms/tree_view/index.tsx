import {
  Button,
  Modal,
  Typography,
  TextField,
  InputLabel,
  Box,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FC, useCallback, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { IFormData } from "../field";
import { useGetListDepartment } from "services/hooks/useGetListDepartment";
import { DepartmentService } from "services/model_management_service";
import { MessageCode } from "types/enum/message_code";
import { toastMessage } from "components/molecules/toast_message";
import "./index.scss";
import { useConfirm } from "material-ui-confirm";

export interface TreeItemData {
  itemId: string;
  label: string;
  children?: any[];
}
export interface ITreeViewProps {
  data: TreeItemData[];
  setData: (data: any) => void;
  disable?: boolean;
}
export const TreeView: FC<ITreeViewProps> = ({ data, setData, disable }) => {
  const consfirm = useConfirm();
  const [open, setOpen] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<any>({
    id: 0,
    name: "",
    parentDeptId: "",
    type: "",
  });

  const { data: departmentData } = useGetListDepartment();

  const handleShowPopupEdit = useCallback((data: any) => {
    setDataEdit({
      id: data.itemId,
      name: data.label,
    });
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
    setDataEdit({
      itemId: "",
      label: "",
      children: [],
    });
  }, []);

  const hanldeOnChangefield = useCallback(
    (e: any) => {
      let value = e.target.value;
      let field = e.target.name;
      setDataEdit({ ...dataEdit, [field]: value });
    },
    [dataEdit]
  );
  const handleDel = useCallback(
    (e: any) => {
      consfirm({
        title: "Xác nhận xóa",
        description: "Bạn có chắc chắn muốn xóa phòng ban này không?",
        confirmationText: "Đồng ý",
        cancellationText: "Hủy",
      }).then(() => {
        DepartmentService.Delete({
          id: e.itemId,
        }).then((res) => {
          if (res && res?.msg_code === MessageCode.Failed) {
            toastMessage(
              "Xóa thất bại! Phòng ban đang tồn tại nhân viên.",
              "error"
            );
          } else {
            setData(data.filter((item) => item.itemId !== e.itemId));
            toastMessage("Xóa thành công", "success");
          }
        });
      });
    },
    [consfirm, data, setData]
  );
  const handleSave = useCallback(() => {
    DepartmentService.Update({
      id: dataEdit.id,
      name: dataEdit.name,
      parentDeptId: dataEdit.parentDeptId,
      type: dataEdit.type,
    }).then((res) => {
      if (res && res?.msg_code === MessageCode.Success) {
        setData(
          data.map((item) => {
            if (item.itemId === dataEdit.id) {
              return {
                ...item,
                label: dataEdit.name,
              };
            }
            return item;
          })
        );
        setOpen(false);
        toastMessage("Cập nhật thành công!", "success");
      } else {
        toastMessage("Thất bại", "error");
      }
    });
  }, [
    data,
    dataEdit.id,
    dataEdit.name,
    dataEdit.parentDeptId,
    dataEdit.type,
    setData,
  ]);

  const renderPopup = useMemo(() => {
    const fieldData: IFormData[] = [
      { id: "name", label: "Tên cấp quản lý", type: "text" },
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
            height: "300px",
            width: "400px",
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "4px",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          }}
        >
          <Box>
            {departmentData &&
              fieldData.map((field, index) => (
                <div key={index}>
                  <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                  {field.type === "select" && field.options ? (
                    <FormControl fullWidth>
                      <Select
                        name={field.id}
                        size="small"
                        id={field.id}
                        defaultValue={dataEdit[field.id] || ""}
                        onChange={hanldeOnChangefield}
                      >
                        {field.options.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      size="small"
                      fullWidth
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      defaultValue={dataEdit[field.id] || ""}
                      onChange={hanldeOnChangefield}
                    />
                  )}
                </div>
              ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Button size="small" variant="outlined" onClick={handleSave}>
              Lưu
            </Button>
          </Box>
        </div>
      </Modal>
    );
  }, [
    dataEdit,
    departmentData,
    handleClose,
    handleSave,
    hanldeOnChangefield,
    open,
  ]);
  const renderLabelParent = useCallback(
    (item: any) => {
      return (
        <Grid
          key={item.itemId}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          container
          alignItems="center"
        >
          <Grid item>
            <Typography> {item.label}</Typography>
          </Grid>
          <Grid item>
            <Button
              disabled={disable}
              size="small"
              onClick={() => handleShowPopupEdit(item)}
            >
              <EditIcon />
            </Button>
            <Button
              disabled={disable}
              size="small"
              onClick={() => handleDel(item)}
            >
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      );
    },
    [disable, handleDel, handleShowPopupEdit]
  );

  const renderLabelChild = useCallback(
    (item: any) => {
      return (
        <Grid
          key={item.id}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          container
          alignItems="center"
        >
          <Typography
            sx={{
              width: "250px",
            }}
          >
            {item.jobTitle}
          </Typography>
          <div className="link-tree-view">
            {disable ? (
              <>
                <span
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: "bold",
                    cursor: "not-allowed",
                  }}
                  onClick={() =>
                    toastMessage("không có quyền truy cập", "error")
                  }
                >
                  {item.fullName}
                </span>
              </>
            ) : (
              <>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                  }}
                  to={`/detail_employee/${item.id}`}
                >
                  <Typography>{item.fullName}</Typography>
                </Link>
              </>
            )}
          </div>
        </Grid>
      );
    },
    [disable]
  );
  return (
    <div>
      <SimpleTreeView
        aria-label="file system navigator"
        sx={{
          // height: "calc(100vh - 450px)",
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
        }}
      >
        {data.map((item) => (
          <TreeItem
            key={item.itemId}
            itemId={item.itemId}
            label={renderLabelParent(item)}
          >
            {item.children?.map((child) => (
              <TreeItem
                key={child.id}
                itemId={child.id.toString()}
                label={renderLabelChild(child)}
              />
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>
      {renderPopup}
    </div>
  );
};
