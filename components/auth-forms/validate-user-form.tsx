import Link from 'next/link';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { useOtpCountDown } from '@/hooks/use-otp-count-down';
import {
    useResendOtp,
    useSendUserEmail,
    useValidateUser,
} from '@/queries/user-verification';
import {
    ConfirmMail,
    SendMail,
    confirmMailSchema,
    sendMailSchema,
} from '@/schemas/mailing';
import { useUserValidation } from '@/state-management/validate-user';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormLogo } from './form-logo';

export function ValidateUserForm() {
    const { isEmailSent, email } = useUserValidation();
    const form = useForm<SendMail | ConfirmMail>({
        resolver: zodResolver(isEmailSent ? confirmMailSchema : sendMailSchema),
        mode: 'all',
    });

    useEffect(() => {
        if (isEmailSent) {
            form.setValue('email', email);
        } else {
            form.setValue('email', '');
        }
    }, [isEmailSent, email, form]);

    const { countDown, setCountDown } = useOtpCountDown();

    const { mutate: resendEmail, isPending: pendingResendOtp } = useResendOtp(
        form.watch('email'),
    );

    const { mutate: sendEmail, isPending: pendingEmailSent } = useSendUserEmail(
        form.watch('email'),
    );

    const { mutate: validateEmail, isPending: pendingEmailVerified } =
        useValidateUser();
    const onSubmit = (data: SendMail | ConfirmMail) => {
        if (isEmailSent) {
            const { token } = data as ConfirmMail;
            validateEmail({
                email,
                token,
            });
        } else {
            sendEmail(data as SendMail);
        }
    };

    return (
        <Form {...form}>
            <form
                className="w-full max-w-md"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Card className="w-full">
                    <CardHeader className="text-center">
                        <FormLogo />
                        <CardTitle className="text-blue-700 text-2xl">
                            {isEmailSent ? 'Verify Your Email' : 'Register'}
                        </CardTitle>
                        <CardDescription>
                            {isEmailSent
                                ? 'Please enter the one-time password sent to your email.'
                                : 'Enter your email to receive a one-time password for verification.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 w-full">
                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl className="w-full">
                                        <Input
                                            disabled={isEmailSent}
                                            readOnly={isEmailSent}
                                            value={
                                                isEmailSent
                                                    ? email
                                                    : field.value
                                            }
                                            className="flex-1 w-full"
                                            id="email"
                                            type="email"
                                            placeholder="john.doe@example.com"
                                            onChange={
                                                isEmailSent
                                                    ? undefined
                                                    : field.onChange
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isEmailSent && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="token"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                One-Time Password
                                            </FormLabel>
                                            <FormControl>
                                                <InputOTP
                                                    maxLength={6}
                                                    {...field}
                                                >
                                                    <InputOTPGroup className="flex w-full">
                                                        {[...Array(6)].map(
                                                            (_, index) => (
                                                                <InputOTPSlot
                                                                    className="flex-1"
                                                                    key={index}
                                                                    id={`otp-slot-${index}`}
                                                                    index={
                                                                        index
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormDescription>
                                                Please enter the one-time
                                                password sent to your email.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="text-right">
                                    {countDown <= 0 ? (
                                        <Button
                                            disabled={pendingResendOtp}
                                            type="button"
                                            variant="ghost"
                                            className="text-blue-700 text-sm hover:underline transition-all duration-300 ease-in-out"
                                            onClick={() => {
                                                resendEmail({ email });
                                                setCountDown(60);
                                            }}
                                        >
                                            {pendingResendOtp
                                                ? 'Resending...'
                                                : 'Resend OTP'}
                                        </Button>
                                    ) : (
                                        <span className="text-gray-500 text-sm">
                                            Resend OTP in {countDown} seconds
                                        </span>
                                    )}
                                </div>
                            </>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-800 w-full"
                            disabled={pendingEmailSent || pendingEmailVerified}
                        >
                            {isEmailSent
                                ? 'Verify Email'
                                : pendingEmailSent
                                  ? 'Sending Email...'
                                  : pendingEmailVerified
                                    ? 'Verifying Email...'
                                    : 'Send Email'}
                        </Button>
                        <div className="text-sm text-center">
                            Already have an account?{' '}
                            <Link
                                href="/auth/login"
                                className="text-blue-700 hover:underline"
                            >
                                Login
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
