import {
  Button,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import HRMStorage from "common/function";
import { KeyValue } from "constants/GlobalConstant";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FileTkbService, FileKeKhaiService } from "services/upload_service";

export const ImportTemplate = () => {
  const level = HRMStorage.get(KeyValue.Level);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [importOptionFile, setImportOptionFile] = useState<string>("");
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
    if (selectedFile && importOptionFile) {
      if (importOptionFile === "Import TKB") {
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
      } else if (importOptionFile === "Import Kê khai") {
        const result = await FileKeKhaiService.uploadFile(selectedFile);

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

  const onChangeOptionFile = (event: SelectChangeEvent<string>) => {
    setImportOptionFile(event.target.value);
  };

  const onChangeSchoolYear = (event: SelectChangeEvent<string>) => {
    setSchoolYear(event.target.value);
  };

  const isDisableBtn = () => {
    if (importOptionFile === "Import TKB") {
      return !fileSelected || !importOptionFile || !importOptionTerm;
    } else if (importOptionFile === "Import Kê khai") {
      return !fileSelected || !importOptionFile;
    }
    return true;
  };

  const isDisableField = () => {
    if (importOptionFile === "Import TKB") {
      return false;
    } else if (importOptionFile === "Import Kê khai") {
      return true;
    }
    return true;
  };

  return (
    <div style={{ padding: "8px" }}>
      <div>
        <Select
          value={importOptionFile}
          onChange={onChangeOptionFile}
          displayEmpty
          style={{ marginTop: "10px", marginRight: "10px", width: "200px" }}
        >
          <MenuItem value="" disabled>
            Chọn loại file
          </MenuItem>
          if (level === "LEVEL_4"){" "}
          {<MenuItem value="Import TKB">Import TKB</MenuItem>}
          <MenuItem value="Import Kê khai">Import Kê khai</MenuItem>
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
          <Button size="small" variant="outlined" component="span">
            Choose file
          </Button>
        </label>
      </div>
      {level === "LEVEL_4" && (
        <div>
          <Select
            value={importOptionTerm}
            onChange={onChangeOptinTerm}
            displayEmpty
            disabled={isDisableField()}
            style={{ marginTop: "10px", width: "200px" }}
          >
            <MenuItem value="" disabled>
              Chọn học kỳ
            </MenuItem>
            <MenuItem value="Học kỳ I">Học kỳ I</MenuItem>
            <MenuItem value="Học kỳ II">Học kỳ II</MenuItem>
          </Select>
        </div>
      )}
      {level === "LEVEL_4" && (
        <div>
          <Select
            value={schoolYear}
            onChange={onChangeSchoolYear}
            displayEmpty
            disabled={isDisableField()}
            style={{ marginTop: "10px", width: "200px" }}
          >
            <MenuItem value="" disabled>
              Chọn năm học
            </MenuItem>
            <MenuItem value="2022-2023">2022-2023</MenuItem>
            <MenuItem value="2023-2024">2023-2024</MenuItem>
            {/* Thêm các năm học khác nếu cần */}
          </Select>
        </div>
      )}
      {fileSelected && selectedFile && (
        <Typography variant="body1">
          Selected file: {selectedFile.name}
        </Typography>
      )}
      <div style={{ marginTop: "10px" }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleImport}
          disabled={isDisableBtn()}
        >
          Import
        </Button>
      </div>
    </div>
  );
};
