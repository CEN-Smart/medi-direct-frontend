'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useContactUs } from '@/queries/authentication';
import { ContactUs, contactUsSchema } from '@/schemas/contact-us-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';

const messageSubjects = [
    'General Inquiry',
    'Technical Support',
    'Booking Assistance',
    'Partnership Opportunity',
    'Feedback',
    'Other',
];
type Props = {
    setIsSubmitted: (isSubmitted: boolean) => void;
};

export function ContactUsForm({ setIsSubmitted }: Props) {
    const formRef = useRef<HTMLFormElement | null>(null);

    const form = useForm<ContactUs>({
        resolver: zodResolver(contactUsSchema),
        mode: 'all',
    });

    const { mutate: contactUs, isPending: pendingContact } = useContactUs(
        formRef,
        setIsSubmitted,
    );

    const handleSubmit = (data: ContactUs) => {
        contactUs(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
                ref={formRef}
            >
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name *</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        className="mt-1"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name *</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        className="mt-1"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="mt-1"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="phone"
                                    type="tel"
                                    className="mt-1"
                                    placeholder="+234XXXXXXXXXX"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject *</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60 overflow-y-auto z-[1000]">
                                    {messageSubjects.map((subject) => (
                                        <SelectItem
                                            key={subject}
                                            value={subject
                                                .toLowerCase()
                                                .replace(/\s+/g, '-')}
                                        >
                                            {subject}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    id="message"
                                    className="mt-1 resize-none"
                                    rows={4}
                                    placeholder="Type your message here..."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={pendingContact || !form.formState.isValid}
                >
                    {pendingContact ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2" />
                </Button>
            </form>
        </Form>
    );
}
