'use client';

import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { AllServiceTypesResponse } from '@/types/service-types';
import { Hospital } from 'lucide-react';

import { UpdateServiceTypeForm } from './update-service-type-form';

interface ServiceTypeModalProps {
    serviceType: AllServiceTypesResponse['data']['serviceTypes'][number];
    children?: React.ReactNode;
}

export function EditServiceTypeModal({
    children,
    serviceType,
}: ServiceTypeModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" onClick={() => setIsOpen(true)}>
                        Change Service Type
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Hospital className="w-5 h-5" />
                        Edit Service Type ({serviceType.name})
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Edit Service Type Modal
                </DialogDescription>

                <UpdateServiceTypeForm
                    serviceType={serviceType}
                    setIsOpen={setIsOpen}
                />
            </DialogContent>
        </Dialog>
    );
}
