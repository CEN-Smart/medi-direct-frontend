'use client';

import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { resultDeliveryTimes } from '@/docs';
import { cn } from '@/lib/utils';
import {
    useService,
    useUpdateCenterService,
} from '@/queries/diagnostic-center/center';
import { useAllServiceTypes } from '@/queries/service-types';
import { useCreateCenterServiceStore } from '@/stores/diagnostic-center';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { Clock, FileText, Plus } from 'lucide-react';

import { Switch } from './ui/switch';

interface EditServiceModalProps {
    service: DiagnosticCenterResponse['data']['centres'][number]['services'][number];
    centerId: number;
    children?: React.ReactNode;
    serviceId?: number;
}

export function EditServiceModal({
    service,
    centerId,
    serviceId,
    children,
}: EditServiceModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [newCenterId, setNewCenterId] = useState(centerId);

    const {
        data: serviceTypes,
        isPending: pendingServices,
        isError: isServiceError,
        error: errorService,
    } = useAllServiceTypes();

    const {
        data: serviceDetails,
        isPending: pendingService,
        isError: isCenterServiceError,
        error: errorCenterService,
    } = useService(newCenterId, serviceId ? serviceId : undefined);

    const { serviceData, setServiceData, clearServiceData } =
        useCreateCenterServiceStore();

    console.log('Service Data:', serviceData);

    useEffect(() => {
        if (isOpen) {
            setNewCenterId(centerId);
            clearServiceData();
            if (serviceDetails?.data?.service) {
                setServiceData({
                    serviceName: serviceDetails?.data?.service.serviceName,
                    serviceType: serviceDetails?.data?.service.serviceType,
                    description: serviceDetails?.data?.service.description,
                    price: Number(serviceDetails?.data?.service.price),
                    isAvailable: serviceDetails?.data?.service.isAvailable,
                    discountPrice: Number(
                        serviceDetails?.data?.service.discountPrice,
                    ),
                    timeDuration: serviceDetails?.data?.service.timeDuration,
                    resultDeliveryTime:
                        serviceDetails?.data?.service.resultDeliveryTime,
                    instructions: serviceDetails?.data?.service.instructions,
                });
            }
        }
    }, [
        isOpen,
        clearServiceData,
        centerId,
        serviceDetails?.data?.service,
        setServiceData,
    ]);

    const { mutate: updateService, isPending: pendingUpdateService } =
        useUpdateCenterService(serviceId ? serviceId : undefined, setIsOpen);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" onClick={() => setIsOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Update Service
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl px-0">
                <DialogHeader className="px-6">
                    <DialogTitle className="flex items-center gap-2 capitalize md:text-lg text-sm font-semibold">
                        <Plus className="w-5 h-5 text-green-600" />
                        Update Service ({service.serviceName})
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Update the details of the service offered by this diagnostic
                    center.
                </DialogDescription>
                {/* Pending */}
                {pendingService && (
                    <div className="flex items-center justify-center py-4">
                        <p className="text-gray-500">
                            Loading service details...
                        </p>
                    </div>
                )}

                {/* Error */}
                {isCenterServiceError && (
                    <div className="flex items-center justify-center py-4">
                        <p className="text-red-500">
                            {errorCenterService.message}
                        </p>
                    </div>
                )}

                <div className="space-y-6 px-6 max-h-[70svh] overflow-y-auto">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Basic Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="serviceName">
                                        Service Name *
                                    </Label>
                                    <Input
                                        id="serviceName"
                                        type="text"
                                        defaultValue={
                                            serviceDetails?.data?.service
                                                .serviceName ||
                                            serviceData.serviceName
                                        }
                                        onChange={(e) =>
                                            setServiceData({
                                                ...serviceData,
                                                serviceName:
                                                    e.target.value ||
                                                    serviceDetails?.data
                                                        ?.service.serviceName ||
                                                    '',
                                            })
                                        }
                                        placeholder="Enter service name"
                                    />
                                </div>

                                <div className="space-y-1 w-full">
                                    <Label htmlFor="category">Category *</Label>
                                    {isServiceError && (
                                        <p className="text-red-500 text-sm">
                                            {errorService.message}
                                        </p>
                                    )}
                                    <Select
                                        defaultValue={
                                            serviceDetails?.data?.service
                                                .serviceType
                                        }
                                        onValueChange={(value) =>
                                            setServiceData({
                                                ...serviceData,
                                                serviceType:
                                                    value ||
                                                    serviceDetails?.data
                                                        ?.service.serviceType ||
                                                    '',
                                            })
                                        }
                                    >
                                        <SelectTrigger
                                            className={cn(`w-full`, {
                                                'animate-pulse':
                                                    pendingServices,
                                            })}
                                        >
                                            <SelectValue placeholder="Select test type" />
                                        </SelectTrigger>
                                        <SelectContent className="z-[20000]">
                                            {serviceTypes?.data?.serviceTypes?.map(
                                                (test) => (
                                                    <SelectItem
                                                        key={test.id}
                                                        value={test.name}
                                                        className="whitespace-normal"
                                                    >
                                                        {test.name}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    className="resize-none"
                                    id="description"
                                    defaultValue={
                                        serviceDetails?.data?.service
                                            .description ||
                                        serviceData.description
                                    }
                                    onChange={(e) =>
                                        setServiceData({
                                            ...serviceData,
                                            description:
                                                e.target.value ||
                                                serviceDetails?.data?.service
                                                    .description ||
                                                '',
                                        })
                                    }
                                    placeholder="Brief description of the service"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pricing & Duration */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                ₦ Pricing &<Clock className="w-5 h-5" />
                                Duration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="price">Price (₦) *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        defaultValue={
                                            serviceDetails?.data?.service.price
                                        }
                                        onChange={(e) =>
                                            setServiceData({
                                                ...serviceData,
                                                price:
                                                    Number(e.target.value) ||
                                                    Number(
                                                        serviceDetails?.data
                                                            ?.service.price,
                                                    ),
                                            })
                                        }
                                        placeholder="10000"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="discountPrice">
                                        Discount Price (₦)
                                    </Label>
                                    <Input
                                        id="discountPrice"
                                        type="number"
                                        defaultValue={
                                            serviceDetails?.data?.service
                                                .discountPrice
                                        }
                                        onChange={(e) =>
                                            setServiceData({
                                                ...serviceData,
                                                discountPrice:
                                                    Number(e.target.value) ||
                                                    Number(
                                                        serviceDetails?.data
                                                            ?.service
                                                            .discountPrice,
                                                    ),
                                            })
                                        }
                                        placeholder="8000"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="duration">Duration *</Label>
                                    <Input
                                        id="duration"
                                        type="text"
                                        defaultValue={
                                            serviceDetails?.data?.service
                                                .timeDuration ||
                                            serviceData.timeDuration
                                        }
                                        onChange={(e) =>
                                            setServiceData({
                                                ...serviceData,
                                                timeDuration:
                                                    e.target.value ||
                                                    serviceDetails?.data
                                                        ?.service
                                                        .timeDuration ||
                                                    '',
                                            })
                                        }
                                        placeholder="30 minutes"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="resultDelivery">
                                        Result Delivery Time
                                    </Label>
                                    <Select
                                        defaultValue={
                                            serviceDetails?.data?.service
                                                .resultDeliveryTime
                                        }
                                        onValueChange={(value) =>
                                            setServiceData({
                                                ...serviceData,
                                                resultDeliveryTime:
                                                    value ||
                                                    serviceDetails?.data
                                                        ?.service
                                                        .resultDeliveryTime ||
                                                    '',
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select delivery time" />
                                        </SelectTrigger>
                                        <SelectContent className="z-[20000]">
                                            {resultDeliveryTimes.map((time) => (
                                                <SelectItem
                                                    key={time}
                                                    value={time}
                                                >
                                                    {time}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Service Options */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Service Options
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                Currently Available
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Service is active and bookable
                                            </p>
                                        </div>
                                        <Switch
                                            defaultChecked={
                                                serviceDetails?.data?.service
                                                    .isAvailable ||
                                                serviceData.isAvailable ||
                                                false
                                            }
                                            onCheckedChange={(checked) =>
                                                setServiceData({
                                                    ...serviceData,
                                                    isAvailable:
                                                        checked ||
                                                        serviceDetails?.data
                                                            ?.service
                                                            .isAvailable ||
                                                        false,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Instructions  */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Instructions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="preparationInstructions">
                                    Preparation Instructions
                                </Label>
                                <Textarea
                                    className="resize-none"
                                    id="preparationInstructions"
                                    defaultValue={
                                        serviceDetails?.data?.service
                                            .instructions ||
                                        serviceData.instructions
                                    }
                                    onChange={(e) =>
                                        setServiceData({
                                            ...serviceData,
                                            instructions:
                                                e.target.value ||
                                                serviceDetails?.data?.service
                                                    .instructions ||
                                                '',
                                        })
                                    }
                                    placeholder="Instructions for patients before the test"
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Service Preview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {serviceData.serviceName ||
                                                serviceDetails?.data?.service
                                                    .serviceName}
                                        </h3>
                                        {serviceData.serviceType ||
                                            (serviceDetails?.data?.service
                                                .serviceType && (
                                                <Badge variant="outline">
                                                    {serviceData.serviceType ||
                                                        serviceDetails?.data
                                                            ?.service
                                                            .serviceType}
                                                </Badge>
                                            ))}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-green-600">
                                            ₦
                                            {serviceData.price ||
                                            serviceDetails?.data?.service.price
                                                ? Number(
                                                      serviceData.price ||
                                                          serviceDetails?.data
                                                              ?.service.price,
                                                  ).toLocaleString()
                                                : '0'}
                                        </p>
                                        {serviceData.discountPrice ||
                                            (serviceDetails?.data?.service
                                                .discountPrice && (
                                                <p className="text-sm text-gray-500 line-through">
                                                    ₦
                                                    {Number(
                                                        serviceData.discountPrice ||
                                                            serviceDetails?.data
                                                                ?.service
                                                                .discountPrice,
                                                    ).toLocaleString()}
                                                </p>
                                            ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <span>
                                            {serviceData.timeDuration ||
                                                serviceDetails?.data?.service
                                                    .timeDuration}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={cn(
                                                `w-2 h-2 rounded-full bg-red-500`,
                                                {
                                                    'bg-green-500':
                                                        serviceData.isAvailable ||
                                                        serviceDetails?.data
                                                            ?.service
                                                            .isAvailable,
                                                },
                                            )}
                                        />
                                        <span>
                                            {serviceData.isAvailable ||
                                            serviceDetails?.data?.service
                                                .isAvailable
                                                ? 'Available'
                                                : 'Unavailable'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>🏠</span>
                                        <span>
                                            {serviceData.isAvailable ||
                                            serviceDetails?.data?.service
                                                .isAvailable
                                                ? 'In-Centre Only'
                                                : ''}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>⚡</span>
                                        <span>
                                            {serviceData.isAvailable ||
                                            serviceDetails?.data?.service
                                                .isAvailable
                                                ? 'Regular'
                                                : ''}
                                        </span>
                                    </div>
                                </div>

                                {serviceData.description ||
                                    (serviceDetails?.data?.service
                                        .description && (
                                        <p className="text-sm text-gray-600 mt-3">
                                            {serviceData.description ||
                                                serviceDetails?.data?.service
                                                    .description}
                                        </p>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6 border-t px-6">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            disabled={
                                pendingUpdateService ||
                                !serviceData.isAvailable ||
                                !serviceData.resultDeliveryTime ||
                                !serviceData.serviceType
                            }
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                updateService({
                                    description:
                                        serviceData.description ||
                                        serviceDetails?.data?.service
                                            .description ||
                                        '',
                                    discountPrice:
                                        Number(serviceData.discountPrice) ||
                                        Number(
                                            serviceDetails?.data?.service
                                                .discountPrice,
                                        ),
                                    instructions:
                                        serviceData.instructions ||
                                        serviceDetails?.data?.service
                                            .instructions ||
                                        '',
                                    isAvailable: serviceData.isAvailable,
                                    price:
                                        Number(serviceData.price) ||
                                        Number(
                                            serviceDetails?.data?.service.price,
                                        ),
                                    resultDeliveryTime:
                                        serviceData.resultDeliveryTime ||
                                        serviceDetails?.data?.service
                                            .resultDeliveryTime ||
                                        '',
                                    serviceType:
                                        serviceData.serviceType ||
                                        serviceDetails?.data?.service
                                            .serviceType ||
                                        '',
                                    serviceName:
                                        serviceData.serviceName ||
                                        serviceDetails?.data?.service
                                            .serviceName ||
                                        '',
                                    timeDuration:
                                        serviceData.timeDuration ||
                                        serviceDetails?.data?.service
                                            .timeDuration ||
                                        '',
                                });
                            }}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {pendingUpdateService
                                ? 'Updating...'
                                : 'Update Service'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
