import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { RESPONSE_CODE } from "services/api/config";
import { getRequestUrl } from "services/api/utils";

export type ReasonReduceType = {
  id: number;
  code: string;
  name: string;
};

export const useGetListReasonReduce = () => {
  const [reasonReduce, setReasonReduce] = useState<ReasonReduceType[]>([]);
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
      setReasonReduce(response.data?.content);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReasonReduce();
  }, []);

  return { reasonReduce, loading };
};
