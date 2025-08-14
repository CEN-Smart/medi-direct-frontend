const userDashboardTabs = [
    { value: 'bookings', label: 'Bookings' },
    { value: 'centres', label: 'My Centres' },
    { value: 'history', label: 'History' },
    { value: 'completed', label: 'Completed' },
    { value: 'profile', label: 'Profile' },
];

const adminDashboardTabs = [
    { value: 'users', label: 'Users' },
    { value: 'service-types', label: 'Service Types' },
    { value: 'profile', label: 'Profile' },
];

const ratings = [
    { value: 1, label: 'Poor' },
    { value: 2, label: 'Fair' },
    { value: 3, label: 'Good' },
    { value: 4, label: 'Very Good' },
    { value: 5, label: 'Excellent' },
    { value: 0, label: 'Reset Ratings' },
];

const links = [
    { href: '/search', label: 'Find Centres' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/for-centres', label: 'For Centres' },
];

const ageRanges = [
    { label: '0-17', value: '0-17' },
    { label: '18-25', value: '18-25' },
    { label: '26-35', value: '26-35' },
    { label: '36-45', value: '36-45' },
    { label: '46-55', value: '46-55' },
    { label: '56+', value: '56+' },
];

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
];

const reviewCategories = [
    {
        id: 'staffRating',
        label: 'Staff Friendliness',
        icon: '👥',
    },
    {
        id: 'cleanlinessRating',
        label: 'Cleanliness',
        icon: '🧽',
    },
    {
        id: 'equipmentRating',
        label: 'Equipment Quality',
        icon: '🔬',
    },
    {
        id: 'waitingTimeRating',
        label: 'Waiting Time',
        icon: '⏰',
    },
    {
        id: 'resultDeliveryRating',
        label: 'Result Delivery',
        icon: '📋',
    },
    {
        id: 'valueForMoneyRating',
        label: 'Value for Money',
        icon: '💰',
    },
];

const amenities = [
    'Parking Available',
    'Wheelchair Accessible',
    'Air Conditioning',
    'WiFi Available',
    'Waiting Area',
    'Pharmacy On-site',
    'Emergency Services',
    'Home Service Available',
    'Online Results',
    'Insurance Accepted',
    '24/7 Service',
    'Laboratory On-site',
];

const resultDeliveryTimes = [
    'Same day',
    '24 hours',
    '24-48 hours',
    '2-3 days',
    '3-5 days',
    '1 week',
];

export {
    adminDashboardTabs,
    ageRanges,
    genderOptions,
    links,
    ratings,
    resultDeliveryTimes,
    reviewCategories,
    userDashboardTabs,
    amenities,
};
