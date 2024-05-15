import { DetailDepartMent } from "components/molecules/management_department/detail_department";
import { ListDepartment } from "components/molecules/management_department/list_management";
import { useEffect, useState } from "react";
import {
  useGetListDepartment,
  useGetDepartment,
} from "services/hooks/useGetListDepartment";

export const ManagementLevelModelTemplate = () => {
  const [listSubject, setListSubject] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<any>(null);
  const { data: departmentData } = useGetListDepartment();
  const { data: department } = useGetDepartment(selectedId);

  useEffect(() => {
    if (selectedId !== null && department) {
    }
  }, [selectedId, department]);

  const handleClickItem = (e: any) => {
    setSelectedId(e.id);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ListDepartment
        handleClickItem={handleClickItem}
        departmentList={departmentData}
        active={selectedId}
      />
      <DetailDepartMent dataDetail={department} listSubject={listSubject} />
    </div>
  );
};
