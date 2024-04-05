import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { RESPONSE_CODE } from "services/api/config";

// export type GetListStaffParams = {
//   query?: string;
//   active?: 0 | 1;
//   page?: number;
//   size?: number;
// };

export const useGetListDepartment = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await NetWork.get(
      API_URL.DEPARTMENT,
      // deleteParamsNotUsing(params)
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
  });
  return { data, loading };
};

// export const useGetDepartment = (id: number) => {
//   const [data, setData] = useState<any>({});
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchData = async () => {
//     setLoading(true);
//     const response = await NetWork.get(`${API_URL.STAFFS}/${id}`);
//     if (response.status === RESPONSE_CODE.SUCCESS) {
//       setData(response?.data?.content);
//       setLoading(false);
//     } else {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);
//   return { data, loading };
// };
