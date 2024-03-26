import { Button, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";

export const ImportTemplate = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [importOption, setImportOption] = useState<string>(""); // Đặt kiểu cho importOption
  const fileInput1 = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFileSelected(true);
    }
  };

  const handleImportOptionChange = (event: SelectChangeEvent<string>) => {
    setImportOption(event.target.value);
  };

  const handleImport = () => {
    if (selectedFile && importOption) {
      // Gọi API tương ứng với tùy chọn được chọn
      console.log(`Importing file '${selectedFile.name}' with option '${importOption}'`);
      // Reset state sau khi import
      setSelectedFile(null);
      setFileSelected(false);
      setImportOption("");
    }
  };

  return (
    <div>
      <div>
        <Select
          value={importOption}
          onChange={handleImportOptionChange}
          displayEmpty
          style={{ marginRight: "10px" }}
        >
          <MenuItem value="" disabled>
            Chọn tùy chọn
          </MenuItem>
          <MenuItem value="Import TKB">Import TKB</MenuItem>
          <MenuItem value="Import thống kê vượt giờ">Import thống kê vượt giờ</MenuItem>
        </Select>
        <input
          accept=".xlsx"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          ref={fileInput1}
          onChange={handleFileSelect}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload file
          </Button>
        </label>
      </div>
      {fileSelected && selectedFile && (
        <Typography variant="body1">
          Selected file: {selectedFile.name}
        </Typography>
      )}
      <div style={{ marginTop: '10px' }}>
        <Button variant="contained" onClick={handleImport} disabled={!fileSelected || !importOption}>
          Import
        </Button>
      </div>
    </div>
  );
};
