import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { RESPONSE_CODE } from "services/api/config";
import { getRequestUrl } from "services/api/utils";

export type ReasonReduceType = {
  id: number;
  code: string;
  name: string;
  ratio: number;
};

export const useGetListReasonReduce = () => {
  const [data, setData] = useState<ReasonReduceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReasonReduce = async () => {
    setLoading(true);
    // Call API here
    const response = await NetWork.get(
      getRequestUrl(API_URL.GENERAL, {
        partial: API_URL.REASON_REDUCE,
      })
    );
    if (
      response.status === RESPONSE_CODE.SUCCESS &&
      response?.data.msg_code === RESPONSE_CODE.SUCCESS
    ) {
      setData(response.data?.content);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReasonReduce();
  }, []);

  return { data, setData, loading};
};

export type CreateReasonReduceBody = {
  code: string;
  name: string;
  ratio: number;
};

export type UpdateReasonReduceBody = {
  name: string;
  ratio: number;
};

export const useReasonReduce = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateReasonReduce = async (id: string, body: UpdateReasonReduceBody) => {
    setLoading(true);
    const response = await NetWork.patch(
      getRequestUrl(API_URL.GENERAL, {
        partial: API_URL.REASON_REDUCE,
        subId: id,
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
  const createReasonReduce = async (body: CreateReasonReduceBody) => {
    setLoading(true);
    const response = await NetWork.post(
      getRequestUrl(API_URL.GENERAL, {
        partial: API_URL.REASON_REDUCE,
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
  const deleteReasonReduce = async (id: string) => {
    setLoading(true);
    const response = await NetWork.deleteMethod(
      getRequestUrl(API_URL.GENERAL, {
        partial: API_URL.REASON_REDUCE,
        subId: id,
      })
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

  return { createReasonReduce, updateReasonReduce, deleteReasonReduce, loading };
};
