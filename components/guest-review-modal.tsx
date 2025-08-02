'use client';

import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { reviewCategories } from '@/docs';
import { cn, formatPhone } from '@/lib/utils';
import { useCreateGuestReview } from '@/queries/diagnostic-center/guest';
import { useGuestReviewStore } from '@/stores/guest-review';
import { SearchedCentersResponse } from '@/types/guest';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { Loader2, MessageSquare, Star, User } from 'lucide-react';

import { DatePicker } from './date-picker';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';

interface GuestReviewModalProps {
    centre: SearchedCentersResponse['data']['centres'][number] | undefined;
    children?: React.ReactNode;
}

export function GuestReviewModal({ centre, children }: GuestReviewModalProps) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const { reviewData, setReviewData, clearReviewData } =
        useGuestReviewStore();

    const [hoveredRating, setHoveredRating] = useState(0);
    const [, setHoveredCategory] = useState('');

    const handleReset = () => {
        clearReviewData();
        setHoveredRating(0);
        setHoveredCategory('');
        setDate(undefined);
    };

    const handleClose = () => {
        handleReset();
        setIsOpen(false);
    };

    const renderStars = (
        rating: number,
        onRate: (rating: number) => void,
        onHover?: (rating: number) => void,
    ) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={cn(
                            `w-6 h-6 cursor-pointer transition-colors`,
                            {
                                'text-yellow-400 fill-current':
                                    star <= rating || star <= hoveredRating,
                                'text-gray-300 hover:text-yellow-200':
                                    star > rating && star > hoveredRating,
                            },
                        )}
                        onClick={() => onRate(star)}
                        onMouseEnter={() => onHover && onHover(star)}
                        onMouseLeave={() => onHover && onHover(0)}
                    />
                ))}
            </div>
        );
    };

    const { mutate: createReview, isPending: isCreatingReview } =
        useCreateGuestReview(centre?.id, setIsOpen);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button
                        onClick={() => setIsOpen(true)}
                        variant="outline"
                        size="sm"
                    >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Write a Review
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl overflow-y-auto z-[2000] px-0">
                <DialogHeader className="px-6">
                    <DialogTitle className="flex items-center gap-2 capitalize">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        Write a Review for {centre?.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 max-h-[70vh] overflow-y-auto px-6 py-4">
                    {/* Centre Information */}
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-blue-900 capitalize">
                                        {centre?.name}
                                    </h3>
                                    <p className="text-blue-700 text-sm capitalize">
                                        {centre?.address}, {centre?.lga},{' '}
                                        {centre?.state}
                                    </p>
                                </div>
                                <Badge className="bg-blue-100 text-blue-800">
                                    ⭐ {centre?.averageRating.toFixed(1)} (
                                    {centre?.reviewsCount} reviews)
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Anonymous Option */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">
                                        Submit Anonymous Review
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        Your personal information will not be
                                        displayed publicly
                                    </p>
                                </div>
                                <Switch
                                    className={cn(
                                        'data-[state=checked]:bg-blue-600',
                                    )}
                                    checked={reviewData.isAnonymous}
                                    onCheckedChange={() =>
                                        setReviewData({
                                            ...reviewData,
                                            isAnonymous:
                                                !reviewData.isAnonymous,
                                        })
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information */}
                    {!reviewData.isAnonymous && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <User className="w-5 h-5" />
                                    Your Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="name">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            value={reviewData.guestName}
                                            onChange={(e) =>
                                                setReviewData({
                                                    ...reviewData,
                                                    guestName: e.target.value,
                                                })
                                            }
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="email">
                                            Email Address *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={reviewData.guestEmail}
                                            placeholder="Your email address"
                                            onChange={(e) =>
                                                setReviewData({
                                                    ...reviewData,
                                                    guestEmail: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="phone">
                                            Phone Number (Optional)
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={reviewData.guestPhone}
                                            onChange={(e) => {
                                                setPhoneNumber(e.target.value);
                                                setReviewData({
                                                    ...reviewData,
                                                    guestPhone: e.target.value,
                                                });
                                            }}
                                            onBlur={() => {
                                                const formattedPhone =
                                                    formatPhone(phoneNumber);
                                                setReviewData({
                                                    ...reviewData,
                                                    guestPhone: formattedPhone,
                                                });
                                            }}
                                            placeholder="Your phone number"
                                        />
                                    </div>

                                    <div>
                                        <DatePicker
                                            triggerClassName="h-10"
                                            className="gap-0"
                                            date={date}
                                            setDate={(newDate) => {
                                                setDate(newDate);
                                                setReviewData({
                                                    ...reviewData,
                                                    guestVisitDate: format(
                                                        newDate!,
                                                        'yyyy-MM-dd',
                                                    ),
                                                });
                                            }}
                                            label="Preferred Date"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Overall Rating */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Overall Rating *
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 text-center">
                                <div className="flex justify-center">
                                    {renderStars(
                                        reviewData.rating,
                                        (rating) =>
                                            setReviewData({
                                                ...reviewData,
                                                rating,
                                            }),
                                        setHoveredRating,
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm">
                                    {reviewData.rating === 0
                                        ? 'Click to rate your overall experience'
                                        : `You rated this centre ${reviewData.rating} out of 5 stars`}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Category Ratings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Rate Different Aspects
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                                {reviewCategories.map((category) => (
                                    <div
                                        key={category.label}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">
                                                {category.icon}
                                            </span>
                                            <Label className="font-medium">
                                                {category.label}
                                            </Label>
                                        </div>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star}>
                                                    <Star
                                                        className={cn(
                                                            `w-6 h-6 cursor-pointer transition-colors`,
                                                            {
                                                                'text-yellow-400 fill-current':
                                                                    star <=
                                                                    Number(
                                                                        reviewData[
                                                                            category.id as keyof typeof reviewData
                                                                        ],
                                                                    ),
                                                                'text-gray-300 hover:text-yellow-200':
                                                                    star >
                                                                    Number(
                                                                        reviewData[
                                                                            category.id as keyof typeof reviewData
                                                                        ] as number,
                                                                    ),
                                                            },
                                                        )}
                                                        onClick={() =>
                                                            setReviewData({
                                                                ...reviewData,
                                                                [category.id]:
                                                                    star,
                                                            })
                                                        }
                                                    />
                                                </span>
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
                            <CardTitle className="text-lg">
                                Your Review
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="reviewTitle">
                                    Review Title (Optional)
                                </Label>
                                <Input
                                    id="reviewTitle"
                                    value={reviewData.reviewTitle}
                                    onChange={(e) =>
                                        setReviewData({
                                            ...reviewData,
                                            reviewTitle: e.target.value,
                                        })
                                    }
                                    placeholder="Summarize your experience in a few words"
                                />
                            </div>

                            <div>
                                <Label htmlFor="serviceUsed">
                                    Service Used
                                </Label>
                                <Select
                                    value={reviewData.serviceTypeUsed}
                                    onValueChange={(value) =>
                                        setReviewData({
                                            ...reviewData,
                                            serviceTypeUsed: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>

                                    <SelectContent className="z-[20001]">
                                        {centre?.services
                                            .filter(
                                                (service) =>
                                                    service.isAvailable &&
                                                    service.isActive,
                                            )
                                            .map((service) => (
                                                <SelectItem
                                                    className="capitalize"
                                                    key={service.id}
                                                    value={service.serviceName}
                                                >
                                                    {service.serviceName} - ₦
                                                    {Number(
                                                        service.price,
                                                    ).toLocaleString()}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="reviewText">
                                    Your Review *
                                </Label>
                                <Textarea
                                    className="resize-none"
                                    id="reviewText"
                                    value={reviewData.reviewDescription}
                                    onChange={(e) =>
                                        setReviewData({
                                            ...reviewData,
                                            reviewDescription: e.target.value,
                                        })
                                    }
                                    placeholder="Share your experience with this diagnostic centre. What did you like? What could be improved?"
                                    rows={5}
                                />
                                <div className="flex justify-between items-center mt-1">
                                    <p className="ml-auto text-gray-500 text-sm">
                                        {reviewData.reviewDescription.length}
                                        /500 characters
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Additional Details (Optional)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="waitTime">
                                        Waiting Time
                                    </Label>
                                    <Input
                                        id="waitTime"
                                        value={reviewData.waitingTime}
                                        onChange={(e) =>
                                            setReviewData({
                                                ...reviewData,
                                                waitingTime: e.target.value,
                                            })
                                        }
                                        placeholder="e.g., 15 minutes, 1 hour"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="staffBehavior">
                                        Staff Behavior
                                    </Label>
                                    <Input
                                        id="staffBehavior"
                                        value={reviewData.staffBehavior}
                                        onChange={(e) =>
                                            setReviewData({
                                                ...reviewData,
                                                staffBehavior: e.target.value,
                                            })
                                        }
                                        placeholder="e.g., Professional, Friendly, Helpful"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="facilityCondition">
                                    Facility Condition
                                </Label>
                                <Input
                                    id="facilityCondition"
                                    value={reviewData.facilityCondition}
                                    onChange={(e) =>
                                        setReviewData({
                                            ...reviewData,
                                            facilityCondition: e.target.value,
                                        })
                                    }
                                    placeholder="e.g., Clean, Modern, Well-maintained"
                                />
                            </div>

                            <div>
                                <Label htmlFor="improvements">
                                    Suggestions for Improvement
                                </Label>
                                <Textarea
                                    className="resize-none"
                                    id="improvements"
                                    value={reviewData.suggestions}
                                    onChange={(e) =>
                                        setReviewData({
                                            ...reviewData,
                                            suggestions: e.target.value,
                                        })
                                    }
                                    placeholder="What could this centre do better?"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preferences */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">
                                        Would you recommend this centre?
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        Help others make informed decisions
                                    </p>
                                </div>
                                <Switch
                                    className={cn(
                                        'data-[state=checked]:bg-blue-600',
                                    )}
                                    checked={reviewData.willRecommend}
                                    onCheckedChange={() =>
                                        setReviewData({
                                            ...reviewData,
                                            willRecommend:
                                                !reviewData.willRecommend,
                                        })
                                    }
                                />
                            </div>

                            {!reviewData.isAnonymous && (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">
                                            Allow centre to contact you
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            For follow-up or to address any
                                            concerns
                                        </p>
                                    </div>
                                    <Switch
                                        className={cn(
                                            'data-[state=checked]:bg-blue-600',
                                        )}
                                        checked={reviewData.allowToContact}
                                        onCheckedChange={() =>
                                            setReviewData({
                                                ...reviewData,
                                                allowToContact:
                                                    !reviewData.allowToContact,
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Review Preview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Review Preview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-50 p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <p className="font-medium">
                                            {reviewData.isAnonymous
                                                ? 'Anonymous User'
                                                : reviewData.guestName ||
                                                  'Your Name'}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-4 h-4 ${
                                                            star <=
                                                            reviewData.rating
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-gray-600 text-sm">
                                                {reviewData.guestVisitDate &&
                                                    `• Visited on ${reviewData.guestVisitDate}`}
                                            </span>
                                        </div>
                                    </div>
                                    {reviewData.willRecommend && (
                                        <Badge className="bg-green-100 text-green-800">
                                            Recommended
                                        </Badge>
                                    )}
                                </div>

                                {reviewData.reviewTitle && (
                                    <h4 className="mb-2 font-medium capitalize">
                                        {reviewData.reviewTitle}
                                    </h4>
                                )}

                                <p className="mb-3 text-gray-700">
                                    {reviewData.reviewTitle ||
                                        'Your review will appear here...'}
                                </p>

                                {reviewData.serviceTypeUsed && (
                                    <p className="text-gray-600 text-sm capitalize">
                                        <strong>Service used:</strong>{' '}
                                        {reviewData.serviceTypeUsed}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6 border-t px-6">
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleReset}>
                            Reset
                        </Button>
                        <Button
                            disabled={
                                isCreatingReview ||
                                !reviewData.rating ||
                                !reviewData.reviewDescription ||
                                !reviewData.serviceTypeUsed ||
                                !reviewData.resultDeliveryRating ||
                                !reviewData.reviewTitle ||
                                !reviewData.staffRating ||
                                !reviewData.cleanlinessRating ||
                                !reviewData.equipmentRating ||
                                !reviewData.waitingTimeRating ||
                                !reviewData.valueForMoneyRating ||
                                !reviewData.suggestions ||
                                !reviewData.facilityCondition ||
                                !reviewData.staffBehavior ||
                                (!reviewData.isAnonymous &&
                                    (!reviewData.guestName ||
                                        !reviewData.guestEmail ||
                                        !reviewData.guestVisitDate ||
                                        (!reviewData.guestPhone &&
                                            !reviewData.allowToContact)))
                            }
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                createReview(reviewData);
                                clearReviewData();
                                setDate(undefined);
                            }}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isCreatingReview ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                            ) : (
                                'Submit Review'
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
