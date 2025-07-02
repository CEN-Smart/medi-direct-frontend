'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, Edit, FileText, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EditServiceModalProps {
	service: any;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (serviceData: any) => void;
	onDelete?: (serviceId: string) => void;
}

const serviceCategories = [
	'Blood Tests',
	'Imaging',
	'Cardiac Tests',
	'Respiratory Tests',
	'Neurological Tests',
	'Gynecological Tests',
	'Urological Tests',
	'Endocrine Tests',
	'Infectious Disease Tests',
	'Cancer Screening',
	'General Health Checkup',
	'Specialized Tests',
];

export function EditServiceModal({
	service,
	isOpen,
	onClose,
	onConfirm,
	onDelete,
}: EditServiceModalProps) {
	const [formData, setFormData] = useState({
		id: '',
		name: '',
		category: '',
		description: '',
		price: '',
		discountPrice: '',
		duration: '',
		preparationInstructions: '',
		homeService: false,
		emergencyService: false,
		requiresAppointment: true,
		available: true,
		tags: [] as string[],
		equipment: '',
		staffRequired: '',
		resultDelivery: '24-48 hours',
	});

	const [currentTag, setCurrentTag] = useState('');
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [hasChanges, setHasChanges] = useState(false);

	// Initialize form data when service changes
	useEffect(() => {
		if (service) {
			setFormData({
				id: service.id || '',
				name: service.name || '',
				category: service.category || '',
				description: service.description || '',
				price: service.price?.toString() || '',
				discountPrice: service.discountPrice?.toString() || '',
				duration: service.duration || '',
				preparationInstructions: service.preparationInstructions || '',
				homeService: service.homeService || false,
				emergencyService: service.emergencyService || false,
				requiresAppointment: service.requiresAppointment !== false,
				available: service.available !== false,
				tags: service.tags || [],
				equipment: service.equipment || '',
				staffRequired: service.staffRequired || '',
				resultDelivery: service.resultDelivery || '24-48 hours',
			});
			setHasChanges(false);
		}
	}, [service]);

	const handleInputChange = (field: string, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		setHasChanges(true);
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }));
		}
	};

	const addTag = () => {
		if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
			setFormData(prev => ({
				...prev,
				tags: [...prev.tags, currentTag.trim()],
			}));
			setCurrentTag('');
			setHasChanges(true);
		}
	};

	const removeTag = (tagToRemove: string) => {
		setFormData(prev => ({
			...prev,
			tags: prev.tags.filter(tag => tag !== tagToRemove),
		}));
		setHasChanges(true);
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) newErrors.name = 'Service name is required';
		if (!formData.category) newErrors.category = 'Category is required';
		if (!formData.price || Number.parseFloat(formData.price) <= 0)
			newErrors.price = 'Valid price is required';
		if (!formData.duration.trim()) newErrors.duration = 'Duration is required';

		if (
			formData.discountPrice &&
			Number.parseFloat(formData.discountPrice) >=
				Number.parseFloat(formData.price)
		) {
			newErrors.discountPrice =
				'Discount price must be less than regular price';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (!validateForm()) return;

		const serviceData = {
			...formData,
			price: Number.parseFloat(formData.price),
			discountPrice: formData.discountPrice
				? Number.parseFloat(formData.discountPrice)
				: null,
			updatedAt: new Date().toISOString(),
		};

		onConfirm(serviceData);
		setHasChanges(false);
	};

	const handleDelete = () => {
		if (onDelete && formData.id) {
			onDelete(formData.id);
		}
	};

	const handleClose = () => {
		if (hasChanges) {
			const confirmClose = window.confirm(
				'You have unsaved changes. Are you sure you want to close?'
			);
			if (!confirmClose) return;
		}
		setErrors({});
		setHasChanges(false);
		onClose();
	};

	if (!service) return null;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleClose}>
			<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<div className='flex justify-between items-center'>
						<DialogTitle className='flex items-center gap-2'>
							<Edit className='w-5 h-5 text-blue-600' />
							Edit Service
						</DialogTitle>
						{hasChanges && (
							<Badge
								variant='outline'
								className='text-orange-600'>
								Unsaved Changes
							</Badge>
						)}
					</div>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Service Status */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Service Status</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='flex justify-between items-center p-4 border rounded-lg'>
								<div>
									<p className='font-medium'>Service Availability</p>
									<p className='text-gray-600 text-sm'>
										{formData.available
											? 'Service is active and accepting bookings'
											: 'Service is currently disabled'}
									</p>
								</div>
								<Checkbox
									checked={formData.available}
									onCheckedChange={checked =>
										handleInputChange('available', checked)
									}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Basic Information */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Basic Information</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
								<div>
									<Label htmlFor='serviceName'>Service Name *</Label>
									<Input
										id='serviceName'
										value={formData.name}
										onChange={e => handleInputChange('name', e.target.value)}
										placeholder='e.g., Full Blood Count'
										className={errors.name ? 'border-red-500' : ''}
									/>
									{errors.name && (
										<p className='mt-1 text-red-500 text-sm'>{errors.name}</p>
									)}
								</div>

								<div>
									<Label htmlFor='category'>Category *</Label>
									<Select
										value={formData.category}
										onValueChange={value =>
											handleInputChange('category', value)
										}>
										<SelectTrigger
											className={errors.category ? 'border-red-500' : ''}>
											<SelectValue placeholder='Select category' />
										</SelectTrigger>
										<SelectContent>
											{serviceCategories.map(category => (
												<SelectItem
													key={category}
													value={category}>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{errors.category && (
										<p className='mt-1 text-red-500 text-sm'>
											{errors.category}
										</p>
									)}
								</div>
							</div>

							<div>
								<Label htmlFor='description'>Description</Label>
								<Textarea
									id='description'
									value={formData.description}
									onChange={e =>
										handleInputChange('description', e.target.value)
									}
									placeholder='Brief description of the service'
									rows={3}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Pricing & Duration */}
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-lg'>
								<DollarSign className='w-5 h-5' />
								Pricing & Duration
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
								<div>
									<Label htmlFor='price'>Price (₦) *</Label>
									<Input
										id='price'
										type='number'
										value={formData.price}
										onChange={e => handleInputChange('price', e.target.value)}
										placeholder='10000'
										className={errors.price ? 'border-red-500' : ''}
									/>
									{errors.price && (
										<p className='mt-1 text-red-500 text-sm'>{errors.price}</p>
									)}
								</div>

								<div>
									<Label htmlFor='discountPrice'>Discount Price (₦)</Label>
									<Input
										id='discountPrice'
										type='number'
										value={formData.discountPrice}
										onChange={e =>
											handleInputChange('discountPrice', e.target.value)
										}
										placeholder='8000'
										className={errors.discountPrice ? 'border-red-500' : ''}
									/>
									{errors.discountPrice && (
										<p className='mt-1 text-red-500 text-sm'>
											{errors.discountPrice}
										</p>
									)}
								</div>

								<div>
									<Label htmlFor='duration'>Duration *</Label>
									<Input
										id='duration'
										value={formData.duration}
										onChange={e =>
											handleInputChange('duration', e.target.value)
										}
										placeholder='30 minutes'
										className={errors.duration ? 'border-red-500' : ''}
									/>
									{errors.duration && (
										<p className='mt-1 text-red-500 text-sm'>
											{errors.duration}
										</p>
									)}
								</div>
							</div>

							<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
								<div>
									<Label htmlFor='resultDelivery'>Result Delivery Time</Label>
									<Select
										value={formData.resultDelivery}
										onValueChange={value =>
											handleInputChange('resultDelivery', value)
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='Same day'>Same day</SelectItem>
											<SelectItem value='24 hours'>24 hours</SelectItem>
											<SelectItem value='24-48 hours'>24-48 hours</SelectItem>
											<SelectItem value='2-3 days'>2-3 days</SelectItem>
											<SelectItem value='3-5 days'>3-5 days</SelectItem>
											<SelectItem value='1 week'>1 week</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label htmlFor='staffRequired'>Staff Required</Label>
									<Input
										id='staffRequired'
										value={formData.staffRequired}
										onChange={e =>
											handleInputChange('staffRequired', e.target.value)
										}
										placeholder='e.g., Lab Technician, Radiologist'
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Service Options */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Service Options</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
								<div className='space-y-4'>
									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium'>Home Service Available</p>
											<p className='text-gray-600 text-sm'>
												Service can be performed at patient's location
											</p>
										</div>
										<Checkbox
											checked={formData.homeService}
											onCheckedChange={checked =>
												handleInputChange('homeService', checked)
											}
										/>
									</div>

									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium'>Emergency Service</p>
											<p className='text-gray-600 text-sm'>
												Available for urgent/emergency cases
											</p>
										</div>
										<Checkbox
											checked={formData.emergencyService}
											onCheckedChange={checked =>
												handleInputChange('emergencyService', checked)
											}
										/>
									</div>
								</div>

								<div className='space-y-4'>
									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium'>Requires Appointment</p>
											<p className='text-gray-600 text-sm'>
												Prior appointment booking required
											</p>
										</div>
										<Checkbox
											checked={formData.requiresAppointment}
											onCheckedChange={checked =>
												handleInputChange('requiresAppointment', checked)
											}
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Instructions & Equipment */}
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-lg'>
								<FileText className='w-5 h-5' />
								Instructions & Equipment
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div>
								<Label htmlFor='preparationInstructions'>
									Preparation Instructions
								</Label>
								<Textarea
									id='preparationInstructions'
									value={formData.preparationInstructions}
									onChange={e =>
										handleInputChange('preparationInstructions', e.target.value)
									}
									placeholder='Instructions for patients before the test'
									rows={4}
								/>
							</div>

							<div>
								<Label htmlFor='equipment'>Equipment Required</Label>
								<Input
									id='equipment'
									value={formData.equipment}
									onChange={e => handleInputChange('equipment', e.target.value)}
									placeholder='e.g., X-Ray Machine, Blood Collection Kit'
								/>
							</div>

							{/* Tags */}
							<div>
								<Label>Service Tags</Label>
								<div className='flex gap-2 mb-2'>
									<Input
										value={currentTag}
										onChange={e => setCurrentTag(e.target.value)}
										placeholder='Add a tag'
										onKeyPress={e => e.key === 'Enter' && addTag()}
									/>
									<Button
										type='button'
										onClick={addTag}
										size='sm'>
										Add
									</Button>
								</div>
								<div className='flex flex-wrap gap-2'>
									{formData.tags.map(tag => (
										<Badge
											key={tag}
											variant='secondary'
											className='cursor-pointer'
											onClick={() => removeTag(tag)}>
											{tag} ×
										</Badge>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Action Buttons */}
				<div className='flex justify-between pt-6 border-t'>
					<div>
						{onDelete && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant='destructive'
										className='flex items-center gap-2'>
										<Trash2 className='w-4 h-4' />
										Delete Service
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Delete Service</AlertDialogTitle>
										<AlertDialogDescription>
											Are you sure you want to delete "{formData.name}"? This
											action cannot be undone and will affect any existing
											bookings.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											onClick={handleDelete}
											className='bg-red-600 hover:bg-red-700'>
											Delete
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</div>

					<div className='flex gap-2'>
						<Button
							variant='outline'
							onClick={handleClose}>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							disabled={!hasChanges}
							className='bg-blue-600 hover:bg-blue-700'>
							Save Changes
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
