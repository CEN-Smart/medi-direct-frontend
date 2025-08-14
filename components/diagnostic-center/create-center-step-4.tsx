'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { amenities } from '@/docs';
import { cn, formatPhone } from '@/lib/utils';
import { UseCase, useFileUpload } from '@/services/file-upload';
import { useCreateDiagnosticCenterStore } from '@/stores/diagnostic-center';
import { Camera, FileText, Upload } from 'lucide-react';

import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function CreateCenterStep4() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const { centerData, setCenterData } = useCreateDiagnosticCenterStore();
    const [file, setFile] = useState<File | File[] | null>(null);
    const [useCase, setUseCase] = useState<UseCase>('Medical License');
    const { mutate: uploadFile, isPending: pendingFileUpload } = useFileUpload(
        file,
        useCase,
    );
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <FileText className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">Documents & Amenities</h3>
                <p className="text-sm text-gray-600">
                    Upload required documents and select amenities
                </p>
            </div>

            <div className="space-y-6">
                {/* Document Upload Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Required Documents
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 overflow-x-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm font-medium">
                                    Medical License
                                </p>
                                <p className="text-xs text-gray-500">
                                    Upload your medical license
                                </p>
                                <Button
                                    disabled={pendingFileUpload}
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 bg-transparent"
                                >
                                    <label
                                        htmlFor="medicalLicense"
                                        className={cn(``, {
                                            'cursor-not-allowed':
                                                pendingFileUpload,
                                        })}
                                    >
                                        {pendingFileUpload ? (
                                            <span className="flex items-center gap-2">
                                                <Upload className="w-4 h-4 animate-spin" />
                                                Uploading...
                                            </span>
                                        ) : (
                                            'Choose File'
                                        )}
                                        <Input
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0] || null;
                                                setFile(file);
                                                setUseCase('Medical License');
                                                uploadFile(file);
                                            }}
                                            id="medicalLicense"
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            className="hidden"
                                        />
                                    </label>
                                </Button>
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm font-medium">
                                    CAC Document
                                </p>
                                <p className="text-xs text-gray-500">
                                    Certificate of incorporation
                                </p>
                                <Button
                                    disabled={pendingFileUpload}
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 bg-transparent"
                                >
                                    <label
                                        htmlFor="cacDocument"
                                        className={cn(``, {
                                            'cursor-not-allowed':
                                                pendingFileUpload,
                                        })}
                                    >
                                        {pendingFileUpload ? (
                                            <span className="flex items-center gap-2">
                                                <Upload className="w-4 h-4 animate-spin" />
                                                Uploading...
                                            </span>
                                        ) : (
                                            'Choose File'
                                        )}
                                        <Input
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0] || null;
                                                setFile(file);
                                                setUseCase('CAC Document');
                                                uploadFile(file);
                                            }}
                                            id="cacDocument"
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            className="hidden"
                                        />
                                    </label>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    {/* Preview License and CAC Document */}
                    <CardFooter className="flex gap-4">
                        {centerData.licenseDocument && (
                            <picture>
                                <img
                                    src={centerData.licenseDocument}
                                    alt="License Preview"
                                    className="w-full object-cover"
                                />
                            </picture>
                        )}
                        {centerData.cacDocument && (
                            <picture>
                                <img
                                    src={centerData.cacDocument}
                                    alt="CAC Document Preview"
                                    className="w-full object-cover"
                                />
                            </picture>
                        )}
                    </CardFooter>
                </Card>

                {/* Media Upload Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Centre Media</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 overflow-x-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm font-medium">
                                    Centre Logo
                                </p>
                                <p className="text-xs text-gray-500">
                                    Upload your centre logo
                                </p>
                                <Button
                                    disabled={pendingFileUpload}
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 bg-transparent"
                                >
                                    <label
                                        htmlFor="centreLogo"
                                        className={cn(``, {
                                            'cursor-not-allowed':
                                                pendingFileUpload,
                                        })}
                                    >
                                        {pendingFileUpload ? (
                                            <span className="flex items-center gap-2">
                                                <Upload className="w-4 h-4 animate-spin" />
                                                Uploading...
                                            </span>
                                        ) : (
                                            'Choose File'
                                        )}
                                        <Input
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0] || null;
                                                setFile(file);
                                                setUseCase('Center Logo');
                                                uploadFile(file);
                                            }}
                                            id="centreLogo"
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            className="hidden"
                                        />
                                    </label>
                                </Button>
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm font-medium">
                                    Centre Images
                                </p>
                                <p className="text-xs text-gray-500">
                                    Upload photos of your facility
                                </p>
                                <Button
                                    disabled={pendingFileUpload}
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 bg-transparent"
                                >
                                    <label
                                        htmlFor="centreImages"
                                        className={cn(``, {
                                            'cursor-not-allowed':
                                                pendingFileUpload,
                                        })}
                                    >
                                        {pendingFileUpload ? (
                                            <span className="flex items-center gap-2">
                                                <Upload className="w-4 h-4 animate-spin" />
                                                Uploading...
                                            </span>
                                        ) : (
                                            'Choose Files'
                                        )}
                                        <Input
                                            onChange={(e) => {
                                                const files = Array.from(
                                                    e.target.files || [],
                                                );
                                                setFile(files);
                                                setUseCase('Center Images');
                                                uploadFile(files);
                                            }}
                                            id="centreImages"
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            className="hidden"
                                            multiple
                                        />
                                    </label>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-4">
                        {centerData.logo && (
                            <picture>
                                <img
                                    src={centerData.logo}
                                    alt="Centre Logo Preview"
                                    className="w-full object-cover"
                                />
                            </picture>
                        )}
                        {centerData.images?.map((image) => (
                            <picture key={image}>
                                <img
                                    src={image}
                                    alt="Centre facility"
                                    className="w-full object-cover"
                                />
                            </picture>
                        ))}
                    </CardFooter>
                </Card>

                {/* Amenities Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Amenities & Features
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {amenities.map((amenity) => (
                                <div
                                    key={amenity}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={amenity}
                                        checked={centerData.additionalFeatures.includes(
                                            amenity,
                                        )}
                                        onCheckedChange={(checked) => {
                                            const updatedAmenities = checked
                                                ? [
                                                      ...centerData.additionalFeatures,
                                                      amenity,
                                                  ]
                                                : centerData.additionalFeatures.filter(
                                                      (a) => a !== amenity,
                                                  );
                                            setCenterData({
                                                ...centerData,
                                                additionalFeatures:
                                                    updatedAmenities,
                                            });
                                        }}
                                    />
                                    <Label
                                        htmlFor={amenity}
                                        className="text-sm"
                                    >
                                        {amenity}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Emergency Contact */}
                <div>
                    <Label htmlFor="emergencyContact">
                        Emergency Contact Number
                    </Label>
                    <Input
                        id="emergencyPhone"
                        value={centerData.emergencyPhone}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            setCenterData({
                                ...centerData,
                                emergencyPhone: e.target.value,
                            });
                        }}
                        onBlur={() => {
                            const formattedPhone = formatPhone(phoneNumber);
                            setCenterData({
                                ...centerData,
                                emergencyPhone: formattedPhone,
                            });
                        }}
                        placeholder="+234 800 000 0000"
                    />
                </div>
            </div>
        </div>
    );
}
