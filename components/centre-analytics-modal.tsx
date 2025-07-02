'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
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
	BarChart3,
	Calendar,
	Clock,
	DollarSign,
	Download,
	MapPin,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';

interface CentreAnalyticsModalProps {
	centre: any;
	isOpen: boolean;
	onClose: () => void;
}

// Mock analytics data - replace with real API data
const mockAnalytics = {
	overview: {
		totalBookings: 1247,
		totalRevenue: 15680000,
		averageRating: 4.6,
		totalPatients: 892,
		bookingGrowth: 23.5,
		revenueGrowth: 18.2,
		ratingChange: 0.3,
		patientGrowth: 15.8,
	},
	monthlyRevenue: [
		{ month: 'Jan', revenue: 1200000, bookings: 98, target: 1100000 },
		{ month: 'Feb', revenue: 1350000, bookings: 112, target: 1200000 },
		{ month: 'Mar', revenue: 1180000, bookings: 95, target: 1300000 },
		{ month: 'Apr', revenue: 1420000, bookings: 118, target: 1400000 },
		{ month: 'May', revenue: 1680000, bookings: 142, target: 1500000 },
		{ month: 'Jun', revenue: 1580000, bookings: 128, target: 1600000 },
		{ month: 'Jul', revenue: 1750000, bookings: 156, target: 1700000 },
		{ month: 'Aug', revenue: 1620000, bookings: 134, target: 1800000 },
		{ month: 'Sep', revenue: 1890000, bookings: 167, target: 1900000 },
		{ month: 'Oct', revenue: 1720000, bookings: 145, target: 2000000 },
		{ month: 'Nov', revenue: 1980000, bookings: 178, target: 2100000 },
		{ month: 'Dec', revenue: 2100000, bookings: 189, target: 2200000 },
	],
	revenueByCategory: [
		{
			category: 'Blood Tests',
			revenue: 7056000,
			percentage: 45,
			color: '#3b82f6',
		},
		{ category: 'Imaging', revenue: 5488000, percentage: 35, color: '#10b981' },
		{
			category: 'Cardiac Tests',
			revenue: 3136000,
			percentage: 20,
			color: '#8b5cf6',
		},
	],
	topServices: [
		{
			name: 'Blood Test (Full Panel)',
			bookings: 234,
			revenue: 819000,
			growth: 12.5,
		},
		{ name: 'Chest X-Ray', bookings: 189, revenue: 1512000, growth: 8.3 },
		{ name: 'ECG', bookings: 156, revenue: 780000, growth: 15.2 },
		{
			name: 'Ultrasound Abdomen',
			bookings: 134,
			revenue: 2010000,
			growth: 22.1,
		},
		{ name: 'Lipid Profile', bookings: 98, revenue: 490000, growth: 5.7 },
	],
	bookingTrends: {
		daily: [
			{ day: 'Mon', bookings: 23 },
			{ day: 'Tue', bookings: 28 },
			{ day: 'Wed', bookings: 31 },
			{ day: 'Thu', bookings: 26 },
			{ day: 'Fri', bookings: 34 },
			{ day: 'Sat', bookings: 19 },
			{ day: 'Sun', bookings: 12 },
		],
		hourly: [
			{ hour: '8AM', bookings: 8 },
			{ hour: '9AM', bookings: 15 },
			{ hour: '10AM', bookings: 22 },
			{ hour: '11AM', bookings: 18 },
			{ hour: '12PM', bookings: 12 },
			{ hour: '1PM', bookings: 8 },
			{ hour: '2PM', bookings: 16 },
			{ hour: '3PM', bookings: 20 },
			{ hour: '4PM', bookings: 14 },
			{ hour: '5PM', bookings: 10 },
		],
	},
	demographics: {
		ageGroups: [
			{ range: '18-25', percentage: 15, count: 134 },
			{ range: '26-35', percentage: 28, count: 250 },
			{ range: '36-45', percentage: 32, count: 285 },
			{ range: '46-55', percentage: 18, count: 161 },
			{ range: '56+', percentage: 7, count: 62 },
		],
		gender: [
			{ type: 'Female', percentage: 58, count: 517 },
			{ type: 'Male', percentage: 42, count: 375 },
		],
		locations: [
			{ area: 'Ikeja', percentage: 35, count: 312 },
			{ area: 'Victoria Island', percentage: 22, count: 196 },
			{ area: 'Surulere', percentage: 18, count: 161 },
			{ area: 'Yaba', percentage: 12, count: 107 },
			{ area: 'Others', percentage: 13, count: 116 },
		],
	},
	reviews: {
		averageRating: 4.6,
		totalReviews: 234,
		ratingDistribution: [
			{ stars: 5, count: 145, percentage: 62 },
			{ stars: 4, count: 56, percentage: 24 },
			{ stars: 3, count: 23, percentage: 10 },
			{ stars: 2, count: 7, percentage: 3 },
			{ stars: 1, count: 3, percentage: 1 },
		],
		recentReviews: [
			{
				id: 1,
				patient: 'Adebayo J.',
				rating: 5,
				comment:
					'Excellent service and very professional staff. Highly recommended!',
				date: '2024-01-15',
				service: 'Blood Test',
			},
			{
				id: 2,
				patient: 'Funmi A.',
				rating: 4,
				comment:
					'Good facilities and quick service. Will definitely come back.',
				date: '2024-01-14',
				service: 'X-Ray',
			},
			{
				id: 3,
				patient: 'Kemi O.',
				rating: 5,
				comment:
					'Very clean environment and friendly staff. Results were ready on time.',
				date: '2024-01-13',
				service: 'Ultrasound',
			},
		],
	},
	performance: {
		averageWaitTime: 12, // minutes
		appointmentCompletionRate: 94.5,
		patientRetentionRate: 78.3,
		onTimePerformance: 89.2,
		cancellationRate: 5.5,
	},
};

// Chart configurations
const revenueChartConfig = {
	revenue: {
		label: 'Revenue',
		color: '#3b82f6',
	},
	target: {
		label: 'Target',
		color: '#e5e7eb',
	},
	bookings: {
		label: 'Bookings',
		color: '#10b981',
	},
};

const categoryChartConfig = {
	'Blood Tests': {
		label: 'Blood Tests',
		color: '#3b82f6',
	},
	Imaging: {
		label: 'Imaging',
		color: '#10b981',
	},
	'Cardiac Tests': {
		label: 'Cardiac Tests',
		color: '#8b5cf6',
	},
};

export function CentreAnalyticsModal({
	centre,
	isOpen,
	onClose,
}: CentreAnalyticsModalProps) {
	const [selectedPeriod, setSelectedPeriod] = useState('12months');
	const [activeTab, setActiveTab] = useState('overview');

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN',
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const formatPercentage = (value: number, showSign = true) => {
		const sign = showSign && value > 0 ? '+' : '';
		return `${sign}${value.toFixed(1)}%`;
	};

	const getGrowthColor = (growth: number) => {
		return growth > 0
			? 'text-green-600'
			: growth < 0
			? 'text-red-600'
			: 'text-gray-600';
	};

	const exportData = () => {
		// Simulate data export
		const dataStr = JSON.stringify(mockAnalytics, null, 2);
		const dataBlob = new Blob([dataStr], { type: 'application/json' });
		const url = URL.createObjectURL(dataBlob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${centre?.name}-analytics-${
			new Date().toISOString().split('T')[0]
		}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	if (!centre) return null;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}>
			<DialogContent className='max-w-7xl max-h-[95vh] overflow-y-auto'>
				<DialogHeader>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-2'>
							<BarChart3 className='w-5 h-5 text-blue-600' />
							<DialogTitle>Analytics - {centre.name}</DialogTitle>
						</div>
						<div className='flex items-center gap-2'>
							<Select
								value={selectedPeriod}
								onValueChange={setSelectedPeriod}>
								<SelectTrigger className='w-32'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='7days'>7 Days</SelectItem>
									<SelectItem value='30days'>30 Days</SelectItem>
									<SelectItem value='3months'>3 Months</SelectItem>
									<SelectItem value='6months'>6 Months</SelectItem>
									<SelectItem value='12months'>12 Months</SelectItem>
								</SelectContent>
							</Select>
							<Button
								variant='outline'
								size='sm'
								onClick={exportData}>
								<Download className='mr-2 w-4 h-4' />
								Export
							</Button>
						</div>
					</div>
				</DialogHeader>

				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className='space-y-6'>
					<TabsList className='grid grid-cols-5 w-full'>
						<TabsTrigger value='overview'>Overview</TabsTrigger>
						<TabsTrigger value='revenue'>Revenue</TabsTrigger>
						<TabsTrigger value='bookings'>Bookings</TabsTrigger>
						<TabsTrigger value='patients'>Patients</TabsTrigger>
						<TabsTrigger value='reviews'>Reviews</TabsTrigger>
					</TabsList>

					{/* Overview Tab */}
					<TabsContent
						value='overview'
						className='space-y-6'>
						{/* Key Metrics */}
						<div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
							<Card>
								<CardContent className='p-6'>
									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium text-gray-600 text-sm'>
												Total Bookings
											</p>
											<p className='font-bold text-2xl'>
												{mockAnalytics.overview.totalBookings.toLocaleString()}
											</p>
											<p
												className={`text-sm ${getGrowthColor(
													mockAnalytics.overview.bookingGrowth
												)}`}>
												{formatPercentage(mockAnalytics.overview.bookingGrowth)}{' '}
												from last period
											</p>
										</div>
										<Calendar className='w-8 h-8 text-blue-500' />
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className='p-6'>
									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium text-gray-600 text-sm'>
												Total Revenue
											</p>
											<p className='font-bold text-2xl'>
												{formatCurrency(mockAnalytics.overview.totalRevenue)}
											</p>
											<p
												className={`text-sm ${getGrowthColor(
													mockAnalytics.overview.revenueGrowth
												)}`}>
												{formatPercentage(mockAnalytics.overview.revenueGrowth)}{' '}
												from last period
											</p>
										</div>
										<DollarSign className='w-8 h-8 text-green-500' />
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className='p-6'>
									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium text-gray-600 text-sm'>
												Average Rating
											</p>
											<p className='font-bold text-2xl'>
												{mockAnalytics.overview.averageRating}
											</p>
											<p
												className={`text-sm ${getGrowthColor(
													mockAnalytics.overview.ratingChange
												)}`}>
												{formatPercentage(mockAnalytics.overview.ratingChange)}{' '}
												from last period
											</p>
										</div>
										<Star className='w-8 h-8 text-yellow-500' />
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className='p-6'>
									<div className='flex justify-between items-center'>
										<div>
											<p className='font-medium text-gray-600 text-sm'>
												Total Patients
											</p>
											<p className='font-bold text-2xl'>
												{mockAnalytics.overview.totalPatients.toLocaleString()}
											</p>
											<p
												className={`text-sm ${getGrowthColor(
													mockAnalytics.overview.patientGrowth
												)}`}>
												{formatPercentage(mockAnalytics.overview.patientGrowth)}{' '}
												from last period
											</p>
										</div>
										<Users className='w-8 h-8 text-purple-500' />
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Performance Metrics */}
						<Card>
							<CardHeader>
								<CardTitle>Performance Metrics</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
									<div className='space-y-2'>
										<div className='flex justify-between items-center'>
											<span className='font-medium text-sm'>
												Completion Rate
											</span>
											<span className='font-bold text-sm'>
												{mockAnalytics.performance.appointmentCompletionRate}%
											</span>
										</div>
										<Progress
											value={
												mockAnalytics.performance.appointmentCompletionRate
											}
											className='h-2'
										/>
									</div>

									<div className='space-y-2'>
										<div className='flex justify-between items-center'>
											<span className='font-medium text-sm'>
												On-Time Performance
											</span>
											<span className='font-bold text-sm'>
												{mockAnalytics.performance.onTimePerformance}%
											</span>
										</div>
										<Progress
											value={mockAnalytics.performance.onTimePerformance}
											className='h-2'
										/>
									</div>

									<div className='space-y-2'>
										<div className='flex justify-between items-center'>
											<span className='font-medium text-sm'>
												Patient Retention
											</span>
											<span className='font-bold text-sm'>
												{mockAnalytics.performance.patientRetentionRate}%
											</span>
										</div>
										<Progress
											value={mockAnalytics.performance.patientRetentionRate}
											className='h-2'
										/>
									</div>

									<div className='space-y-2'>
										<div className='flex justify-between items-center'>
											<span className='font-medium text-sm'>
												Avg. Wait Time
											</span>
											<span className='font-bold text-sm'>
												{mockAnalytics.performance.averageWaitTime} min
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<Clock className='w-4 h-4 text-blue-500' />
											<span className='text-gray-600 text-xs'>
												Target: 15 min
											</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Top Services */}
						<Card>
							<CardHeader>
								<CardTitle>Top Performing Services</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									{mockAnalytics.topServices.map((service, index) => (
										<div
											key={index}
											className='flex justify-between items-center p-4 border rounded-lg'>
											<div className='flex items-center gap-4'>
												<div className='flex justify-center items-center bg-blue-100 rounded-full w-8 h-8'>
													<span className='font-bold text-blue-600 text-sm'>
														#{index + 1}
													</span>
												</div>
												<div>
													<p className='font-medium'>{service.name}</p>
													<p className='text-gray-600 text-sm'>
														{service.bookings} bookings
													</p>
												</div>
											</div>
											<div className='text-right'>
												<p className='font-semibold'>
													{formatCurrency(service.revenue)}
												</p>
												<p
													className={`text-sm ${getGrowthColor(
														service.growth
													)}`}>
													{formatPercentage(service.growth)}
												</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Revenue Tab */}
					<TabsContent
						value='revenue'
						className='space-y-6'>
						{/* Revenue Trends Chart */}
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<TrendingUp className='w-5 h-5' />
									Revenue Trends
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={revenueChartConfig}
									className='h-80'>
									<AreaChart data={mockAnalytics.monthlyRevenue}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis
											dataKey='month'
											tickLine={false}
											axisLine={false}
											tickMargin={8}
										/>
										<YAxis
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											tickFormatter={value =>
												`₦${(value / 1000000).toFixed(1)}M`
											}
										/>
										<ChartTooltip
											content={
												<ChartTooltipContent
													formatter={(value, name) => [
														name === 'revenue' || name === 'target'
															? formatCurrency(value as number)
															: value,
														name === 'revenue'
															? 'Revenue'
															: name === 'target'
															? 'Target'
															: 'Bookings',
													]}
												/>
											}
										/>
										<Area
											type='monotone'
											dataKey='target'
											stackId='1'
											stroke='var(--color-target)'
											fill='var(--color-target)'
											fillOpacity={0.2}
										/>
										<Area
											type='monotone'
											dataKey='revenue'
											stackId='2'
											stroke='var(--color-revenue)'
											fill='var(--color-revenue)'
											fillOpacity={0.6}
										/>
									</AreaChart>
								</ChartContainer>
							</CardContent>
						</Card>

						<div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
							{/* Monthly Breakdown */}
							<Card>
								<CardHeader>
									<CardTitle>Monthly Breakdown</CardTitle>
								</CardHeader>
								<CardContent>
									<ChartContainer
										config={revenueChartConfig}
										className='h-64'>
										<BarChart data={mockAnalytics.monthlyRevenue.slice(-6)}>
											<CartesianGrid strokeDasharray='3 3' />
											<XAxis
												dataKey='month'
												tickLine={false}
												axisLine={false}
												tickMargin={8}
											/>
											<YAxis
												tickLine={false}
												axisLine={false}
												tickMargin={8}
												tickFormatter={value =>
													`₦${(value / 1000000).toFixed(1)}M`
												}
											/>
											<ChartTooltip
												content={
													<ChartTooltipContent
														formatter={(value, name) => [
															name === 'revenue'
																? formatCurrency(value as number)
																: value,
															name === 'revenue' ? 'Revenue' : 'Bookings',
														]}
													/>
												}
											/>
											<Bar
												dataKey='revenue'
												fill='var(--color-revenue)'
												radius={4}
											/>
										</BarChart>
									</ChartContainer>
								</CardContent>
							</Card>

							{/* Revenue by Service Category */}
							<Card>
								<CardHeader>
									<CardTitle>Revenue by Service Category</CardTitle>
								</CardHeader>
								<CardContent>
									<ChartContainer
										config={categoryChartConfig}
										className='h-64'>
										<PieChart>
											<Pie
												data={mockAnalytics.revenueByCategory}
												cx='50%'
												cy='50%'
												outerRadius={80}
												fill='#8884d8'
												dataKey='revenue'
												label={({ category, percentage }) =>
													`${category}: ${percentage}%`
												}>
												{mockAnalytics.revenueByCategory.map((entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={entry.color}
													/>
												))}
											</Pie>
											<ChartTooltip
												content={
													<ChartTooltipContent
														formatter={(value, name) => [
															formatCurrency(value as number),
															'Revenue',
														]}
													/>
												}
											/>
											<ChartLegend content={<ChartLegendContent />} />
										</PieChart>
									</ChartContainer>
								</CardContent>
							</Card>
						</div>

						{/* Revenue Summary Cards */}
						<div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
							<Card>
								<CardContent className='p-6 text-center'>
									<p className='font-bold text-green-600 text-2xl'>
										{formatCurrency(
											mockAnalytics.monthlyRevenue.reduce(
												(sum, month) => sum + month.revenue,
												0
											)
										)}
									</p>
									<p className='text-gray-600 text-sm'>
										Total Revenue (12 months)
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className='p-6 text-center'>
									<p className='font-bold text-blue-600 text-2xl'>
										{formatCurrency(
											mockAnalytics.monthlyRevenue.reduce(
												(sum, month) => sum + month.revenue,
												0
											) / 12
										)}
									</p>
									<p className='text-gray-600 text-sm'>
										Average Monthly Revenue
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className='p-6 text-center'>
									<p className='font-bold text-purple-600 text-2xl'>
										{formatCurrency(
											Math.max(
												...mockAnalytics.monthlyRevenue.map(m => m.revenue)
											)
										)}
									</p>
									<p className='text-gray-600 text-sm'>
										Highest Monthly Revenue
									</p>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					{/* Bookings Tab */}
					<TabsContent
						value='bookings'
						className='space-y-6'>
						<div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
							<Card>
								<CardHeader>
									<CardTitle>Daily Booking Trends</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-3'>
										{mockAnalytics.bookingTrends.daily.map((day, index) => (
											<div
												key={index}
												className='flex justify-between items-center'>
												<span className='font-medium text-sm'>{day.day}</span>
												<div className='flex items-center gap-2'>
													<div className='bg-gray-200 rounded-full w-32 h-2'>
														<div
															className='bg-blue-500 rounded-full h-2'
															style={{
																width: `${(day.bookings / 34) * 100}%`,
															}}></div>
													</div>
													<span className='w-8 font-medium text-sm'>
														{day.bookings}
													</span>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Peak Hours</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-3'>
										{mockAnalytics.bookingTrends.hourly.map((hour, index) => (
											<div
												key={index}
												className='flex justify-between items-center'>
												<span className='font-medium text-sm'>{hour.hour}</span>
												<div className='flex items-center gap-2'>
													<div className='bg-gray-200 rounded-full w-24 h-2'>
														<div
															className='bg-green-500 rounded-full h-2'
															style={{
																width: `${(hour.bookings / 22) * 100}%`,
															}}></div>
													</div>
													<span className='w-8 font-medium text-sm'>
														{hour.bookings}
													</span>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Booking Status Distribution</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='gap-4 grid grid-cols-2 md:grid-cols-4'>
									<div className='p-4 border rounded-lg text-center'>
										<p className='font-bold text-green-600 text-2xl'>94.5%</p>
										<p className='text-gray-600 text-sm'>Completed</p>
									</div>
									<div className='p-4 border rounded-lg text-center'>
										<p className='font-bold text-yellow-600 text-2xl'>3.2%</p>
										<p className='text-gray-600 text-sm'>Rescheduled</p>
									</div>
									<div className='p-4 border rounded-lg text-center'>
										<p className='font-bold text-red-600 text-2xl'>2.3%</p>
										<p className='text-gray-600 text-sm'>Cancelled</p>
									</div>
									<div className='p-4 border rounded-lg text-center'>
										<p className='font-bold text-blue-600 text-2xl'>12</p>
										<p className='text-gray-600 text-sm'>Avg Wait (min)</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Patients Tab */}
					<TabsContent
						value='patients'
						className='space-y-6'>
						<div className='gap-6 grid grid-cols-1 lg:grid-cols-3'>
							<Card>
								<CardHeader>
									<CardTitle>Age Distribution</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-3'>
										{mockAnalytics.demographics.ageGroups.map(
											(group, index) => (
												<div
													key={index}
													className='flex justify-between items-center'>
													<span className='font-medium text-sm'>
														{group.range}
													</span>
													<div className='flex items-center gap-2'>
														<div className='bg-gray-200 rounded-full w-20 h-2'>
															<div
																className='bg-purple-500 rounded-full h-2'
																style={{ width: `${group.percentage}%` }}></div>
														</div>
														<span className='font-medium text-sm'>
															{group.percentage}%
														</span>
													</div>
												</div>
											)
										)}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Gender Distribution</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										{mockAnalytics.demographics.gender.map((gender, index) => (
											<div
												key={index}
												className='flex justify-between items-center'>
												<span className='font-medium text-sm'>
													{gender.type}
												</span>
												<div className='flex items-center gap-2'>
													<div className='bg-gray-200 rounded-full w-24 h-3'>
														<div
															className={`h-3 rounded-full ${
																index === 0 ? 'bg-pink-500' : 'bg-blue-500'
															}`}
															style={{ width: `${gender.percentage}%` }}></div>
													</div>
													<span className='font-medium text-sm'>
														{gender.percentage}%
													</span>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Patient Locations</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-3'>
										{mockAnalytics.demographics.locations.map(
											(location, index) => (
												<div
													key={index}
													className='flex justify-between items-center'>
													<div className='flex items-center gap-2'>
														<MapPin className='w-4 h-4 text-gray-400' />
														<span className='font-medium text-sm'>
															{location.area}
														</span>
													</div>
													<div className='flex items-center gap-2'>
														<span className='text-sm'>{location.count}</span>
														<Badge variant='outline'>
															{location.percentage}%
														</Badge>
													</div>
												</div>
											)
										)}
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					{/* Reviews Tab */}
					<TabsContent
						value='reviews'
						className='space-y-6'>
						<div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
							<Card>
								<CardHeader>
									<CardTitle>Rating Overview</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='mb-6 text-center'>
										<p className='font-bold text-4xl'>
											{mockAnalytics.reviews.averageRating}
										</p>
										<div className='flex justify-center gap-1 my-2'>
											{[1, 2, 3, 4, 5].map(star => (
												<Star
													key={star}
													className={`w-5 h-5 ${
														star <=
														Math.floor(mockAnalytics.reviews.averageRating)
															? 'text-yellow-400 fill-current'
															: 'text-gray-300'
													}`}
												/>
											))}
										</div>
										<p className='text-gray-600 text-sm'>
											{mockAnalytics.reviews.totalReviews} total reviews
										</p>
									</div>

									<div className='space-y-2'>
										{mockAnalytics.reviews.ratingDistribution.map(
											(rating, index) => (
												<div
													key={index}
													className='flex items-center gap-2'>
													<span className='w-6 text-sm'>{rating.stars}★</span>
													<div className='flex-1 bg-gray-200 rounded-full h-2'>
														<div
															className='bg-yellow-400 rounded-full h-2'
															style={{ width: `${rating.percentage}%` }}></div>
													</div>
													<span className='w-12 text-sm text-right'>
														{rating.count}
													</span>
												</div>
											)
										)}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Recent Reviews</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										{mockAnalytics.reviews.recentReviews.map(review => (
											<div
												key={review.id}
												className='pb-4 border-b last:border-b-0'>
												<div className='flex justify-between items-center mb-2'>
													<div className='flex items-center gap-2'>
														<span className='font-medium text-sm'>
															{review.patient}
														</span>
														<div className='flex gap-1'>
															{[1, 2, 3, 4, 5].map(star => (
																<Star
																	key={star}
																	className={`w-3 h-3 ${
																		star <= review.rating
																			? 'text-yellow-400 fill-current'
																			: 'text-gray-300'
																	}`}
																/>
															))}
														</div>
													</div>
													<span className='text-gray-500 text-xs'>
														{review.date}
													</span>
												</div>
												<p className='mb-1 text-gray-600 text-sm'>
													{review.comment}
												</p>
												<Badge
													variant='outline'
													className='text-xs'>
													{review.service}
												</Badge>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
