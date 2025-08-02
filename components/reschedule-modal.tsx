'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { animations } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useRescheduleBooking } from '@/queries/diagnostic-center/center';
import { useOperatingHours } from '@/queries/featured-centers';
import { useRescheduleBookingStore } from '@/stores/guest-booking';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { format } from 'date-fns';
import { AlertCircle, Calendar } from 'lucide-react';

import { DatePicker } from './date-picker';

interface RescheduleModalProps {
    booking:
        | (DiagnosticCenterResponse['data']['centres'][number]['bookings'][number] & {
              centreName: string;
              centreId: number;
          })
        | undefined;
    children?: React.ReactNode;
}

const rescheduleReasons = [
    'Personal emergency',
    'Work conflict',
    'Health reasons',
    'Travel plans',
    'Family commitment',
    'Other',
];

export function RescheduleModal({ booking, children }: RescheduleModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [customReason, setCustomReason] = useState('');
    const { rescheduleData, setRescheduleData, clearRescheduleData } =
        useRescheduleBookingStore();

    const [date, setDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setCustomReason('');
            setDate(undefined);
            clearRescheduleData();
        }
    }, [isOpen, clearRescheduleData]);

    const handleNext = () => {
        if (step < 2) {
            setStep(step + 1);
            // Animate step transition
            setTimeout(() => {
                const nextStepElement = document.querySelector(
                    `[data-reschedule-step="${step + 1}"]`,
                );
                if (nextStepElement) {
                    animations.pageEnter(nextStepElement);
                }
            }, 100);
        }
    };
    const isInvalidFields =
        !rescheduleData.date ||
        !rescheduleData.time ||
        (customReason === 'Other' && !rescheduleData.rescheduleReason) ||
        (customReason !== 'Other' && !rescheduleData.rescheduleReason);

    // OperatingHours
    const {
        data: operatingHours,
        isError: isOperatingHoursError,
        error: operatingHoursError,
        isPending: isOperatingHoursPending,
    } = useOperatingHours(booking?.centreId);

    const { mutate: rescheduleBooking, isPending: isRescheduling } =
        useRescheduleBooking(booking?.id, setIsOpen);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="sm">
                        Reschedule
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl reschedule-modal-content px-0">
                <DialogDescription className="sr-only">
                    Reschedule your appointment with {booking?.centreName}
                </DialogDescription>
                <DialogHeader className="px-6 pt-4">
                    <DialogTitle className="flex items-center gap-2 capitalize">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Reschedule Appointment - {booking?.centreName}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4 ">
                    {/* Progress Indicator */}
                    <div className="flex justify-center items-center space-x-4">
                        {[1, 2].map((stepNum) => (
                            <div key={stepNum} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                                        step >= stepNum
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    {stepNum}
                                </div>
                                {stepNum < 2 && (
                                    <div
                                        className={`w-12 h-1 mx-2 transition-all duration-300 ${
                                            step > stepNum
                                                ? 'bg-blue-600'
                                                : 'bg-gray-200'
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="max-h-[60svh] overflow-y-auto px-6">
                        {/* Current Booking Info */}
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-4">
                                <h3 className="mb-2 font-semibold text-blue-900">
                                    Current Appointment
                                </h3>
                                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm">
                                    <div>
                                        <p className="text-blue-700 capitalize">
                                            <strong>Centre:</strong>{' '}
                                            {booking?.centreName}
                                        </p>
                                        <p className="text-blue-700 capitalize">
                                            <strong>Test:</strong>{' '}
                                            {booking?.serviceName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-blue-700">
                                            <strong>Date:</strong>{' '}
                                            {booking?.date}
                                        </p>
                                        <p className="text-blue-700">
                                            <strong>Time:</strong>{' '}
                                            {booking?.time}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 1: New Date & Time */}
                        {step === 1 && (
                            <div data-reschedule-step="1" className="space-y-4">
                                <h3 className="font-semibold text-lg">
                                    Select New Date & Time
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <DatePicker
                                            date={date}
                                            setDate={(newDate) => {
                                                setDate(newDate);
                                                setRescheduleData({
                                                    ...rescheduleData,
                                                    date: newDate
                                                        ? format(
                                                              new Date(newDate),
                                                              'yyyy-MM-dd',
                                                          )
                                                        : '',
                                                });
                                            }}
                                            label="Preferred Date"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Preferred Time
                                        </label>
                                        {isOperatingHoursError && (
                                            <p className="text-red-500 text-sm">
                                                {operatingHoursError.message}
                                            </p>
                                        )}
                                        <Select
                                            value={rescheduleData.time}
                                            onValueChange={(value) => {
                                                setRescheduleData({
                                                    ...rescheduleData,
                                                    time: value,
                                                });
                                            }}
                                        >
                                            <SelectTrigger
                                                className={cn(`w-full`, {
                                                    'animate-pulse bg-gray-200':
                                                        isOperatingHoursPending,
                                                })}
                                            >
                                                <SelectValue placeholder="Select time" />
                                            </SelectTrigger>
                                            <SelectContent className="z-[20001]">
                                                {operatingHours?.data.openingHours.map(
                                                    (time) => (
                                                        <SelectItem
                                                            key={time}
                                                            value={time}
                                                        >
                                                            {time}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Available Slots Info */}
                                <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                                        <span className="font-medium text-green-800 text-sm">
                                            Available Slots
                                        </span>
                                    </div>
                                    <p className="text-green-700 text-sm">
                                        {`We have checked the availability for your selected date and time. Please choose a time slot that works best for you.`}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Reason */}
                        {step === 2 && (
                            <div data-reschedule-step="2" className="space-y-4">
                                <h3 className="font-semibold text-lg">
                                    Reason for Rescheduling
                                </h3>

                                <div>
                                    <label className="block mb-2 font-medium text-sm">
                                        Please select a reason
                                    </label>
                                    <Select
                                        value={
                                            rescheduleData.rescheduleReason ||
                                            customReason
                                        }
                                        onValueChange={(value) => {
                                            if (value === 'Other') {
                                                setCustomReason('Other');
                                                setRescheduleData({
                                                    ...rescheduleData,
                                                    rescheduleReason: '',
                                                });
                                            } else {
                                                setCustomReason(value);
                                                setRescheduleData({
                                                    ...rescheduleData,
                                                    rescheduleReason: value,
                                                });
                                            }
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select reason" />
                                        </SelectTrigger>
                                        <SelectContent className="z-[20001]">
                                            {rescheduleReasons.map((reason) => (
                                                <SelectItem
                                                    key={reason}
                                                    value={reason}
                                                >
                                                    {reason}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {customReason === 'Other' && (
                                    <div>
                                        <label className="block mb-2 font-medium text-sm">
                                            Please specify
                                        </label>
                                        <Textarea
                                            className="resize-none"
                                            placeholder="Please provide details..."
                                            value={
                                                rescheduleData.rescheduleReason
                                                    ? rescheduleData.rescheduleReason
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                setRescheduleData({
                                                    ...rescheduleData,
                                                    rescheduleReason:
                                                        e.target.value,
                                                })
                                            }
                                            rows={3}
                                        />
                                    </div>
                                )}

                                {/* Summary */}
                                <Card className="bg-gray-50">
                                    <CardContent className="p-4">
                                        <h4 className="mb-3 font-medium">
                                            Reschedule Summary
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    From:
                                                </span>
                                                <span>
                                                    {booking?.date} at{' '}
                                                    {booking?.time}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    To:
                                                </span>
                                                <span className="font-medium text-blue-600">
                                                    {rescheduleData.date} at{' '}
                                                    {rescheduleData.time}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Reason:
                                                </span>
                                                <span>
                                                    {customReason === 'Other'
                                                        ? customReason
                                                        : rescheduleData.rescheduleReason}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="mt-0.5 w-4 h-4 text-yellow-600" />
                                        <div className="text-yellow-800 text-sm">
                                            <p className="mb-1 font-medium">
                                                Important Notes:
                                            </p>
                                            <ul className="space-y-1 list-disc list-inside">
                                                <li>
                                                    Rescheduling is subject to
                                                    availability
                                                </li>
                                                <li>{`You'll receive confirmation within 2 hours`}</li>
                                                <li>
                                                    No additional charges for
                                                    rescheduling
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter className="px-6">
                    {step === 1 && (
                        <Button
                            disabled={
                                !rescheduleData.time || !rescheduleData.date
                            }
                            onClick={handleNext}
                            className="w-full"
                        >
                            Continue
                        </Button>
                    )}
                    {step === 2 && (
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setStep(1)}
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (isInvalidFields) {
                                        return;
                                    }
                                    rescheduleBooking(rescheduleData);
                                }}
                                disabled={isInvalidFields || isRescheduling}
                                className="flex-1"
                            >
                                {isRescheduling
                                    ? 'Processing...'
                                    : 'Confirm Reschedule'}
                            </Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
