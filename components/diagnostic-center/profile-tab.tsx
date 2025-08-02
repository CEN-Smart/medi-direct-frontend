'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { useBatchUpdateUser } from '@/queries/authentication';
import { PersonalInfo, personalInfoSchema } from '@/schemas/batch-update';
import { ErrorResponse } from '@/types';
import { UserDetailsResponse } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';

import { ChangePasswordModal } from '../change-password-modal';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type Props = {
    user: UserDetailsResponse | undefined;
    isError: boolean;
    isPending: boolean;
    error: ErrorResponse | null;
};

export function UserProfileTab({ user, isError, isPending, error }: Props) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const form = useForm<PersonalInfo>({
        resolver: zodResolver(personalInfoSchema),
        mode: 'all',
        defaultValues: {
            phone: user?.data.user.phone || '',
        },
    });

    const { mutate: batchUpdate, isPending: pendingBatchUpdate } =
        useBatchUpdateUser(formRef);

    const onSubmit = (data: PersonalInfo) => {
        batchUpdate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef}>
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        {isError && error && (
                            <div className="text-red-500">{error.message}</div>
                        )}
                        <CardContent className="space-y-4">
                            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 font-medium text-sm">
                                        First Name
                                    </label>
                                    <Input
                                        className={cn(``, {
                                            'animate-pulse bg-gray-100 cursor-not-allowed':
                                                isPending,
                                        })}
                                        value={
                                            user?.data.user.firstName.toUpperCase() ||
                                            ''
                                        }
                                        readOnly
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-sm">
                                        Last Name
                                    </label>
                                    <Input
                                        className={cn(``, {
                                            'animate-pulse bg-gray-100 cursor-not-allowed':
                                                isPending,
                                        })}
                                        value={
                                            user?.data.user.lastName.toUpperCase() ||
                                            ''
                                        }
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 font-medium text-sm">
                                        Email
                                    </label>
                                    <Input
                                        value={user?.data.user.email || ''}
                                        type="email"
                                        disabled
                                        readOnly
                                        className={cn(``, {
                                            'animate-pulse bg-gray-100 cursor-not-allowed':
                                                isPending,
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-sm">
                                        Phone
                                    </label>
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            type="tel"
                                                            className={cn(``, {
                                                                'animate-pulse bg-gray-100 cursor-not-allowed':
                                                                    isPending,
                                                            })}
                                                            placeholder={
                                                                user?.data.user
                                                                    .phone || ''
                                                            }
                                                        />
                                                        <FormMessage />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isPending || pendingBatchUpdate}
                            >
                                {pendingBatchUpdate
                                    ? 'Updating...'
                                    : 'Update Profile'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ChangePasswordModal>
                                <Button type="button" variant="outline">
                                    Change Password
                                </Button>
                            </ChangePasswordModal>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    );
}
