import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { RESPONSE_CODE } from "services/api/config";
import { deleteParamsNotUsing } from "services/api/utils";
import { StaffDetail } from "types/ApplicationType";

export type GetListStaffParams = {
  query?: string;
  active?: 0 | 1;
  page?: number;
  size?: number;
};

//get danh sách nhân viên
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

//get detail nhân viên
export const useGetStaff = (id: string | undefined) => {
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

//get lịch sử làm việc của nhân viên
export const useGetWorkingHistoryStaff = (id: number) => {
  const [data, setData] = useState<StaffDetail | any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await NetWork.get(
      `${API_URL.STAFFS}/${id}/working-histories`
    );
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

//get chi tiết hợp đồng của nhân viên
export const useGetDetailContractStaff = (id: number) => {
  const [data, setData] = useState<StaffDetail | any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await NetWork.get(
      `${API_URL.STAFFS}/${id}/contracts/${id}`
    );
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

export const useGetListContractStaff = (id: string | undefined | null) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    if (!id) return;
    const response = await NetWork.get(`${API_URL.STAFFS}/${id}/contracts`);
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
