import { getQueryKeys } from '@/helpers/query-keys';

export const userVerificationKeys = getQueryKeys('user-verification');
export const serviceTypeKeys = getQueryKeys('service-type');
export const allStatesAndLgaKeys = getQueryKeys('all-states-and-lga');

// All keys to validate for the queries
export const allKeysToValidate = [
    userVerificationKeys.read,
    userVerificationKeys.readOne,
    userVerificationKeys.create,
    userVerificationKeys.update,
    userVerificationKeys.delete,
    userVerificationKeys.patch,

    // Service Type Keys
    serviceTypeKeys.read,
    serviceTypeKeys.readOne,
    serviceTypeKeys.create,
    serviceTypeKeys.update,
    serviceTypeKeys.delete,
    serviceTypeKeys.patch,

    // All States and LGA Keys
    allStatesAndLgaKeys.read,
    allStatesAndLgaKeys.readOne,
    allStatesAndLgaKeys.create,
    allStatesAndLgaKeys.update,
    allStatesAndLgaKeys.delete,
    allStatesAndLgaKeys.patch,
];
