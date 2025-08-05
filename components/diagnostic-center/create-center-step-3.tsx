import { Clock } from 'lucide-react';

import { OperatingHoursForm } from './operating-hours-form';

export function CreateCenterStep3() {
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <Clock className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">Operating Hours</h3>
                <p className="text-sm text-gray-600">
                    When is your centre open?
                </p>
            </div>

            <div className="space-y-4">
                <OperatingHoursForm />
            </div>
        </div>
    );
}
