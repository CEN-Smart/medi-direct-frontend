'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import {
    useServiceTypeById,
    useUpdateServiceType,
} from '@/queries/service-types';
import { ServiceType, serviceTypeSchema } from '@/schemas/service-types';
import { AllServiceTypesResponse } from '@/types/service-types';
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

type Props = {
    serviceType: AllServiceTypesResponse['data']['serviceTypes'][number];
    setIsOpen: (isOpen: boolean) => void;
};

export function UpdateServiceTypeForm({ serviceType, setIsOpen }: Props) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const form = useForm<ServiceType>({
        resolver: zodResolver(serviceTypeSchema),
        mode: 'all',
    });

    const { mutate: updateServiceType, isPending: pendingUpdate } =
        useUpdateServiceType(serviceType.id, formRef, setIsOpen);

    const {
        data: serviceTypeData,
        isPending: pendingServiceType,
        isError: isServiceTypeError,
        error: serviceTypeError,
    } = useServiceTypeById(serviceType.id);

    const handleSubmit = (data: ServiceType) => {
        updateServiceType(data);
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
                                    className={cn(``, {
                                        'animate-pulse': pendingServiceType,
                                    })}
                                    defaultValue={
                                        serviceTypeData?.data.serviceType.name
                                    }
                                    {...field}
                                    placeholder="Service Type Name"
                                />
                            </FormControl>
                            <FormMessage />
                            {isServiceTypeError && serviceTypeError && (
                                <p className="text-red-500 text-sm mt-2">
                                    {serviceTypeError.message}
                                </p>
                            )}
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
                                    className={cn(`resize-none`, {
                                        'animate-pulse': pendingServiceType,
                                    })}
                                    defaultValue={
                                        serviceTypeData?.data.serviceType
                                            .description
                                    }
                                    {...field}
                                    placeholder="Description"
                                    rows={3}
                                />
                            </FormControl>
                            <FormMessage />
                            {isServiceTypeError && serviceTypeError && (
                                <p className="text-red-500 text-sm mt-2">
                                    {serviceTypeError.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={pendingUpdate}>
                    {pendingUpdate ? 'Updating...' : 'Update Service Type'}
                </Button>
            </form>
        </Form>
    );
}
