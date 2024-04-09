import { DetailDepartMent } from "components/molecules/management_department/detail_department";
import { ListDepartment } from "components/molecules/management_department/list_management";
import { useCallback, useEffect, useState } from "react";
import { useGetListDepartment, useGetDepartment } from "services/hooks/useGetListDepartment";

export const ManagementLevelModelTemplate = () => {
  const {loading, data: departmentData } = useGetListDepartment();
  const [dataDetail, setDataDetail] = useState<any>({});
  const [listSubject, setListSubject] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState(null);
  
  

  const handleClickItem = (id: any) => {
    
  }

  return (
    <div
      style={{
        display: "flex",
      }}>
      <ListDepartment handleClickItem={handleClickItem} departmentList={departmentData} />
      <DetailDepartMent dataDetail={dataDetail} listSubject={listSubject} />
    </div>
  );
};
