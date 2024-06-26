import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { RESPONSE_CODE } from "services/api/config";
import { useAppDispatch } from "../../redux/hook";
import { loadingActions } from "../../redux/slices/loadingSlice";

//get dánh sách phòng ban
export const useGetListDepartment = (departmentType?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await NetWork.get(`${API_URL.DEPARTMENT}`, {
      type: departmentType,
    });
    if (response.status === RESPONSE_CODE.SUCCESS) {
      setData(response?.data?.content);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
};

//get chi tiết phòng ban
export const useGetDepartment = (id: any) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    if (!id) return;
    dispatch(loadingActions.showLoading());
    setLoading(true);

    if (!id) return;
    const response = await NetWork.get(`${API_URL.DEPARTMENT}/${id}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      setData(response?.data?.content);
      setLoading(false);
      dispatch(loadingActions.hideLoading());
    } else {
      setLoading(false);
      dispatch(loadingActions.hideLoading());
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { data, loading };
};

export type createDepartmentBody = {
  name: string;
  parentDeptId?: string;
};

//create phòng ban
export const useCreateDepartment = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const createDepartment = async (body: createDepartmentBody) => {
    setLoading(true);
    const response = await NetWork.post(`${API_URL.DEPARTMENT}`, body);
    setLoading(false);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return response.data;
    } else {
      return null;
    }
  };

  return { createDepartment, loading };
};
