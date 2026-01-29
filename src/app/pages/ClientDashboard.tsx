import { useState, useEffect } from 'react';
import { ClientStatCard } from '@/app/components/client/ClientStatCard';
import { ClientBookingsChart } from '@/app/components/client/ClientBookingsChart';
import { AvailabilityCalendar } from '@/app/components/client/AvailabilityCalendar';
import { ClientRecentBookings } from '@/app/components/client/ClientRecentBookings';
import { GuestReviews } from '@/app/components/client/GuestReviews';
import { Messages } from '@/app/components/client/Messages';
import { CalendarView } from '@/app/components/client/CalendarView';
import { BookingsView } from '@/app/components/client/BookingsView';
import { ReviewsView } from '@/app/components/client/ReviewsView';
import { MessagesView } from '@/app/components/client/MessagesView';
import { HelpView } from '@/app/components/client/HelpView';
import { RoleManagement } from '@/app/components/RoleManagement';
import { CalendarDays, DollarSign, Star, MessageSquare, User, Home as HomeIcon, Building2, Settings, UserCog, Sparkles, X } from 'lucide-react';
import bokexLogo from 'figma:asset/b3eec849e602f8c2161f203313ac85d8e639591b.png';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

interface ClientDashboardProps {
  onNavigateHome?: () => void;
  onNavigateAccount?: () => void;
  onNavigateClientAccount?: () => void;
  onNavigatePropertyManagement?: () => void;
}

type DashboardView = 'dashboard' | 'calendar' | 'bookings' | 'reviews' | 'messages' | 'help' | 'roles' | 'propertyManagement' | 'hotelAccount';

export function ClientDashboard({ onNavigateHome, onNavigateAccount, onNavigateClientAccount, onNavigatePropertyManagement }: ClientDashboardProps = {}) {
  const [currentView, setCurrentView] = useState<DashboardView>('dashboard');
  const [partnerName, setPartnerName] = useState<string>('Partner');

  // Load partner name
  useEffect(() => {
    const currentPartner = localStorage.getItem('currentPartner');
    if (currentPartner) {
      const partner = JSON.parse(currentPartner);
      setPartnerName(`${partner.firstName} ${partner.lastName.charAt(0)}.`);
    }
  }, []);

  // Handle navigation to external pages
  useEffect(() => {
    if (currentView === 'propertyManagement' && onNavigatePropertyManagement) {
      onNavigatePropertyManagement();
      // Reset to dashboard after navigation
      setCurrentView('dashboard');
    } else if (currentView === 'hotelAccount' && onNavigateClientAccount) {
      onNavigateClientAccount();
      // Reset to dashboard after navigation
      setCurrentView('dashboard');
    }
  }, [currentView, onNavigatePropertyManagement, onNavigateClientAccount]);

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarView />;
      case 'bookings':
        return <BookingsView />;
      case 'reviews':
        return <ReviewsView />;
      case 'messages':
        return <MessagesView />;
      case 'help':
        return <HelpView />;
      case 'roles':
        return <RoleManagement dashboardType="client" />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0A2540] text-white shadow-lg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img src={bokexLogo} alt="Bokex" className="h-8 w-auto" />
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className={currentView === 'dashboard' ? 'text-cyan-300 font-medium' : 'hover:text-cyan-300 transition-colors'}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setCurrentView('calendar')}
                  className={currentView === 'calendar' ? 'text-cyan-300 font-medium' : 'hover:text-cyan-300 transition-colors'}
                >
                  Calendar
                </button>
                <button 
                  onClick={() => setCurrentView('bookings')}
                  className={currentView === 'bookings' ? 'text-cyan-300 font-medium' : 'hover:text-cyan-300 transition-colors'}
                >
                  Bookings
                </button>
                <button 
                  onClick={() => setCurrentView('reviews')}
                  className={currentView === 'reviews' ? 'text-cyan-300 font-medium' : 'hover:text-cyan-300 transition-colors'}
                >
                  Reviews
                </button>
                <button 
                  onClick={() => setCurrentView('messages')}
                  className={currentView === 'messages' ? 'text-cyan-300 font-medium' : 'hover:text-cyan-300 transition-colors'}
                >
                  Messages
                </button>
                <button 
                  onClick={() => setCurrentView('roles')}
                  className={currentView === 'roles' ? 'text-cyan-300 font-medium' : 'hover:text-cyan-300 transition-colors'}
                >
                  Roles
                </button>
                <button 
                  onClick={() => setCurrentView('help')}
                  className={currentView === 'help' ? 'text-cyan-300 font-medium' : 'hover:text-cyan-300 transition-colors'}
                >
                  Help
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {/* Property Management Button */}
              <button 
                onClick={() => setCurrentView('propertyManagement')}
                className="hidden md:flex items-center gap-2 bg-[#00A8E8] hover:bg-[#0086ba] text-white px-4 py-2 rounded-lg transition-all hover:scale-105 font-medium text-sm"
              >
                <Building2 className="size-4" />
                <span>Property Management</span>
              </button>
              
              {/* Hotel Account Button */}
              <button 
                onClick={() => setCurrentView('hotelAccount')}
                className="hidden md:flex items-center gap-2 bg-[#0052A3] hover:bg-[#003d7a] text-white px-4 py-2 rounded-lg transition-all hover:scale-105 font-medium text-sm"
              >
                <Settings className="size-4" />
                <span>Hotel Account</span>
              </button>

              {/* User Profile Button */}
              <button 
                onClick={onNavigateAccount}
                className="flex items-center gap-3 bg-white text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <User className="size-4" />
                <span className="text-sm font-medium hidden sm:inline">{partnerName}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white mt-12 md:mt-16 py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <img src={bokexLogo} alt="Bokex" className="h-8 mx-auto mb-3" />
          </div>
          <p className="text-sm md:text-base">&copy; 2026 Bokex. All rights reserved.</p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">
            Bokex Booking . Smart Stays. Seamless Booking.
          </p>
          <p className="text-xs md:text-sm mt-3">
            Powered by <span className="text-[#00A8E8] font-semibold">Nacy Global Technologies</span> and Managed by <span className="text-[#00A8E8] font-semibold">Tacy ERP</span>
          </p>
        </div>
      </footer>

      {/* Home Button - Floating */}
      {onNavigateHome && (
        <button
          onClick={onNavigateHome}
          className="fixed bottom-6 right-6 bg-[#00A8E8] hover:bg-[#0086ba] text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
          title="Back to Home"
        >
          <HomeIcon className="size-6" />
        </button>
      )}
    </div>
  );
}

// Dashboard Content Component
function DashboardContent() {
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  const [propertyType, setPropertyType] = useState<string>('');
  const [roomType, setRoomType] = useState<string>('');
  const [propertyDetails, setPropertyDetails] = useState<any>(null);
  const [partnerData, setPartnerData] = useState<any>(null);
  const [bookingsData, setBookingsData] = useState<any>({
    upcoming: 0,
    earnings: 0,
    rating: 0,
    totalReviews: 0,
    newReviews: 0,
    newMessages: 0
  });

  // Load partner data and calculate stats
  useEffect(() => {
    // Get current logged-in partner data
    const currentPartner = localStorage.getItem('currentPartner');
    if (currentPartner) {
      const partner = JSON.parse(currentPartner);
      setPartnerData(partner);
      
      // Calculate real booking statistics
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const partnerBookings = allBookings.filter((booking: any) => 
        booking.propertyOwnerEmail === partner.email || 
        booking.hotelName === partner.propertyName
      );

      // Calculate upcoming bookings
      const today = new Date();
      const upcoming = partnerBookings.filter((booking: any) => {
        const checkIn = new Date(booking.checkIn);
        return checkIn >= today && booking.status !== 'cancelled';
      }).length;

      // Calculate total earnings from completed bookings
      const earnings = partnerBookings
        .filter((booking: any) => booking.paymentStatus === 'verified' || booking.status === 'completed')
        .reduce((sum: number, booking: any) => sum + (booking.totalPrice || 0), 0);

      // Calculate rating from reviews
      const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      const partnerReviews = allReviews.filter((review: any) => 
        review.propertyOwner === partner.email || review.hotelName === partner.propertyName
      );
      const avgRating = partnerReviews.length > 0
        ? partnerReviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0) / partnerReviews.length
        : 0;

      // Count new reviews (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const newReviews = partnerReviews.filter((review: any) => 
        new Date(review.date || review.createdAt) > sevenDaysAgo
      ).length;

      // Count new messages (last 7 days)
      const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      const partnerMessages = allMessages.filter((msg: any) => 
        msg.propertyOwner === partner.email
      );
      const newMessages = partnerMessages.filter((msg: any) => 
        new Date(msg.timestamp || msg.createdAt) > sevenDaysAgo && !msg.read
      ).length;

      setBookingsData({
        upcoming,
        earnings,
        rating: Math.round(avgRating * 10) / 10,
        totalReviews: partnerReviews.length,
        newReviews,
        newMessages
      });
    }

    // Check if user is coming from List Property page
    const selectedType = localStorage.getItem('selectedPropertyType');
    const selectedRoom = localStorage.getItem('selectedRoomType');
    const storedDetails = localStorage.getItem('propertyDetails');
    
    if (selectedType) {
      setPropertyType(selectedType);
      setShowWelcomeBanner(true);
      if (selectedRoom) {
        setRoomType(selectedRoom);
      }
      if (storedDetails) {
        setPropertyDetails(JSON.parse(storedDetails));
      }
    }
  }, []);

  const getPropertyTypeName = (type: string) => {
    const typeMap: Record<string, string> = {
      'apartment': 'Apartment',
      'homes': 'Homes',
      'hotels': 'Hotel, B&Bs & More',
      'alternative': 'Alternative Places'
    };
    return typeMap[type] || 'Property';
  };

  const handleDismissWelcome = () => {
    localStorage.removeItem('selectedPropertyType');
    localStorage.removeItem('selectedRoomType');
    localStorage.removeItem('propertyDetails');
    setShowWelcomeBanner(false);
  };

  return (
    <>
      {/* New Partner Welcome Banner */}
      {showWelcomeBanner && (
        <Card className="bg-gradient-to-br from-[#0A2540] via-[#0052A3] to-[#00A8E8] text-white mb-6 md:mb-8 border-0 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          <CardContent className="p-6 md:p-8 relative z-10">
            <button
              onClick={handleDismissWelcome}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-start gap-4 md:gap-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex-shrink-0">
                <Sparkles className="size-8 md:size-10 text-cyan-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  🎉 Welcome to Bokex Partner Dashboard!
                </h2>
                <p className="text-cyan-100 text-base md:text-lg mb-4">
                  Congratulations on choosing to list your <span className="font-bold text-white">{getPropertyTypeName(propertyType)}</span>
                  {roomType && <span> - <span className="font-bold text-cyan-300">{roomType}</span></span>} with us!
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <span className="bg-cyan-300 text-[#0052A3] size-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Next Steps to Get Started
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-cyan-100">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-300 mt-0.5">✓</span>
                      <span>Complete your property details in <strong className="text-white">Property Management</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-300 mt-0.5">✓</span>
                      <span>Update your <strong className="text-white">Hotel Account Information</strong> with contact details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-300 mt-0.5">✓</span>
                      <span>Set room availability and pricing in the <strong className="text-white">Calendar</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-300 mt-0.5">✓</span>
                      <span>Start receiving bookings with instant <strong className="text-white">MPESA payments</strong></span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handleDismissWelcome}
                    className="bg-white text-[#0052A3] hover:bg-cyan-50 font-semibold"
                  >
                    Get Started Now
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-white/50 text-white hover:bg-white/10 hover:text-white"
                  >
                    📞 Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Welcome Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          Welcome back, {partnerData ? `${partnerData.firstName} ${partnerData.lastName.charAt(0)}.` : 'Partner'}
        </h1>
        <h2 className="text-base md:text-lg text-gray-700 mb-1">
          {partnerData?.propertyName || 'Property Management'}
        </h2>
        <p className="text-sm text-gray-600">Here are your booking stats and recent activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <ClientStatCard
          icon={CalendarDays}
          iconBgColor="bg-blue-50"
          iconColor="text-[#0052A3]"
          title="Upcoming"
          value={bookingsData.upcoming.toString()}
          change="+0%"
          changeLabel="+5% Last week"
        />
        <ClientStatCard
          icon={DollarSign}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
          title="Earnings"
          value={`KSh ${bookingsData.earnings.toLocaleString()}`}
          change="+9%"
          changeLabel="Last 7 days"
        />
        <ClientStatCard
          icon={Star}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-500"
          title="Overall Rating"
          value=""
        >
          <div className="mb-1">
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-2xl font-bold text-gray-900">{bookingsData.rating}</p>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="size-4 fill-gray-200 text-gray-200" />
              </div>
            </div>
            <p className="text-xs text-gray-500">{bookingsData.totalReviews} reviews</p>
          </div>
        </ClientStatCard>
        <ClientStatCard
          icon={MessageSquare}
          iconBgColor="bg-cyan-50"
          iconColor="text-[#00A8E8]"
          title="New Reviews"
          value={bookingsData.newReviews.toString()}
          change={bookingsData.newMessages.toString()}
          changeLabel="3 new messages"
        />
      </div>

      {/* Platform Payment Method */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#00A8E8] mb-6 md:mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl flex items-center gap-2">
            <DollarSign className="size-5 md:size-6 text-[#00A8E8]" />
            Platform Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-[#00A8E8]/30">
            <p className="text-xs text-gray-600 mb-2">Payment Type</p>
            <p className="text-sm md:text-base font-bold text-gray-900">MPESA PAYBILL STK Push</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#00A8E8]/30">
            <p className="text-xs text-gray-600 mb-2">Paybill Number</p>
            <p className="text-3xl md:text-4xl font-bold text-[#00A8E8]">4005207</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#00A8E8]/30">
            <p className="text-xs text-gray-600 mb-2">Business Name</p>
            <p className="text-sm md:text-base font-bold text-gray-900">NACY GLOBAL TECHNOLOGIES</p>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {/* Bookings Overview Chart */}
          <ClientBookingsChart />

          {/* Recent Bookings */}
          <ClientRecentBookings />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6 md:space-y-8">
          {/* Availability Calendar */}
          <AvailabilityCalendar />

          {/* Guest Reviews */}
          <GuestReviews />

          {/* Messages */}
          <Messages />
        </div>
      </div>
    </>
  );
}