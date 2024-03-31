import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { RESPONSE_CODE } from "services/api/config";
import { deleteParamsNotUsing } from "services/api/utils";

export type GetListStaffParams = {
  query?: string;
  active?: 0 | 1;
  page?: number;
  size?: number;
};

export const useGetListStaff = (params: GetListStaffParams) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await NetWork.get(
      API_URL.STAFFS,
      deleteParamsNotUsing(params)
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      setData(response?.data?.content?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return { data, loading };
};

export const useGetStaff = (id: number) => {
  const [data, setData] = useState<StaffDetail | any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await NetWork.get(`${API_URL.STAFFS}/${id}`);
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
};
