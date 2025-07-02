'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Clock, DollarSign, FileText, Plus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface AddServiceModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (serviceData: any) => void;
	centreId?: string;
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

const preparationTemplates = {
	'Blood Tests':
		'Fast for 8-12 hours before the test. Drink plenty of water. Avoid alcohol 24 hours before.',
	Imaging:
		'Remove all metal objects including jewelry, belts, and clothing with metal fasteners.',
	'Cardiac Tests':
		'Avoid caffeine and smoking 2 hours before the test. Wear comfortable clothing.',
	'Respiratory Tests':
		'Avoid heavy meals 2 hours before. Do not use bronchodilators unless instructed.',
	'Neurological Tests':
		'Get adequate sleep the night before. Avoid alcohol and sedatives.',
	'Gynecological Tests':
		'Schedule during appropriate menstrual cycle phase if applicable.',
	'Urological Tests':
		'Follow specific bladder preparation instructions as provided.',
	'Endocrine Tests':
		'Follow medication timing instructions carefully. Fast if required.',
	'Infectious Disease Tests':
		'No special preparation required unless specified.',
	'Cancer Screening': 'Follow age and risk-appropriate screening guidelines.',
};

export function AddServiceModal({
	isOpen,
	onClose,
	onConfirm,
	centreId,
}: AddServiceModalProps) {
	const [formData, setFormData] = useState({
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

	const handleInputChange = (field: string, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }));
		}
	};

	const handleCategoryChange = (
		category: keyof typeof preparationTemplates | string
	) => {
		setFormData(prev => ({
			...prev,
			category,
			preparationInstructions:
				(preparationTemplates as Record<string, string>)[category] || '',
		}));
	};

	const addTag = () => {
		if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
			setFormData(prev => ({
				...prev,
				tags: [...prev.tags, currentTag.trim()],
			}));
			setCurrentTag('');
		}
	};

	const removeTag = (tagToRemove: string) => {
		setFormData(prev => ({
			...prev,
			tags: prev.tags.filter(tag => tag !== tagToRemove),
		}));
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
			centreId,
			createdAt: new Date().toISOString(),
		};

		onConfirm(serviceData);
		handleReset();
	};

	const handleReset = () => {
		setFormData({
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
			tags: [],
			equipment: '',
			staffRequired: '',
			resultDelivery: '24-48 hours',
		});
		setCurrentTag('');
		setErrors({});
	};

	const handleClose = () => {
		handleReset();
		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleClose}>
			<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Plus className='w-5 h-5 text-green-600' />
						Add New Service
					</DialogTitle>
				</DialogHeader>

				<div className='space-y-6'>
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
										onValueChange={handleCategoryChange}>
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

									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium'>Currently Available</p>
											<p className='text-gray-600 text-sm'>
												Service is active and bookable
											</p>
										</div>
										<Checkbox
											checked={formData.available}
											onCheckedChange={checked =>
												handleInputChange('available', checked)
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

					{/* Preview */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Service Preview</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='bg-gray-50 p-4 border rounded-lg'>
								<div className='flex justify-between items-start mb-3'>
									<div>
										<h3 className='font-semibold text-lg'>
											{formData.name || 'Service Name'}
										</h3>
										{formData.category && (
											<Badge variant='outline'>{formData.category}</Badge>
										)}
									</div>
									<div className='text-right'>
										<p className='font-bold text-green-600 text-xl'>
											₦
											{formData.price
												? Number.parseFloat(formData.price).toLocaleString()
												: '0'}
										</p>
										{formData.discountPrice && (
											<p className='text-gray-500 text-sm line-through'>
												₦
												{Number.parseFloat(
													formData.discountPrice
												).toLocaleString()}
											</p>
										)}
									</div>
								</div>

								<div className='gap-4 grid grid-cols-2 md:grid-cols-4 text-sm'>
									<div className='flex items-center gap-2'>
										<Clock className='w-4 h-4 text-blue-500' />
										<span>{formData.duration || 'Duration'}</span>
									</div>
									<div className='flex items-center gap-2'>
										<span
											className={`w-2 h-2 rounded-full ${
												formData.available ? 'bg-green-500' : 'bg-red-500'
											}`}
										/>
										<span>
											{formData.available ? 'Available' : 'Unavailable'}
										</span>
									</div>
									<div className='flex items-center gap-2'>
										<span>🏠</span>
										<span>
											{formData.homeService ? 'Home Service' : 'In-Centre Only'}
										</span>
									</div>
									<div className='flex items-center gap-2'>
										<span>⚡</span>
										<span>
											{formData.emergencyService ? 'Emergency' : 'Regular'}
										</span>
									</div>
								</div>

								{formData.description && (
									<p className='mt-3 text-gray-600 text-sm'>
										{formData.description}
									</p>
								)}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Action Buttons */}
				<div className='flex justify-between pt-6 border-t'>
					<Button
						variant='outline'
						onClick={handleClose}>
						Cancel
					</Button>
					<div className='flex gap-2'>
						<Button
							variant='outline'
							onClick={handleReset}>
							Reset
						</Button>
						<Button
							onClick={handleSubmit}
							className='bg-green-600 hover:bg-green-700'>
							Add Service
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
