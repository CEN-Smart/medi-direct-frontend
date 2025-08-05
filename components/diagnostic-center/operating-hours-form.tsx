import { useState } from 'react';

import { useFormat } from '@/hooks/use-format';
import { useCreateDiagnosticCenterStore } from '@/stores/diagnostic-center';

import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface OperatingHour {
    day: string;
    from: string;
    to: string;
    open: boolean;
}

export function OperatingHoursForm() {
    const { formatTitleCase } = useFormat();
    const { centerData, setCenterData } = useCreateDiagnosticCenterStore();
    const [operatingHours, setOperatingHours] = useState(
        centerData.operatingHours || [],
    );

    const handleAddHour = () => {
        setOperatingHours([
            ...operatingHours,
            { day: '', from: '', to: '', open: true },
        ]);
    };

    const handleRemoveHour = (index: number) => {
        setOperatingHours(operatingHours.filter((_, i) => i !== index));
    };

    type OperatingHourField = keyof OperatingHour;

    const handleChangeHour = (
        index: number,
        field: OperatingHourField,
        value: string | boolean,
    ) => {
        const newHours: OperatingHour[] = [...operatingHours];
        newHours[index][field] = value as never;
        setOperatingHours(newHours);
        setCenterData({ ...centerData, operatingHours: newHours });
    };

    return (
        <div className="overflow-x-auto p-2">
            <h3 className="text-lg font-semibold mb-4">Operating Hours</h3>
            {operatingHours.map((hour, index) => (
                <div key={index} className="flex gap-4 mb-2 items-center">
                    <div className="space-y-1 shrink-0">
                        <Label htmlFor={`day-${index}`}>Day</Label>
                        <Input
                            id={`day-${index}`}
                            type="text"
                            placeholder="Day e.g. Monday"
                            value={hour.day}
                            onChange={(e) => {
                                e.preventDefault();
                                handleChangeHour(
                                    index,
                                    'day',
                                    formatTitleCase(e.target.value),
                                );
                            }}
                            className="border p-2 rounded w-full shrink-0"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={`from-${index}`}>From</Label>
                        <Input
                            id={`from-${index}`}
                            type="time"
                            value={hour.from}
                            onChange={(e) => {
                                e.preventDefault();
                                handleChangeHour(index, 'from', e.target.value);
                            }}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={`to-${index}`}>To</Label>
                        <Input
                            type="time"
                            value={hour.to}
                            onChange={(e) => {
                                e.preventDefault();
                                handleChangeHour(index, 'to', e.target.value);
                            }}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mt-4">
                        <Checkbox
                            id={`open-${index}`}
                            className="w-full h-full"
                            checked={hour.open}
                            onCheckedChange={(checked) =>
                                handleChangeHour(index, 'open', checked)
                            }
                        />
                    </div>
                </div>
            ))}
            <div>
                <button
                    onClick={handleAddHour}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                    Add Hour
                </button>
                {operatingHours.length > 0 && (
                    <button
                        onClick={() =>
                            handleRemoveHour(operatingHours.length - 1)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2 mt-2"
                    >
                        Remove Last Hour
                    </button>
                )}
            </div>
        </div>
    );
}
