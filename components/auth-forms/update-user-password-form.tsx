'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateUserPassword } from '@/queries/authentication';
import { UpdatePassword, updatePasswordSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../ui/form';
import { ToggleInputPassword } from '../ui/toggle-input-password';

export function UpdateUserPasswordForm({
    setIsOpen,
}: {
    setIsOpen: (isOpen: boolean) => void;
}) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const form = useForm<UpdatePassword>({
        resolver: zodResolver(updatePasswordSchema),
    });

    const { mutate: updatePassword, isPending: pendingUpdate } =
        useUpdateUserPassword(formRef, setIsOpen);

    const handleSubmit = (data: UpdatePassword) => {
        updatePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        });
    };

    return (
        <Form {...form}>
            <form
                className="space-y-6"
                onSubmit={form.handleSubmit(handleSubmit)}
                ref={formRef}
            >
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ToggleInputPassword
                                    {...field}
                                    placeholder="Current Password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ToggleInputPassword
                                    {...field}
                                    placeholder="New Password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ToggleInputPassword
                                    {...field}
                                    placeholder="Confirm Password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <button
                    disabled={pendingUpdate}
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    {pendingUpdate ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </Form>
    );
}
