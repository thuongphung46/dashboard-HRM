import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { getRequestUrl, isSuccessfulResponse } from "services/api/utils";

export const useGeneralConfig = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const response = await NetWork.get(getRequestUrl(API_URL.GENERAL));
    if (isSuccessfulResponse(response)) {
      setData(response?.data?.content);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data };
};
