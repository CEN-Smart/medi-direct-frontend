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
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ageRanges, genderOptions } from '@/docs';
import { animations } from '@/lib/animations';
import { cn, formatPhone } from '@/lib/utils';
import { useCreateBooking } from '@/queries/diagnostic-center/guest';
import { useOperatingHours } from '@/queries/featured-centers';
import { useAllStates, useLgaByState } from '@/queries/states-and-lga';
import { useGuestBookingStore } from '@/stores/guest-booking';
import { SearchedCentersResponse } from '@/types/guest';
import { format } from 'date-fns';
import { Mail, Phone, User } from 'lucide-react';

import { DatePicker } from './date-picker';

interface GuestBookingModalProps {
    centre: SearchedCentersResponse['data']['centres'][number] | undefined;
    children?: React.ReactNode;
}

export function GuestBookingModal({
    centre,
    children,
}: GuestBookingModalProps) {
    const [state, setState] = useState<string>('');
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string>('');

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

    const [step, setStep] = useState(1);
    const { bookingData, setBookingData, clearBookingData } =
        useGuestBookingStore();

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            clearBookingData();
        }
    }, [isOpen, clearBookingData]);

    // OperatingHours
    const {
        data: operatingHours,
        isError: isOperatingHoursError,
        error: operatingHoursError,
        isPending: isOperatingHoursPending,
    } = useOperatingHours(centre?.id ? centre.id : undefined);

    const { mutate: createBooking, isPending: isCreatingBooking } =
        useCreateBooking(centre?.id ?? undefined, setStep);

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
            const nextStepElement = document.querySelector(
                `[data-step="${step + 1}"]`,
            );

            if (nextStepElement) animations.pageEnter(nextStepElement);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button onClick={() => setIsOpen(true)}>
                        Book Appointment
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl z-[20000] flex flex-col p-0 ">
                <DialogDescription className="sr-only">
                    Book an appointment at {centre?.name}
                </DialogDescription>
                {/* Header */}
                <DialogHeader className="p-6 capitalize">
                    <DialogTitle>Book Appointment - {centre?.name}</DialogTitle>
                </DialogHeader>

                {/* Scrollable Content */}
                <div className="flex-1 px-6 max-h-[70svh] overflow-y-auto py-4 space-y-6">
                    <div className="flex items-center justify-center space-x-4">
                        {[1, 2, 3].map((stepNum) => (
                            <div key={stepNum} className="flex items-center">
                                <div
                                    className={cn(
                                        `w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-200 text-gray-600 `,
                                        {
                                            'bg-blue-600 text-white':
                                                step >= stepNum,
                                        },
                                    )}
                                >
                                    {stepNum}
                                </div>
                                {stepNum < 3 && (
                                    <div
                                        className={`w-12 h-1 mx-2 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <div data-step="1" className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Select Service
                            </h3>
                            <div className="grid gap-3">
                                {centre?.services.length === 0 && (
                                    <p className="text-sm text-gray-500">
                                        No services available for booking.
                                    </p>
                                )}
                                {centre?.services.map((service) => (
                                    <Card
                                        onClick={() => {
                                            setBookingData({
                                                ...bookingData,
                                                serviceName:
                                                    service.serviceName,
                                                servicePrice: Number(
                                                    service.price,
                                                ),
                                            });
                                        }}
                                        key={service.id}
                                        className={`cursor-pointer transition-all ${bookingData.serviceName === service.serviceName ? 'ring-2 ring-blue-600 bg-blue-50' : 'hover:shadow-md'}`}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-medium capitalize">
                                                        {service.serviceName}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        {service.serviceType}
                                                    </p>
                                                </div>
                                                <p className="font-semibold text-green-600">
                                                    ₦
                                                    {Number(
                                                        service.price,
                                                    )?.toLocaleString()}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div data-step="2" className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Select Date & Time
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <DatePicker
                                        date={date}
                                        setDate={(newDate) => {
                                            setDate(newDate);
                                            setBookingData({
                                                ...bookingData,
                                                date: format(
                                                    newDate!,
                                                    'yyyy-MM-dd',
                                                ),
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
                                        value={bookingData.time}
                                        onValueChange={(value) => {
                                            setBookingData({
                                                ...bookingData,
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
                        </div>
                    )}

                    {step === 3 && (
                        <div data-step="3" className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Your Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        name="guestFirstName"
                                        type="text"
                                        onChange={(e) => {
                                            setBookingData({
                                                ...bookingData,
                                                guestFirstName: e.target.value,
                                            });
                                        }}
                                        placeholder="First Name"
                                        value={bookingData.guestFirstName}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        name="guestLastName"
                                        type="text"
                                        onChange={(e) => {
                                            setBookingData({
                                                ...bookingData,
                                                guestLastName: e.target.value,
                                            });
                                        }}
                                        placeholder="Last Name"
                                        value={bookingData.guestLastName}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    name="guestEmail"
                                    type="email"
                                    onChange={(e) => {
                                        setBookingData({
                                            ...bookingData,
                                            guestEmail: e.target.value,
                                        });
                                    }}
                                    placeholder="Email Address"
                                    value={bookingData.guestEmail}
                                    className="pl-10"
                                />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    name="guestPhone"
                                    type="tel"
                                    value={bookingData.guestPhone}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        setBookingData({
                                            ...bookingData,
                                            guestPhone: e.target.value,
                                        });
                                    }}
                                    onBlur={() => {
                                        const formattedPhone =
                                            formatPhone(phoneNumber);
                                        setBookingData({
                                            ...bookingData,
                                            guestPhone: formattedPhone,
                                        });
                                    }}
                                    placeholder="Phone Number"
                                    className="pl-10"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        onValueChange={(value) => {
                                            setState(value);
                                            setBookingData({
                                                ...bookingData,
                                                guestState: value,
                                            });
                                        }}
                                        disabled={pendingStates}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="State" />
                                        </SelectTrigger>
                                        <SelectContent className="z-[20001]">
                                            {statesData?.data.map((state) => (
                                                <SelectItem
                                                    key={state}
                                                    value={state}
                                                >
                                                    {state}
                                                </SelectItem>
                                            ))}
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
                                        onValueChange={(value) =>
                                            setBookingData({
                                                ...bookingData,
                                                guestLGA: value,
                                            })
                                        }
                                        disabled={pendingLGA || !state}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select LGA" />
                                        </SelectTrigger>
                                        <SelectContent className="z-[20001]">
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
                            </div>

                            {/* Gender and Age Range */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Age Range
                                    </label>
                                    <Select
                                        onValueChange={(value) =>
                                            setBookingData({
                                                ...bookingData,
                                                guestAgeRange: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Age Range" />
                                        </SelectTrigger>
                                        <SelectContent className="z-[20001]">
                                            {ageRanges.map((range) => (
                                                <SelectItem
                                                    key={range.value}
                                                    value={range.value}
                                                >
                                                    {range.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <Select
                                        onValueChange={(value) =>
                                            setBookingData({
                                                ...bookingData,
                                                guestGender: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent className="z-[20001]">
                                            {genderOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Card className="bg-gray-50">
                                <CardContent className="p-4">
                                    <h4 className="font-medium mb-3">
                                        Booking Summary
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Service:</span>
                                            <span>
                                                {bookingData.serviceName}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Date:</span>
                                            <span>{bookingData.date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Time:</span>
                                            <span>{bookingData.time}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold">
                                            <span>Total:</span>
                                            <span className="text-green-600">
                                                ₦
                                                {bookingData.servicePrice?.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {step === 4 && (
                        <div data-step="4" className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <div className="w-8 h-8 text-green-600">✓</div>
                            </div>
                            <h3 className="text-xl font-semibold text-green-600">
                                Booking Confirmed!
                            </h3>
                            <p className="text-gray-600">
                                Your appointment has been booked successfully.
                            </p>
                        </div>
                    )}
                </div>

                {/* Static Footer with Dynamic Buttons */}
                <DialogFooter className=" px-6 py-4">
                    {step === 1 && (
                        <Button
                            onClick={handleNext}
                            disabled={!bookingData.serviceName}
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
                                onClick={handleNext}
                                disabled={
                                    !bookingData.date || !bookingData.time
                                }
                                className="flex-1"
                            >
                                Continue
                            </Button>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setStep(2)}
                            >
                                Back
                            </Button>
                            <Button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    createBooking(bookingData);
                                }}
                                disabled={
                                    !bookingData.guestFirstName ||
                                    !bookingData.guestLastName ||
                                    !bookingData.guestEmail ||
                                    !bookingData.guestPhone ||
                                    !bookingData.guestAgeRange ||
                                    !bookingData.guestGender ||
                                    !bookingData.guestState ||
                                    !bookingData.guestLGA ||
                                    !bookingData.serviceName ||
                                    !bookingData.date ||
                                    !bookingData.time ||
                                    isCreatingBooking
                                }
                                className="flex-1"
                            >
                                {isCreatingBooking
                                    ? 'Booking...'
                                    : 'Confirm Booking'}
                            </Button>
                        </div>
                    )}
                    {step === 4 && (
                        <Button
                            onClick={() => setIsOpen(false)}
                            className="w-full"
                        >
                            Done
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
