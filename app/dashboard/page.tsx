'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	BarChart3,
	Building2,
	Calendar,
	FileText,
	MapPin,
	Phone,
	Plus,
	Settings,
	Users,
} from 'lucide-react';

import { CancelModal } from '@/components/cancel-modal';
import { CentreAnalyticsModal } from '@/components/centre-analytics-modal';
import { ChangePasswordModal } from '@/components/change-password-modal';
import { CreateCentreModal } from '@/components/create-centre-modal';
import { Header } from '@/components/header';
import { ManageServicesModal } from '@/components/manage-services-modal';
import { RescheduleModal } from '@/components/reschedule-modal';
import { TwoFactorAuthModal } from '@/components/two-factor-auth-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

// Mock data - replace with API calls
const mockBookings = [
	{
		id: 'BK001',
		centreName: 'Lagos Diagnostic Centre',
		testType: 'Blood Test (Full Panel)',
		date: '2024-01-15',
		time: '10:00 AM',
		status: 'confirmed',
		price: 15000,
		location: 'Ikeja, Lagos',
		phone: '+234 801 234 5678',
	},
	{
		id: 'BK002',
		centreName: 'MedScan Imaging',
		testType: 'MRI Scan',
		date: '2024-01-20',
		time: '2:00 PM',
		status: 'pending',
		price: 85000,
		location: 'Victoria Island, Lagos',
		phone: '+234 802 345 6789',
	},
];

const mockHistory = [
	{
		id: 'BK003',
		centreName: 'HealthCheck Diagnostics',
		testType: 'X-Ray Chest',
		date: '2023-12-10',
		status: 'completed',
		price: 8000,
		resultAvailable: true,
	},
];

const mockCentres = [
	{
		id: 'CTR001',
		name: 'Lagos Diagnostic Centre',
		location: 'Ikeja, Lagos',
		status: 'active',
		services: 12,
		bookings: 45,
		revenue: 2500000,
		rating: 4.5,
	},
];

export default function DashboardPage() {
	const [activeTab, setActiveTab] = useState('bookings');
	const [rescheduleBooking, setRescheduleBooking] = useState<any>(null);
	const [cancelBooking, setCancelBooking] = useState<any>(null);
	const [showCreateCentre, setShowCreateCentre] = useState(false);
	const [showManageServices, setShowManageServices] = useState(false);
	const [selectedCentre, setSelectedCentre] = useState<any>(null);
	const [showAnalytics, setShowAnalytics] = useState(false);
	const [analyticsCentre, setAnalyticsCentre] = useState<any>(null);
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [showTwoFactorAuth, setShowTwoFactorAuth] = useState(false);
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'confirmed':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'completed':
				return 'bg-blue-100 text-blue-800';
			case 'cancelled':
				return 'bg-red-100 text-red-800';
			case 'active':
				return 'bg-green-100 text-green-800';
			case 'inactive':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const handleDownloadResult = async (bookingId: string) => {
		// Simulate file download
		const link = document.createElement('a');
		link.href = `/api/results/${bookingId}/download`;
		link.download = `test-result-${bookingId}.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleReschedule = (
		bookingId: string,
		newDate: string,
		newTime: string,
		reason: string
	) => {
		console.log('Rescheduling booking:', {
			bookingId,
			newDate,
			newTime,
			reason,
		});
		setRescheduleBooking(null);
	};

	const handleCancel = (
		bookingId: string,
		reason: string,
		feedback: string
	) => {
		console.log('Cancelling booking:', { bookingId, reason, feedback });
		setCancelBooking(null);
	};

	const handleCreateCentre = (centreData: any) => {
		console.log('Creating centre:', centreData);
		setShowCreateCentre(false);
	};

	const handleManageServices = (centreId: string, services: any[]) => {
		console.log('Managing services for centre:', centreId, services);
		setShowManageServices(false);
	};

	const handleChangePassword = (
		currentPassword: string,
		newPassword: string
	) => {
		console.log('Changing password');
		// Simulate API call
		return new Promise(resolve => {
			setTimeout(resolve, 1000);
		});
	};

	const handleEnableTwoFactor = (method: string, code: string) => {
		console.log('Enabling 2FA:', method, code);
		setTwoFactorEnabled(true);
		return new Promise(resolve => {
			setTimeout(resolve, 1000);
		});
	};

	return (
		<div className='bg-gray-50 min-h-screen'>
			<Header />

			<div className='mx-auto px-4 py-8 container'>
				<div className='mb-8'>
					<h1 className='mb-2 font-bold text-gray-900 text-3xl'>
						My Dashboard
					</h1>
					<p className='text-gray-600'>
						Manage your appointments, centres, and view test results
					</p>
				</div>

				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className='space-y-6'>
					<TabsList className='grid grid-cols-4 w-full max-w-lg'>
						<TabsTrigger value='bookings'>Bookings</TabsTrigger>
						<TabsTrigger value='centres'>My Centres</TabsTrigger>
						<TabsTrigger value='history'>History</TabsTrigger>
						<TabsTrigger value='profile'>Profile</TabsTrigger>
					</TabsList>

					<TabsContent
						value='bookings'
						className='space-y-4'>
						{mockBookings.length === 0 ? (
							<Card>
								<CardContent className='py-12 text-center'>
									<Calendar className='mx-auto mb-4 w-12 h-12 text-gray-400' />
									<h3 className='mb-2 font-medium text-gray-900 text-lg'>
										No upcoming appointments
									</h3>
									<p className='mb-4 text-gray-600'>
										Book your first diagnostic test today
									</p>
									<Button>Find Centres</Button>
								</CardContent>
							</Card>
						) : (
							mockBookings.map(booking => (
								<Card key={booking.id}>
									<CardContent className='p-6'>
										<div className='flex md:flex-row flex-col justify-between md:items-center gap-4'>
											<div className='space-y-3'>
												<div className='flex items-center gap-2'>
													<h3 className='font-semibold text-lg'>
														{booking.centreName}
													</h3>
													<Badge className={getStatusColor(booking.status)}>
														{booking.status}
													</Badge>
												</div>

												<div className='space-y-2 text-gray-600 text-sm'>
													<div className='flex items-center gap-2'>
														<FileText className='w-4 h-4' />
														<span>{booking.testType}</span>
													</div>
													<div className='flex items-center gap-2'>
														<Calendar className='w-4 h-4' />
														<span>
															{booking.date} at {booking.time}
														</span>
													</div>
													<div className='flex items-center gap-2'>
														<MapPin className='w-4 h-4' />
														<span>{booking.location}</span>
													</div>
													<div className='flex items-center gap-2'>
														<Phone className='w-4 h-4' />
														<span>{booking.phone}</span>
													</div>
												</div>
											</div>

											<div className='flex flex-col items-end gap-3'>
												<div className='text-right'>
													<p className='font-bold text-green-600 text-2xl'>
														₦{booking.price.toLocaleString()}
													</p>
													<p className='text-gray-500 text-sm'>
														Booking ID: {booking.id}
													</p>
												</div>

												<div className='flex gap-2'>
													<Button
														variant='outline'
														size='sm'
														onClick={() => setRescheduleBooking(booking)}>
														Reschedule
													</Button>
													<Button
														variant='destructive'
														size='sm'
														onClick={() => setCancelBooking(booking)}>
														Cancel
													</Button>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))
						)}
					</TabsContent>

					<TabsContent
						value='centres'
						className='space-y-6'>
						<div className='flex justify-between items-center'>
							<div>
								<h2 className='font-bold text-gray-900 text-2xl'>
									My Diagnostic Centres
								</h2>
								<p className='text-gray-600'>
									Manage your diagnostic centres and services
								</p>
							</div>
							<Button
								onClick={() => setShowCreateCentre(true)}
								className='bg-green-600 hover:bg-green-700'>
								<Plus className='mr-2 w-4 h-4' />
								Add New Centre
							</Button>
						</div>

						{mockCentres.length === 0 ? (
							<Card>
								<CardContent className='py-12 text-center'>
									<Building2 className='mx-auto mb-4 w-12 h-12 text-gray-400' />
									<h3 className='mb-2 font-medium text-gray-900 text-lg'>
										No centres registered
									</h3>
									<p className='mb-4 text-gray-600'>
										Register your first diagnostic centre to start receiving
										bookings
									</p>
									<Button
										onClick={() => setShowCreateCentre(true)}
										className='bg-green-600 hover:bg-green-700'>
										<Plus className='mr-2 w-4 h-4' />
										Register Centre
									</Button>
								</CardContent>
							</Card>
						) : (
							<div className='space-y-4'>
								{mockCentres.map(centre => (
									<Card key={centre.id}>
										<CardContent className='p-6'>
											<div className='flex lg:flex-row flex-col justify-between lg:items-center gap-4'>
												<div className='space-y-3'>
													<div className='flex items-center gap-2'>
														<h3 className='font-semibold text-xl'>
															{centre.name}
														</h3>
														<Badge className={getStatusColor(centre.status)}>
															{centre.status}
														</Badge>
													</div>

													<div className='flex items-center gap-2 text-gray-600'>
														<MapPin className='w-4 h-4' />
														<span>{centre.location}</span>
													</div>

													<div className='gap-4 grid grid-cols-2 md:grid-cols-4 text-sm'>
														<div className='flex items-center gap-2'>
															<FileText className='w-4 h-4 text-blue-500' />
															<span>{centre.services} Services</span>
														</div>
														<div className='flex items-center gap-2'>
															<Users className='w-4 h-4 text-green-500' />
															<span>{centre.bookings} Bookings</span>
														</div>
														<div className='flex items-center gap-2'>
															<BarChart3 className='w-4 h-4 text-purple-500' />
															<span>₦{centre.revenue.toLocaleString()}</span>
														</div>
														<div className='flex items-center gap-2'>
															<span className='text-yellow-500'>★</span>
															<span>{centre.rating} Rating</span>
														</div>
													</div>
												</div>

												<div className='flex sm:flex-row flex-col gap-2'>
													<Button
														variant='outline'
														size='sm'
														onClick={() => {
															setSelectedCentre(centre);
															setShowManageServices(true);
														}}>
														<Settings className='mr-2 w-4 h-4' />
														Manage Services
													</Button>
													<Button
														variant='outline'
														size='sm'
														onClick={() => {
															setAnalyticsCentre(centre);
															setShowAnalytics(true);
														}}>
														<BarChart3 className='mr-2 w-4 h-4' />
														View Analytics
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
						value='history'
						className='space-y-4'>
						{mockHistory.map(booking => (
							<Card key={booking.id}>
								<CardContent className='p-6'>
									<div className='flex md:flex-row flex-col justify-between md:items-center gap-4'>
										<div className='space-y-3'>
											<div className='flex items-center gap-2'>
												<h3 className='font-semibold text-lg'>
													{booking.centreName}
												</h3>
												<Badge className={getStatusColor(booking.status)}>
													{booking.status}
												</Badge>
											</div>

											<div className='space-y-2 text-gray-600 text-sm'>
												<div className='flex items-center gap-2'>
													<FileText className='w-4 h-4' />
													<span>{booking.testType}</span>
												</div>
												<div className='flex items-center gap-2'>
													<Calendar className='w-4 h-4' />
													<span>{booking.date}</span>
												</div>
											</div>
										</div>

										<div className='flex flex-col items-end gap-3'>
											<div className='text-right'>
												<p className='font-bold text-xl'>
													₦{booking.price.toLocaleString()}
												</p>
												<p className='text-gray-500 text-sm'>
													ID: {booking.id}
												</p>
											</div>

											{booking.resultAvailable && (
												<Button
													size='sm'
													onClick={() => handleDownloadResult(booking.id)}>
													<FileText className='mr-2 w-4 h-4' />
													Download Result
												</Button>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</TabsContent>

					<TabsContent value='profile'>
						<div className='space-y-6'>
							<Card>
								<CardHeader>
									<CardTitle>Personal Information</CardTitle>
								</CardHeader>
								<CardContent className='space-y-4'>
									<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
										<div>
											<label className='block mb-2 font-medium text-sm'>
												First Name
											</label>
											<Input defaultValue='John' />
										</div>
										<div>
											<label className='block mb-2 font-medium text-sm'>
												Last Name
											</label>
											<Input defaultValue='Doe' />
										</div>
									</div>

									<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
										<div>
											<label className='block mb-2 font-medium text-sm'>
												Email
											</label>
											<Input
												type='email'
												defaultValue='john.doe@example.com'
											/>
										</div>
										<div>
											<label className='block mb-2 font-medium text-sm'>
												Phone
											</label>
											<Input
												type='tel'
												defaultValue='+234 801 234 5678'
											/>
										</div>
									</div>

									<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
										<div>
											<label className='block mb-2 font-medium text-sm'>
												Date of Birth
											</label>
											<Input
												type='date'
												defaultValue='1990-01-01'
											/>
										</div>
										<div>
											<label className='block mb-2 font-medium text-sm'>
												Gender
											</label>
											<Select defaultValue='male'>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='male'>Male</SelectItem>
													<SelectItem value='female'>Female</SelectItem>
													<SelectItem value='other'>Other</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>

									<div>
										<label className='block mb-2 font-medium text-sm'>
											Address
										</label>
										<Input defaultValue='123 Lagos Street, Ikeja, Lagos' />
									</div>

									<Button>Update Profile</Button>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Notification Preferences</CardTitle>
								</CardHeader>
								<CardContent className='space-y-4'>
									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium'>Email Notifications</p>
											<p className='text-gray-600 text-sm'>
												Receive booking confirmations and reminders via email
											</p>
										</div>
										<Checkbox defaultChecked />
									</div>

									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium'>SMS Notifications</p>
											<p className='text-gray-600 text-sm'>
												Receive booking confirmations and reminders via SMS
											</p>
										</div>
										<Checkbox defaultChecked />
									</div>

									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium'>Marketing Communications</p>
											<p className='text-gray-600 text-sm'>
												Receive updates about new services and promotions
											</p>
										</div>
										<Checkbox />
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Account Security</CardTitle>
								</CardHeader>
								<CardContent className='space-y-4'>
									<Button
										variant='outline'
										onClick={() => setShowChangePassword(true)}>
										Change Password
									</Button>
									<Button
										variant='outline'
										onClick={() => setShowTwoFactorAuth(true)}>
										{twoFactorEnabled ? 'Manage' : 'Enable'} Two-Factor
										Authentication
									</Button>
									<Button variant='destructive'>Delete Account</Button>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>

			<RescheduleModal
				booking={rescheduleBooking}
				isOpen={!!rescheduleBooking}
				onClose={() => setRescheduleBooking(null)}
				onConfirm={handleReschedule}
			/>

			<CancelModal
				booking={cancelBooking}
				isOpen={!!cancelBooking}
				onClose={() => setCancelBooking(null)}
				onConfirm={handleCancel}
			/>

			<CreateCentreModal
				isOpen={showCreateCentre}
				onClose={() => setShowCreateCentre(false)}
				onConfirm={handleCreateCentre}
			/>

			<ManageServicesModal
				centre={selectedCentre}
				isOpen={showManageServices}
				onClose={() => setShowManageServices(false)}
				onConfirm={handleManageServices}
			/>

			<CentreAnalyticsModal
				centre={analyticsCentre}
				isOpen={showAnalytics}
				onClose={() => setShowAnalytics(false)}
			/>

			<ChangePasswordModal
				isOpen={showChangePassword}
				onClose={() => setShowChangePassword(false)}
				onConfirm={handleChangePassword}
			/>

			<TwoFactorAuthModal
				isOpen={showTwoFactorAuth}
				onClose={() => setShowTwoFactorAuth(false)}
				onEnable={handleEnableTwoFactor}
				isEnabled={twoFactorEnabled}
			/>
		</div>
	);
}
