'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Copy, Download, Key, Shield, Smartphone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface TwoFactorAuthModalProps {
	isOpen: boolean;
	onClose: () => void;
	onEnable: (method: string, code: string) => void;
	isEnabled?: boolean;
}

export function TwoFactorAuthModal({
	isOpen,
	onClose,
	onEnable,
	isEnabled = false,
}: TwoFactorAuthModalProps) {
	const [step, setStep] = useState(1);
	const [selectedMethod, setSelectedMethod] = useState<'app' | 'sms'>('app');
	const [verificationCode, setVerificationCode] = useState('');
	const [backupCodes, setBackupCodes] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [copiedSecret, setCopiedSecret] = useState(false);
	const [copiedCodes, setCopiedCodes] = useState(false);

	// Mock secret key for demonstration
	const secretKey = 'JBSWY3DPEHPK3PXP';
	const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/MediDirect:user@example.com?secret=${secretKey}&issuer=MediDirect`;

	const mockBackupCodes = [
		'1a2b3c4d',
		'5e6f7g8h',
		'9i0j1k2l',
		'3m4n5o6p',
		'7q8r9s0t',
		'1u2v3w4x',
		'5y6z7a8b',
		'9c0d1e2f',
	];

	const handleMethodSelect = (method: 'app' | 'sms') => {
		setSelectedMethod(method);
		setStep(2);
	};

	const handleVerification = async () => {
		if (!verificationCode || verificationCode.length !== 6) {
			setErrors({ code: 'Please enter a valid 6-digit code' });
			return;
		}

		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Generate backup codes
			setBackupCodes(mockBackupCodes);
			setStep(3);

			await onEnable(selectedMethod, verificationCode);
		} catch (error) {
			setErrors({ code: 'Invalid verification code. Please try again.' });
		} finally {
			setIsLoading(false);
		}
	};

	const copyToClipboard = async (text: string, type: 'secret' | 'codes') => {
		try {
			await navigator.clipboard.writeText(text);
			if (type === 'secret') {
				setCopiedSecret(true);
				setTimeout(() => setCopiedSecret(false), 2000);
			} else {
				setCopiedCodes(true);
				setTimeout(() => setCopiedCodes(false), 2000);
			}
		} catch (error) {
			console.error('Failed to copy to clipboard');
		}
	};

	const downloadBackupCodes = () => {
		const content = `MediDirect - Two-Factor Authentication Backup Codes\n\nGenerated: ${new Date().toLocaleDateString()}\n\n${backupCodes.join(
			'\n'
		)}\n\nKeep these codes safe and secure. Each code can only be used once.`;
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'medidirect-backup-codes.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleClose = () => {
		setStep(1);
		setSelectedMethod('app');
		setVerificationCode('');
		setBackupCodes([]);
		setErrors({});
		setCopiedSecret(false);
		setCopiedCodes(false);
		onClose();
	};

	const handleComplete = () => {
		handleClose();
	};

	if (isEnabled) {
		return (
			<Dialog
				open={isOpen}
				onOpenChange={handleClose}>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle className='flex items-center gap-2'>
							<Shield className='w-5 h-5 text-green-500' />
							Two-Factor Authentication
							<Badge
								variant='secondary'
								className='bg-green-100 text-green-800'>
								Enabled
							</Badge>
						</DialogTitle>
					</DialogHeader>

					<div className='space-y-4'>
						<Alert>
							<Shield className='w-4 h-4' />
							<AlertDescription>
								Two-factor authentication is currently enabled for your account.
								Your account is protected with an additional layer of security.
							</AlertDescription>
						</Alert>

						<div className='space-y-3'>
							<Button
								variant='outline'
								className='justify-start bg-transparent w-full'>
								<Key className='mr-2 w-4 h-4' />
								View Backup Codes
							</Button>
							<Button
								variant='outline'
								className='justify-start bg-transparent w-full'>
								<Smartphone className='mr-2 w-4 h-4' />
								Change Authentication Method
							</Button>
							<Button
								variant='destructive'
								className='w-full'>
								Disable Two-Factor Authentication
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleClose}>
			<DialogContent className='sm:max-w-lg'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Shield className='w-5 h-5' />
						Enable Two-Factor Authentication
					</DialogTitle>
				</DialogHeader>

				{step === 1 && (
					<div className='space-y-4'>
						<p className='text-gray-600 text-sm'>
							Add an extra layer of security to your account by enabling
							two-factor authentication.
						</p>

						<Tabs
							value={selectedMethod}
							onValueChange={value =>
								setSelectedMethod(value as 'app' | 'sms')
							}>
							<TabsList className='grid grid-cols-2 w-full'>
								<TabsTrigger value='app'>Authenticator App</TabsTrigger>
								<TabsTrigger value='sms'>SMS</TabsTrigger>
							</TabsList>

							<TabsContent
								value='app'
								className='space-y-4'>
								<div className='flex items-start gap-3 p-4 border rounded-lg'>
									<Smartphone className='mt-0.5 w-5 h-5 text-blue-500' />
									<div>
										<h4 className='font-medium'>Authenticator App</h4>
										<p className='text-gray-600 text-sm'>
											Use apps like Google Authenticator, Authy, or Microsoft
											Authenticator to generate time-based codes.
										</p>
										<div className='mt-2'>
											<Badge
												variant='secondary'
												className='bg-green-100 text-green-800'>
												Recommended
											</Badge>
										</div>
									</div>
								</div>
							</TabsContent>

							<TabsContent
								value='sms'
								className='space-y-4'>
								<div className='flex items-start gap-3 p-4 border rounded-lg'>
									<Smartphone className='mt-0.5 w-5 h-5 text-blue-500' />
									<div>
										<h4 className='font-medium'>SMS Authentication</h4>
										<p className='text-gray-600 text-sm'>
											Receive verification codes via text message to your
											registered phone number.
										</p>
										<div className='mt-2'>
											<Badge variant='outline'>Less Secure</Badge>
										</div>
									</div>
								</div>
							</TabsContent>
						</Tabs>

						<Button
							onClick={() => handleMethodSelect(selectedMethod)}
							className='w-full'>
							Continue with{' '}
							{selectedMethod === 'app' ? 'Authenticator App' : 'SMS'}
						</Button>
					</div>
				)}

				{step === 2 && selectedMethod === 'app' && (
					<div className='space-y-4'>
						<div className='text-center'>
							<h3 className='mb-2 font-medium'>Scan QR Code</h3>
							<p className='mb-4 text-gray-600 text-sm'>
								Scan this QR code with your authenticator app
							</p>

							<div className='flex justify-center mb-4'>
								<div className='bg-white p-4 border rounded-lg'>
									<img
										src={qrCodeUrl || '/placeholder.svg'}
										alt='QR Code'
										className='w-48 h-48'
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<Label className='font-medium text-sm'>
									Or enter this key manually:
								</Label>
								<div className='flex items-center gap-2'>
									<Input
										value={secretKey}
										readOnly
										className='font-mono text-center'
									/>
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={() => copyToClipboard(secretKey, 'secret')}>
										{copiedSecret ? (
											<Check className='w-4 h-4' />
										) : (
											<Copy className='w-4 h-4' />
										)}
									</Button>
								</div>
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='verificationCode'>Enter verification code</Label>
							<Input
								id='verificationCode'
								type='text'
								value={verificationCode}
								onChange={e =>
									setVerificationCode(
										e.target.value.replace(/\D/g, '').slice(0, 6)
									)
								}
								placeholder='000000'
								className={`text-center font-mono text-lg ${
									errors.code ? 'border-red-500' : ''
								}`}
								maxLength={6}
							/>
							{errors.code && (
								<p className='text-red-500 text-sm'>{errors.code}</p>
							)}
							<p className='text-gray-500 text-xs'>
								Enter the 6-digit code from your authenticator app
							</p>
						</div>

						<div className='flex gap-3'>
							<Button
								type='button'
								variant='outline'
								onClick={() => setStep(1)}
								className='flex-1'>
								Back
							</Button>
							<Button
								onClick={handleVerification}
								disabled={isLoading || verificationCode.length !== 6}
								className='flex-1'>
								{isLoading ? 'Verifying...' : 'Verify & Enable'}
							</Button>
						</div>
					</div>
				)}

				{step === 2 && selectedMethod === 'sms' && (
					<div className='space-y-4'>
						<div className='text-center'>
							<h3 className='mb-2 font-medium'>SMS Verification</h3>
							<p className='mb-4 text-gray-600 text-sm'>
								We'll send a verification code to your registered phone number
							</p>

							<div className='bg-gray-50 p-4 border rounded-lg'>
								<p className='font-medium'>+234 801 234 5678</p>
								<p className='text-gray-600 text-sm'>Registered phone number</p>
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='smsCode'>Enter verification code</Label>
							<Input
								id='smsCode'
								type='text'
								value={verificationCode}
								onChange={e =>
									setVerificationCode(
										e.target.value.replace(/\D/g, '').slice(0, 6)
									)
								}
								placeholder='000000'
								className={`text-center font-mono text-lg ${
									errors.code ? 'border-red-500' : ''
								}`}
								maxLength={6}
							/>
							{errors.code && (
								<p className='text-red-500 text-sm'>{errors.code}</p>
							)}
							<p className='text-gray-500 text-xs'>
								Enter the 6-digit code sent to your phone
							</p>
						</div>

						<div className='flex gap-3'>
							<Button
								type='button'
								variant='outline'
								onClick={() => setStep(1)}
								className='flex-1'>
								Back
							</Button>
							<Button
								onClick={handleVerification}
								disabled={isLoading || verificationCode.length !== 6}
								className='flex-1'>
								{isLoading ? 'Verifying...' : 'Verify & Enable'}
							</Button>
						</div>
					</div>
				)}

				{step === 3 && (
					<div className='space-y-4'>
						<div className='text-center'>
							<div className='flex justify-center items-center bg-green-100 mx-auto mb-4 rounded-full w-12 h-12'>
								<Check className='w-6 h-6 text-green-600' />
							</div>
							<h3 className='mb-2 font-medium'>
								Two-Factor Authentication Enabled!
							</h3>
							<p className='text-gray-600 text-sm'>
								Your account is now protected with two-factor authentication.
							</p>
						</div>

						<Alert>
							<Key className='w-4 h-4' />
							<AlertDescription>
								<strong>Important:</strong> Save these backup codes in a safe
								place. You can use them to access your account if you lose your
								authenticator device.
							</AlertDescription>
						</Alert>

						<div className='space-y-3'>
							<div className='flex justify-between items-center'>
								<Label className='font-medium'>Backup Codes</Label>
								<div className='flex gap-2'>
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={() =>
											copyToClipboard(backupCodes.join('\n'), 'codes')
										}>
										{copiedCodes ? (
											<Check className='w-4 h-4' />
										) : (
											<Copy className='w-4 h-4' />
										)}
										{copiedCodes ? 'Copied' : 'Copy'}
									</Button>
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={downloadBackupCodes}>
										<Download className='mr-1 w-4 h-4' />
										Download
									</Button>
								</div>
							</div>

							<div className='gap-2 grid grid-cols-2 bg-gray-50 p-3 border rounded-lg font-mono text-sm'>
								{backupCodes.map((code, index) => (
									<div
										key={index}
										className='py-1 text-center'>
										{code}
									</div>
								))}
							</div>

							<p className='text-gray-500 text-xs'>
								Each backup code can only be used once. Generate new codes if
								you run out.
							</p>
						</div>

						<Button
							onClick={handleComplete}
							className='w-full'>
							Complete Setup
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
