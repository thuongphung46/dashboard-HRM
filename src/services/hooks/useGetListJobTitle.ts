import { useEffect, useState } from "react";
import { API_URL, NetWork } from "services/api";
import { RESPONSE_CODE } from "services/api/config";
import { getRequestUrl } from "services/api/utils";

export type JobTitleType = {
  id: number;
  code: string;
  jobTitle: string;
};

export const useGetListJobTitle = () => {
  const [jobTitles, setJobTitles] = useState<JobTitleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJobTitles = async () => {
    setLoading(true);
    // Call API here
    const response = await NetWork.get(
      getRequestUrl(API_URL.GENERAL, {
        partial: API_URL.JOB_TITLE,
      })
    );
    if (
      response.status === RESPONSE_CODE.SUCCESS &&
      response?.data.msg_code === RESPONSE_CODE.SUCCESS
    ) {
      setJobTitles(response.data?.content);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobTitles();
  }, []);

  return { jobTitles, loading };
};
