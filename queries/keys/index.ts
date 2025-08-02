import { getQueryKeys } from '@/helpers/query-keys';

export const userVerificationKeys = getQueryKeys('user-verification');
export const serviceTypeKeys = getQueryKeys('service-type');
export const allStatesAndLgaKeys = getQueryKeys('all-states-and-lga');
export const diagnosticCenterKeys = getQueryKeys('diagnostic-center');
export const userDetailsKeys = getQueryKeys('user-details');
export const allUsersKeys = getQueryKeys('all-users');
export const topRatedCentersKeys = getQueryKeys('top-rated-centers');
export const searchCentresKeys = getQueryKeys('search-centres');
export const operatingHoursKeys = getQueryKeys('operating-hours');
export const bookingsKeys = getQueryKeys('bookings');
export const reviewKeys = getQueryKeys('review');
export const centerServiceKeys = getQueryKeys('center-service');

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

    // Diagnostic Center Keys
    diagnosticCenterKeys.read,
    diagnosticCenterKeys.readOne,
    diagnosticCenterKeys.create,
    diagnosticCenterKeys.update,
    diagnosticCenterKeys.delete,
    diagnosticCenterKeys.patch,

    // User Details Keys
    userDetailsKeys.read,
    userDetailsKeys.readOne,
    userDetailsKeys.create,
    userDetailsKeys.update,
    userDetailsKeys.delete,
    userDetailsKeys.patch,

    // All Users Keys
    allUsersKeys.read,
    allUsersKeys.readOne,
    allUsersKeys.create,
    allUsersKeys.update,
    allUsersKeys.delete,
    allUsersKeys.patch,

    // Top Rated Centers Keys
    topRatedCentersKeys.read,
    topRatedCentersKeys.readOne,
    topRatedCentersKeys.create,
    topRatedCentersKeys.update,
    topRatedCentersKeys.delete,
    topRatedCentersKeys.patch,

    // Search Centres Keys
    searchCentresKeys.read,
    searchCentresKeys.readOne,
    searchCentresKeys.create,
    searchCentresKeys.update,
    searchCentresKeys.delete,
    searchCentresKeys.patch,

    // Operating Hours Keys
    operatingHoursKeys.read,
    operatingHoursKeys.readOne,
    operatingHoursKeys.create,
    operatingHoursKeys.update,
    operatingHoursKeys.delete,
    operatingHoursKeys.patch,

    // Bookings Keys
    bookingsKeys.read,
    bookingsKeys.readOne,
    bookingsKeys.create,
    bookingsKeys.update,
    bookingsKeys.delete,
    bookingsKeys.patch,

    // Review Keys
    reviewKeys.read,
    reviewKeys.readOne,
    reviewKeys.create,
    reviewKeys.update,
    reviewKeys.delete,
    reviewKeys.patch,

    // Center Service Keys
    centerServiceKeys.read,
    centerServiceKeys.readOne,
    centerServiceKeys.create,
    centerServiceKeys.update,
    centerServiceKeys.delete,
    centerServiceKeys.patch,
];
