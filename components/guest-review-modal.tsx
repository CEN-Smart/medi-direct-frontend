'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { MessageSquare, Send, Star, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface GuestReviewModalProps {
	centre: any;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (reviewData: any) => void;
}

const reviewCategories = [
	{ id: 'staff', label: 'Staff Friendliness', icon: '👥' },
	{ id: 'cleanliness', label: 'Cleanliness', icon: '🧽' },
	{ id: 'equipment', label: 'Equipment Quality', icon: '🔬' },
	{ id: 'waiting', label: 'Waiting Time', icon: '⏰' },
	{ id: 'results', label: 'Result Delivery', icon: '📋' },
	{ id: 'value', label: 'Value for Money', icon: '💰' },
];

export function GuestReviewModal({
	centre,
	isOpen,
	onClose,
	onSubmit,
}: GuestReviewModalProps) {
	const [formData, setFormData] = useState({
		// Personal Information
		name: '',
		email: '',
		phone: '',

		// Review Details
		overallRating: 0,
		categoryRatings: {} as Record<string, number>,
		reviewTitle: '',
		reviewText: '',
		serviceUsed: '',
		visitDate: '',

		// Additional Information
		wouldRecommend: false,
		allowContact: false,
		isAnonymous: false,

		// Experience Details
		waitTime: '',
		staffBehavior: '',
		facilityCondition: '',
		improvements: '',
	});

	const [hoveredRating, setHoveredRating] = useState(0);
	const [hoveredCategory, setHoveredCategory] = useState('');
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (field: string, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }));
		}
	};

	const handleCategoryRating = (categoryId: string, rating: number) => {
		setFormData(prev => ({
			...prev,
			categoryRatings: {
				...prev.categoryRatings,
				[categoryId]: rating,
			},
		}));
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.isAnonymous) {
			if (!formData.name.trim()) newErrors.name = 'Name is required';
			if (!formData.email.trim()) newErrors.email = 'Email is required';
			else if (!/\S+@\S+\.\S+/.test(formData.email))
				newErrors.email = 'Valid email is required';
		}

		if (formData.overallRating === 0)
			newErrors.overallRating = 'Overall rating is required';
		if (!formData.reviewText.trim())
			newErrors.reviewText = 'Review text is required';
		if (formData.reviewText.length < 10)
			newErrors.reviewText = 'Review must be at least 10 characters';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));

			const reviewData = {
				...formData,
				centreId: centre?.id,
				centreName: centre?.name,
				submittedAt: new Date().toISOString(),
				status: 'pending', // Reviews might need moderation
			};

			onSubmit(reviewData);
			handleReset();
		} catch (error) {
			console.error('Error submitting review:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleReset = () => {
		setFormData({
			name: '',
			email: '',
			phone: '',
			overallRating: 0,
			categoryRatings: {},
			reviewTitle: '',
			reviewText: '',
			serviceUsed: '',
			visitDate: '',
			wouldRecommend: false,
			allowContact: false,
			isAnonymous: false,
			waitTime: '',
			staffBehavior: '',
			facilityCondition: '',
			improvements: '',
		});
		setErrors({});
		setHoveredRating(0);
		setHoveredCategory('');
	};

	const handleClose = () => {
		handleReset();
		onClose();
	};

	const renderStars = (
		rating: number,
		onRate: (rating: number) => void,
		onHover?: (rating: number) => void
	) => {
		return (
			<div className='flex gap-1'>
				{[1, 2, 3, 4, 5].map(star => (
					<Star
						key={star}
						className={`w-6 h-6 cursor-pointer transition-colors ${
							star <= (onHover ? hoveredRating : rating)
								? 'text-yellow-400 fill-current'
								: 'text-gray-300 hover:text-yellow-200'
						}`}
						onClick={() => onRate(star)}
						onMouseEnter={() => onHover && onHover(star)}
						onMouseLeave={() => onHover && onHover(0)}
					/>
				))}
			</div>
		);
	};

	if (!centre) return null;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleClose}>
			<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<MessageSquare className='w-5 h-5 text-blue-600' />
						Write a Review for {centre.name}
					</DialogTitle>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Centre Information */}
					<Card className='bg-blue-50 border-blue-200'>
						<CardContent className='p-4'>
							<div className='flex justify-between items-center'>
								<div>
									<h3 className='font-semibold text-blue-900'>{centre.name}</h3>
									<p className='text-blue-700 text-sm'>{centre.location}</p>
								</div>
								<Badge className='bg-blue-100 text-blue-800'>
									⭐ {centre.rating || '4.5'} ({centre.reviewCount || '128'}{' '}
									reviews)
								</Badge>
							</div>
						</CardContent>
					</Card>

					{/* Anonymous Option */}
					<Card>
						<CardContent className='p-4'>
							<div className='flex justify-between items-center'>
								<div>
									<p className='font-medium'>Submit Anonymous Review</p>
									<p className='text-gray-600 text-sm'>
										Your personal information will not be displayed publicly
									</p>
								</div>
								<Checkbox
									checked={formData.isAnonymous}
									onCheckedChange={checked =>
										handleInputChange('isAnonymous', checked)
									}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Personal Information */}
					{!formData.isAnonymous && (
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2 text-lg'>
									<User className='w-5 h-5' />
									Your Information
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
									<div>
										<Label htmlFor='name'>Full Name *</Label>
										<Input
											id='name'
											value={formData.name}
											onChange={e => handleInputChange('name', e.target.value)}
											placeholder='Your full name'
											className={errors.name ? 'border-red-500' : ''}
										/>
										{errors.name && (
											<p className='mt-1 text-red-500 text-sm'>{errors.name}</p>
										)}
									</div>

									<div>
										<Label htmlFor='email'>Email Address *</Label>
										<Input
											id='email'
											type='email'
											value={formData.email}
											onChange={e => handleInputChange('email', e.target.value)}
											placeholder='your.email@example.com'
											className={errors.email ? 'border-red-500' : ''}
										/>
										{errors.email && (
											<p className='mt-1 text-red-500 text-sm'>
												{errors.email}
											</p>
										)}
									</div>
								</div>

								<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
									<div>
										<Label htmlFor='phone'>Phone Number (Optional)</Label>
										<Input
											id='phone'
											type='tel'
											value={formData.phone}
											onChange={e => handleInputChange('phone', e.target.value)}
											placeholder='+234 801 234 5678'
										/>
									</div>

									<div>
										<Label htmlFor='visitDate'>Visit Date</Label>
										<Input
											id='visitDate'
											type='date'
											value={formData.visitDate}
											onChange={e =>
												handleInputChange('visitDate', e.target.value)
											}
											max={new Date().toISOString().split('T')[0]}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Overall Rating */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Overall Rating *</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4 text-center'>
								<div className='flex justify-center'>
									{renderStars(
										formData.overallRating,
										rating => handleInputChange('overallRating', rating),
										setHoveredRating
									)}
								</div>
								<p className='text-gray-600 text-sm'>
									{formData.overallRating === 0
										? 'Click to rate your overall experience'
										: `You rated this centre ${formData.overallRating} out of 5 stars`}
								</p>
								{errors.overallRating && (
									<p className='text-red-500 text-sm'>{errors.overallRating}</p>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Category Ratings */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Rate Different Aspects</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
								{reviewCategories.map(category => (
									<div
										key={category.id}
										className='space-y-2'>
										<div className='flex items-center gap-2'>
											<span className='text-lg'>{category.icon}</span>
											<Label className='font-medium'>{category.label}</Label>
										</div>
										<div className='flex gap-1'>
											{[1, 2, 3, 4, 5].map(star => (
												<Star
													key={star}
													className={`w-5 h-5 cursor-pointer transition-colors ${
														star <= (formData.categoryRatings[category.id] || 0)
															? 'text-yellow-400 fill-current'
															: 'text-gray-300 hover:text-yellow-200'
													}`}
													onClick={() =>
														handleCategoryRating(category.id, star)
													}
												/>
											))}
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Review Content */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Your Review</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div>
								<Label htmlFor='reviewTitle'>Review Title (Optional)</Label>
								<Input
									id='reviewTitle'
									value={formData.reviewTitle}
									onChange={e =>
										handleInputChange('reviewTitle', e.target.value)
									}
									placeholder='Summarize your experience in a few words'
								/>
							</div>

							<div>
								<Label htmlFor='serviceUsed'>Service Used</Label>
								<Input
									id='serviceUsed'
									value={formData.serviceUsed}
									onChange={e =>
										handleInputChange('serviceUsed', e.target.value)
									}
									placeholder='e.g., Blood Test, X-Ray, MRI Scan'
								/>
							</div>

							<div>
								<Label htmlFor='reviewText'>Your Review *</Label>
								<Textarea
									id='reviewText'
									value={formData.reviewText}
									onChange={e =>
										handleInputChange('reviewText', e.target.value)
									}
									placeholder='Share your experience with this diagnostic centre. What did you like? What could be improved?'
									rows={5}
									className={errors.reviewText ? 'border-red-500' : ''}
								/>
								<div className='flex justify-between items-center mt-1'>
									{errors.reviewText && (
										<p className='text-red-500 text-sm'>{errors.reviewText}</p>
									)}
									<p className='ml-auto text-gray-500 text-sm'>
										{formData.reviewText.length}/500 characters
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Additional Details */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>
								Additional Details (Optional)
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
								<div>
									<Label htmlFor='waitTime'>Waiting Time</Label>
									<Input
										id='waitTime'
										value={formData.waitTime}
										onChange={e =>
											handleInputChange('waitTime', e.target.value)
										}
										placeholder='e.g., 15 minutes, 1 hour'
									/>
								</div>

								<div>
									<Label htmlFor='staffBehavior'>Staff Behavior</Label>
									<Input
										id='staffBehavior'
										value={formData.staffBehavior}
										onChange={e =>
											handleInputChange('staffBehavior', e.target.value)
										}
										placeholder='e.g., Professional, Friendly, Helpful'
									/>
								</div>
							</div>

							<div>
								<Label htmlFor='facilityCondition'>Facility Condition</Label>
								<Input
									id='facilityCondition'
									value={formData.facilityCondition}
									onChange={e =>
										handleInputChange('facilityCondition', e.target.value)
									}
									placeholder='e.g., Clean, Modern, Well-maintained'
								/>
							</div>

							<div>
								<Label htmlFor='improvements'>
									Suggestions for Improvement
								</Label>
								<Textarea
									id='improvements'
									value={formData.improvements}
									onChange={e =>
										handleInputChange('improvements', e.target.value)
									}
									placeholder='What could this centre do better?'
									rows={3}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Preferences */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Preferences</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='flex justify-between items-center'>
								<div>
									<p className='font-medium'>
										Would you recommend this centre?
									</p>
									<p className='text-gray-600 text-sm'>
										Help others make informed decisions
									</p>
								</div>
								<Checkbox
									checked={formData.wouldRecommend}
									onCheckedChange={checked =>
										handleInputChange('wouldRecommend', checked)
									}
								/>
							</div>

							{!formData.isAnonymous && (
								<div className='flex justify-between items-center'>
									<div>
										<p className='font-medium'>Allow centre to contact you</p>
										<p className='text-gray-600 text-sm'>
											For follow-up or to address any concerns
										</p>
									</div>
									<Checkbox
										checked={formData.allowContact}
										onCheckedChange={checked =>
											handleInputChange('allowContact', checked)
										}
									/>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Review Preview */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Review Preview</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='bg-gray-50 p-4 border rounded-lg'>
								<div className='flex justify-between items-center mb-3'>
									<div>
										<p className='font-medium'>
											{formData.isAnonymous
												? 'Anonymous User'
												: formData.name || 'Your Name'}
										</p>
										<div className='flex items-center gap-2'>
											<div className='flex gap-1'>
												{[1, 2, 3, 4, 5].map(star => (
													<Star
														key={star}
														className={`w-4 h-4 ${
															star <= formData.overallRating
																? 'text-yellow-400 fill-current'
																: 'text-gray-300'
														}`}
													/>
												))}
											</div>
											<span className='text-gray-600 text-sm'>
												{formData.visitDate &&
													`• Visited on ${formData.visitDate}`}
											</span>
										</div>
									</div>
									{formData.wouldRecommend && (
										<Badge className='bg-green-100 text-green-800'>
											Recommended
										</Badge>
									)}
								</div>

								{formData.reviewTitle && (
									<h4 className='mb-2 font-medium'>{formData.reviewTitle}</h4>
								)}

								<p className='mb-3 text-gray-700'>
									{formData.reviewText || 'Your review will appear here...'}
								</p>

								{formData.serviceUsed && (
									<p className='text-gray-600 text-sm'>
										<strong>Service used:</strong> {formData.serviceUsed}
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
							disabled={isSubmitting}
							className='bg-blue-600 hover:bg-blue-700'>
							{isSubmitting ? (
								<>
									<div className='mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin' />
									Submitting...
								</>
							) : (
								<>
									<Send className='mr-2 w-4 h-4' />
									Submit Review
								</>
							)}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
