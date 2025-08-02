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
import { Hospital } from 'lucide-react';

import { CreateServiceTypeForm } from './create-service-type-form';

interface ServiceTypeModalProps {
    children?: React.ReactNode;
}

export function CreateServiceTypeModal({ children }: ServiceTypeModalProps) {
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
                        Create Service Type
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Create Service Type Modal
                </DialogDescription>

                <CreateServiceTypeForm setIsOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    );
}
