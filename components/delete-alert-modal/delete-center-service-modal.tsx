'use client';

import { useState } from 'react';

import { useDeleteCenterService } from '@/queries/diagnostic-center/center';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { Trash2 } from 'lucide-react';

import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';

type Props = {
    children?: React.ReactNode;
    service: DiagnosticCenterResponse['data']['centres'][number]['services'][number];
};

export function DeleteCenterServiceModal({ children, service }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: deleteService, isPending: isDeleting } =
        useDeleteCenterService(service.id, setIsOpen);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="sr-only">
                        {service.serviceName}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {service.description}
                    </DialogDescription>
                    <h2 className="text-lg font-semibold text-gray-900 capitalize">
                        {service.serviceName}
                    </h2>
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete this service? This
                        action cannot be undone.
                    </p>
                </DialogHeader>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteService();
                        }}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
