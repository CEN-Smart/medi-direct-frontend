import { baseUrl } from "@/lib/utils";
import axios from "axios";
import axiosInstance from "./axios-config";

type Request = {
  url: string;
  body: Record<string, unknown>;
  auth: boolean;
};

type DEL_REQ = Omit<Request, "body" | "auth">;
type DEL_REQ_WITH_BODY = Omit<Request, "auth">;
type PATCH_REQ = Omit<Request, "auth">;
type GET_REQ = Partial<Omit<Request, "body">>;

const deleteRequest = async ({ url }: DEL_REQ) =>
  (await axiosInstance.delete(url)).data;

const deleteRequestWithBody = async ({ url, body }: DEL_REQ_WITH_BODY) =>
  (await axiosInstance.delete(url, { data: body })).data;

const get = async ({ url = "", auth = true }: GET_REQ) => {
  return (await (auth ? axiosInstance.get(url) : axios.get(baseUrl + url)))
    .data;
};

const post = async ({ url, body, auth = true }: Request) => {
  return (
    await (auth
      ? axiosInstance.post(url, body)
      : axios.post(baseUrl + url, body))
  ).data;
};

const patch = async ({ url, body }: PATCH_REQ) =>
  (await axiosInstance.patch(url, body)).data;

const put = async ({ url, body }: PATCH_REQ) =>
  (await axiosInstance.put(url, body)).data;

export const apiClient = {
  delete: deleteRequest,
  deleteWithBody: deleteRequestWithBody,
  get,
  patch,
  post,
  put,
};
