import { useState, useEffect, FC } from "react";
import { ChartsOverview } from "components/molecules/statistic/chart";
import { GridStatistic } from "components/molecules/statistic/grid";
import { useGetListDepartment } from "services/hooks/useGetListDepartment";
import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  StatisticParams,
  useGetSchoolYear,
  useGetStatistic,
} from "services/hooks/useGetStatistic";
import { DEPARTMENT_TYPE } from "constants/department";

interface Props {}
interface DepartmentData {
  id: number;
  name: string;
  parentDeptId: string;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  groups: Group[];
  code?: string;
  type: string;
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

export const StatisticTemplate: FC<Props> = () => {
  const [statisticParams, setStatisticParams] = useState<StatisticParams>({
    departmentIds: "",
    groupIds: "",
    schoolYear: "",
  });

  const [departmentList, setDepartmentList] = useState<DepartmentData[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]); // Adjusted state for selected groups
  const { loading, data: departmentData } = useGetListDepartment(
    DEPARTMENT_TYPE.EDUCATION
  );
  const { data: statisticData } = useGetStatistic(statisticParams);

  const { data: listSchoolYear } = useGetSchoolYear();

  useEffect(() => {
    if (!loading && departmentData) {
      setDepartmentList(departmentData);
    }
  }, [loading, departmentData]);

  useEffect(() => {
    if (selectedDepartments.length > 1 && selectedGroups.length > 0) {
      setStatisticParams({
        ...statisticParams,
        groupIds: "",
      });
      setSelectedGroups([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartments, selectedGroups]);

  const handleDepartmentChange = (event: SelectChangeEvent<number[]>) => {
    const selectedValues = event.target.value as number[];
    setSelectedDepartments(selectedValues);
    setStatisticParams({
      ...statisticParams,
      departmentIds: selectedValues.toString(),
    });
    // Reset selected groups when department changes
    setSelectedGroups([]);
  };

  const handleGroupChange = (event: SelectChangeEvent<number[]>) => {
    // Adjusted parameter type
    const selectedValues = event.target.value as number[];
    setStatisticParams({
      ...statisticParams,
      groupIds: selectedValues.toString(),
    });
    setSelectedGroups(selectedValues);
  };

  const onClickAgain = (event: any) => {
    const schoolYear =
      statisticParams?.schoolYear === event?.target?.outerText
        ? undefined
        : event?.target?.outerText;
    setStatisticParams((prev) => {
      return {
        ...prev,
        schoolYear,
      };
    });
  };

  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel variant="standard" htmlFor="semester">
            Học kỳ:
          </InputLabel>
          <NativeSelect
            defaultValue={10}
            inputProps={{
              name: "semester",
              id: "semester",
            }}
          >
            <option value={10}>Học kỳ I</option>
            <option value={20}>Học kỳ II</option>
          </NativeSelect>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
          <InputLabel htmlFor="year">Năm học: </InputLabel>
          <Select
            labelId="select-department-label"
            id="year"
            value={statisticParams.schoolYear}
            onClick={onClickAgain}
            displayEmpty={false}
            renderValue={(selected) => selected}
          >
            {listSchoolYear.map((schoolYear) => (
              <MenuItem key={schoolYear} value={schoolYear}>
                {schoolYear}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-department-label">Chọn khoa</InputLabel>
          <Select
            labelId="select-department-label"
            id="select-department"
            multiple
            value={selectedDepartments}
            onChange={handleDepartmentChange}
            renderValue={(selected) =>
              (selected as number[])
                .map((id) => departmentList.find((dep) => dep.id === id)?.name)
                .join(", ")
            }
            disabled={selectedGroups.length > 0}
          >
            {departmentList.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-group-label">Bộ môn</InputLabel>
          <Select
            labelId="select-group-label"
            id="select-group"
            multiple
            value={selectedGroups} // Use selectedGroups state
            onChange={handleGroupChange}
            disabled={selectedDepartments.length > 1}
          >
            {selectedDepartments.flatMap((depId) =>
              departmentList
                .find((dep) => dep.id === depId)
                ?.groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))
            )}
          </Select>
        </FormControl>
      </div>
      <ChartsOverview data={statisticData} />
      <GridStatistic data={statisticData} />
    </div>
  );
};
