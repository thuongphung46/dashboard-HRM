import HRMStorage from "common/function";
import { ListDepartment } from "components/molecules/management_department/list_management";
import { KeyValue } from "constants/GlobalConstant";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetListDepartment } from "services/hooks/useGetListDepartment";

export const ManagementLevelModelTemplate = () => {
  const navigate = useNavigate();
  const level = HRMStorage.get(KeyValue.Level);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [disable, setDisable] = useState(true);

  const [departmentList, setDepartmentList] = useState<any[]>([]);
  const { data: departmentData } = useGetListDepartment();

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
    navigate(`/model/${e.id}`);
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
      }}>
      <ListDepartment
        handleClickItem={handleClickItem}
        departmentList={departmentList}
        setDepartmentList={handleSetDepartmentList}
        active={selectedId}
        disable={disable}
      />
      <Outlet />
    </div>
  );
};
