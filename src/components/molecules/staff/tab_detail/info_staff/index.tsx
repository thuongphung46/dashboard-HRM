import { useEffect, useRef, useState } from "react";
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
// import { STAFF_ADMISSION } from "constants/global_data";
import { StaffDetail } from "types/ApplicationType";
import { Action } from "types/action";
import { useDebouncedCallback } from "use-debounce";
import { useGetListDepartment } from "services/hooks/useGetListDepartment";

interface Props extends Action {
  data: StaffDetail;
  formData: any;
  setFormData: (value: React.SetStateAction<StaffDetail>) => void;
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

export const InfoStaff = ({ data, action, formData, setFormData }: Props) => {
  const gridRef = useRef<any>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [departmentList, setDepartmentList] = useState<DepartmentData[]>([]);
  // const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const { loading, data: departmentData } = useGetListDepartment();

  const handleSave = () => {};

  const handleRowSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection);
  };

  const hanldeOnChangefield = useDebouncedCallback((e: any) => {
    let value = e.target.value;
    let field = e.target.name;
    setFormData({ ...formData, [field]: value });
  }, 500);

  // const dcsvn = data.staffAdmissions.find(
  //   (ele) => ele.type === STAFF_ADMISSION.DANG_CSVN
  // );
  // const doan = data.staffAdmissions.find(
  //   (ele) => ele.type === STAFF_ADMISSION.DOAN_VIEN
  // );
  // data.dang_csvn = dcsvn?.place || "";
  // data.doan_tncs_hcm = doan?.place || "";

  useEffect(() => {
    if (!loading && departmentData) {
      setDepartmentList(departmentData);
    }
  }, [loading, departmentData]);

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
                        defaultValue={data ? data[field.id] : ""}
                      >
                        {field.id === 'departmentId'
                          ? departmentList.map((department) => (
                              <MenuItem key={department.id} value={department.id}>
                                {department.name}
                              </MenuItem>
                            ))
                          : field.options &&
                            field.options.map((option, index) => (
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
                      value={data ? data[field.id] : ""}
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
            dataSource={action === "edit" ? data.trainingSummary : []}
            dataSelectRow={selectedRows}
            gridRef={gridRef}
            handleSave={handleSave}
            handleRowSelect={handleRowSelectionChange}
          />
        </Grid>
        <Grid sx={{ marginTop: "24px" }} width={"100%"}>
          <GridTraining
            dataSource={
              action === "edit" ? data.staffWorkingHistoriesOutAcademy : []
            }
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
