'use client';

import { useState } from 'react';

import { AddServiceModal } from '@/components/add-service-modal';
import { EditServiceModal } from '@/components/edit-service-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { Clock, Edit, Hospital, Plus, Trash2 } from 'lucide-react';

import { DeleteCenterServiceModal } from './delete-alert-modal/delete-center-service-modal';
import { NoDataFound } from './ui/no-data-found';

interface ManageServicesModalProps {
    children?: React.ReactNode;
    centre: DiagnosticCenterResponse['data']['centres'][number];
    centerId: number;
}

export function ManageServicesModal({
    centre,
    children,
    centerId,
}: ManageServicesModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('current');
    const [serviceId, setServiceId] = useState<number | undefined>(undefined);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    {children || (
                        <Button onClick={() => setIsOpen(true)}>
                            Open Manage Services
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent className="sm:max-w-6xl px-0">
                    <DialogHeader className="px-6">
                        <DialogTitle className="flex items-center gap-2 capitalize">
                            <Edit className="w-5 h-5" />
                            Manage Services - {centre?.name}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="sr-only">
                        Manage the services offered by this diagnostic center.
                    </DialogDescription>

                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-6"
                    >
                        <TabsList className=" w-full px-6">
                            <TabsTrigger value="current">
                                Current Services ({centre?.services?.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="current" className="space-y-4 ">
                            <div className="flex justify-between items-center px-6">
                                <h3 className="font-semibold text-lg">
                                    Your Services
                                </h3>
                                <AddServiceModal center={centre}>
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        <Plus className="mr-2 w-4 h-4" />
                                        Add Custom Service
                                    </Button>
                                </AddServiceModal>
                            </div>

                            <div className="max-h-[50svh] overflow-y-auto px-6">
                                {centre?.services?.length === 0 ? (
                                    <NoDataFound message="No services available for this centre" />
                                ) : (
                                    <div className="gap-4 grid">
                                        {centre?.services
                                            ?.toSorted(
                                                (a, b) =>
                                                    new Date(
                                                        b.updatedAt,
                                                    ).getTime() -
                                                    new Date(
                                                        a.updatedAt,
                                                    ).getTime(),
                                            )
                                            .map((service) => (
                                                <Card key={service.id}>
                                                    <CardContent className="p-6">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <div className="flex-1 space-y-3">
                                                                <div className="flex items-center gap-2">
                                                                    <h4 className="font-semibold text-lg capitalize">
                                                                        {
                                                                            service.serviceName
                                                                        }
                                                                    </h4>
                                                                    <Badge variant="outline">
                                                                        {
                                                                            service.serviceType
                                                                        }
                                                                    </Badge>
                                                                    {!service.isAvailable && (
                                                                        <Badge variant="destructive">
                                                                            Unavailable
                                                                        </Badge>
                                                                    )}
                                                                </div>

                                                                <div className="gap-4 grid grid-cols-2 md:grid-cols-4 text-sm">
                                                                    <div className="flex items-center gap-2">
                                                                        <span>
                                                                            <span className="text-green-600 font-semibold">
                                                                                ₦
                                                                                {Number(
                                                                                    service.price,
                                                                                ).toLocaleString()}
                                                                            </span>
                                                                            {service.discountPrice && (
                                                                                <span className="ml-1 text-gray-500 line-through">
                                                                                    ₦
                                                                                    {Number(
                                                                                        service.discountPrice,
                                                                                    ).toLocaleString()}
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Clock className="w-4 h-4 text-blue-500" />
                                                                        <span>
                                                                            {
                                                                                service.timeDuration
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Hospital className="w-4 h-4 text-purple-500" />
                                                                        <span>
                                                                            {service.isAvailable
                                                                                ? 'Available'
                                                                                : 'Not Available'}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span
                                                                            className={cn(
                                                                                `w-2 h-2 rounded-full bg-red-500`,
                                                                                {
                                                                                    'bg-green-500':
                                                                                        service.isAvailable,
                                                                                },
                                                                            )}
                                                                        />
                                                                        <span>
                                                                            {service.isActive
                                                                                ? 'Active'
                                                                                : 'Inactive'}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {service.description && (
                                                                    <p className="text-gray-600 text-sm capitalize">
                                                                        {
                                                                            service.description
                                                                        }
                                                                    </p>
                                                                )}

                                                                {service.instructions && (
                                                                    <div className="text-sm">
                                                                        <span className="font-medium">
                                                                            Preparation:{' '}
                                                                        </span>
                                                                        <span className="text-gray-600">
                                                                            {
                                                                                service.instructions
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="flex flex-col gap-2">
                                                                <EditServiceModal
                                                                    serviceId={
                                                                        serviceId
                                                                    }
                                                                    centerId={
                                                                        centerId
                                                                    }
                                                                    service={
                                                                        service
                                                                    }
                                                                >
                                                                    <Button
                                                                        onClick={() => {
                                                                            setServiceId(
                                                                                service.id,
                                                                            );
                                                                        }}
                                                                        variant="outline"
                                                                        size="sm"
                                                                    >
                                                                        <Edit className="w-4 h-4" />
                                                                    </Button>
                                                                </EditServiceModal>
                                                                <DeleteCenterServiceModal
                                                                    service={
                                                                        service
                                                                    }
                                                                >
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </DeleteCenterServiceModal>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Action Buttons */}
                    <DialogFooter className="flex justify-between pt-6 border-t px-6">
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
