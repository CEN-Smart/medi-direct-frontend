'use client';

import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
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
import { useCreateCenterService } from '@/queries/diagnostic-center/center';
import { useAllServiceTypes } from '@/queries/service-types';
import { useCreateCenterServiceStore } from '@/stores/diagnostic-center';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { Clock, FileText, Plus } from 'lucide-react';

import { Switch } from './ui/switch';

interface AddServiceModalProps {
    center: DiagnosticCenterResponse['data']['centres'][number];
    children?: React.ReactNode;
}

export function AddServiceModal({ center, children }: AddServiceModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const {
        data: serviceTypes,
        isPending: pendingServices,
        isError: isServiceError,
        error: errorService,
    } = useAllServiceTypes();

    const { serviceData, setServiceData, clearServiceData } =
        useCreateCenterServiceStore();

    useEffect(() => {
        if (isOpen) {
            clearServiceData();
        }
    }, [isOpen, clearServiceData]);

    const { mutate: createService, isPending: pendingCreateService } =
        useCreateCenterService(center.id, setIsOpen);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" onClick={() => setIsOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Service
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl px-0">
                <DialogHeader className="px-6">
                    <DialogTitle className="flex items-center gap-2 capitalize md:text-lg text-sm font-semibold">
                        <Plus className="w-5 h-5 text-green-600" />
                        Add New Service for {center.name}
                    </DialogTitle>
                </DialogHeader>

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
                                        value={serviceData.serviceName}
                                        onChange={(e) =>
                                            setServiceData({
                                                ...serviceData,
                                                serviceName: e.target.value,
                                            })
                                        }
                                        placeholder="e.g., Full Blood Count"
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
                                        value={serviceData.serviceType}
                                        onValueChange={(value) =>
                                            setServiceData({
                                                ...serviceData,
                                                serviceType: value,
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
                                    value={serviceData.description}
                                    onChange={(e) =>
                                        setServiceData({
                                            ...serviceData,
                                            description: e.target.value,
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
                                        value={serviceData.price || ''}
                                        onChange={(e) =>
                                            setServiceData({
                                                ...serviceData,
                                                price: Number(e.target.value),
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
                                        value={serviceData.discountPrice || ''}
                                        onChange={(e) =>
                                            setServiceData({
                                                ...serviceData,
                                                discountPrice: Number(
                                                    e.target.value,
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
                                        value={serviceData.timeDuration}
                                        onChange={(e) =>
                                            setServiceData({
                                                ...serviceData,
                                                timeDuration: e.target.value,
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
                                        value={serviceData.resultDeliveryTime}
                                        onValueChange={(value) =>
                                            setServiceData({
                                                ...serviceData,
                                                resultDeliveryTime: value,
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
                                            checked={serviceData.isAvailable}
                                            onCheckedChange={(checked) =>
                                                setServiceData({
                                                    ...serviceData,
                                                    isAvailable: checked,
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
                                    value={serviceData.instructions}
                                    onChange={(e) =>
                                        setServiceData({
                                            ...serviceData,
                                            instructions: e.target.value,
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
                                            {serviceData.serviceName}
                                        </h3>
                                        {serviceData.serviceType && (
                                            <Badge variant="outline">
                                                {serviceData.serviceType}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-green-600">
                                            ₦
                                            {serviceData.price
                                                ? Number(
                                                      serviceData.price,
                                                  ).toLocaleString()
                                                : '0'}
                                        </p>
                                        {serviceData.discountPrice && (
                                            <p className="text-sm text-gray-500 line-through">
                                                ₦
                                                {Number(
                                                    serviceData.discountPrice,
                                                ).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <span>
                                            {serviceData.timeDuration ||
                                                'Duration'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-2 h-2 rounded-full ${serviceData.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
                                        />
                                        <span>
                                            {serviceData.isAvailable
                                                ? 'Available'
                                                : 'Unavailable'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>🏠</span>
                                        <span>
                                            {serviceData.isAvailable &&
                                                'In-Centre Only'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>⚡</span>
                                        <span>
                                            {serviceData.isAvailable &&
                                                'Regular'}
                                        </span>
                                    </div>
                                </div>

                                {serviceData.description && (
                                    <p className="text-sm text-gray-600 mt-3">
                                        {serviceData.description}
                                    </p>
                                )}
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
                            variant="outline"
                            onClick={() => {
                                clearServiceData();
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            disabled={
                                pendingCreateService ||
                                !serviceData.serviceName ||
                                !serviceData.serviceType ||
                                !serviceData.price ||
                                !serviceData.timeDuration ||
                                !serviceData.resultDeliveryTime ||
                                !serviceData.description ||
                                !serviceData.instructions ||
                                !serviceData.isAvailable
                            }
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                createService(serviceData);
                            }}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {pendingCreateService
                                ? 'Creating...'
                                : 'Create Service'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
