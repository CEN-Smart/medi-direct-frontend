'use client';

import { useAllStates, useLgaByState } from '@/queries/states-and-lga';
import { useCreateDiagnosticCenterStore } from '@/stores/diagnostic-center';
import { MapPin } from 'lucide-react';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

export function CreateCenterStep2() {
    const { state, setState, centerData, setCenterData } =
        useCreateDiagnosticCenterStore();
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

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">Location Details</h3>
                <p className="text-sm text-gray-600">
                    Where is your centre located?
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                        id="address"
                        value={centerData.address}
                        onChange={(e) =>
                            setCenterData({
                                ...centerData,
                                address: e.target.value,
                            })
                        }
                        placeholder="123 Main Street, District"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            disabled={pendingStates}
                            onValueChange={(value) => {
                                setState(value);
                                setCenterData({
                                    ...centerData,
                                    state: value,
                                    lga: '', // Reset LGA when state changes
                                });
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 z-[10001] overflow-auto">
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
                            disabled={pendingLGA || !state}
                            onValueChange={(value) => {
                                setCenterData({
                                    ...centerData,
                                    lga: value,
                                });
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select LGA" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 z-[10001] overflow-auto">
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
        </div>
    );
}
