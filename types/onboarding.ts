import { ErrorResponseMessage } from ".";

export type UserVerificationResponse = {
  status: "success" | "fail";
  message: string | ErrorResponseMessage;
};

export type SignUpResponse = {
  status: "success" | "fail";
  message: string | ErrorResponseMessage;
  data: {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      agreedToTerms: boolean;
      isBoarder: boolean;
      role: "USER" | "ADMIN";
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type SignInResponse = {
  status: "success" | "fail";
  message: string | ErrorResponseMessage;
  token: string;
  data: {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      agreedToTerms: boolean;
      isBoarder: boolean;
      role: "USER" | "ADMIN" | "SUPER_ADMIN";
      createdAt: string;
      updatedAt: string;
    };
  };
};
