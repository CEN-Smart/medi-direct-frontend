'use client';

import { useCreateDiagnosticCenterStore } from '@/stores/diagnostic-center';
import { Building2 } from 'lucide-react';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export function CreateCenterStep1() {
    const { centerData, setCenterData } = useCreateDiagnosticCenterStore();

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <Building2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <p className="text-sm text-gray-600">
                    Tell us about your diagnostic centre
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="name">Centre Name *</Label>
                    <Input
                        id="name"
                        value={centerData.name}
                        onChange={(e) =>
                            setCenterData({
                                ...centerData,
                                name: e.target.value,
                            })
                        }
                        placeholder="e.g., Lagos Diagnostic Centre"
                    />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        className="resize-none"
                        id="description"
                        value={centerData.description}
                        onChange={(e) =>
                            setCenterData({
                                ...centerData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Brief description of your centre and services"
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={centerData.email}
                            onChange={(e) =>
                                setCenterData({
                                    ...centerData,
                                    email: e.target.value,
                                })
                            }
                            placeholder="contact@centre.com"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                            id="phone"
                            value={centerData.phone}
                            onChange={(e) =>
                                setCenterData({
                                    ...centerData,
                                    phone: e.target.value,
                                })
                            }
                            placeholder="+234 801 234 5678"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="establishedYear">
                            Established Year
                        </Label>
                        <Input
                            id="establishedYear"
                            type="number"
                            onChange={(e) =>
                                setCenterData({
                                    ...centerData,
                                    establishedYear: Number(e.target.value),
                                })
                            }
                            placeholder="e.g., 1996"
                        />
                    </div>
                    <div>
                        <Label htmlFor="totalStaff">Total Staff</Label>
                        <Input
                            id="totalStaff"
                            type="number"
                            onChange={(e) =>
                                setCenterData({
                                    ...centerData,
                                    totalStaff: Number(e.target.value),
                                })
                            }
                            placeholder="e.g., 20"
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                        id="website"
                        value={centerData.website}
                        onChange={(e) =>
                            setCenterData({
                                ...centerData,
                                website: e.target.value,
                            })
                        }
                        placeholder="https://www.yourcentre.com"
                    />
                </div>
            </div>
        </div>
    );
}
