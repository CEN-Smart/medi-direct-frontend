'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    useCreateDiagnosticCenter,
    useLocations,
} from '@/queries/diagnostic-center/center';
import { useCreateDiagnosticCenterStore } from '@/stores/diagnostic-center';
import { Building2 } from 'lucide-react';

import { CreateCenterStep1 } from './diagnostic-center/create-center-step-1';
import { CreateCenterStep2 } from './diagnostic-center/create-center-step-2';
import { CreateCenterStep3 } from './diagnostic-center/create-center-step-3';
import { CreateCenterStep4 } from './diagnostic-center/create-center-step-4';

interface CreateCentreModalProps {
    children?: React.ReactNode;
}

export function CreateCentreModal({ children }: CreateCentreModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const { clearCenterData, centerData, setState } =
        useCreateDiagnosticCenterStore();

    const isInvalidInputs =
        (currentStep === 1 &&
            (!centerData.name ||
                !centerData.description ||
                !centerData.email ||
                !centerData.phone ||
                !centerData.establishedYear ||
                !centerData.totalStaff)) ||
        (currentStep === 2 &&
            (!centerData.state || !centerData.address || !centerData.lga)) ||
        (currentStep === 3 && centerData.operatingHours.length === 0) ||
        (currentStep === 4 &&
            (!centerData.licenseDocument ||
                !centerData.cacDocument ||
                !centerData.logo ||
                centerData.images.length === 0 ||
                !centerData.emergencyPhone ||
                !centerData.additionalFeatures.length));

    const { mutate: createLocation, isPending: isCreatingLocation } =
        useLocations(setCurrentStep);

    const {
        mutate: createDiagnosticCenter,
        isPending: isCreatingDiagnosticCenter,
    } = useCreateDiagnosticCenter(setIsOpen);

    useEffect(() => {
        if (isOpen) {
            clearCenterData();
            setCurrentStep(1);
            setState(''); // Reset state when modal opens
        }
    }, [isOpen, clearCenterData, setState]);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <CreateCenterStep1 />;
            case 2:
                return <CreateCenterStep2 />;

            case 3:
                return <CreateCenterStep3 />;

            case 4:
                return <CreateCenterStep4 />;

            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button className="bg-green-600 hover:bg-green-700">
                        Register Centre
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl px-0">
                <DialogHeader className="px-6">
                    <DialogTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Register New Diagnostic Centre
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Please fill out the form to register your diagnostic centre.
                </DialogDescription>

                {/* Progress Indicator */}
                <div className="grid md:flex grid-cols-2 items-center gap-3 justify-between flex-wrap mb-6 px-6">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    step <= currentStep
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}
                            >
                                {step}
                            </div>
                            {step < 4 && (
                                <div
                                    className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-green-600' : 'bg-gray-200'}`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="max-h-[60svh] overflow-auto px-6 pb-4">
                    {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t px-6">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                    >
                        Previous
                    </Button>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        {currentStep === 4 ? (
                            <Button
                                disabled={
                                    isCreatingDiagnosticCenter ||
                                    isInvalidInputs
                                }
                                onClick={() => {
                                    if (!isInvalidInputs) {
                                        createDiagnosticCenter(centerData);
                                    }
                                }}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {isCreatingDiagnosticCenter
                                    ? 'Creating Centre...'
                                    : 'Create Centre'}
                            </Button>
                        ) : (
                            <Button
                                disabled={isCreatingLocation || isInvalidInputs}
                                onClick={() => {
                                    if (currentStep === 2) {
                                        createLocation({
                                            address: centerData.address,
                                        });
                                    } else {
                                        handleNext();
                                    }
                                }}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {currentStep === 2
                                    ? isCreatingLocation
                                        ? 'Creating Location...'
                                        : 'Create Location'
                                    : 'Next'}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
