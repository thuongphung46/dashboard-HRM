import {
  Button,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  Input,
} from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FileTkbService } from "services/upload_service";

export const ImportTemplate = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [importOptionTkb, setImportOptionTkb] = useState<string>("");
  const [importOptionTerm, setImportOptionTerm] = useState<string>("");
  const fileInput1 = useRef<HTMLInputElement>(null);
  const [schoolYear, setSchoolYear] = useState<string>("");

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFileSelected(true);
    }
  };

  const handleImport = async () => {
    if (selectedFile && importOptionTkb) {
      if (importOptionTkb === "Import TKB") {
        const result = await FileTkbService.uploadFile(
          selectedFile,
          importOptionTerm,
          schoolYear
        );

        if (result.msg_code === 200) {
          toast.success("Import thành công");
        } else {
          toast.error("Import thất bại");
        }
      }
    }
  };

  const onChangeOptinTerm = (event: SelectChangeEvent<string>) => {
    setImportOptionTerm(event.target.value);
  };

  const onChangeOptinTkb = (event: SelectChangeEvent<string>) => {
    setImportOptionTkb(event.target.value);
  };
  const onChangeSchoolYear = (event: ChangeEvent<HTMLInputElement>) => {
    setSchoolYear(event.target.value);
  };

  return (
    <div>
      <div>
        <Select
          value={importOptionTerm}
          onChange={onChangeOptinTerm}
          displayEmpty
          style={{ margin: "10px", width: "200px" }}
        >
          <MenuItem value="" disabled>
            {" "}
            Chọn học kỳ{" "}
          </MenuItem>
          <MenuItem value="Học kỳ I">Học kỳ I</MenuItem>
          <MenuItem value="Học kỳ II">Học kỳ II</MenuItem>
        </Select>
      </div>
      <div style={{ margin: "10px" }}>
        <Input placeholder="School year" onChange={onChangeSchoolYear} />
      </div>
      <div>
        <Select
          value={importOptionTkb}
          onChange={onChangeOptinTkb}
          displayEmpty
          style={{ margin: "10px", width: "200px" }}
        >
          <MenuItem value="" disabled>
            Chọn tùy chọn
          </MenuItem>
          <MenuItem value="Import TKB">Import TKB</MenuItem>
          {/* <MenuItem value="Import thống kê vượt giờ">
            Import danh sách NCKH
          </MenuItem> */}
        </Select>
        <input
          accept=".xlsx"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          ref={fileInput1}
          onChange={handleFileSelect}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Choose file
          </Button>
        </label>
      </div>
      {fileSelected && selectedFile && (
        <Typography variant="body1">
          Selected file: {selectedFile.name}
        </Typography>
      )}
      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          onClick={handleImport}
          disabled={!fileSelected || !importOptionTkb || !importOptionTerm}
        >
          Import
        </Button>
      </div>
    </div>
  );
};
