import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { deleteParamsNotUsing, isSuccessfulResponse } from "services/api/utils";
import queryString from "query-string";

export type StatisticParams = {
  departmentIds?: number[];
  groupIds?: number[];
  schoolYear?: string;
};

export type StatisticData = {
  attt: StatisticDetail;
  cntt: StatisticDetail;
  cryptography: StatisticDetail;
};

type StatisticDetail = {
  [key: string]: number;
};

export const useGetStatistic = (params: StatisticParams) => {
  const [data, setData] = useState<StatisticData>({
    attt: { teaching: 0, instructProject: 0, research: 0 },
    cntt: { teaching: 0, instructProject: 0, research: 0 },
    cryptography: { teaching: 0, instructProject: 0, research: 0 },
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    // Call API here
    const serializedParams = queryString.stringify({
      ...params,
      departmentIds: JSON.stringify(params?.departmentIds),
      groupIds: JSON.stringify(params?.groupIds),
    });
    const response = await NetWork.get(API_URL.STATISTIC, {
      params: deleteParamsNotUsing(serializedParams),
    });
    if (isSuccessfulResponse(response)) {
      setData(response?.data?.content);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return { data, loading };
};
