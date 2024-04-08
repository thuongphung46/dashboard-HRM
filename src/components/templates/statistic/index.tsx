import React, { useState, useEffect, FC } from 'react';
import { BasicColor } from "components/molecules/statistic/chart";
import { GridStatistic } from "components/molecules/statistic/grid";
import { useGetListDepartment } from 'services/hooks/useGetListDepartment';

interface Props {}
interface DepartmentData {
  id: number;
  name: string;
  parentDeptId: string;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
}

export const StatisticTemplate:FC<Props> = () => {
  const [departmentList, setDepartmentList] = useState<DepartmentData[]>([]);
  const { loading, data: departmentData } = useGetListDepartment();

  useEffect(() => {
    if (!loading && departmentData) {
      setDepartmentList(departmentData);
    }
  }, []); // chỉ định mảng rỗng để chạy useEffect một lần khi trang được tải

  return (
    <div>
      <div>
        <label style={{margin:"5px"}} htmlFor="semester">Học kỳ: </label>
        <select style={{margin:"5px"}}>
          <option value="1">Học kỳ I</option>
          <option value="2">Học kỳ II</option>
        </select>

        <label style={{margin:"5px"}} htmlFor="year">Năm học: </label>
        <input style={{margin:"5px"}} type="text" id="year" name="year"/>

        <label style={{margin:"5px"}} htmlFor="department">Khoa: </label>
        <select style={{margin:"5px"}} id="department">
          {departmentList.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>


        <label style={{margin:"5px"}} htmlFor="department">Bộ môn: </label>
        <input style={{margin:"5px"}} type="text" id="department" name="department" value="Bộ môn khoa học máy tính" />

      </div>
      <BasicColor />
      <GridStatistic />
    </div>
  );
};
