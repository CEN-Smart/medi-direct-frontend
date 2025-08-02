import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type GuestSearchStore = {
    serviceType: string;
    setServiceType: (serviceType: string) => void;
    state: string;
    setState: (state: string) => void;
    lga: string;
    setLga: (lga: string) => void;
    rating: number | string;
    setRating: (rating: number | string) => void;
    clearAllSearchFilters: () => void;
};

export const useGuestSearchStore = create<GuestSearchStore>()(
    persist(
        (set) => ({
            serviceType: '',
            setServiceType: (serviceType) => set({ serviceType }),
            state: '',
            setState: (state) => set({ state }),
            lga: '',
            setLga: (lga) => set({ lga }),
            rating: '',
            setRating: (rating) => set({ rating }),
            clearAllSearchFilters: () =>
                set({
                    serviceType: '',
                    state: '',
                    lga: '',
                    rating: '',
                }),
        }),
        {
            name: 'guest-search-storage',
        },
    ),
);
