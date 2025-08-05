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
    // Extract heading text to avoid nested ternary
    let heading = 'Featured centers';
    if (state) {
        heading += ' in ' + state;
        if (lga) {
            heading += ',';
        }
    }
    if (lga) {
        heading += ' ' + lga;
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-5 items-end justify-between gap-4 mb-5">
                    <div className="flex gap-4 items-center w-full col-span-1 md:col-span-2">
                        <div className="space-y-1 w-full">
                            <label
                                className="text-sm font-medium text-gray-700"
                                htmlFor="state-select"
                            >
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
                                <SelectTrigger
                                    className="w-full"
                                    id="state-select"
                                >
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
                        <div className="space-y-1 w-full">
                            <label
                                className="text-sm font-medium text-gray-700"
                                htmlFor="lga-select"
                            >
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
                                <SelectTrigger
                                    className="w-full"
                                    id="lga-select"
                                    disabled={pendingLGA || !state}
                                >
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
                    <h2 className="text-2xl text-right w-full font-bold text-gray-900 col-span-1 md:col-span-3">
                        {heading}
                    </h2>
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
