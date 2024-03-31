import { useCallback, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { GridRowId } from "@mui/x-data-grid";
import { GridTrainingSummary } from "../grid_training_summary";
import { GridTraining } from "../grid_training";
import { fieldsData } from "./fields";

type Props = {
  data: any;
};

export const InfoStaff = ({ data }: Props) => {
  const gridRef = useRef<any>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]); // State để lưu trữ các dòng được chọn
  const [formData, setFormData] = useState<any>({});
  const [dataGridTrainingSummary, setDataGridTrainingSummary] = useState<any[]>(
    data.staffWorkingHistoriesInAcademy
  );
  const [dataStaffWorkingHistories, setDataStaffWorkingHistories] = useState<
    any[]
  >(data.staffWorkingHistoriesInAcademy);

  const handleSave = () => {};

  const handleRowSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection); // Cập nhật state khi có sự thay đổi trong việc chọn dòng
  };

  const hanldeOnChangefield = useCallback(
    (e: any) => {
      let value = e.target.value;
      let field = e.target.name;
      setFormData({ ...formData, [field]: value });
    },
    [formData]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid container spacing={2}>
          {fieldsData.map((field) => (
            <Grid item xs={6} key={field.id}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                </Grid>
                <Grid item xs={6}>
                  {field.type === "select" && field.options ? (
                    <FormControl fullWidth>
                      <Select
                        name={field.id}
                        size="small"
                        id={field.id}
                        onChange={hanldeOnChangefield}
                        value={data[field.id] || ""}
                      >
                        {field.options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
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
                      value={data[field.id] || ""}
                      onChange={hanldeOnChangefield}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid sx={{ marginTop: "24px" }} width={"100%"} minWidth={500}>
          <GridTrainingSummary
            dataSource={dataGridTrainingSummary}
            dataSelectRow={selectedRows}
            gridRef={gridRef}
            handleSave={handleSave}
            handleRowSelect={handleRowSelectionChange}
          />
        </Grid>
        <Grid sx={{ marginTop: "24px" }} width={"100%"}>
          <GridTraining
            dataSource={dataStaffWorkingHistories}
            dataSelectRow={selectedRows}
            gridRef={gridRef}
            handleSave={handleSave}
            handleRowSelect={handleRowSelectionChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
