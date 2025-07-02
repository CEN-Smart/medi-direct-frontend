'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Textarea } from '@/components/ui/textarea';
import { animations } from '@/lib/animations';
import { AlertTriangle, RefreshCw, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Booking {
	id: string;
	centreName: string;
	testType: string;
	date: string;
	time: string;
	status: string;
	price: number;
	location: string;
	phone: string;
}

interface CancelModalProps {
	booking: Booking | null;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (bookingId: string, reason: string, feedback: string) => void;
}

const cancellationReasons = [
	'No longer need the test',
	'Found a better price elsewhere',
	'Scheduling conflict',
	'Health condition improved',
	'Financial constraints',
	'Dissatisfied with service',
	'Emergency situation',
	'Other',
];

export function CancelModal({
	booking,
	isOpen,
	onClose,
	onConfirm,
}: CancelModalProps) {
	const [step, setStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		reason: '',
		customReason: '',
		feedback: '',
		confirmCancel: false,
	});

	useEffect(() => {
		if (isOpen) {
			setStep(1);
			setFormData({
				reason: '',
				customReason: '',
				feedback: '',
				confirmCancel: false,
			});
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && step === 1) {
			const modalContent = document.querySelector('.cancel-modal-content');
			if (modalContent) {
				animations.pageEnter(modalContent);
			}
		}
	}, [isOpen, step]);

	const handleNext = () => {
		if (step < 2) {
			setStep(step + 1);
			// Animate step transition
			setTimeout(() => {
				const nextStepElement = document.querySelector(
					`[data-cancel-step="${step + 1}"]`
				);
				if (nextStepElement) {
					animations.pageEnter(nextStepElement);
				}
			}, 100);
		}
	};

	const handleConfirm = async () => {
		setIsLoading(true);

		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 2000));

		const reason =
			formData.reason === 'Other' ? formData.customReason : formData.reason;
		onConfirm(booking!.id, reason, formData.feedback);

		setIsLoading(false);
		setStep(3); // Success step
	};

	const isFormValid =
		formData.reason &&
		(formData.reason !== 'Other' || formData.customReason.trim()) &&
		formData.confirmCancel;

	// Calculate refund amount (example logic)
	const getRefundInfo = () => {
		if (!booking) return { amount: 0, percentage: 0 };

		const appointmentDate = new Date(booking.date);
		const today = new Date();
		const daysUntilAppointment = Math.ceil(
			(appointmentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
		);

		if (daysUntilAppointment >= 7) {
			return { amount: booking.price, percentage: 100 };
		} else if (daysUntilAppointment >= 3) {
			return { amount: booking.price * 0.75, percentage: 75 };
		} else if (daysUntilAppointment >= 1) {
			return { amount: booking.price * 0.5, percentage: 50 };
		} else {
			return { amount: 0, percentage: 0 };
		}
	};

	const refundInfo = getRefundInfo();

	if (!booking) return null;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}>
			<DialogContent className='max-w-2xl cancel-modal-content'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<XCircle className='w-5 h-5 text-red-600' />
						Cancel Appointment
					</DialogTitle>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Progress Indicator */}
					<div className='flex justify-center items-center space-x-4'>
						{[1, 2].map(stepNum => (
							<div
								key={stepNum}
								className='flex items-center'>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
										step >= stepNum
											? 'bg-red-600 text-white'
											: 'bg-gray-200 text-gray-600'
									}`}>
									{stepNum}
								</div>
								{stepNum < 2 && (
									<div
										className={`w-12 h-1 mx-2 transition-all duration-300 ${
											step > stepNum ? 'bg-red-600' : 'bg-gray-200'
										}`}
									/>
								)}
							</div>
						))}
					</div>

					{/* Appointment Info */}
					<Card className='bg-red-50 border-red-200'>
						<CardContent className='p-4'>
							<h3 className='mb-2 font-semibold text-red-900'>
								Appointment to Cancel
							</h3>
							<div className='gap-4 grid grid-cols-1 md:grid-cols-2 text-sm'>
								<div>
									<p className='text-red-700'>
										<strong>Centre:</strong> {booking.centreName}
									</p>
									<p className='text-red-700'>
										<strong>Test:</strong> {booking.testType}
									</p>
								</div>
								<div>
									<p className='text-red-700'>
										<strong>Date:</strong> {booking.date}
									</p>
									<p className='text-red-700'>
										<strong>Time:</strong> {booking.time}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Step 1: Reason & Refund Info */}
					{step === 1 && (
						<div
							data-cancel-step='1'
							className='space-y-4'>
							<div>
								<h3 className='mb-4 font-semibold text-lg'>
									Why are you cancelling?
								</h3>
								<Select
									value={formData.reason}
									onValueChange={value =>
										setFormData(prev => ({ ...prev, reason: value }))
									}>
									<SelectTrigger>
										<SelectValue placeholder='Select a reason' />
									</SelectTrigger>
									<SelectContent>
										{cancellationReasons.map(reason => (
											<SelectItem
												key={reason}
												value={reason}>
												{reason}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{formData.reason === 'Other' && (
								<div>
									<label className='block mb-2 font-medium text-sm'>
										Please specify
									</label>
									<Textarea
										placeholder='Please provide details...'
										value={formData.customReason}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												customReason: e.target.value,
											}))
										}
										rows={3}
									/>
								</div>
							)}

							{/* Refund Information */}
							<Card
								className={`${
									refundInfo.percentage > 0
										? 'bg-green-50 border-green-200'
										: 'bg-yellow-50 border-yellow-200'
								}`}>
								<CardContent className='p-4'>
									<div className='flex items-center gap-2 mb-2'>
										<RefreshCw
											className={`w-4 h-4 ${
												refundInfo.percentage > 0
													? 'text-green-600'
													: 'text-yellow-600'
											}`}
										/>
										<h4
											className={`font-medium ${
												refundInfo.percentage > 0
													? 'text-green-800'
													: 'text-yellow-800'
											}`}>
											Refund Information
										</h4>
									</div>
									<div
										className={`text-sm ${
											refundInfo.percentage > 0
												? 'text-green-700'
												: 'text-yellow-700'
										}`}>
										{refundInfo.percentage > 0 ? (
											<>
												<p className='mb-2'>
													<strong>Refund Amount:</strong> ₦
													{refundInfo.amount.toLocaleString()} (
													{refundInfo.percentage}% of total)
												</p>
												<p>
													Refund will be processed within 3-5 business days.
												</p>
											</>
										) : (
											<>
												<p className='mb-2'>
													<strong>No refund available</strong> for cancellations
													within 24 hours of appointment.
												</p>
												<p>
													Please consider rescheduling instead of cancelling.
												</p>
											</>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Alternative Options */}
							{refundInfo.percentage === 0 && (
								<div className='bg-blue-50 p-4 border border-blue-200 rounded-lg'>
									<h4 className='mb-2 font-medium text-blue-800'>
										Consider These Alternatives:
									</h4>
									<ul className='space-y-1 text-blue-700 text-sm'>
										<li>
											• Reschedule your appointment to a more convenient time
										</li>
										<li>
											• Transfer your booking to a family member or friend
										</li>
										<li>• Contact the centre directly to discuss options</li>
									</ul>
									<div className='flex gap-2 mt-3'>
										<Button
											size='sm'
											variant='outline'
											onClick={onClose}>
											Reschedule Instead
										</Button>
										<Button
											size='sm'
											variant='outline'>
											Contact Centre
										</Button>
									</div>
								</div>
							)}

							<Button
								onClick={handleNext}
								disabled={
									!formData.reason ||
									(formData.reason === 'Other' && !formData.customReason.trim())
								}
								className='w-full'>
								Continue
							</Button>
						</div>
					)}

					{/* Step 2: Confirmation & Feedback */}
					{step === 2 && (
						<div
							data-cancel-step='2'
							className='space-y-4'>
							<h3 className='font-semibold text-lg'>Confirm Cancellation</h3>

							<div>
								<label className='block mb-2 font-medium text-sm'>
									Additional feedback (optional)
								</label>
								<Textarea
									placeholder='Help us improve our service...'
									value={formData.feedback}
									onChange={e =>
										setFormData(prev => ({ ...prev, feedback: e.target.value }))
									}
									rows={3}
								/>
							</div>

							{/* Final Summary */}
							<Card className='bg-gray-50'>
								<CardContent className='p-4'>
									<h4 className='mb-3 font-medium'>Cancellation Summary</h4>
									<div className='space-y-2 text-sm'>
										<div className='flex justify-between'>
											<span className='text-gray-600'>Appointment:</span>
											<span>
												{booking.date} at {booking.time}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-gray-600'>Reason:</span>
											<span>
												{formData.reason === 'Other'
													? formData.customReason
													: formData.reason}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-gray-600'>Original Amount:</span>
											<span>₦{booking.price.toLocaleString()}</span>
										</div>
										<div className='flex justify-between font-medium'>
											<span className='text-gray-600'>Refund Amount:</span>
											<span
												className={
													refundInfo.percentage > 0
														? 'text-green-600'
														: 'text-red-600'
												}>
												₦{refundInfo.amount.toLocaleString()}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Warning */}
							<div className='bg-red-50 p-4 border border-red-200 rounded-lg'>
								<div className='flex items-start gap-2'>
									<AlertTriangle className='mt-0.5 w-4 h-4 text-red-600' />
									<div className='text-red-800 text-sm'>
										<p className='mb-1 font-medium'>Important:</p>
										<p>
											This action cannot be undone. Once cancelled, you'll need
											to make a new booking if you change your mind.
										</p>
									</div>
								</div>
							</div>

							{/* Confirmation Checkbox */}
							<div className='flex items-start space-x-2'>
								<Checkbox
									id='confirm-cancel'
									checked={formData.confirmCancel}
									onCheckedChange={checked =>
										setFormData(prev => ({
											...prev,
											confirmCancel: checked as boolean,
										}))
									}
								/>
								<label
									htmlFor='confirm-cancel'
									className='text-gray-700 text-sm'>
									I understand that this appointment will be cancelled and I
									agree to the refund terms stated above.
								</label>
							</div>

							<div className='flex gap-3'>
								<Button
									variant='outline'
									onClick={() => setStep(1)}>
									Back
								</Button>
								<Button
									onClick={handleConfirm}
									disabled={!isFormValid || isLoading}
									variant='destructive'
									className='flex-1'>
									{isLoading ? 'Cancelling...' : 'Confirm Cancellation'}
								</Button>
							</div>
						</div>
					)}

					{/* Step 3: Success */}
					{step === 3 && (
						<div
							data-cancel-step='3'
							className='space-y-4 text-center'>
							<div className='flex justify-center items-center bg-red-100 mx-auto rounded-full w-16 h-16'>
								<XCircle className='w-8 h-8 text-red-600' />
							</div>
							<h3 className='font-semibold text-red-600 text-xl'>
								Appointment Cancelled
							</h3>
							<p className='text-gray-600'>
								Your appointment has been cancelled successfully.
								{refundInfo.percentage > 0 &&
									' Your refund will be processed within 3-5 business days.'}
							</p>

							<div className='bg-gray-50 p-4 rounded-lg'>
								<div className='text-sm'>
									<p className='mb-2 font-medium'>Cancellation Details:</p>
									<div className='space-y-1 text-gray-600'>
										<p>
											<strong>Booking ID:</strong> {booking.id}
										</p>
										<p>
											<strong>Cancelled on:</strong>{' '}
											{new Date().toLocaleDateString()}
										</p>
										{refundInfo.percentage > 0 && (
											<p>
												<strong>Refund Amount:</strong> ₦
												{refundInfo.amount.toLocaleString()}
											</p>
										)}
										<p>
											<strong>Status:</strong>{' '}
											<Badge variant='destructive'>Cancelled</Badge>
										</p>
									</div>
								</div>
							</div>

							<div className='space-y-2'>
								<Button
									onClick={onClose}
									className='w-full'>
									Done
								</Button>
								<Button
									variant='outline'
									className='w-full'>
									Book New Appointment
								</Button>
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
