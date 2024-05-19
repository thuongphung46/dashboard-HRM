import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { RESPONSE_CODE } from "services/api/config";
import { deleteParamsNotUsing, getRequestUrl } from "services/api/utils";
import { StaffService } from "services/staff_service";
import { StaffDetail } from "types/ApplicationType";
import { MessageCode } from "types/enum/message_code";
import { IListStaff } from "types/list_staff";
import { IContent } from "types/teaching_contact";

export type GetListStaffParams = {
  query?: string;
  active?: 0 | 1 | undefined;
  page?: number;
  size?: number;
};

//get danh sách nhân viên
export const useGetListStaff = (params: GetListStaffParams) => {
  const [data, setData] = useState<IListStaff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
    fetchData();
  }, [params]);
  return { data, loading };
};

//get detail nhân viên
export const useGetStaff = (id: string | undefined) => {
  const [data, setData] = useState<StaffDetail | any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (id) {
        const res = await StaffService.GetDetailStaff(id);
        if (res.msg_code === MessageCode.Success) {
          setData(res.content);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return { data, loading };
};

export const useGetStaffSelected = () => {
  // const [data, setData] = useState<StaffDetail | any>({});
  // const [loading, setLoading] = useState<boolean>(true);

  // const fetchData = async () => {
  //   setLoading(true);
  //   if (id) {
  //     const response = await NetWork.get(`${API_URL.STAFFS}/${id}`);
  //     if (response.status === RESPONSE_CODE.SUCCESS) {
  //       setData(response?.data?.content);
  //     }
  //   }
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  const getStaff = async (id?: string | number) => {
    if (id) {
      const response = await NetWork.get(`${API_URL.STAFFS}/${id}`);
      if (response.status === RESPONSE_CODE.SUCCESS) {
        return response?.data?.content;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return { getStaff };
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

//get list contract of staff
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

//get detail contract
export const useGetDetailContract = (id: string | undefined | null) => {
  const [data, setData] = useState<IContent>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    if (!id) return;
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

export type CreareContractBody = {
  term: string;
  schoolYear: string;
  teachingAddress: string;
  numberOfLesson: number;
  lessonPrice: number;
  taxPercent: number;
  renterId: string;
  fromDate: string;
  toDate: string;
  status: string;
  contractName: string;
};

export type UpdateContractBody = {
  term: string;
  schoolYear: string;
  teachingAddress: string;
  numberOfLesson: number;
  lessonPrice: number;
  taxPercent: number;
  renterId: string;
  fromDate: string;
  toDate: string;
  status: string;
  contractName: string;
};

export const useContract = () => {
  // const [data, setData] = useState<IContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const updateContract = async (
    idStaffRenter: string,
    idContract: string,
    body: UpdateContractBody
  ) => {
    setLoading(true);
    const response = await NetWork.patch(
      getRequestUrl(API_URL.STAFFS, {
        parentId: idStaffRenter,
        partial: API_URL.CONTRACT,
        subId: idContract,
      }),
      body
    );
    setLoading(false);
    if (
      response.status === RESPONSE_CODE.SUCCESS &&
      response.data.msg_code === RESPONSE_CODE.SUCCESS
    ) {
      return response.data?.content;
    } else {
      return null;
    }
  };
  const createContract = async (
    idStaffRenter: string,
    body: CreareContractBody
  ) => {
    setLoading(true);
    const response = await NetWork.post(
      getRequestUrl(API_URL.STAFFS, {
        parentId: idStaffRenter,
        partial: API_URL.CONTRACT,
      }),
      body
    );
    setLoading(false);
    if (
      response.status === RESPONSE_CODE.SUCCESS &&
      response.data.msg_code === RESPONSE_CODE.SUCCESS
    ) {
      return response.data?.content;
    } else {
      return null;
    }
  };

  return { createContract, updateContract, loading };
};
