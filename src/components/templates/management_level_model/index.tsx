import { DetailDepartMent } from "components/molecules/management_department/detail_department";
import { ListDepartment } from "components/molecules/management_department/list_management";
import { useCallback, useEffect, useState } from "react";
import {
  useGetListDepartment,
  useGetDepartment,
} from "services/hooks/useGetListDepartment";

export const ManagementLevelModelTemplate = () => {
  const [selectedId, setSelectedId] = useState<any>(null);
  const [departmentList, setDepartmentList] = useState<any[]>([]);
  const { data: departmentData } = useGetListDepartment();
  const { data: department } = useGetDepartment(selectedId);

  useEffect(() => {
    if (departmentData) {
      setDepartmentList(departmentData);
    }
  }, [departmentData]);

  const handleClickItem = (e: any) => {
    setSelectedId(e.id);
  };

  const handleSetDepartmentList = useCallback((data: any) => {
    setDepartmentList(data);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}>
      <ListDepartment
        handleClickItem={handleClickItem}
        departmentList={departmentList}
        setDepartmentList={handleSetDepartmentList}
        active={selectedId}
      />
      <DetailDepartMent dataDetail={department} />
    </div>
  );
};
