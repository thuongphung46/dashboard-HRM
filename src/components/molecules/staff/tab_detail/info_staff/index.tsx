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
  const [departmentListChild, setDepartmentListChild] = useState<FlatGroup[]>(
    []
  );
  const [fields, setFields] = useState<IFormField[]>([]);
  const { loading: loadingDepartment, data: departmentData } =
    useGetListDepartment();
  const [rankList, setRankList] = useState<any[]>([]);
  const { loading: loadingRank, data: rankData } = useGetListRank();
  const [jobTitleList, setJobTitleList] = useState<any[]>([]);
  const { loading: loadingJobTitle, data: jobTitleData } = useGetListJobTitle();

  const handleSaveTrainingSummary = useCallback((data: any) => {}, []);
  const handleSaveTraining = useCallback((data: any) => {}, []);
  const handleRowSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection);
  };

  const hanldeOnChangefield = useDebouncedCallback((e: any) => {
    let value = e.target.value;
    let field = e.target.name;
    if (field === "departmentId") {
      let department = departmentList.find(
        (department) => department.id === value
      );
      if (department) {
        setDepartmentListChild(department.groups);
      }
    }
    setFormData({ ...formData, [field]: value });
  }, 500);

  useEffect(() => {
    if (!loadingDepartment && departmentData) {
      setDepartmentList(departmentData);
      if ((action === "edit" || action === "me") && data) {
        if (data.departmentId) {
          let department = departmentData.find(
            (i) => i.id === data.departmentId
          );
          if (department) {
            setDepartmentListChild(department.groups);
          }
        }
      }
    }
  }, [loadingDepartment, departmentData, action, data]);

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

  //#region sử lý dữ liệu option trước khi hiển thị
  useEffect(() => {
    const fetch = async () => {
      let convertFields: IFormField[] = [];
      fieldsData.forEach((field) => {
        if (field.id === "departmentId" && departmentList.length > 0) {
          field.options = departmentList.map((department) => ({
            value: department.id,
            label: department.name,
          }));
        } else if (field.id === "rankName" && rankList.length > 0) {
          field.options = rankList.map((rank) => ({
            value: rank.id.toString(),
            label: rank.rankName,
          }));
        } else if (field.id === "jobTitle" && jobTitleList.length > 0) {
          field.options = jobTitleList.map((jobTitle) => ({
            value: jobTitle.code,
            label: jobTitle.jobTitle,
          }));
        }
        if (field.id === "groupId" && departmentListChild.length > 0) {
          field.options = departmentListChild.map((department) => ({
            value: department.id,
            label: department.name,
          }));
        }
        if (field.id === "password" && (action === "edit" || action === "me")) {
          return;
        }
        if (data.level === "LEVEL_4" && field.id === "groupId") return;

        convertFields.push(field);
      });

      setFields(convertFields);
    };
    fetch();
  }, [
    action,
    data.level,
    departmentList,
    departmentListChild,
    jobTitleList,
    rankList,
  ]);
  //#endregion

  //#region xử lý dữ liệu trước khi hiển thị
  useEffect(() => {
    const doanTncs = data?.staffAdmissions?.find(
      (ele) => ele.type === "doan_tncs_hcm"
    );
    const dangCsvn = data?.staffAdmissions?.find(
      (ele) => ele.type === "dang_csvn"
    );

    if (doanTncs) data.doan_tncs_hcm = doanTncs.place;
    if (dangCsvn) data.dang_csvn = dangCsvn.place;
  }, [data]);

  //#endregion

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid sx={{ width: "100%" }} item>
              <Button variant="outlined" size="small" type="submit">
                Lưu
              </Button>
            </Grid>
            {(data?.id || action === "add") && (
              <FormField
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
                dataSource={
                  (action === "edit" || action === "me") && data.trainingSummary
                    ? data?.trainingSummary
                    : []
                }
                dataSelectRow={selectedRows}
                handleSave={handleSaveTrainingSummary}
                handleRowSelect={handleRowSelectionChange}
              />
            </Grid>
            <Grid sx={{ marginTop: "24px" }} width={"100%"}>
              <GridTraining
                dataSource={
                  (action === "edit" || action === "me") &&
                  data.staffWorkingHistoriesOutAcademy
                    ? data.staffWorkingHistoriesOutAcademy
                    : []
                }
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
