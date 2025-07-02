'use client';

import { Card, CardContent } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Clock,
	DollarSign,
	Edit,
	Home,
	Plus,
	Search,
	Trash2,
} from 'lucide-react';

import { AddServiceModal } from '@/components/add-service-modal';
import { EditServiceModal } from '@/components/edit-service-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface ManageServicesModalProps {
	centre: any;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (centreId: string, services: any[]) => void;
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
];

const availableServices = [
	// Blood Tests
	{
		id: 1,
		name: 'Full Blood Count (FBC)',
		category: 'Blood Tests',
		basePrice: 3000,
		duration: '30 mins',
	},
	{
		id: 2,
		name: 'Lipid Profile',
		category: 'Blood Tests',
		basePrice: 5000,
		duration: '30 mins',
	},
	{
		id: 3,
		name: 'Liver Function Test',
		category: 'Blood Tests',
		basePrice: 8000,
		duration: '30 mins',
	},
	{
		id: 4,
		name: 'Kidney Function Test',
		category: 'Blood Tests',
		basePrice: 7000,
		duration: '30 mins',
	},
	{
		id: 5,
		name: 'Thyroid Function Test',
		category: 'Blood Tests',
		basePrice: 12000,
		duration: '45 mins',
	},
	{
		id: 6,
		name: 'Diabetes Panel',
		category: 'Blood Tests',
		basePrice: 6000,
		duration: '30 mins',
	},

	// Imaging
	{
		id: 7,
		name: 'Chest X-Ray',
		category: 'Imaging',
		basePrice: 8000,
		duration: '15 mins',
	},
	{
		id: 8,
		name: 'Abdominal Ultrasound',
		category: 'Imaging',
		basePrice: 15000,
		duration: '30 mins',
	},
	{
		id: 9,
		name: 'Pelvic Ultrasound',
		category: 'Imaging',
		basePrice: 12000,
		duration: '30 mins',
	},
	{
		id: 10,
		name: 'CT Scan (Head)',
		category: 'Imaging',
		basePrice: 45000,
		duration: '20 mins',
	},
	{
		id: 11,
		name: 'MRI Scan',
		category: 'Imaging',
		basePrice: 85000,
		duration: '45 mins',
	},
	{
		id: 12,
		name: 'Mammography',
		category: 'Imaging',
		basePrice: 25000,
		duration: '20 mins',
	},

	// Cardiac Tests
	{
		id: 13,
		name: 'ECG (Electrocardiogram)',
		category: 'Cardiac Tests',
		basePrice: 5000,
		duration: '15 mins',
	},
	{
		id: 14,
		name: 'Echocardiogram',
		category: 'Cardiac Tests',
		basePrice: 20000,
		duration: '30 mins',
	},
	{
		id: 15,
		name: 'Stress Test',
		category: 'Cardiac Tests',
		basePrice: 25000,
		duration: '60 mins',
	},

	// Other categories...
	{
		id: 16,
		name: 'Spirometry',
		category: 'Respiratory Tests',
		basePrice: 8000,
		duration: '30 mins',
	},
	{
		id: 17,
		name: 'EEG',
		category: 'Neurological Tests',
		basePrice: 15000,
		duration: '45 mins',
	},
	{
		id: 18,
		name: 'Pap Smear',
		category: 'Gynecological Tests',
		basePrice: 8000,
		duration: '20 mins',
	},
];

export function ManageServicesModal({
	centre,
	isOpen,
	onClose,
	onConfirm,
}: ManageServicesModalProps) {
	const [activeTab, setActiveTab] = useState('current');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [showAddService, setShowAddService] = useState(false);
	const [editingService, setEditingService] = useState<any>(null);

	// Mock current services for the centre
	const [currentServices, setCurrentServices] = useState([
		{
			id: 1,
			name: 'Full Blood Count (FBC)',
			category: 'Blood Tests',
			price: 3500,
			discountPrice: 3000,
			duration: '30 mins',
			homeService: true,
			available: true,
			description: 'Complete blood count analysis',
			preparationInstructions: 'Fast for 8-12 hours before test',
		},
		{
			id: 7,
			name: 'Chest X-Ray',
			category: 'Imaging',
			price: 8000,
			discountPrice: null,
			duration: '15 mins',
			homeService: false,
			available: true,
			description: 'Chest radiography examination',
			preparationInstructions: 'Remove all metal objects',
		},
	]);

	const filteredAvailableServices = availableServices.filter(service => {
		const matchesSearch = service.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === 'all' || service.category === selectedCategory;
		const notAlreadyAdded = !currentServices.some(
			current => current.id === service.id
		);
		return matchesSearch && matchesCategory && notAlreadyAdded;
	});

	const handleAddService = (service: any) => {
		const newServiceData = {
			...service,
			price: service.basePrice,
			discountPrice: null,
			homeService: false,
			available: true,
			description: '',
			preparationInstructions: '',
		};
		setCurrentServices([...currentServices, newServiceData]);
	};

	const handleAddCustomService = (serviceData: any) => {
		const customService = {
			id: Date.now(), // Temporary ID
			...serviceData,
		};
		setCurrentServices([...currentServices, customService]);
		setShowAddService(false);
	};

	const handleEditService = (updatedService: any) => {
		setCurrentServices(
			currentServices.map(service =>
				service.id === updatedService.id ? updatedService : service
			)
		);
		setEditingService(null);
	};

	const handleDeleteService = (serviceId: string) => {
		setCurrentServices(
			currentServices.filter(service => service.id.toString() !== serviceId)
		);
		setEditingService(null);
	};

	const handleSave = () => {
		onConfirm(centre?.id, currentServices);
	};

	return (
		<>
			<Dialog
				open={isOpen}
				onOpenChange={onClose}>
				<DialogContent className='max-w-6xl max-h-[90vh] overflow-y-auto'>
					<DialogHeader>
						<DialogTitle className='flex items-center gap-2'>
							<Edit className='w-5 h-5' />
							Manage Services - {centre?.name}
						</DialogTitle>
					</DialogHeader>

					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='space-y-6'>
						<TabsList className='grid grid-cols-2 w-full max-w-md'>
							<TabsTrigger value='current'>
								Current Services ({currentServices.length})
							</TabsTrigger>
							<TabsTrigger value='add'>Add Services</TabsTrigger>
						</TabsList>

						<TabsContent
							value='current'
							className='space-y-4'>
							<div className='flex justify-between items-center'>
								<h3 className='font-semibold text-lg'>Your Services</h3>
								<Button
									onClick={() => setShowAddService(true)}
									className='bg-green-600 hover:bg-green-700'>
									<Plus className='mr-2 w-4 h-4' />
									Add Custom Service
								</Button>
							</div>

							{currentServices.length === 0 ? (
								<Card>
									<CardContent className='py-12 text-center'>
										<Edit className='mx-auto mb-4 w-12 h-12 text-gray-400' />
										<h3 className='mb-2 font-medium text-gray-900 text-lg'>
											No services added yet
										</h3>
										<p className='mb-4 text-gray-600'>
											Add services to start receiving bookings
										</p>
										<Button onClick={() => setActiveTab('add')}>
											Browse Services
										</Button>
									</CardContent>
								</Card>
							) : (
								<div className='gap-4 grid'>
									{currentServices.map(service => (
										<Card key={service.id}>
											<CardContent className='p-6'>
												<div className='flex justify-between items-start gap-4'>
													<div className='flex-1 space-y-3'>
														<div className='flex items-center gap-2'>
															<h4 className='font-semibold text-lg'>
																{service.name}
															</h4>
															<Badge variant='outline'>
																{service.category}
															</Badge>
															{!service.available && (
																<Badge variant='destructive'>Unavailable</Badge>
															)}
														</div>

														<div className='gap-4 grid grid-cols-2 md:grid-cols-4 text-sm'>
															<div className='flex items-center gap-2'>
																<DollarSign className='w-4 h-4 text-green-500' />
																<span>
																	₦{service.price.toLocaleString()}
																	{service.discountPrice && (
																		<span className='ml-1 text-gray-500 line-through'>
																			₦{service.discountPrice.toLocaleString()}
																		</span>
																	)}
																</span>
															</div>
															<div className='flex items-center gap-2'>
																<Clock className='w-4 h-4 text-blue-500' />
																<span>{service.duration}</span>
															</div>
															<div className='flex items-center gap-2'>
																<Home className='w-4 h-4 text-purple-500' />
																<span>
																	{service.homeService
																		? 'Available'
																		: 'Not Available'}
																</span>
															</div>
															<div className='flex items-center gap-2'>
																<span
																	className={`w-2 h-2 rounded-full ${
																		service.available
																			? 'bg-green-500'
																			: 'bg-red-500'
																	}`}
																/>
																<span>
																	{service.available ? 'Active' : 'Inactive'}
																</span>
															</div>
														</div>

														{service.description && (
															<p className='text-gray-600 text-sm'>
																{service.description}
															</p>
														)}

														{service.preparationInstructions && (
															<div className='text-sm'>
																<span className='font-medium'>
																	Preparation:{' '}
																</span>
																<span className='text-gray-600'>
																	{service.preparationInstructions}
																</span>
															</div>
														)}
													</div>

													<div className='flex flex-col gap-2'>
														<Button
															variant='outline'
															size='sm'
															onClick={() => setEditingService(service)}>
															<Edit className='w-4 h-4' />
														</Button>
														<Button
															variant='outline'
															size='sm'
															onClick={() =>
																handleDeleteService(service.id.toString())
															}>
															<Trash2 className='w-4 h-4' />
														</Button>
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							)}
						</TabsContent>

						<TabsContent
							value='add'
							className='space-y-4'>
							<div className='flex sm:flex-row flex-col gap-4'>
								<div className='flex-1'>
									<div className='relative'>
										<Search className='top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform' />
										<Input
											placeholder='Search services...'
											value={searchTerm}
											onChange={e => setSearchTerm(e.target.value)}
											className='pl-10'
										/>
									</div>
								</div>
								<Select
									value={selectedCategory}
									onValueChange={setSelectedCategory}>
									<SelectTrigger className='w-full sm:w-48'>
										<SelectValue placeholder='All Categories' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>All Categories</SelectItem>
										{serviceCategories.map(category => (
											<SelectItem
												key={category}
												value={category}>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className='gap-4 grid'>
								{filteredAvailableServices.map(service => (
									<Card key={service.id}>
										<CardContent className='p-6'>
											<div className='flex justify-between items-center'>
												<div className='space-y-2'>
													<div className='flex items-center gap-2'>
														<h4 className='font-semibold text-lg'>
															{service.name}
														</h4>
														<Badge variant='outline'>{service.category}</Badge>
													</div>
													<div className='flex items-center gap-4 text-gray-600 text-sm'>
														<span>
															Base Price: ₦{service.basePrice.toLocaleString()}
														</span>
														<span>Duration: {service.duration}</span>
													</div>
												</div>
												<Button
													onClick={() => handleAddService(service)}
													className='bg-green-600 hover:bg-green-700'>
													<Plus className='mr-2 w-4 h-4' />
													Add Service
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>

							{filteredAvailableServices.length === 0 && (
								<Card>
									<CardContent className='py-12 text-center'>
										<Search className='mx-auto mb-4 w-12 h-12 text-gray-400' />
										<h3 className='mb-2 font-medium text-gray-900 text-lg'>
											No services found
										</h3>
										<p className='text-gray-600'>
											Try adjusting your search or category filter
										</p>
									</CardContent>
								</Card>
							)}
						</TabsContent>
					</Tabs>

					{/* Action Buttons */}
					<div className='flex justify-between pt-6 border-t'>
						<Button
							variant='outline'
							onClick={onClose}>
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							className='bg-green-600 hover:bg-green-700'>
							Save Changes
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			{/* Add Service Modal */}
			<AddServiceModal
				isOpen={showAddService}
				onClose={() => setShowAddService(false)}
				onConfirm={handleAddCustomService}
				centreId={centre?.id}
			/>

			{/* Edit Service Modal */}
			<EditServiceModal
				service={editingService}
				isOpen={!!editingService}
				onClose={() => setEditingService(null)}
				onConfirm={handleEditService}
				onDelete={handleDeleteService}
			/>
		</>
	);
}
