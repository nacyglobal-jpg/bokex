import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Star, ThumbsUp, MessageCircle, TrendingUp } from 'lucide-react';

const allReviews = [
  {
    id: 1,
    guest: 'Emily S.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Amazing stay! The rooftop pool and bar were the highlight. The room was spotless, staff incredibly friendly, and the breakfast buffet exceeded expectations. Highly recommend this hotel for both business and leisure travelers.',
    date: '2 days ago',
    room: 'Deluxe Room',
    helpful: 12,
    replied: false,
  },
  {
    id: 2,
    guest: 'Chris M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 4,
    comment: 'Fantastic experience overall. The room was comfortable and warm. The tour guide helped us see the best of the city. Only minor issue was the wifi speed in the evenings, but everything else was perfect!',
    date: '5 days ago',
    room: 'King Suite',
    helpful: 8,
    replied: true,
  },
  {
    id: 3,
    guest: 'Linda K.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Exceptional service from start to finish! The concierge went above and beyond to help us plan our daily activities. The location is perfect, and the amenities are top-notch.',
    date: '1 week ago',
    room: 'Standard Room',
    helpful: 15,
    replied: true,
  },
  {
    id: 4,
    guest: 'Mark T.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 3,
    comment: 'Good hotel but a bit overpriced for what you get. The room was nice but could use some updates. Staff was friendly though.',
    date: '1 week ago',
    room: 'Deluxe Room',
    helpful: 5,
    replied: false,
  },
  {
    id: 5,
    guest: 'Rachel W.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Perfect location, amazing views, and wonderful staff. Will definitely be back!',
    date: '2 weeks ago',
    room: 'King Suite',
    helpful: 20,
    replied: true,
  },
];

type FilterRating = 'all' | 5 | 4 | 3 | 2 | 1;

export function ReviewsView() {
  const [ratingFilter, setRatingFilter] = useState<FilterRating>('all');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredReviews = allReviews.filter(review => {
    return ratingFilter === 'all' || review.rating === ratingFilter;
  });

  const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
  const totalReviews = allReviews.length;

  const ratingCounts = {
    5: allReviews.filter(r => r.rating === 5).length,
    4: allReviews.filter(r => r.rating === 4).length,
    3: allReviews.filter(r => r.rating === 3).length,
    2: allReviews.filter(r => r.rating === 2).length,
    1: allReviews.filter(r => r.rating === 1).length,
  };

  const handleReply = (reviewId: number) => {
    // Handle reply submission
    console.log(`Reply to review ${reviewId}:`, replyText);
    setReplyingTo(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Guest Reviews</h1>
        <p className="text-gray-600">Manage and respond to guest feedback</p>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-900 mb-2">{avgRating}</p>
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-5 ${
                      i < Math.round(parseFloat(avgRating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{totalReviews} total reviews</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Rating Distribution</h3>
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingCounts[rating as keyof typeof ratingCounts];
              const percentage = (count / totalReviews) * 100;
              
              return (
                <div key={rating} className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle>All Reviews</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filter:</span>
              {(['all', 5, 4, 3, 2, 1] as FilterRating[]).map((rating) => (
                <Button
                  key={rating}
                  variant={ratingFilter === rating ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRatingFilter(rating)}
                  className={ratingFilter === rating ? 'bg-[#0052A3] hover:bg-[#003d7a]' : ''}
                >
                  {rating === 'all' ? 'All' : `${rating} ★`}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="pb-6 border-b last:border-0">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.guest.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.guest}</h4>
                      <p className="text-sm text-gray-500">{review.room} • {review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#0052A3]">
                      <ThumbsUp className="size-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button
                      onClick={() => setReplyingTo(review.id)}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#0052A3]"
                    >
                      <MessageCircle className="size-4" />
                      {review.replied ? 'View Reply' : 'Reply'}
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === review.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your response..."
                        className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] resize-none"
                        rows={3}
                      />
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          onClick={() => handleReply(review.id)}
                          className="bg-[#0052A3] hover:bg-[#003d7a]"
                          size="sm"
                        >
                          Send Reply
                        </Button>
                        <Button
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                          }}
                          variant="outline"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Existing Reply */}
                  {review.replied && replyingTo !== review.id && (
                    <div className="mt-4 ml-8 p-3 bg-blue-50 rounded-lg border-l-4 border-[#0052A3]">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Your Response</p>
                      <p className="text-sm text-gray-700">Thank you for your wonderful feedback! We're delighted to hear you enjoyed your stay.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
