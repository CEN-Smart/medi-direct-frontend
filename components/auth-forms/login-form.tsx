'use client';

import Link from 'next/link';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { animations } from '@/lib/animations';
import { useLoginUser } from '@/queries/authentication';
import { LoginData, loginSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { ToggleInputPassword } from '../ui/toggle-input-password';
import { FormHeader } from './form-header';

export function Login() {
    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: 'all',
    });
    const formRef = useRef<HTMLFormElement | null>(null);

    const { mutate: login, isPending: pendingLogin } = useLoginUser(formRef);

    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            animations.pageEnter(cardRef.current);
        }
    }, []);

    const handleSubmit = (data: LoginData) => {
        login(data);
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <div className="flex justify-center items-center bg-linear-to-br from-blue-50 to-green-50 p-4 min-h-screen">
            <Card ref={cardRef} className="shadow-2xl w-full max-w-md">
                <FormHeader
                    title="Welcome Back"
                    description="Sign in to your MediDirect account"
                />

                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                                                <Input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    id="email"
                                                    {...field}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="relative">
                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <ToggleInputPassword
                                                    id="password"
                                                    {...field}
                                                    placeholder="Enter your password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" />
                                    <label
                                        htmlFor="remember"
                                        className="text-gray-600 text-sm"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 w-full"
                                disabled={pendingLogin}
                            >
                                {pendingLogin ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="border-gray-300 border-t w-full" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">
                                    Or continue as guest
                                </span>
                            </div>
                        </div>

                        <Link href="/search">
                            <Button variant="outline" className="mt-4 w-full">
                                Browse as Guest
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            {`Don't have an account? `}
                            <Link
                                href="/auth/signup"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
