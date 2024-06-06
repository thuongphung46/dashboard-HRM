import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import { FC, useCallback } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
  onSubmit: () => void;
}
export const PopupImportCV: FC<Props> = ({
  onClose,
  onImport,
  open,
  onSubmit,
}) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImport(e.target.files[0]);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
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
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Input
            type="file"
            onChange={handleFileChange}
            //chấp nhận file png, ảnh
            // accept=".png, .jpg, .jpeg"
          ></Input>
          <Button size="small" variant="outlined" type="submit">
            Lưu
          </Button>
        </form>
      </div>
    </Modal>
  );
};
