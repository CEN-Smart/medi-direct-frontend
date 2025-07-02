'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Check, Eye, EyeOff, Lock, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type React from 'react';
import { useState } from 'react';

interface ChangePasswordModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (currentPassword: string, newPassword: string) => void;
}

export function ChangePasswordModal({
	isOpen,
	onClose,
	onConfirm,
}: ChangePasswordModalProps) {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);

	const passwordRequirements = [
		{ text: 'At least 8 characters', met: newPassword.length >= 8 },
		{ text: 'Contains uppercase letter', met: /[A-Z]/.test(newPassword) },
		{ text: 'Contains lowercase letter', met: /[a-z]/.test(newPassword) },
		{ text: 'Contains number', met: /\d/.test(newPassword) },
		{
			text: 'Contains special character',
			met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
		},
	];

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!currentPassword) {
			newErrors.currentPassword = 'Current password is required';
		}

		if (!newPassword) {
			newErrors.newPassword = 'New password is required';
		} else if (!passwordRequirements.every(req => req.met)) {
			newErrors.newPassword = 'Password does not meet requirements';
		}

		if (!confirmPassword) {
			newErrors.confirmPassword = 'Please confirm your new password';
		} else if (newPassword !== confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		if (currentPassword === newPassword) {
			newErrors.newPassword =
				'New password must be different from current password';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsLoading(true);
		try {
			await onConfirm(currentPassword, newPassword);
			handleClose();
		} catch (error) {
			setErrors({ submit: 'Failed to change password. Please try again.' });
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		setCurrentPassword('');
		setNewPassword('');
		setConfirmPassword('');
		setErrors({});
		setShowCurrentPassword(false);
		setShowNewPassword(false);
		setShowConfirmPassword(false);
		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Lock className='w-5 h-5' />
						Change Password
					</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					{errors.submit && (
						<Alert variant='destructive'>
							<AlertDescription>{errors.submit}</AlertDescription>
						</Alert>
					)}

					<div className='space-y-2'>
						<Label htmlFor='currentPassword'>Current Password</Label>
						<div className='relative'>
							<Input
								id='currentPassword'
								type={showCurrentPassword ? 'text' : 'password'}
								value={currentPassword}
								onChange={e => setCurrentPassword(e.target.value)}
								className={errors.currentPassword ? 'border-red-500' : ''}
								placeholder='Enter your current password'
							/>
							<Button
								type='button'
								variant='ghost'
								size='sm'
								className='top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full'
								onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
								{showCurrentPassword ? (
									<EyeOff className='w-4 h-4' />
								) : (
									<Eye className='w-4 h-4' />
								)}
							</Button>
						</div>
						{errors.currentPassword && (
							<p className='text-red-500 text-sm'>{errors.currentPassword}</p>
						)}
					</div>

					<div className='space-y-2'>
						<Label htmlFor='newPassword'>New Password</Label>
						<div className='relative'>
							<Input
								id='newPassword'
								type={showNewPassword ? 'text' : 'password'}
								value={newPassword}
								onChange={e => setNewPassword(e.target.value)}
								className={errors.newPassword ? 'border-red-500' : ''}
								placeholder='Enter your new password'
							/>
							<Button
								type='button'
								variant='ghost'
								size='sm'
								className='top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full'
								onClick={() => setShowNewPassword(!showNewPassword)}>
								{showNewPassword ? (
									<EyeOff className='w-4 h-4' />
								) : (
									<Eye className='w-4 h-4' />
								)}
							</Button>
						</div>
						{errors.newPassword && (
							<p className='text-red-500 text-sm'>{errors.newPassword}</p>
						)}
					</div>

					{newPassword && (
						<div className='space-y-2'>
							<Label className='font-medium text-sm'>
								Password Requirements
							</Label>
							<div className='space-y-1'>
								{passwordRequirements.map((req, index) => (
									<div
										key={index}
										className='flex items-center gap-2 text-sm'>
										{req.met ? (
											<Check className='w-4 h-4 text-green-500' />
										) : (
											<X className='w-4 h-4 text-red-500' />
										)}
										<span
											className={req.met ? 'text-green-700' : 'text-gray-600'}>
											{req.text}
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					<div className='space-y-2'>
						<Label htmlFor='confirmPassword'>Confirm New Password</Label>
						<div className='relative'>
							<Input
								id='confirmPassword'
								type={showConfirmPassword ? 'text' : 'password'}
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								className={errors.confirmPassword ? 'border-red-500' : ''}
								placeholder='Confirm your new password'
							/>
							<Button
								type='button'
								variant='ghost'
								size='sm'
								className='top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full'
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
								{showConfirmPassword ? (
									<EyeOff className='w-4 h-4' />
								) : (
									<Eye className='w-4 h-4' />
								)}
							</Button>
						</div>
						{errors.confirmPassword && (
							<p className='text-red-500 text-sm'>{errors.confirmPassword}</p>
						)}
					</div>

					<div className='flex gap-3 pt-4'>
						<Button
							type='button'
							variant='outline'
							onClick={handleClose}
							className='flex-1 bg-transparent'>
							Cancel
						</Button>
						<Button
							type='submit'
							disabled={
								isLoading || !passwordRequirements.every(req => req.met)
							}
							className='flex-1'>
							{isLoading ? 'Changing...' : 'Change Password'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
