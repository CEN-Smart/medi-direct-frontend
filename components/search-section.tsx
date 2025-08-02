'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ratings } from '@/docs';
import { cn } from '@/lib/utils';
import { useAllServiceTypes } from '@/queries/service-types';
import { useAllStates, useLgaByState } from '@/queries/states-and-lga';
import { useGuestSearchStore } from '@/stores/guest-search';
import { Search } from 'lucide-react';

export function SearchSection() {
    const [searching, setSearching] = useState(false);
    const router = useRouter();
    const {
        state,
        setState,
        serviceType,
        setServiceType,
        lga,
        setLga,
        setRating,
    } = useGuestSearchStore();
    const {
        data: serviceTypes,
        isPending: pendingServices,
        isError: isServiceError,
        error: errorService,
    } = useAllServiceTypes();
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

    const handleSearch = () => {
        setSearching(true);
        setTimeout(() => {
            setSearching(false);
        }, 30000);
        router.push(`/search`);
    };

    return (
        <Card className="w-full max-w-screen-lg md:max-w-4xl mx-auto shadow-lg px-2 sm:px-4">
            <CardContent className="px-1 py-2 sm:px-4 sm:py-3">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="space-y-1 w-full">
                        <label className="text-sm font-medium text-gray-700">
                            Test Type
                        </label>
                        {isServiceError && (
                            <p className="text-red-500 text-sm">
                                {errorService.message}
                            </p>
                        )}
                        <Select
                            value={serviceType}
                            disabled={pendingServices}
                            onValueChange={(value) => setServiceType(value)}
                        >
                            <SelectTrigger
                                className={cn(`w-full`, {
                                    'animate-pulse': pendingServices,
                                })}
                            >
                                <SelectValue placeholder="Select test type" />
                            </SelectTrigger>
                            <SelectContent>
                                {serviceTypes?.data?.serviceTypes?.map(
                                    (test) => (
                                        <SelectItem
                                            key={test.id}
                                            value={test.name}
                                            className="whitespace-normal"
                                        >
                                            {test.name}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1 w-full">
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
                            onValueChange={(value) => setState(value)}
                            disabled={pendingStates}
                        >
                            <SelectTrigger className="w-full">
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
                        <label className="text-sm font-medium text-gray-700">
                            LGA
                        </label>
                        {isLGAError && (
                            <p className="text-red-500 text-sm">
                                {errorLGA.message}
                            </p>
                        )}
                        <Select
                            onValueChange={(value) => setLga(value)}
                            disabled={pendingLGA || !state}
                        >
                            <SelectTrigger
                                disabled={pendingLGA || !state}
                                className={cn(`w-full`, {
                                    'animate-pulse': pendingLGA,
                                })}
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

                    <div className="space-y-1 w-full">
                        <label className="text-sm font-medium text-gray-700">
                            Rating
                        </label>
                        <Select
                            onValueChange={(value) => {
                                //    Check if the value selected is 0 and set the rating to ''
                                if (value === '0') {
                                    setRating('');
                                    return;
                                }
                                setRating(Number(value));
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Rating" />
                            </SelectTrigger>
                            <SelectContent>
                                {ratings.map((rat) => (
                                    <SelectItem
                                        key={rat.value}
                                        value={rat.value.toString()}
                                    >
                                        {rat.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-end order-2 md:order-none w-full">
                        <Button
                            onClick={handleSearch}
                            disabled={
                                !serviceType || !state || !lga || searching
                            }
                            className="w-full cursor-pointer"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            {searching ? 'Searching...' : 'Search'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
