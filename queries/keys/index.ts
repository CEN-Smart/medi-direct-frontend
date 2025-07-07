import { getQueryKeys } from "@/helpers/query-keys";

const userVerificationKeys = getQueryKeys("user-verification");

// All keys to validate for the queries
export const allKeysToValidate = [
  userVerificationKeys.read,
  userVerificationKeys.readOne,
  userVerificationKeys.create,
  userVerificationKeys.update,
  userVerificationKeys.delete,
  userVerificationKeys.patch,
];
