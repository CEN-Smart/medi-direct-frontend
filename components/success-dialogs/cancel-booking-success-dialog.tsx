import { useCancelBookingStore } from '@/stores/guest-booking';
import { XCircle } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export function CancelBookingSuccessDialog() {
    const { isSuccess, setIsSuccess, cancelData, clearCancelData } =
        useCancelBookingStore();

    return (
        <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Booking Cancelled</DialogTitle>
                </DialogHeader>
                <div data-cancel-step="3" className="space-y-4 text-center">
                    <div className="flex justify-center items-center bg-red-100 mx-auto rounded-full w-16 h-16">
                        <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-red-600 text-xl">
                        Appointment Cancelled
                    </h3>
                    <p className="text-gray-600">
                        Your appointment has been cancelled successfully.
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm">
                            <p className="mb-2 font-medium">
                                Cancellation Details:
                            </p>
                            <div className="space-y-1 text-gray-600 ">
                                <p className="capitalize">
                                    <strong>Reason:</strong>{' '}
                                    {cancelData.cancellationReason ||
                                        'No reason provided'}
                                </p>
                                <p>
                                    <strong>Cancelled on:</strong>{' '}
                                    {new Date().toLocaleDateString()}
                                </p>

                                <div>
                                    <strong>Status:</strong>{' '}
                                    <Badge
                                        variant="destructive"
                                        className="text-white"
                                    >
                                        Cancelled
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Button
                            onClick={() => {
                                setIsSuccess(false);
                                clearCancelData();
                            }}
                            className="w-full"
                        >
                            Done
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
