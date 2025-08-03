'use client';

import { useState } from 'react';

import { Header } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ratings } from '@/docs';
import { useSearchedCenters } from '@/queries/search-centres/search-centres';
import { useAllServiceTypes } from '@/queries/service-types';
import { useAllStates, useLgaByState } from '@/queries/states-and-lga';
import { useGuestSearchStore } from '@/stores/guest-search';
import { Filter } from 'lucide-react';

import { SearchedCenterCard } from '../diagnostic-center/searched-center-card';
import { Pagination } from '../pagination';
import { Button } from '../ui/button';
import { NoDataFound } from '../ui/no-data-found';
import { Skeleton } from '../ui/skeleton';

export function GuestSearchPage() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(5);
    const {
        state,
        setState,
        serviceType,
        setServiceType,
        lga,
        setLga,
        rating,
        setRating,
        clearAllSearchFilters,
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

    const {
        data: centres,
        isPending: pendingCentres,
        isError: isCentresError,
        error: errorCentres,
    } = useSearchedCenters(
        pageNumber,
        pageSize,
        serviceType,
        state,
        lga,
        rating,
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            <div className="mx-auto px-4 py-8 container">
                <div className="mb-8">
                    <h1 className="mb-2 font-bold text-gray-900 text-3xl flex items-center gap-2">
                        Diagnostic Centres
                    </h1>
                    {pendingCentres ? (
                        <Skeleton className="h-6 w-64 bg-gray-200" />
                    ) : isCentresError ? (
                        <p className="text-red-500">{errorCentres.message}</p>
                    ) : (
                        <p className="text-gray-600">
                            {`${centres?.total && centres.total > 0 ? centres.total : 0} results found`}
                            {state && ` in ${state}`}
                            {serviceType && ` for ${serviceType}`}
                        </p>
                    )}
                </div>

                <div className="gap-6 grid grid-cols-1 lg:grid-cols-4">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="w-full max-w-full mx-auto shadow-lg px-2 sm:px-4">
                            <CardContent className="px-1 py-2 sm:px-4 sm:py-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <Filter className="w-5 h-5" />
                                    <h3 className="font-semibold">Filters</h3>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1">
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
                                            onValueChange={(value) =>
                                                setServiceType(value)
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select test type" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-60 overflow-y-auto z-[1500]">
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
                                            onValueChange={(value) =>
                                                setState(value)
                                            }
                                            disabled={pendingStates}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="State" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statesData?.data.map(
                                                    (state) => (
                                                        <SelectItem
                                                            key={state}
                                                            value={state}
                                                        >
                                                            {state}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">
                                            Local Government
                                        </label>
                                        {isLGAError && (
                                            <p className="text-red-500 text-sm">
                                                {errorLGA.message}
                                            </p>
                                        )}
                                        <Select
                                            value={lga}
                                            onValueChange={(value) =>
                                                setLga(value)
                                            }
                                            disabled={pendingLGA || !state}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select LGA" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {lgaData?.data.map((lga) => (
                                                    <SelectItem
                                                        key={lga}
                                                        value={lga}
                                                    >
                                                        {lga}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1 ">
                                        <label className="text-sm font-medium text-gray-700">
                                            Rating
                                        </label>
                                        <Select
                                            value={(rating || '').toString()}
                                            onValueChange={(value) => {
                                                if (value === '0') {
                                                    setRating('');
                                                    return;
                                                }
                                                setRating(Number(value));
                                            }}
                                            disabled={pendingLGA || !state}
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
                                    <div className="w-full">
                                        <Button
                                            className="w-full"
                                            variant="outline"
                                            onClick={clearAllSearchFilters}
                                        >
                                            Clear Filters
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-3">
                        {/* No Results */}
                        {centres?.total === 0 && (
                            <NoDataFound message="No diagnostic centres found for the selected filters." />
                        )}
                        <SearchedCenterCard
                            centers={centres}
                            isPending={pendingCentres}
                            isError={isCentresError}
                            errorMessage={errorCentres?.message}
                        />
                        {centres && centres?.total > 0 && (
                            <div className="mt-6 flex justify-between items-center">
                                <Pagination
                                    currentPage={
                                        centres?.metaData?.currentPage || 1
                                    }
                                    totalPages={
                                        centres?.metaData?.totalPages || 1
                                    }
                                    onPageChange={(setPage) => {
                                        setPageNumber(setPage);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
