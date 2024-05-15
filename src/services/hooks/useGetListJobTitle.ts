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

export type CreateJobTitleBody = {
  code: string;
  jobTitle: string;
};

export type UpdateJobTitleBody = {
  jobTitle: string;
};

export const useJobTitle = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateJobTitle = async (id: string, body: UpdateJobTitleBody) => {
    setLoading(true);
    const response = await NetWork.patch(
      getRequestUrl(API_URL.GENERAL, {
        partial: API_URL.JOB_TITLE,
        subId: id,
      }),
      body
    );
    setLoading(false);
    if (
      response.status === RESPONSE_CODE.SUCCESS &&
      response.data.msg_code === RESPONSE_CODE.SUCCESS
    ) {
      return response.data;
    } else {
      return null;
    }
  };
  const createJobTitle = async (body: CreateJobTitleBody) => {
    setLoading(true);
    const response = await NetWork.post(
      getRequestUrl(API_URL.GENERAL, {
        partial: API_URL.JOB_TITLE,
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
  const deleteJobTitle = async (id: string) => {
    setLoading(true);
    const response = await NetWork.deleteMethod(
      getRequestUrl(API_URL.GENERAL, {
        partial: API_URL.JOB_TITLE,
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

  return { createJobTitle, updateJobTitle, deleteJobTitle, loading };
};
