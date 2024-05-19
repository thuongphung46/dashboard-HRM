import HRMStorage from "common/function";
import { DetailDepartMent } from "components/molecules/management_department/detail_department";
import { ListDepartment } from "components/molecules/management_department/list_management";
import { KeyValue } from "constants/GlobalConstant";
import { useCallback, useEffect, useState } from "react";
import {
  useGetListDepartment,
  useGetDepartment,
} from "services/hooks/useGetListDepartment";

export const ManagementLevelModelTemplate = () => {
  const level = HRMStorage.get(KeyValue.Level);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [disable, setDisable] = useState(true);

  const [departmentList, setDepartmentList] = useState<any[]>([]);
  const { data: departmentData } = useGetListDepartment();
  const { data: department } = useGetDepartment(selectedId);
  useEffect(() => {
    if (level === "LEVEL_4") {
      setDisable(false);
    }
  }, [level]);

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
        height: "calc(100vh - 100px)",
      }}
    >
      <ListDepartment
        handleClickItem={handleClickItem}
        departmentList={departmentList}
        setDepartmentList={handleSetDepartmentList}
        active={selectedId}
        disable={disable}
      />
      <DetailDepartMent dataDetail={department} disable={disable} />
    </div>
  );
};
