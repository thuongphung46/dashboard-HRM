import React, { useState, useEffect, FC } from "react";
import ChartsOverview from "components/molecules/statistic/chart";
import { GridStatistic } from "components/molecules/statistic/grid";
import { useGetListDepartment } from "services/hooks/useGetListDepartment";

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
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const departmentId = parseInt(event.target.value);
    setSelectedDepartment(departmentId);
    // Reset selected group when department changes
    setSelectedGroup(null);
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId = parseInt(event.target.value);
    setSelectedGroup(groupId);
  };

  const { loading, data: departmentData } = useGetListDepartment();

  useEffect(() => {
    if (!loading && departmentData) {
      setDepartmentList(departmentData);
    }
  }, [loading, departmentData]);

  // Retrieve selected department object
  const selectedDepartmentObject =
    selectedDepartment !== null
      ? departmentList.find(
          (department) => department.id === selectedDepartment
        )
      : null;

  return (
    <div>
      <div>
        <label style={{ margin: "5px" }} htmlFor="semester">
          Học kỳ:{" "}
        </label>
        <select style={{ margin: "5px" }}>
          <option value="1">Học kỳ I</option>
          <option value="2">Học kỳ II</option>
        </select>

        <label style={{ margin: "5px" }} htmlFor="year">
          Năm học:{" "}
        </label>
        <input style={{ margin: "5px" }} type="text" id="year" name="year" />

        <label style={{ margin: "5px" }} htmlFor="department">
          Khoa:{" "}
        </label>
        <select
          style={{ margin: "5px" }}
          id="department"
          name="department"
          value={selectedDepartment || ""}
          onChange={handleDepartmentChange}
        >
          <option value="">Chọn khoa</option>
          {departmentList.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>

        <label style={{ margin: "5px" }} htmlFor="group">
          Bộ môn:{" "}
        </label>
        <select
          style={{ margin: "5px" }}
          id="group"
          name="group"
          value={selectedGroup || ""}
          onChange={handleGroupChange}
        >
          <option value="">Chọn bộ môn</option>
          {selectedDepartmentObject &&
            selectedDepartmentObject.groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
        </select>
      </div>
      <ChartsOverview />
      <GridStatistic />
    </div>
  );
};
