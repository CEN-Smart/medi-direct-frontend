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
export interface Service {
    id: number;
    serviceName: string;
    serviceType: string;
    description: string;
    price: string;
    discountPrice: string;
    timeDuration: string;
    resultDeliveryTime: string;
    instructions: string;
    isAvailable: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    centreId: number;
}
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
