'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useSendTestResult } from '@/queries/diagnostic-center/center';
import { UseCase, useFileUpload } from '@/services/file-upload';
import { useTestResultStore } from '@/stores/guest-booking';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { Camera, Upload } from 'lucide-react';

import { Input } from './ui/input';

interface SendTestResultModalProps {
    booking:
        | (DiagnosticCenterResponse['data']['centres'][number]['bookings'][number] & {
              centreName: string;
          })
        | undefined;
    children?: React.ReactNode;
}

export function SendTestResultModal({
    booking,
    children,
}: Readonly<SendTestResultModalProps>) {
    const [isOpen, setIsOpen] = useState(false);
    const { resultImageUrl, clearAll } = useTestResultStore();
    const [useCase, setUseCase] = useState<UseCase>(null);
    const [file, setFile] = useState<File | File[] | null>(null);
    const { mutate: uploadFile, isPending: pendingFileUpload } = useFileUpload(
        file,
        useCase,
    );

    const { mutate: completeBooking, isPending: pendingComplete } =
        useSendTestResult(booking?.id, setIsOpen);

    useEffect(() => {
        if (isOpen) {
            setFile(null);
            setUseCase(null);
            clearAll();
        }
    }, [isOpen, clearAll]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button
                        disabled={booking?.isResultSent}
                        variant="outline"
                        size="sm"
                    >
                        <span>
                            {booking?.isResultSent
                                ? 'Result Sent'
                                : 'Send Test Result'}
                        </span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Send Test Result</DialogTitle>
                    <DialogDescription>
                        Please review the details below and confirm that you
                        want to send the test result for this booking.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 overflow-auto">
                    <div className="grid grid-cols-1">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm font-medium">Test Result</p>
                            <p className="text-xs text-gray-500">
                                Upload patient test result here.
                            </p>
                            <Button
                                disabled={pendingFileUpload}
                                asChild
                                variant="outline"
                                size="sm"
                                className="mt-2 bg-transparent"
                            >
                                <label
                                    htmlFor="Result"
                                    className={cn(``, {
                                        'cursor-not-allowed': pendingFileUpload,
                                    })}
                                >
                                    {pendingFileUpload ? (
                                        <span className="flex items-center gap-2">
                                            <Upload className="w-4 h-4 animate-spin" />
                                            Uploading...
                                        </span>
                                    ) : (
                                        'Choose File'
                                    )}
                                    <Input
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null;
                                            setFile(file);
                                            uploadFile(file);
                                            setUseCase('Test Result');
                                        }}
                                        id="Result"
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        className="hidden"
                                    />
                                </label>
                            </Button>
                        </div>
                    </div>

                    {/* Render Image */}
                    {resultImageUrl && (
                        <div className="mt-4">
                            <picture>
                                <img
                                    src={resultImageUrl}
                                    alt="Test Result"
                                    className="max-w-full h-auto"
                                />
                            </picture>
                        </div>
                    )}
                </div>

                <DialogFooter className="pt-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="mr-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            if (booking?.id !== undefined) {
                                completeBooking({
                                    resultImageUrl: resultImageUrl,
                                });
                            }
                        }}
                        disabled={pendingComplete}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {pendingComplete ? 'Completing...' : 'Complete Booking'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
