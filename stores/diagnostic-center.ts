import { CreateCenterServicePayload } from '@/types/diagnostic-center';
import { create } from 'zustand';

type DiagnosticCenterStore = {
    serviceData: CreateCenterServicePayload;
    setServiceData: (data: CreateCenterServicePayload) => void;
    clearServiceData: () => void;
    isSuccess: boolean;
    setIsSuccess: (isSuccess: boolean) => void;
};

export const useCreateCenterServiceStore = create<DiagnosticCenterStore>(
    (set) => ({
        serviceData: {
            serviceName: '',
            serviceType: '',
            description: '',
            price: 0,
            isAvailable: false,
            discountPrice: 0,
            timeDuration: '',
            resultDeliveryTime: '',
            instructions: '',
        },
        setServiceData: (data) => set({ serviceData: data }),
        isSuccess: false,
        setIsSuccess: (isSuccess) => set({ isSuccess }),
        clearServiceData: () =>
            set({
                serviceData: {
                    serviceName: '',
                    serviceType: '',
                    description: '',
                    price: 0,
                    isAvailable: false,
                    discountPrice: 0,
                    timeDuration: '',
                    resultDeliveryTime: '',
                    instructions: '',
                },
            }),
    }),
);
