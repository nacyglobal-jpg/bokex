import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';

const messages = [
  {
    id: 1,
    sender: 'John D.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    preview: 'Still interested...',
    unread: true,
    badge: 'URGENT',
  },
  {
    id: 2,
    sender: 'Sarah R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    preview: '(3) Bookings',
    unread: false,
    badge: 'OPEN',
  },
];

export function Messages() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold">Messages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={message.avatar} />
              <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold text-gray-900">{message.sender}</h4>
                <Badge
                  className={`text-xs px-2 py-0 ${
                    message.badge === 'URGENT'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {message.badge}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 truncate">{message.preview}</p>
            </div>
            {message.unread && <div className="w-2 h-2 bg-[#00A8E8] rounded-full" />}
          </div>
        ))}
        <Button className="w-full bg-[#00A8E8] hover:bg-[#0086ba] text-white mt-3">
          View All Messages
        </Button>
      </CardContent>
    </Card>
  );
}
