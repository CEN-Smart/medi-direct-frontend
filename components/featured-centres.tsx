'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useTopRatedCenters } from '@/queries/featured-centers';
import { useAllStates, useLgaByState } from '@/queries/states-and-lga';
import { useGuestSearchStore } from '@/stores/guest-search';

import { TopRatedCenterCard } from './diagnostic-center/top-rated-center-card';

export function FeaturedCentres() {
    const { state, setState, lga, setLga } = useGuestSearchStore();
    const {
        data: statesData,
        isPending: pendingStates,
        isError: isStateError,
        error: errorState,
    } = useAllStates();
    const {
        data: lgaData,
        isPending: pendingLGA,
        isError: isLGAError,
        error: errorLGA,
    } = useLgaByState(state);
    const {
        data: topRatedCenters,
        isPending: pendingTopRated,
        isError: isTopRatedError,
        error: errorTopRated,
    } = useTopRatedCenters(state, lga);
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex w-full justify-between gap-3 items-start">
                    <h2 className="text-2xl w-full font-bold text-gray-900 mb-2">
                        {`Featured centers ${!state ? '' : 'in'} ${state ? `${state},` : ''} ${lga ? lga : ''}`}
                    </h2>
                    <div className="flex gap-4 justify-end w-full">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                State
                            </label>
                            {isStateError && (
                                <p className="text-red-500 text-sm">
                                    {errorState.message}
                                </p>
                            )}
                            <Select
                                value={state}
                                disabled={pendingStates}
                                onValueChange={(value) => setState(value)}
                            >
                                <SelectTrigger className="min-w-[150px]">
                                    <SelectValue placeholder="State" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statesData?.data.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1 mb-2">
                            <label className="text-sm font-medium text-gray-700">
                                LGA
                            </label>
                            {isLGAError && (
                                <p className="text-red-500 text-sm">
                                    {errorLGA.message}
                                </p>
                            )}
                            <Select
                                disabled={pendingLGA || !state}
                                onValueChange={(value) => setLga(value)}
                            >
                                <SelectTrigger className="min-w-[150px]">
                                    <SelectValue placeholder="Select LGA" />
                                </SelectTrigger>
                                <SelectContent>
                                    {lgaData?.data.map((lga) => (
                                        <SelectItem key={lga} value={lga}>
                                            {lga}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <TopRatedCenterCard
                    isError={isTopRatedError}
                    errorMessage={errorTopRated?.message}
                    isPending={pendingTopRated}
                    centers={topRatedCenters}
                />
            </div>
        </section>
    );
}
