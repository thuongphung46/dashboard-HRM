import { Button } from "@mui/material";
import { ChangeEvent } from "react";

export const ImportTemplate = () => {
  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          console.log(event.target.result);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        accept=".json"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleImport}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Import TKB
        </Button>
      </label>
    </div>
  );
};