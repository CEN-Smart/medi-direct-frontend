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
import { Lock } from 'lucide-react';

import { UpdateUserPasswordForm } from './auth-forms/update-user-password-form';

interface ChangePasswordModalProps {
    children?: React.ReactNode;
}

export function ChangePasswordModal({ children }: ChangePasswordModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" onClick={() => setIsOpen(true)}>
                        Change Password
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Change Password
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Change Password Modal
                </DialogDescription>

                <UpdateUserPasswordForm setIsOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    );
}
