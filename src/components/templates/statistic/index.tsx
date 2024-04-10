import { useState, useEffect, FC } from "react";
import ChartsOverview from "components/molecules/statistic/chart";
import { GridStatistic } from "components/molecules/statistic/grid";
import { useGetListDepartment } from "services/hooks/useGetListDepartment";
import { FormControl, Input, InputLabel, MenuItem, NativeSelect, Select, SelectChangeEvent } from "@mui/material";

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

export const StatisticTemplate: FC<Props> = () => {
  const [departmentList, setDepartmentList] = useState<DepartmentData[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]); // Adjusted state for selected groups
  const { loading, data: departmentData } = useGetListDepartment();

  useEffect(() => {
    if (!loading && departmentData) {
      setDepartmentList(departmentData);
    }
  }, [loading, departmentData]);

  const handleDepartmentChange = (event: SelectChangeEvent<number[]>) => {
    const selectedValues = event.target.value as number[];
    setSelectedDepartments(selectedValues);
    // Reset selected groups when department changes
    setSelectedGroups([]);
  };

  const handleGroupChange = (event: SelectChangeEvent<number[]>) => { // Adjusted parameter type
    const selectedValues = event.target.value as number[];
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
              name: 'semester',
              id: 'semester',
            }}
          >
            <option value={10}>Học kỳ I</option>
            <option value={20}>Học kỳ II</option>
          </NativeSelect>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
          <InputLabel htmlFor="year">Year: </InputLabel>
          <Input id="year"/>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-department-label">Chọn khoa</InputLabel>
          <Select
            labelId="select-department-label"
            id="select-department"
            multiple
            value={selectedDepartments}
            onChange={handleDepartmentChange}
            renderValue={(selected) => (selected as number[]).map((id) => departmentList.find(dep => dep.id === id)?.name).join(', ')}
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
            {selectedDepartments.flatMap(depId =>
              departmentList.find(dep => dep.id === depId)?.groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </div>
      <ChartsOverview />
      <GridStatistic />
    </div>
  );
};
