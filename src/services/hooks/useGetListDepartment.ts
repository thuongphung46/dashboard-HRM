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