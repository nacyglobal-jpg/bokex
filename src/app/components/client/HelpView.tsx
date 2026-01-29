import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { 
  HelpCircle, 
  BookOpen, 
  MessageCircle, 
  Phone, 
  Mail, 
  Video,
  FileText,
  Users,
  Settings,
  DollarSign,
  Calendar,
  Shield
} from 'lucide-react';

const faqCategories = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    count: 12,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Calendar,
    title: 'Bookings & Calendar',
    count: 18,
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: DollarSign,
    title: 'Payments & Pricing',
    count: 15,
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: Users,
    title: 'Guest Management',
    count: 10,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Settings,
    title: 'Account Settings',
    count: 8,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Shield,
    title: 'Safety & Security',
    count: 6,
    color: 'bg-red-50 text-red-600',
  },
];

const popularArticles = [
  {
    id: 1,
    title: 'How to manage your booking calendar',
    category: 'Bookings',
    views: 1250,
  },
  {
    id: 2,
    title: 'Setting up pricing and availability',
    category: 'Pricing',
    views: 980,
  },
  {
    id: 3,
    title: 'Responding to guest messages',
    category: 'Guest Management',
    views: 850,
  },
  {
    id: 4,
    title: 'Understanding your earnings and payouts',
    category: 'Payments',
    views: 720,
  },
  {
    id: 5,
    title: 'How to improve your listing visibility',
    category: 'Marketing',
    views: 680,
  },
];

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our support team',
    availability: 'Available 24/7',
    action: 'Start Chat',
    color: 'bg-blue-600',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Call us at +254 700 123 456',
    availability: 'Mon-Fri, 8AM-8PM EAT',
    action: 'Call Now',
    color: 'bg-green-600',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'support@bokex.co.ke',
    availability: 'Response within 24 hours',
    action: 'Send Email',
    color: 'bg-purple-600',
  },
  {
    icon: Video,
    title: 'Video Tutorial',
    description: 'Watch step-by-step guides',
    availability: '50+ videos available',
    action: 'Watch Now',
    color: 'bg-orange-600',
  },
];

export function HelpView() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <HelpCircle className="size-16 text-[#00A8E8] mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">How can we help you?</h1>
        <p className="text-gray-600 mb-6">Search our knowledge base or get in touch with our support team</p>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for help articles..."
            className="w-full pl-12 pr-4 py-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#00A8E8] shadow-sm"
          />
          <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        </div>
      </div>

      {/* FAQ Categories */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {faqCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <Icon className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.count} articles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Popular Articles */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Popular Articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularArticles.map((article) => (
              <button
                key={article.id}
                className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{article.title}</h4>
                  <p className="text-sm text-gray-600">{article.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{article.views} views</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Methods */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card key={method.title} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${method.color} text-white`}>
                      <Icon className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                      <p className="text-xs text-gray-500">{method.availability}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-[#0052A3] hover:bg-[#003d7a]">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-[#0052A3] to-[#00A8E8] text-white">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <BookOpen className="size-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">New to Bokex?</h3>
              <p className="text-blue-50 mb-4">
                Check out our comprehensive guide to get started with managing your property on Bokex. 
                Learn about calendar management, pricing strategies, and guest communication.
              </p>
              <Button className="bg-white text-[#0052A3] hover:bg-gray-100">
                View Getting Started Guide
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="text-center">
            <Users className="size-12 text-[#00A8E8] mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Join Our Community</h3>
            <p className="text-gray-600 mb-4">
              Connect with other hosts, share tips, and learn from experienced property managers
            </p>
            <Button className="bg-[#00A8E8] hover:bg-[#0086ba]">
              Visit Community Forum
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
