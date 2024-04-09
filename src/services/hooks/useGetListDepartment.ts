import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { RESPONSE_CODE } from "services/api/config";

export const useGetListDepartment = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await NetWork.get(`${API_URL.DEPARTMENT}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      setData(response?.data?.content);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};

export const useGetDepartment = (id: number) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await NetWork.get(`${API_URL.DEPARTMENT}/${id}`);
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
  }, [id]);

  return { data, loading };
}

export type createDepartmentBody = {
  name: string;
  parentDeptId?: string;
};

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