import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function SearchedCenterCardSkeleton() {
    return (
        <div className="flex flex-col gap-4 w-full">
            {Array.from({ length: 3 }).map((_, index) => (
                <Card
                    key={index}
                    className="transition-shadow p-0 overflow-hidden"
                >
                    <CardContent className="p-0">
                        <div className="flex max-md:flex-col gap-6">
                            <Skeleton className="min-h-64 w-full" />
                            <div className="px-5 py-4 space-y-4">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <div className="flex items-center justify-between pt-4">
                                    <Skeleton className="h-6 w-1/3" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-24" />
                                        <Skeleton className="h-8 w-24" />
                                        <Skeleton className="h-8 w-24" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
