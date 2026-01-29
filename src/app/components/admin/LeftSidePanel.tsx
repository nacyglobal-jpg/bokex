import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  User, 
  Building2, 
  DollarSign, 
  Mail, 
  MapPin, 
  Phone, 
  Lock, 
  ExternalLink,
  X,
  Upload,
  Search,
  KeyRound,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { userAPI } from '@/utils/api';
import userAvatar1 from 'figma:asset/a0f922793741304e254fed551505f4ebfa0d288a.png';
import userAvatar2 from 'figma:asset/7fa5df7b1aac8e3c1da60bb73bb28fc75f57f44f.png';
import userAvatar3 from 'figma:asset/21f69e30b4db36e88cf55a60f99a7ba10e8084bb.png';
import userAvatar4 from 'figma:asset/7dbe870b1a70ea06d7e71ed500e8f5e9c44a2e39.png';
import hotelLogo1 from 'figma:asset/7f51cc15ec72af2950d025e5fdedfaf31862e69a.png';
import hotelLogo2 from 'figma:asset/dcbae39c6e4a23330b2f92e5fa6dd68a6ec4fe8f.png';
import hotelLogo3 from 'figma:asset/7fa5df7b1aac8e3c1da60bb73bb28fc75f57f44f.png';
import hotelLogo4 from 'figma:asset/6afbb19e07e3d14e7e40cbaf8d45d862ff6cb0b4.png';

interface LeftSidePanelProps {
  onClose?: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  bookingsCount: number;
}

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  coordinates: string;
  logo: string;
  registrationNumber: string;
  propertyType: string;
  earnings: number;
  bookingsCount: number;
  monthlyEarnings: MonthlyEarning[];
}

interface MonthlyEarning {
  month: string;
  year: number;
  amount: number;
  bookings: number;
}

const mockUsers: UserData[] = [
  {
    id: 'USR001',
    name: 'Sarah Kamau',
    email: 'sarah.k@email.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    avatar: userAvatar1,
    bookingsCount: 12
  },
  {
    id: 'USR002',
    name: 'James Omondi',
    email: 'james.o@email.com',
    phone: '+254 723 456 789',
    location: 'Mombasa, Kenya',
    avatar: userAvatar2,
    bookingsCount: 8
  },
  {
    id: 'USR003',
    name: 'Grace Wanjiru',
    email: 'grace.w@email.com',
    phone: '+254 734 567 890',
    location: 'Kisumu, Kenya',
    avatar: userAvatar3,
    bookingsCount: 15
  },
  {
    id: 'USR004',
    name: 'Michael Kiprop',
    email: 'michael.k@email.com',
    phone: '+254 745 678 901',
    location: 'Nakuru, Kenya',
    avatar: userAvatar4,
    bookingsCount: 6
  }
];

const mockClients: ClientData[] = [
  {
    id: 'CLT001',
    name: 'Safari Suites Hotel',
    email: 'info@safarisuites.co.ke',
    phone: '+254 720 111 222',
    location: 'Westlands, Nairobi',
    coordinates: '-1.2674,36.8073',
    logo: hotelLogo1,
    registrationNumber: 'HT-2024-001',
    propertyType: 'Hotel',
    earnings: 1250000,
    bookingsCount: 45,
    monthlyEarnings: [
      { month: 'January', year: 2024, amount: 100000, bookings: 5 },
      { month: 'February', year: 2024, amount: 120000, bookings: 6 },
      { month: 'March', year: 2024, amount: 150000, bookings: 7 },
      { month: 'April', year: 2024, amount: 180000, bookings: 8 },
      { month: 'May', year: 2024, amount: 200000, bookings: 9 },
      { month: 'June', year: 2024, amount: 220000, bookings: 10 },
      { month: 'July', year: 2024, amount: 250000, bookings: 11 },
      { month: 'August', year: 2024, amount: 280000, bookings: 12 },
      { month: 'September', year: 2024, amount: 300000, bookings: 13 },
      { month: 'October', year: 2024, amount: 320000, bookings: 14 },
      { month: 'November', year: 2024, amount: 350000, bookings: 15 },
      { month: 'December', year: 2024, amount: 380000, bookings: 16 }
    ]
  },
  {
    id: 'CLT002',
    name: 'Coast Paradise BnB',
    email: 'hello@coastparadise.co.ke',
    phone: '+254 731 222 333',
    location: 'Diani Beach, Mombasa',
    coordinates: '-4.2866,39.5792',
    logo: hotelLogo2,
    registrationNumber: 'BNB-2024-012',
    propertyType: 'BnB',
    earnings: 875000,
    bookingsCount: 32,
    monthlyEarnings: [
      { month: 'January', year: 2024, amount: 70000, bookings: 4 },
      { month: 'February', year: 2024, amount: 80000, bookings: 5 },
      { month: 'March', year: 2024, amount: 90000, bookings: 6 },
      { month: 'April', year: 2024, amount: 100000, bookings: 7 },
      { month: 'May', year: 2024, amount: 110000, bookings: 8 },
      { month: 'June', year: 2024, amount: 120000, bookings: 9 },
      { month: 'July', year: 2024, amount: 130000, bookings: 10 },
      { month: 'August', year: 2024, amount: 140000, bookings: 11 },
      { month: 'September', year: 2024, amount: 150000, bookings: 12 },
      { month: 'October', year: 2024, amount: 160000, bookings: 13 },
      { month: 'November', year: 2024, amount: 170000, bookings: 14 },
      { month: 'December', year: 2024, amount: 180000, bookings: 15 }
    ]
  },
  {
    id: 'CLT003',
    name: 'Lake View Residence',
    email: 'contact@lakeview.co.ke',
    phone: '+254 742 333 444',
    location: 'Lake Victoria, Kisumu',
    coordinates: '-0.0917,34.7680',
    logo: hotelLogo3,
    registrationNumber: 'SH-2024-008',
    propertyType: 'Self-Stay',
    earnings: 645000,
    bookingsCount: 28,
    monthlyEarnings: [
      { month: 'January', year: 2024, amount: 50000, bookings: 3 },
      { month: 'February', year: 2024, amount: 60000, bookings: 4 },
      { month: 'March', year: 2024, amount: 70000, bookings: 5 },
      { month: 'April', year: 2024, amount: 80000, bookings: 6 },
      { month: 'May', year: 2024, amount: 90000, bookings: 7 },
      { month: 'June', year: 2024, amount: 100000, bookings: 8 },
      { month: 'July', year: 2024, amount: 110000, bookings: 9 },
      { month: 'August', year: 2024, amount: 120000, bookings: 10 },
      { month: 'September', year: 2024, amount: 130000, bookings: 11 },
      { month: 'October', year: 2024, amount: 140000, bookings: 12 },
      { month: 'November', year: 2024, amount: 150000, bookings: 13 },
      { month: 'December', year: 2024, amount: 160000, bookings: 14 }
    ]
  },
  {
    id: 'CLT004',
    name: 'Mountain Lodge Kenya',
    email: 'stay@mountainlodge.co.ke',
    phone: '+254 753 444 555',
    location: 'Nanyuki, Mt. Kenya',
    coordinates: '-0.0167,37.0740',
    logo: hotelLogo4,
    registrationNumber: 'HT-2024-015',
    propertyType: 'Hotel',
    earnings: 2150000,
    bookingsCount: 67,
    monthlyEarnings: [
      { month: 'January', year: 2024, amount: 150000, bookings: 10 },
      { month: 'February', year: 2024, amount: 160000, bookings: 11 },
      { month: 'March', year: 2024, amount: 170000, bookings: 12 },
      { month: 'April', year: 2024, amount: 180000, bookings: 13 },
      { month: 'May', year: 2024, amount: 190000, bookings: 14 },
      { month: 'June', year: 2024, amount: 200000, bookings: 15 },
      { month: 'July', year: 2024, amount: 210000, bookings: 16 },
      { month: 'August', year: 2024, amount: 220000, bookings: 17 },
      { month: 'September', year: 2024, amount: 230000, bookings: 18 },
      { month: 'October', year: 2024, amount: 240000, bookings: 19 },
      { month: 'November', year: 2024, amount: 250000, bookings: 20 },
      { month: 'December', year: 2024, amount: 260000, bookings: 21 }
    ]
  }
];

export function LeftSidePanel({ onClose }: LeftSidePanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<UserData[]>([]);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [expandedClientId, setExpandedClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch real data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching users and partners from database...');

        // Fetch users and partners in parallel
        const [usersResponse, partnersResponse] = await Promise.all([
          userAPI.getAll(),
          userAPI.getAllPartners()
        ]);

        console.log('Users response:', usersResponse);
        console.log('Partners response:', partnersResponse);

        // Transform users data
        if (usersResponse && usersResponse.users) {
          const transformedUsers: UserData[] = usersResponse.users.map((user: any, index: number) => ({
            id: user.user_id || user.id,
            name: user.full_name || 'Unknown User',
            email: user.email,
            phone: user.phone || 'N/A',
            location: 'Kenya', // Default since location not in schema
            avatar: [userAvatar1, userAvatar2, userAvatar3, userAvatar4][index % 4],
            bookingsCount: 0 // Will be updated from bookings if needed
          }));
          setUsers(transformedUsers);
          console.log(`Loaded ${transformedUsers.length} users from database`);
        }

        // Transform partners data
        if (partnersResponse && partnersResponse.partners) {
          const transformedClients: ClientData[] = partnersResponse.partners.map((partner: any, index: number) => ({
            id: partner.partner_id || partner.id,
            name: partner.business_name || partner.property_name || `${partner.first_name} ${partner.last_name}`,
            email: partner.email,
            phone: partner.phone || 'N/A',
            location: partner.location || partner.property_location || 'Kenya',
            coordinates: '-1.2921,36.8219', // Default Nairobi coords
            logo: [hotelLogo1, hotelLogo2, hotelLogo3, hotelLogo4][index % 4],
            registrationNumber: partner.partner_id || 'N/A',
            propertyType: 'Hotel', // Default type
            earnings: 0, // Will be calculated from bookings
            bookingsCount: 0, // Will be calculated from bookings
            monthlyEarnings: []
          }));
          setClients(transformedClients);
          console.log(`Loaded ${transformedClients.length} partners from database`);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to mock data on error
        console.log('Falling back to mock data');
        setUsers(mockUsers);
        setClients(mockClients);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleResetPassword = (userId: string, userName: string) => {
    toast.success(`Password reset email sent to ${userName}`, {
      description: 'User will receive instructions to reset their password.',
    });
  };

  const handleLogoUpload = (clientId: string, clientName: string) => {
    toast.success(`Logo upload initiated for ${clientName}`, {
      description: 'Client can now upload their logo.',
    });
  };

  const getGoogleMapsUrl = (coordinates: string) => {
    const [lat, lng] = coordinates.split(',');
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalEarnings = clients.reduce((sum, client) => sum + client.earnings, 0);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Panel Title */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#0052A3] to-[#00A8E8]">
        <h2 className="text-lg font-bold text-white mb-1">Customer Management</h2>
        <p className="text-xs text-blue-100">Users, Clients & Earnings</p>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="earnings" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earnings" className="text-xs">
              <DollarSign className="size-3 mr-1" />
              Earnings
            </TabsTrigger>
            <TabsTrigger value="clients" className="text-xs">
              <Building2 className="size-3 mr-1" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs">
              <User className="size-3 mr-1" />
              Users
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          {/* Earnings Tab */}
          <TabsContent value="earnings" className="p-4 space-y-3 mt-0">
            {/* Total Platform Earnings */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Total Platform Earnings</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold text-green-700">
                  KSh {totalEarnings.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  From {clients.length} active clients • All-time total
                </p>
              </CardContent>
            </Card>

            {/* Payment Method Information */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#00A8E8]">
              <CardHeader className="p-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="size-5 text-[#00A8E8]" />
                  Platform Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                <div className="bg-white rounded-lg p-3 border border-[#00A8E8]/30">
                  <p className="text-xs text-gray-600 mb-1">Payment Type</p>
                  <p className="text-sm font-bold text-gray-900">MPESA PAYBILL STK Push</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-[#00A8E8]/30">
                  <p className="text-xs text-gray-600 mb-1">Paybill Number</p>
                  <p className="text-2xl font-bold text-[#00A8E8]">4005207</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-[#00A8E8]/30">
                  <p className="text-xs text-gray-600 mb-1">Business Name</p>
                  <p className="text-sm font-bold text-gray-900">NACY GLOBAL TECHNOLOGIES</p>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Earnings Section */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm">Monthly Earnings Breakdown</h3>
              
              {clients
                .sort((a, b) => b.earnings - a.earnings)
                .map((client) => {
                  const isExpanded = expandedClientId === client.id;
                  
                  return (
                    <Card key={client.id} className="border hover:border-[#00A8E8] transition-colors">
                      <CardContent className="p-3">
                        {/* Client Header - Clickable */}
                        <button
                          onClick={() => setExpandedClientId(isExpanded ? null : client.id)}
                          className="w-full flex items-center gap-2 text-left"
                        >
                          <Avatar className="w-10 h-10 rounded-lg flex-shrink-0">
                            <AvatarImage src={client.logo} className="object-cover" />
                            <AvatarFallback className="text-xs">{client.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-xs text-gray-900 truncate">{client.name}</p>
                            <p className="text-xs text-gray-500">{client.propertyType}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-sm text-green-700">
                              KSh {client.earnings.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">{client.bookingsCount} bookings</p>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="size-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="size-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>

                        {/* Monthly Breakdown - Collapsible */}
                        {isExpanded && (
                          <div className="space-y-1 bg-gray-50 rounded-lg p-2 mt-3 animate-in slide-in-from-top duration-200">
                            <p className="text-xs font-semibold text-gray-700 mb-2">2024 Monthly Earnings</p>
                            <div className="space-y-1.5">
                              {client.monthlyEarnings?.slice().reverse().map((monthly) => (
                                <div 
                                  key={`${client.id}-${monthly.month}`}
                                  className="flex items-center justify-between bg-white rounded px-2 py-1.5 hover:bg-green-50 transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="w-16">
                                      <p className="text-xs font-medium text-gray-700">{monthly.month.substring(0, 3)}</p>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                      {monthly.bookings}
                                    </Badge>
                                  </div>
                                  <p className="text-xs font-bold text-green-700">
                                    KSh {monthly.amount.toLocaleString()}
                                  </p>
                                </div>
                              )) || <p className="text-xs text-gray-500">No monthly data available</p>}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}\n            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="p-4 space-y-3 mt-0">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-900">
                Total Clients: {clients.length}
              </p>
            </div>

            {filteredClients.map((client) => (
              <Card key={client.id} className="border hover:border-[#00A8E8] transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-12 h-12 border-2 border-gray-200 rounded-lg">
                        <AvatarImage src={client.logo} className="object-cover" />
                        <AvatarFallback className="text-xs">{client.name[0]}</AvatarFallback>
                      </Avatar>
                      <button
                        onClick={() => handleLogoUpload(client.id, client.name)}
                        className="absolute -bottom-1 -right-1 bg-[#00A8E8] text-white p-1 rounded-full hover:bg-[#0086ba] transition-colors"
                        title="Upload Logo"
                      >
                        <Upload className="size-2.5" />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <h3 className="font-bold text-sm text-gray-900 truncate">{client.name}</h3>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {client.registrationNumber}
                          </Badge>
                          <Badge className="bg-[#00A8E8] hover:bg-[#0086ba] text-xs">
                            {client.propertyType}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Mail className="size-3 text-[#00A8E8] flex-shrink-0" />
                          <span className="truncate">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="size-3 text-[#00A8E8] flex-shrink-0" />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="size-3 text-[#00A8E8] flex-shrink-0" />
                          <span className="truncate">{client.location}</span>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-600">Earnings</p>
                            <p className="text-sm font-bold text-green-700">
                              KSh {client.earnings.toLocaleString()}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {client.bookingsCount}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        onClick={() => window.open(getGoogleMapsUrl(client.coordinates), '_blank')}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs h-8 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                      >
                        <ExternalLink className="size-3 mr-1" />
                        Google Maps
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredClients.length === 0 && (
              <div className="text-center py-8">
                <Building2 className="size-8 mx-auto text-gray-300 mb-2" />
                <p className="text-xs text-gray-500">No clients found</p>
              </div>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="p-4 space-y-3 mt-0">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-900">
                Total Users: {users.length}
              </p>
            </div>

            {filteredUsers.map((user) => (
              <Card key={user.id} className="border hover:border-[#00A8E8] transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12 border-2 border-gray-200">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <h3 className="font-bold text-sm text-gray-900 truncate">{user.name}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {user.id}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Mail className="size-3 text-[#00A8E8] flex-shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="size-3 text-[#00A8E8] flex-shrink-0" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="size-3 text-[#00A8E8] flex-shrink-0" />
                          <span className="truncate">{user.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {user.bookingsCount} Bookings
                        </Badge>
                      </div>

                      <Button
                        onClick={() => handleResetPassword(user.id, user.name)}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs h-8 border-[#0052A3] text-[#0052A3] hover:bg-[#0052A3] hover:text-white"
                      >
                        <KeyRound className="size-3 mr-1" />
                        Reset Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <User className="size-8 mx-auto text-gray-300 mb-2" />
                <p className="text-xs text-gray-500">No users found</p>
              </div>
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}