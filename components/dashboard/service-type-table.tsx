import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useAllServiceTypes } from '@/queries/service-types';
import { Edit, Plus } from 'lucide-react';

import { TableSkeleton } from '../skeletons/table-skeleton';
import { NoTableData } from '../table/no-table-data';
import { Button } from '../ui/button';
import { CreateServiceTypeModal } from './create-service-type-modal';
import { EditServiceTypeModal } from './edit-service-type-modal';

export function ServiceTypeTable() {
    const {
        data: serviceTypes,
        isPending: pendingServices,
        isError: isServiceError,
        error: errorService,
    } = useAllServiceTypes();

    return (
        <div>
            {/*  */}
            <div className="flex items-center justify-end py-4">
                <CreateServiceTypeModal>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                    >
                        <Plus className="mr-2" />
                        Add Service Type
                    </Button>
                </CreateServiceTypeModal>
            </div>
            <Table>
                <TableHeader className="bg-gray-100 font-bold">
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                {isServiceError && errorService && (
                    <NoTableData
                        colSpan={3}
                        message={`Error fetching service types: ${errorService.message}`}
                    />
                )}
                {pendingServices && <TableSkeleton />}
                {!pendingServices &&
                    !isServiceError &&
                    serviceTypes.data.serviceTypes.length === 0 && (
                        <NoTableData
                            message="No service types found"
                            colSpan={3}
                        />
                    )}
                <TableBody>
                    {serviceTypes &&
                        serviceTypes.data.serviceTypes
                            .toSorted(
                                (a, b) =>
                                    new Date(b.updatedAt).getTime() -
                                    new Date(a.updatedAt).getTime(),
                            )
                            .map((serviceType) => (
                                <TableRow key={serviceType.id}>
                                    <TableCell className=" whitespace-nowrap">
                                        {serviceType.name}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {serviceType.description ||
                                            'No description available'}
                                    </TableCell>
                                    <TableCell className="text-right flex items-center justify-end ml-auto">
                                        <EditServiceTypeModal
                                            serviceType={serviceType}
                                        >
                                            <button className="text-blue-500 hover:text-blue-700">
                                                <Edit className="inline" />
                                            </button>
                                        </EditServiceTypeModal>
                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table>
        </div>
    );
}
