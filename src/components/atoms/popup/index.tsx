import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FC, useCallback, useEffect, useState } from "react";

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
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );
  useEffect(() => {
    if (!open) {
      setFileName(null);
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImport(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImport(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  const handleClose = () => {
    onClose();
    onImport(new File([], ""));
    setFileName(null);
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
      }}>
      <div
        style={{
          height: "300px",
          width: "400px",
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "4px",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}>
          <label
            htmlFor="file-upload"
            style={{
              width: "100%",
              height: "150px",
              border: isDragOver ? "2px dashed #3f51b5" : "2px dashed #ccc",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "16px",
              textAlign: "center",
              color: isDragOver ? "#3f51b5" : "#ccc",
              transition: "border-color 0.3s, color 0.3s",
              cursor: "pointer",
            }}>
            <input
              id="file-upload"
              onChange={handleFileChange}
              accept=".png, .jpg, .jpeg"
              type="file"
              hidden
            />
            <p
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "100%",
              }}>
              {fileName || "Kéo và thả tệp vào đây hoặc nhấp để chọn tệp"}
            </p>
          </label>
          <Button size="small" variant="outlined" type="submit">
            Quét
          </Button>
        </form>
      </div>
    </Modal>
  );
};
