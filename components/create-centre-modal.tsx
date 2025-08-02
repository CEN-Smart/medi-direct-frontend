// 'use client';

// import {
//     Building2,
//     Camera,
//     Clock,
//     FileText,
//     MapPin,
//     Upload,
// } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';

// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { useState } from 'react';

// interface CreateCentreModalProps {
//     children?: React.ReactNode;
// }

// const nigerianStates = [
//     'Lagos',
//     'Abuja',
//     'Kano',
//     'Rivers',
//     'Oyo',
//     'Kaduna',
//     'Ogun',
//     'Imo',
//     'Plateau',
//     'Akwa Ibom',
//     'Abia',
//     'Adamawa',
//     'Anambra',
//     'Bauchi',
//     'Bayelsa',
//     'Benue',
//     'Borno',
//     'Cross River',
//     'Delta',
//     'Ebonyi',
//     'Edo',
//     'Ekiti',
//     'Enugu',
//     'Gombe',
//     'Jigawa',
//     'Kebbi',
//     'Kogi',
//     'Kwara',
//     'Nasarawa',
//     'Niger',
//     'Osun',
//     'Ondo',
//     'Sokoto',
//     'Taraba',
//     'Yobe',
//     'Zamfara',
// ];

// const amenities = [
//     'Parking Available',
//     'Wheelchair Accessible',
//     'Air Conditioning',
//     'WiFi Available',
//     'Waiting Area',
//     'Pharmacy On-site',
//     'Emergency Services',
//     'Home Service Available',
//     'Online Results',
//     'Insurance Accepted',
//     '24/7 Service',
//     'Laboratory On-site',
// ];

// export function CreateCentreModal({ children }: CreateCentreModalProps) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [currentStep, setCurrentStep] = useState(1);
//     const [formData, setFormData] = useState({
//         // Basic Information
//         name: '',
//         description: '',
//         email: '',
//         phone: '',
//         website: '',

//         // Location
//         address: '',
//         city: '',
//         state: '',
//         lga: '',
//         postalCode: '',

//         // Operating Hours
//         operatingHours: {
//             monday: { open: '08:00', close: '18:00', closed: false },
//             tuesday: { open: '08:00', close: '18:00', closed: false },
//             wednesday: { open: '08:00', close: '18:00', closed: false },
//             thursday: { open: '08:00', close: '18:00', closed: false },
//             friday: { open: '08:00', close: '18:00', closed: false },
//             saturday: { open: '08:00', close: '16:00', closed: false },
//             sunday: { open: '10:00', close: '16:00', closed: true },
//         },

//         // Documents & Media
//         logo: null,
//         images: [],
//         license: null,
//         cacDocument: null,

//         // Amenities & Features
//         selectedAmenities: [],
//         emergencyContact: '',
//         insuranceAccepted: [],
//     });

//     const handleInputChange = (field: string, value: any) => {
//         setFormData((prev) => ({ ...prev, [field]: value }));
//     };

//     const handleOperatingHoursChange = (
//         day: string,
//         field: string,
//         value: any,
//     ) => {
//         setFormData((prev) => ({
//             ...prev,
//             operatingHours: {
//                 ...prev.operatingHours,
//                 [day]: {
//                     ...prev.operatingHours[day],
//                     [field]: value,
//                 },
//             },
//         }));
//     };

//     const handleAmenityToggle = (amenity: string) => {
//         setFormData((prev) => {
//             const selectedAmenities = prev.selectedAmenities.includes(amenity)
//                 ? prev.selectedAmenities.filter((a) => a !== amenity)
//                 : [...prev.selectedAmenities, amenity];
//             return { ...prev, selectedAmenities };
//         });
//     };

//     const handleNext = () => {
//         if (currentStep < 4) {
//             setCurrentStep(currentStep + 1);
//         }
//     };

//     const handlePrevious = () => {
//         if (currentStep > 1) {
//             setCurrentStep(currentStep - 1);
//         }
//     };

//     const handleSubmit = () => {
//         setCurrentStep(1);
//         setFormData({
//             name: '',
//             description: '',
//             email: '',
//             phone: '',
//             website: '',
//             address: '',
//             city: '',
//             state: '',
//             lga: '',
//             postalCode: '',
//             operatingHours: {
//                 monday: { open: '08:00', close: '18:00', closed: false },
//                 tuesday: { open: '08:00', close: '18:00', closed: false },
//                 wednesday: { open: '08:00', close: '18:00', closed: false },
//                 thursday: { open: '08:00', close: '18:00', closed: false },
//                 friday: { open: '08:00', close: '18:00', closed: false },
//                 saturday: { open: '08:00', close: '16:00', closed: false },
//                 sunday: { open: '10:00', close: '16:00', closed: true },
//             },
//             logo: null,
//             images: [],
//             license: null,
//             cacDocument: null,
//             selectedAmenities: [],
//             emergencyContact: '',
//             insuranceAccepted: [],
//         });
//     };

//     const renderStepContent = () => {
//         switch (currentStep) {
//             case 1:
//                 return (
//                     <div className="space-y-6">
//                         <div className="text-center mb-6">
//                             <Building2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
//                             <h3 className="text-lg font-semibold">
//                                 Basic Information
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                                 Tell us about your diagnostic centre
//                             </p>
//                         </div>

//                         <div className="space-y-4">
//                             <div>
//                                 <Label htmlFor="name">Centre Name *</Label>
//                                 <Input
//                                     id="name"
//                                     value={formData.name}
//                                     onChange={(e) =>
//                                         handleInputChange(
//                                             'name',
//                                             e.target.value,
//                                         )
//                                     }
//                                     placeholder="e.g., Lagos Diagnostic Centre"
//                                 />
//                             </div>

//                             <div>
//                                 <Label htmlFor="description">Description</Label>
//                                 <Textarea
//                                     className="resize-none"
//                                     id="description"
//                                     value={formData.description}
//                                     onChange={(e) =>
//                                         handleInputChange(
//                                             'description',
//                                             e.target.value,
//                                         )
//                                     }
//                                     placeholder="Brief description of your centre and services"
//                                     rows={3}
//                                 />
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <Label htmlFor="email">
//                                         Email Address *
//                                     </Label>
//                                     <Input
//                                         id="email"
//                                         type="email"
//                                         value={formData.email}
//                                         onChange={(e) =>
//                                             handleInputChange(
//                                                 'email',
//                                                 e.target.value,
//                                             )
//                                         }
//                                         placeholder="contact@centre.com"
//                                     />
//                                 </div>
//                                 <div>
//                                     <Label htmlFor="phone">
//                                         Phone Number *
//                                     </Label>
//                                     <Input
//                                         id="phone"
//                                         value={formData.phone}
//                                         onChange={(e) =>
//                                             handleInputChange(
//                                                 'phone',
//                                                 e.target.value,
//                                             )
//                                         }
//                                         placeholder="+234 801 234 5678"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <Label htmlFor="website">
//                                     Website (Optional)
//                                 </Label>
//                                 <Input
//                                     id="website"
//                                     value={formData.website}
//                                     onChange={(e) =>
//                                         handleInputChange(
//                                             'website',
//                                             e.target.value,
//                                         )
//                                     }
//                                     placeholder="https://www.yourcentre.com"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 );

//             case 2:
//                 return (
//                     <div className="space-y-6">
//                         <div className="text-center mb-6">
//                             <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
//                             <h3 className="text-lg font-semibold">
//                                 Location Details
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                                 Where is your centre located?
//                             </p>
//                         </div>

//                         <div className="space-y-4">
//                             <div>
//                                 <Label htmlFor="address">
//                                     Street Address *
//                                 </Label>
//                                 <Input
//                                     id="address"
//                                     value={formData.address}
//                                     onChange={(e) =>
//                                         handleInputChange(
//                                             'address',
//                                             e.target.value,
//                                         )
//                                     }
//                                     placeholder="123 Main Street, District"
//                                 />
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <Label htmlFor="city">City *</Label>
//                                     <Input
//                                         id="city"
//                                         value={formData.city}
//                                         onChange={(e) =>
//                                             handleInputChange(
//                                                 'city',
//                                                 e.target.value,
//                                             )
//                                         }
//                                         placeholder="Lagos"
//                                     />
//                                 </div>
//                                 <div>
//                                     <Label htmlFor="state">State *</Label>
//                                     <Select
//                                         value={formData.state}
//                                         onValueChange={(value) =>
//                                             handleInputChange('state', value)
//                                         }
//                                     >
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Select state" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {nigerianStates.map((state) => (
//                                                 <SelectItem
//                                                     key={state}
//                                                     value={state}
//                                                 >
//                                                     {state}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <Label htmlFor="lga">
//                                         Local Government Area *
//                                     </Label>
//                                     <Input
//                                         id="lga"
//                                         value={formData.lga}
//                                         onChange={(e) =>
//                                             handleInputChange(
//                                                 'lga',
//                                                 e.target.value,
//                                             )
//                                         }
//                                         placeholder="Ikeja"
//                                     />
//                                 </div>
//                                 <div>
//                                     <Label htmlFor="postalCode">
//                                         Postal Code
//                                     </Label>
//                                     <Input
//                                         id="postalCode"
//                                         value={formData.postalCode}
//                                         onChange={(e) =>
//                                             handleInputChange(
//                                                 'postalCode',
//                                                 e.target.value,
//                                             )
//                                         }
//                                         placeholder="100001"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 );

//             case 3:
//                 return (
//                     <div className="space-y-6">
//                         <div className="text-center mb-6">
//                             <Clock className="w-12 h-12 text-green-600 mx-auto mb-2" />
//                             <h3 className="text-lg font-semibold">
//                                 Operating Hours
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                                 When is your centre open?
//                             </p>
//                         </div>

//                         <div className="space-y-4">
//                             {Object.entries(formData.operatingHours).map(
//                                 ([day, hours]) => (
//                                     <div
//                                         key={day}
//                                         className="flex items-center gap-4 p-4 border rounded-lg"
//                                     >
//                                         <div className="w-20">
//                                             <Label className="capitalize font-medium">
//                                                 {day}
//                                             </Label>
//                                         </div>

//                                         <div className="flex items-center gap-2">
//                                             <Checkbox
//                                                 checked={!hours.closed}
//                                                 onCheckedChange={(checked) =>
//                                                     handleOperatingHoursChange(
//                                                         day,
//                                                         'closed',
//                                                         !checked,
//                                                     )
//                                                 }
//                                             />
//                                             <span className="text-sm">
//                                                 Open
//                                             </span>
//                                         </div>

//                                         {!hours.closed && (
//                                             <>
//                                                 <div className="flex items-center gap-2">
//                                                     <Label className="text-sm">
//                                                         From:
//                                                     </Label>
//                                                     <Input
//                                                         type="time"
//                                                         value={hours.open}
//                                                         onChange={(e) =>
//                                                             handleOperatingHoursChange(
//                                                                 day,
//                                                                 'open',
//                                                                 e.target.value,
//                                                             )
//                                                         }
//                                                         className="w-32"
//                                                     />
//                                                 </div>
//                                                 <div className="flex items-center gap-2">
//                                                     <Label className="text-sm">
//                                                         To:
//                                                     </Label>
//                                                     <Input
//                                                         type="time"
//                                                         value={hours.close}
//                                                         onChange={(e) =>
//                                                             handleOperatingHoursChange(
//                                                                 day,
//                                                                 'close',
//                                                                 e.target.value,
//                                                             )
//                                                         }
//                                                         className="w-32"
//                                                     />
//                                                 </div>
//                                             </>
//                                         )}
//                                     </div>
//                                 ),
//                             )}
//                         </div>
//                     </div>
//                 );

//             case 4:
//                 return (
//                     <div className="space-y-6">
//                         <div className="text-center mb-6">
//                             <FileText className="w-12 h-12 text-green-600 mx-auto mb-2" />
//                             <h3 className="text-lg font-semibold">
//                                 Documents & Amenities
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                                 Upload required documents and select amenities
//                             </p>
//                         </div>

//                         <div className="space-y-6">
//                             {/* Document Upload Section */}
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="text-lg">
//                                         Required Documents
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-4">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                                             <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                                             <p className="text-sm font-medium">
//                                                 Medical License
//                                             </p>
//                                             <p className="text-xs text-gray-500">
//                                                 Upload your medical license
//                                             </p>
//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 className="mt-2 bg-transparent"
//                                             >
//                                                 Choose File
//                                             </Button>
//                                         </div>
//                                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                                             <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                                             <p className="text-sm font-medium">
//                                                 CAC Document
//                                             </p>
//                                             <p className="text-xs text-gray-500">
//                                                 Certificate of incorporation
//                                             </p>
//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 className="mt-2 bg-transparent"
//                                             >
//                                                 Choose File
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             {/* Media Upload Section */}
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="text-lg">
//                                         Centre Media
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-4">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                                             <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                                             <p className="text-sm font-medium">
//                                                 Centre Logo
//                                             </p>
//                                             <p className="text-xs text-gray-500">
//                                                 Upload your centre logo
//                                             </p>
//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 className="mt-2 bg-transparent"
//                                             >
//                                                 Choose File
//                                             </Button>
//                                         </div>
//                                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                                             <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                                             <p className="text-sm font-medium">
//                                                 Centre Images
//                                             </p>
//                                             <p className="text-xs text-gray-500">
//                                                 Upload photos of your facility
//                                             </p>
//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 className="mt-2 bg-transparent"
//                                             >
//                                                 Choose Files
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             {/* Amenities Section */}
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="text-lg">
//                                         Amenities & Features
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                                         {amenities.map((amenity) => (
//                                             <div
//                                                 key={amenity}
//                                                 className="flex items-center space-x-2"
//                                             >
//                                                 <Checkbox
//                                                     id={amenity}
//                                                     checked={formData.selectedAmenities.includes(
//                                                         amenity,
//                                                     )}
//                                                     onCheckedChange={() =>
//                                                         handleAmenityToggle(
//                                                             amenity,
//                                                         )
//                                                     }
//                                                 />
//                                                 <Label
//                                                     htmlFor={amenity}
//                                                     className="text-sm"
//                                                 >
//                                                     {amenity}
//                                                 </Label>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             {/* Emergency Contact */}
//                             <div>
//                                 <Label htmlFor="emergencyContact">
//                                     Emergency Contact Number
//                                 </Label>
//                                 <Input
//                                     id="emergencyContact"
//                                     value={formData.emergencyContact}
//                                     onChange={(e) =>
//                                         handleInputChange(
//                                             'emergencyContact',
//                                             e.target.value,
//                                         )
//                                     }
//                                     placeholder="+234 801 234 5678"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 );

//             default:
//                 return null;
//         }
//     };

//     return (
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//             <DialogTrigger asChild>
//                 {children || (
//                     <Button className="bg-green-600 hover:bg-green-700">
//                         Register Centre
//                     </Button>
//                 )}
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-4xl px-0">
//                 <DialogHeader className="px-6">
//                     <DialogTitle className="flex items-center gap-2">
//                         <Building2 className="w-5 h-5" />
//                         Register New Diagnostic Centre
//                     </DialogTitle>
//                 </DialogHeader>
//                 <DialogDescription className="sr-only">
//                     Please fill out the form to register your diagnostic centre.
//                 </DialogDescription>

//                 {/* Progress Indicator */}
//                 <div className="grid md:flex grid-cols-2 items-center gap-3 justify-between flex-wrap mb-6 px-6">
//                     {[1, 2, 3, 4].map((step) => (
//                         <div key={step} className="flex items-center">
//                             <div
//                                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                                     step <= currentStep
//                                         ? 'bg-green-600 text-white'
//                                         : 'bg-gray-200 text-gray-600'
//                                 }`}
//                             >
//                                 {step}
//                             </div>
//                             {step < 4 && (
//                                 <div
//                                     className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-green-600' : 'bg-gray-200'}`}
//                                 />
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Step Content */}
//                 <div className="max-h-[60svh] overflow-auto px-6">
//                     {renderStepContent()}
//                 </div>

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between pt-6 border-t px-6">
//                     <Button
//                         variant="outline"
//                         onClick={handlePrevious}
//                         disabled={currentStep === 1}
//                     >
//                         Previous
//                     </Button>

//                     <div className="flex gap-2">
//                         <Button
//                             variant="outline"
//                             onClick={() => setIsOpen(false)}
//                         >
//                             Cancel
//                         </Button>
//                         {currentStep === 4 ? (
//                             <Button
//                                 onClick={handleSubmit}
//                                 className="bg-green-600 hover:bg-green-700"
//                             >
//                                 Register Centre
//                             </Button>
//                         ) : (
//                             <Button
//                                 onClick={handleNext}
//                                 className="bg-green-600 hover:bg-green-700"
//                             >
//                                 Next
//                             </Button>
//                         )}
//                     </div>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// }
