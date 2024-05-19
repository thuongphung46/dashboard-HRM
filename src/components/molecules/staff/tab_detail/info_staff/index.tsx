import { useEffect, useState } from "react";
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
import { StaffDetail } from "types/ApplicationType";
import { Action } from "types/action";
import { useDebouncedCallback } from "use-debounce";
import { useGetListDepartment } from "services/hooks/useGetListDepartment";
import { useGetListRank } from "services/hooks/useGetListRank";
import { useGetListJobTitle } from "services/hooks/useGetListJobTitle";

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
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [departmentList, setDepartmentList] = useState<DepartmentData[]>([]);
  const { loading: loadingDepartment, data: departmentData } =
    useGetListDepartment();

  const [rankList, setRankList] = useState<any[]>([]);
  const { loading: loadingRank, data: rankData } = useGetListRank();
  const [jobTitleList, setJobTitleList] = useState<any[]>([]);
  const { loading: loadingJobTitle, data: jobTitleData } = useGetListJobTitle();

  const handleSave = () => {};

  const handleRowSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection);
  };

  const hanldeOnChangefield = useDebouncedCallback((e: any) => {
    let value = e.target.value;
    let field = e.target.name;
    setFormData({ ...formData, [field]: value });
  }, 500);

  useEffect(() => {
    if (!loadingDepartment && departmentData) {
      setDepartmentList(departmentData);
    }
  }, [loadingDepartment, departmentData]);

  useEffect(() => {
    if (!loadingRank && rankData) {
      setRankList(rankData);
    }
  }, [loadingRank, rankData]);

  useEffect(() => {
    if (!loadingJobTitle && jobTitleData) {
      setJobTitleList(jobTitleData);
    }
  }, [loadingJobTitle, jobTitleData]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid container spacing={2}>
          {fieldsData.map((field) => {
            if (field.id === "password" && action === "edit") return null;
            return (
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
                          {(() => {
                            if (field.id === "departmentId") {
                              return departmentList.map((department) => (
                                <MenuItem
                                  key={department.id}
                                  value={department.id}
                                >
                                  {department.name}
                                </MenuItem>
                              ));
                            } else if (field.id === "rankName") {
                              return rankList.map((rank) => (
                                <MenuItem key={rank.id} value={rank.code}>
                                  {rank.rankName}
                                </MenuItem>
                              ));
                            } else if (field.id === "jobTitle") {
                              return jobTitleList.map((jobTitle) => (
                                <MenuItem
                                  key={jobTitle.id}
                                  value={jobTitle.code}
                                >
                                  {jobTitle.jobTitle}
                                </MenuItem>
                              ));
                            } else {
                              return field.options.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ));
                            }
                          })()}
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        size="small"
                        fullWidth
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        defaultValue={data ? data[field.id] : ""}
                        onChange={hanldeOnChangefield}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        {action === "edit" && (
          <>
            <Grid sx={{ marginTop: "24px" }} width={"100%"} minWidth={500}>
              <GridTrainingSummary
                dataSource={action === "edit" ? data.trainingSummary : []}
                dataSelectRow={selectedRows}
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
                handleSave={handleSave}
                handleRowSelect={handleRowSelectionChange}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};
