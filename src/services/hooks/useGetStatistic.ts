import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import {
  deleteParamsNotUsing,
  getRequestUrl,
  isSuccessfulResponse,
} from "services/api/utils";

export type StatisticParams = {
  departmentIds?: string;
  groupIds?: string;
  schoolYear?: string;
};

export type StatisticData = {
  [key: string]: StatisticDetail;
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
    const response = await NetWork.get(
      API_URL.STATISTIC,
      deleteParamsNotUsing(params)
    );
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

export const useGetSchoolYear = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await NetWork.get(
      getRequestUrl(API_URL.STATISTIC, {
        partial: "school-year",
      })
    );
    if (isSuccessfulResponse(response)) {
      setData(response?.data?.content);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};
