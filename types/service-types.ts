export type AllServiceTypesResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        serviceTypes: Array<{
            id: number;
            name: string;
            description: string;
            createdAt: string;
            updatedAt: string;
        }>;
    };
};

export type SingleServiceTypeResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        serviceType: {
            id: number;
            name: string;
            description: string;
            createdAt: string;
            updatedAt: string;
        };
    };
};
