import { AxiosError } from "axios";

export type ErrorResponse = AxiosError & {
  response: {
    data: {
      message: string;
    };
  };
};

export type ErrorResponseMessage = {
  status: string;
  message: string;
}[];
