'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
    label: string;
    pickerLabel?: string;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    className?: string;
    labelClassName?: string;
    triggerClassName?: string;
};
export function DatePicker({
    label,
    pickerLabel,
    className,
    date,
    setDate,
    labelClassName,
    triggerClassName,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className={cn(`flex flex-col gap-3`, className)}>
            <Label htmlFor="date" className={cn('px-1', labelClassName)}>
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="w-full">
                    <Button
                        variant="outline"
                        id="date"
                        className={cn(
                            `justify-between w-full font-normal`,
                            triggerClassName,
                        )}
                    >
                        {date
                            ? date.toLocaleDateString()
                            : pickerLabel || 'Select Date'}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0 w-auto overflow-hidden z-[20001]"
                    align="start"
                >
                    <Calendar
                        classNames={{
                            today: 'bg-blue-500 text-white',
                        }}
                        showOutsideDays={false}
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            if (
                                date &&
                                date.getTime() < new Date().setHours(0, 0, 0, 0)
                            ) {
                                toast.error('Cannot select a past date');
                                return;
                            }
                            setDate(date);
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
