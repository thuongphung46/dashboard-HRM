import { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
import { FlatGroup } from "common/function";
import FormField from "components/atoms/form_value";
import { Button } from "@mui/material";
import { IFormField } from "components/atoms/form_value";

interface Props extends Action {
  data: StaffDetail;
  formData: any;
  setFormData: (value: React.SetStateAction<StaffDetail>) => void;
  handleSave?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const InfoStaff = ({
  data,
  action,
  formData,
  setFormData,
  handleSave,
}: Props) => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [departmentList, setDepartmentList] = useState<FlatGroup[]>([]);
  const [departmentListChild, setDepartmentListChild] = useState<FlatGroup[]>([]);
  const [rankList, setRankList] = useState<any[]>([]);
  const [jobTitleList, setJobTitleList] = useState<any[]>([]);
  const [fields, setFields] = useState<IFormField[]>([]);

  // console.log("data", data);

  const { loading: loadingDepartment, data: departmentData } = useGetListDepartment();
  const { loading: loadingRank, data: rankData } = useGetListRank();
  const { loading: loadingJobTitle, data: jobTitleData } = useGetListJobTitle();

  const handleSaveTrainingSummary = useCallback((data: any) => { }, []);
  const handleSaveTraining = useCallback((data: any) => { }, []);
  const handleRowSelectionChange = (selection: GridRowId[]) => setSelectedRows(selection);

  const hanldeOnChangefield = useDebouncedCallback((e: any) => {
    const { name: field, value } = e.target;
    if (field === "departmentId") {
      const department = departmentList.find(dept => dept.id === value);
      if (department) setDepartmentListChild(department.groups);
    }
    setFormData(prevFormData => ({ ...prevFormData, [field]: value }));
  }, 500);

  useEffect(() => {
    if (!loadingDepartment && departmentData) {
      setDepartmentList(departmentData);
      if ((action === "edit" || action === "me") && data.departmentId) {
        const department = departmentData.find(i => i.id === data.departmentId);
        if (department) setDepartmentListChild(department.groups);
      }
    }
  }, [loadingDepartment, departmentData, action, data.departmentId]);

  useEffect(() => {
    if (!loadingRank && rankData) setRankList(rankData);
  }, [loadingRank, rankData]);

  useEffect(() => {
    if (!loadingJobTitle && jobTitleData) setJobTitleList(jobTitleData);
  }, [loadingJobTitle, jobTitleData]);

  useEffect(() => {
    const convertFields: IFormField[] = fieldsData.map(field => {
      if (field.id === "departmentId" && departmentList.length > 0) {
        field.options = departmentList.map(dept => ({ value: dept.id, label: dept.name }));
      } else if (field.id === "rankName" && rankList.length > 0) {
        field.options = rankList.map(rank => ({ value: rank.id.toString(), label: rank.rankName }));
      } else if (field.id === "jobTitle" && jobTitleList.length > 0) {
        field.options = jobTitleList.map(jobTitle => ({ value: jobTitle.code, label: jobTitle.jobTitle }));
      } else if (field.id === "groupId" && departmentListChild.length > 0) {
        field.options = departmentListChild.map(dept => ({ value: dept.id, label: dept.name }));
      }
      if (field.id === "password" && (action === "edit" || action === "me")) return null;
      if (data.level === "LEVEL_4" && field.id === "groupId") return null;
      return field;
    }).filter(field => field !== null) as IFormField[];
    setFields(convertFields);
  }, [action, data.level, departmentList, departmentListChild, jobTitleList, rankList]);

  useEffect(() => {
    const doanTncs = data.staffAdmissions?.find(ele => ele.type === "doan_tncs_hcm");
    const dangCsvn = data.staffAdmissions?.find(ele => ele.type === "dang_csvn");
    if (doanTncs) data.doan_tncs_hcm = doanTncs.place;
    if (dangCsvn) data.dang_csvn = dangCsvn.place;
  }, [data]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid sx={{ width: "100%" }} item>
              <Button variant="outlined" size="small" type="submit">Lưu</Button>
            </Grid>
            {fields.length > 0 && (
              <FormField
                action={action}
                fields={fields}
                formData={data}
                handleOnChangeField={hanldeOnChangefield}
              />
            )}
          </Grid>
        </form>
        {(action === "edit" || action === "me") && (
          <>
            <Grid sx={{ marginTop: "24px" }} width={"100%"} minWidth={500}>
              <GridTrainingSummary
                dataSource={data.trainingSummary || []}
                dataSelectRow={selectedRows}
                handleSave={handleSaveTrainingSummary}
                handleRowSelect={handleRowSelectionChange}
              />
            </Grid>
            <Grid sx={{ marginTop: "24px" }} width={"100%"}>
              <GridTraining
                dataSource={data.staffWorkingHistoriesOutAcademy || []}
                dataSelectRow={[]}
                handleSave={handleSaveTraining}
                handleRowSelect={handleRowSelectionChange}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};
