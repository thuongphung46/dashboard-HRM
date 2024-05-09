import { useState, useEffect, FC } from "react";
import { ChartsOverview } from "components/molecules/statistic/chart";
import { GridStatistic } from "components/molecules/statistic/grid";
import { useGetListDepartment } from "services/hooks/useGetListDepartment";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  StatisticParams,
  useGetStatistic,
} from "services/hooks/useGetStatistic";
import { onChange } from "react-toastify/dist/core/store";

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

const rows = [
  {
    id: 1,
    name: "Khoa CNTT",
    sum_teaching: 100,
    sum_guide: 50,
    sum_research: 20,
  },
  {
    id: 2,
    name: "Khoa ATTT",
    sum_teaching: 80,
    sum_guide: 40,
    sum_research: 10,
  },
  {
    id: 3,
    name: "Khoa Mật mã",
    sum_teaching: 60,
    sum_guide: 30,
    sum_research: 15,
  },
];

export const StatisticTemplate: FC<Props> = () => {
  const [statisticParams, setStatisticParams] = useState<StatisticParams>({
    departmentIds: [],
    groupIds: [],
    schoolYear: "",
  });
  console.log("statisticParams", statisticParams);

  const [departmentList, setDepartmentList] = useState<DepartmentData[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]); // Adjusted state for selected groups
  const { loading, data: departmentData } = useGetListDepartment();
  const { loading: loadingStatistic, data: statisticData } =
    useGetStatistic(statisticParams);

  useEffect(() => {
    if (!loading && departmentData) {
      setDepartmentList(departmentData);
    }
  }, [loading, departmentData]);

  const handleDepartmentChange = (event: SelectChangeEvent<number[]>) => {
    const selectedValues = event.target.value as number[];
    setSelectedDepartments(selectedValues);
    setStatisticParams({
      ...statisticParams,
      departmentIds: selectedValues,
    });
    // Reset selected groups when department changes
    setSelectedGroups([]);
  };

  const onChangeSchoolYear = (event: any) => {
    setStatisticParams({
      ...statisticParams,
      schoolYear: event.target.value,
    });
  };

  const handleGroupChange = (event: SelectChangeEvent<number[]>) => {
    // Adjusted parameter type
    const selectedValues = event.target.value as number[];
    setStatisticParams({
      ...statisticParams,
      groupIds: selectedValues,
    });
    setSelectedGroups(selectedValues);
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
          <InputLabel htmlFor="year">Year: </InputLabel>
          <Input id="year" onChange={onChangeSchoolYear} />
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
