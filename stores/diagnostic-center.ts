import {
    CreateCenterServicePayload,
    CreateDiagnosticCenterPayload,
} from '@/types/diagnostic-center';
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

type CreateDiagnosticCenterStore = {
    state: string;
    setState: (state: string) => void;
    centerData: CreateDiagnosticCenterPayload;
    setCenterData: (data: CreateDiagnosticCenterPayload) => void;
    clearCenterData: () => void;
    isSuccess: boolean;
    setIsSuccess: (isSuccess: boolean) => void;
};

export const useCreateDiagnosticCenterStore =
    create<CreateDiagnosticCenterStore>((set) => ({
        centerData: {
            name: '',
            address: '',
            phone: '',
            email: '',
            website: '',
            description: '',
            establishedYear: '',
            totalStaff: '',
            operatingHours: [],
            additionalFeatures: [],
            images: [],
            logo: '',
            latitude: undefined,
            longitude: undefined,
            lga: '',
            state: '',
            emergencyPhone: '',
            licenseDocument: '',
            cacDocument: '',
        },
        state: '',
        setState: (state) => set({ state }),
        setCenterData: (data) => set({ centerData: data }),
        isSuccess: false,
        setIsSuccess: (isSuccess) => set({ isSuccess }),
        clearCenterData: () =>
            set({
                centerData: {
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                    website: '',
                    description: '',
                    establishedYear: 0,
                    totalStaff: 0,
                    operatingHours: [],
                    additionalFeatures: [],
                    images: [],
                    logo: '',
                    latitude: undefined,
                    longitude: undefined,
                    lga: '',
                    state: '',
                    emergencyPhone: '',
                    licenseDocument: '',
                    cacDocument: '',
                },
            }),
    }));
