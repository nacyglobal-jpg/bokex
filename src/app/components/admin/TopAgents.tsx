import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';

const agents = [
  {
    name: 'Michael Johnson',
    bookings: 72,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    name: 'Sarah Miller',
    bookings: 65,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];

export function TopAgents() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Top Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent, index) => (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={agent.avatar} />
                <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{agent.name}</p>
                <p className="text-sm text-gray-500">{agent.bookings} Bookings</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
