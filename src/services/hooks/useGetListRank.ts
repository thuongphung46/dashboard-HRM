import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { RESPONSE_CODE } from "services/api/config";
import { getRequestUrl } from "services/api/utils";

export type RankType = {
  id: number;
  code: string;
  rankName: string;
};

export const useGetListRank = () => {
  const [data, setData] = useState<RankType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRank = async () => {
    setLoading(true);
    // Call API here
    const response = await NetWork.get(
      getRequestUrl(API_URL.GENERAL, {
        partial: API_URL.RANK_CONFIG,
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
    fetchRank();
  }, []);

  return { data, loading };

};
