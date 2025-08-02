'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateServiceType } from '@/queries/service-types';
import { ServiceType, serviceTypeSchema } from '@/schemas/service-types';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function CreateServiceTypeForm({
    setIsOpen,
}: {
    setIsOpen: (isOpen: boolean) => void;
}) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const form = useForm<ServiceType>({
        resolver: zodResolver(serviceTypeSchema),
        mode: 'all',
    });

    const { mutate: createServiceType, isPending: pendingCreate } =
        useCreateServiceType(formRef, setIsOpen);

    const handleSubmit = (data: ServiceType) => {
        createServiceType(data);
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Service Type Name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    className="resize-none"
                                    {...field}
                                    placeholder="Description"
                                    rows={3}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={pendingCreate}>
                    {pendingCreate ? 'Creating...' : 'Create Service Type'}
                </Button>
            </form>
        </Form>
    );
}
