import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { Skeleton } from '../ui/skeleton';

type Props = {
    icon: React.ReactNode;
    iconClassName?: string;
    title: string;
    total?: number;
    isPending?: boolean;
    isError?: boolean;
    errorMessage?: string;
};

export const AdminDashboardDetailCard = ({
    icon,
    title,
    total,
    iconClassName,
    isPending,
    isError,
    errorMessage,
}: Props) => {
    if (isPending) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                        <Skeleton className="w-8 h-8" />
                    </div>
                </CardContent>
            </Card>
        );
    }
    if (isError) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-red-500">{errorMessage}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium text-gray-600 text-sm">
                            {title}
                        </p>
                        <p className="font-bold text-gray-900 text-3xl">
                            {total}
                        </p>
                    </div>
                    <span className={cn(`w-8 h-8`, iconClassName)}>{icon}</span>
                </div>
            </CardContent>
        </Card>
    );
};
