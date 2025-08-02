'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
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
import { useCancelBooking } from '@/queries/diagnostic-center/center';
import { useCancelBookingStore } from '@/stores/guest-booking';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { AlertTriangle, XCircle } from 'lucide-react';

interface CancelModalProps {
    booking: DiagnosticCenterResponse['data']['centres'][number]['bookings'][number] & {
        centreName: string;
    };
    children?: React.ReactNode;
}

const cancellationReasons = [
    'No longer need the test',
    'Found a better price elsewhere',
    'Scheduling conflict',
    'Health condition improved',
    'Financial constraints',
    'Dissatisfied with service',
    'Emergency situation',
    'Other',
];

export function CancelModal({ booking, children }: CancelModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [customReason, setCustomReason] = useState('');
    const { cancelData, setCancelData, clearCancelData } =
        useCancelBookingStore();

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setCustomReason('');
            clearCancelData();
        }
    }, [isOpen, clearCancelData]);

    const { mutate: cancelBooking, isPending: pendingCancelBooking } =
        useCancelBooking(booking.id, setIsOpen);

    const handleNext = () => {
        if (step < 2) {
            setStep(step + 1);
            // Animate step transition
            setTimeout(() => {
                const nextStepElement = document.querySelector(
                    `[data-cancel-step="${step + 1}"]`,
                );
                if (nextStepElement) {
                    animations.pageEnter(nextStepElement);
                }
            }, 100);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="sm">
                        Cancel Appointment
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl cancel-modal-content px-0">
                <DialogHeader className="px-6 ">
                    <DialogTitle className="flex items-center gap-2 capitalize">
                        <XCircle className="w-5 h-5 text-red-600" />
                        Cancel Appointment - {booking.centreName}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 max-h-[70svh] overflow-y-auto px-6">
                    {/* Progress Indicator */}
                    <div className="flex justify-center items-center space-x-4">
                        {[1, 2].map((stepNum) => (
                            <div key={stepNum} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                                        step >= stepNum
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    {stepNum}
                                </div>
                                {stepNum < 2 && (
                                    <div
                                        className={`w-12 h-1 mx-2 transition-all duration-300 ${
                                            step > stepNum
                                                ? 'bg-red-600'
                                                : 'bg-gray-200'
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Appointment Info */}
                    <Card className="bg-red-50 border-red-200">
                        <CardContent className="p-4">
                            <h3 className="mb-2 font-semibold text-red-900">
                                Appointment to Cancel
                            </h3>
                            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm capitalize">
                                <div>
                                    <p className="text-red-700">
                                        <strong>Centre:</strong>{' '}
                                        {booking.centreName}
                                    </p>
                                    <p className="text-red-700">
                                        <strong>Test:</strong>{' '}
                                        {booking.serviceName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-red-700">
                                        <strong>Date:</strong> {booking.date}
                                    </p>
                                    <p className="text-red-700">
                                        <strong>Time:</strong> {booking.time}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 1: Reason & Refund Info */}
                    {step === 1 && (
                        <div data-cancel-step="1" className="space-y-4">
                            <div>
                                <h3 className="mb-4 font-semibold text-lg">
                                    Why are you cancelling?
                                </h3>
                                <Select
                                    value={
                                        cancelData.cancellationReason ||
                                        customReason
                                    }
                                    onValueChange={(value) => {
                                        if (value === 'Other') {
                                            setCustomReason('Other');
                                            setCancelData({
                                                ...cancelData,
                                                cancellationReason: '',
                                            });
                                        } else {
                                            setCustomReason(value);
                                            setCancelData({
                                                ...cancelData,
                                                cancellationReason: value,
                                            });
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a reason" />
                                    </SelectTrigger>
                                    <SelectContent className="z-[20000]">
                                        {cancellationReasons.map((reason) => (
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
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium text-sm">
                                        Please specify
                                    </label>
                                    <Textarea
                                        className="resize-none"
                                        placeholder="Please provide details..."
                                        value={
                                            cancelData.cancellationReason
                                                ? cancelData.cancellationReason
                                                : ''
                                        }
                                        onChange={(e) =>
                                            setCancelData({
                                                ...cancelData,
                                                cancellationReason:
                                                    e.target.value,
                                            })
                                        }
                                        rows={3}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Confirmation & Feedback */}
                    {step === 2 && (
                        <div data-cancel-step="2" className="space-y-4">
                            <h3 className="font-semibold text-lg">
                                Confirm Cancellation
                            </h3>

                            <div>
                                <label className="block mb-2 font-medium text-sm">
                                    Additional feedback (optional)
                                </label>
                                <Textarea
                                    className="resize-none"
                                    placeholder="Help us improve our service..."
                                    value={cancelData.additionalFeedback}
                                    onChange={(e) =>
                                        setCancelData({
                                            ...cancelData,
                                            additionalFeedback: e.target.value,
                                        })
                                    }
                                    rows={3}
                                />
                            </div>

                            {/* Final Summary */}
                            <Card className="bg-gray-50">
                                <CardContent className="p-4">
                                    <h4 className="mb-3 font-medium">
                                        Cancellation Summary
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                Appointment:
                                            </span>
                                            <span>
                                                {booking.date} at {booking.time}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                Reason:
                                            </span>
                                            <span>
                                                {customReason === 'Other'
                                                    ? cancelData.cancellationReason
                                                    : 'No reason provided'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                Service Price:
                                            </span>
                                            <span>
                                                ₦
                                                {Number(
                                                    booking.servicePrice,
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Warning */}
                            <div className="bg-red-50 p-4 border border-red-200 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="mt-0.5 w-4 h-4 text-red-600" />
                                    <div className="text-red-800 text-sm">
                                        <p className="mb-1 font-medium">
                                            Important:
                                        </p>
                                        <p>
                                            We are sad to see you go. Please
                                            note that cancelling this
                                            appointment may result in a loss of
                                            any deposits paid.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Confirmation Checkbox */}
                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    className=" ring-1 ring-red-300 accent-red-500"
                                    id="confirm-cancel"
                                    checked={cancelData.agreedToTerms}
                                    onCheckedChange={(checked) =>
                                        setCancelData({
                                            ...cancelData,
                                            agreedToTerms: checked as boolean,
                                        })
                                    }
                                />
                                <label
                                    htmlFor="confirm-cancel"
                                    className="text-gray-700 text-sm"
                                >
                                    I understand that this appointment will be
                                    cancelled and I agree to the terms and
                                    conditions.
                                </label>
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter className="px-6">
                    {step === 1 && (
                        <Button
                            onClick={handleNext}
                            disabled={
                                !cancelData.cancellationReason ||
                                pendingCancelBooking
                            }
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    cancelBooking(cancelData);
                                }}
                                disabled={
                                    !cancelData.cancellationReason ||
                                    !cancelData.agreedToTerms ||
                                    pendingCancelBooking
                                }
                                variant="destructive"
                                className="flex-1"
                            >
                                {pendingCancelBooking
                                    ? 'Cancelling...'
                                    : 'Confirm Cancellation'}
                            </Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
