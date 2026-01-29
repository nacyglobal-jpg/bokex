import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Search, Send, Paperclip, MoreVertical } from 'lucide-react';

const conversations = [
  {
    id: 1,
    guest: 'John D.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    lastMessage: 'Thanks for the quick response!',
    timestamp: '2m ago',
    unread: 2,
    status: 'urgent',
  },
  {
    id: 2,
    guest: 'Sarah R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'I have 3 bookings to confirm',
    timestamp: '1h ago',
    unread: 0,
    status: 'open',
  },
  {
    id: 3,
    guest: 'Michael T.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lastMessage: 'Can I request an early check-in?',
    timestamp: '3h ago',
    unread: 1,
    status: 'open',
  },
  {
    id: 4,
    guest: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    lastMessage: 'Perfect, see you soon!',
    timestamp: '1d ago',
    unread: 0,
    status: null,
  },
];

const messageHistory = [
  {
    id: 1,
    sender: 'guest',
    content: 'Hi! I have a question about my upcoming booking.',
    timestamp: '10:30 AM',
  },
  {
    id: 2,
    sender: 'host',
    content: 'Hello! I\'d be happy to help. What would you like to know?',
    timestamp: '10:32 AM',
  },
  {
    id: 3,
    sender: 'guest',
    content: 'Is it possible to arrange an airport pickup?',
    timestamp: '10:35 AM',
  },
  {
    id: 4,
    sender: 'host',
    content: 'Absolutely! We can arrange that for you. The cost is KSh 3,500 for a one-way transfer. Would you like me to book that for you?',
    timestamp: '10:36 AM',
  },
  {
    id: 5,
    sender: 'guest',
    content: 'Yes please! My flight arrives at 2:30 PM on May 25th.',
    timestamp: '10:38 AM',
  },
  {
    id: 6,
    sender: 'host',
    content: 'Perfect! I\'ve arranged the pickup for May 25th at 2:30 PM. Our driver will meet you at the arrivals hall with a sign. Is there anything else I can help you with?',
    timestamp: '10:40 AM',
  },
  {
    id: 7,
    sender: 'guest',
    content: 'Thanks for the quick response!',
    timestamp: '10:42 AM',
  },
];

export function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.guest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with your guests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="border-0 shadow-sm lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-1 max-h-[600px] overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                  selectedConversation.id === conv.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conv.avatar} />
                    <AvatarFallback>{conv.guest.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {conv.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#00A8E8] text-white text-xs rounded-full flex items-center justify-center">
                      {conv.unread}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{conv.guest}</h4>
                    {conv.status && (
                      <Badge
                        className={`text-xs px-2 py-0 ${
                          conv.status === 'urgent'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {conv.status.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback>{selectedConversation.guest.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConversation.guest}</h3>
                  <p className="text-xs text-gray-500">Active now</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="size-5 text-gray-600" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              {messageHistory.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'host' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.sender === 'host'
                        ? 'bg-[#0052A3] text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'host' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-end gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Paperclip className="size-5 text-gray-600" />
                </button>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] resize-none"
                  rows={2}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#00A8E8] hover:bg-[#0086ba]"
                  disabled={!messageText.trim()}
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
