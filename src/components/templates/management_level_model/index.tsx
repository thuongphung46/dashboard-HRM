import { DetailDepartMent } from "components/molecules/management_department/detail_department";
import { ListDepartment } from "components/molecules/management_department/list_management";
import { useEffect, useState } from "react";
import { useGetListDepartment, useGetDepartment } from "services/hooks/useGetListDepartment";

export const ManagementLevelModelTemplate = () => {
  const { loading, data: departmentData } = useGetListDepartment();
  const [dataDetail, setDataDetail] = useState<any>({});
  const [listSubject, setListSubject] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<any>(null);
  
  const { data: department, loading: departmentLoading } = useGetDepartment(selectedId);

  useEffect(() => {
    if (selectedId !== null && department) {
      setDataDetail(department);
    }
  }, [selectedId, department]);

  const handleClickItem = (e: any) => {
    setSelectedId(e.id);
  }

  return (
    <div
      style={{
        display: "flex",
      }}>
      <ListDepartment handleClickItem={handleClickItem} departmentList={departmentData} />
      <DetailDepartMent dataDetail={department} listSubject={listSubject} />
    </div>
  );
};