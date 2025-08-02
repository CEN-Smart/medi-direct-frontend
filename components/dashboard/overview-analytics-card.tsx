import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
    title: string;
    detail: string;
    icon?: React.ReactNode;
    iconClassName?: string;
};
export function OverviewAnalyticsCard({
    title,
    detail,
    icon,
    iconClassName,
}: Props) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">
                            {title}
                        </p>
                        <p className="text-2xl font-bold">{detail}</p>
                    </div>
                    {icon && (
                        <div className={cn(``, iconClassName)}>{icon}</div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
