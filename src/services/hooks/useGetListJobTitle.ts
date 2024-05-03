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
  const [data, setData] = useState<JobTitleType[]>([]);
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
      setData(response.data?.content);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobTitles();
  }, []);

  return { data, loading };
};

export type createCreateJobTitleBody = {
  code: string;
  jobTitle: string;
};

const useCreateJobTitle = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const createJobTitle = async (body: createCreateJobTitleBody) => {
    setLoading(true);
    const response = await NetWork.post(`${API_URL.JOB_TITLE}`, body);
    setLoading(false);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return response.data;
    } else {
      return null;
    }
  };

  return { createJobTitle, loading };
};

export type updateJobTitleBody = {};

const useUpdateJobTitle = (id: string | undefined) => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateJobTitle = async (id: string, body: updateJobTitleBody) => {
    setLoading(true);
    const response = await NetWork.patch(`${API_URL.JOB_TITLE}/${id}`, body);
    setLoading(false);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return response.data;
    } else {
      return null;
    }
  };

  return { updateJobTitle, loading };
};