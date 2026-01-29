import { useState, useEffect } from 'react';
import { StatCard } from '@/app/components/admin/StatCard';
import { BookingsChart } from '@/app/components/admin/BookingsChart';
import { CustomerInsights } from '@/app/components/admin/CustomerInsights';
import { RecentBookings } from '@/app/components/admin/RecentBookings';
import { ListingPerformance } from '@/app/components/admin/ListingPerformance';
import { TopAgents } from '@/app/components/admin/TopAgents';
import { LeftSidePanel } from '@/app/components/admin/LeftSidePanel';
import { RoleManagement } from '@/app/components/RoleManagement';
import { PaymentVerification } from '@/app/components/admin/PaymentVerification';
import { CalendarDays, DollarSign, Users, Star, User, Home as HomeIcon, Building2, UserCog, CreditCard } from 'lucide-react';
import bokexLogo from 'figma:asset/b3eec849e602f8c2161f203313ac85d8e639591b.png';
import bokexLogoWhiteBg from 'figma:asset/f4176c6116fee8091758a5f7301fe959e761c318.png';
import adminAvatar from 'figma:asset/a0f922793741304e254fed551505f4ebfa0d288a.png';
import { statsAPI } from '@/utils/api';

interface AdminDashboardProps {
  onNavigateHome?: () => void;
}

export function AdminDashboard({ onNavigateHome }: AdminDashboardProps = {}) {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'roles' | 'payments'>('dashboard');
  const [dashboardStats, setDashboardStats] = useState({
    totalBookings: 0,
    totalEarnings: 0,
    totalClients: 0,
    totalUsers: 0,
    totalReviews: 0,
    avgRating: 0
  });
  const [loading, setLoading] = useState(true);

  // Load real data from database API
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        console.log('Fetching admin stats from database...');
        
        const response = await statsAPI.getAdminStats();
        console.log('Admin stats response:', response);
        
        if (response && response.stats) {
          setDashboardStats({
            totalBookings: response.stats.totalBookings || 0,
            totalEarnings: response.stats.totalRevenue || 0,
            totalClients: response.stats.totalPartners || 0,
            totalUsers: response.stats.totalUsers || 0,
            totalReviews: response.stats.totalReviews || 0,
            avgRating: parseFloat(response.stats.avgRating) || 0
          });
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        // Fallback to localStorage if API fails
        console.log('Falling back to localStorage data...');
        const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const totalBookings = allBookings.length;

        const totalEarnings = allBookings
          .filter((booking: any) => booking.paymentStatus === 'verified' || booking.status === 'completed')
          .reduce((sum: number, booking: any) => sum + (booking.totalPrice || 0), 0);

        const registeredPartners = JSON.parse(localStorage.getItem('registeredPartners') || '[]');
        const totalClients = registeredPartners.length;

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const totalUsers = registeredUsers.length;

        const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const totalReviews = allReviews.length;
        const avgRating = totalReviews > 0
          ? allReviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0) / totalReviews
          : 0;

        setDashboardStats({
          totalBookings,
          totalEarnings,
          totalClients,
          totalUsers,
          totalReviews,
          avgRating: Math.round(avgRating * 10) / 10
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [currentView]); // Refresh when view changes

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Full Width */}
      <header className="bg-[#0A2540] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img src={bokexLogo} alt="Bokex" className="h-8 w-auto" />
              <p className="hidden md:block text-sm text-gray-300">Bokex Booking . Smart Stays. Seamless Booking.</p>
            </div>
            <div className="flex items-center gap-3 bg-white text-gray-900 px-4 py-2 rounded-lg">
              <User className="size-4" />
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area with Left Panel */}
      <div className="flex-1 flex">
        {/* Collapsed Icons Bar - Always Visible on Desktop */}
        <div className="hidden lg:block bg-white border-r border-gray-200">
          <div className="flex flex-col items-center py-6 px-3 gap-6">
            <button
              onClick={() => setIsPanelExpanded(!isPanelExpanded)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
              title="Earnings"
            >
              <DollarSign className="size-6 text-green-600" />
              <span className="text-xs font-medium text-gray-700">Earn</span>
            </button>
            
            <button
              onClick={() => setIsPanelExpanded(!isPanelExpanded)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
              title="Clients"
            >
              <Building2 className="size-6 text-[#00A8E8]" />
              <span className="text-xs font-medium text-gray-700">Hotels</span>
            </button>
            
            <button
              onClick={() => setIsPanelExpanded(!isPanelExpanded)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
              title="Users"
            >
              <Users className="size-6 text-[#0052A3]" />
              <span className="text-xs font-medium text-gray-700">Users</span>
            </button>
            
            <button
              onClick={() => setIsPanelExpanded(!isPanelExpanded)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
              title="Roles"
            >
              <UserCog className="size-6 text-[#00A8E8]" />
              <span className="text-xs font-medium text-gray-700">Roles</span>
            </button>
            
            <button
              onClick={() => setIsPanelExpanded(!isPanelExpanded)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
              title="Payments"
            >
              <CreditCard className="size-6 text-[#00A8E8]" />
              <span className="text-xs font-medium text-gray-700">Payments</span>
            </button>
          </div>
        </div>

        {/* Expanded Side Panel - Shows when clicked */}
        {isPanelExpanded && (
          <div className="hidden lg:block w-80 xl:w-96 border-r border-gray-200 bg-white overflow-y-auto shadow-xl animate-in slide-in-from-left duration-300">
            <LeftSidePanel onClose={() => setIsPanelExpanded(false)} />
          </div>
        )}

        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 font-medium text-sm transition-colors relative ${
                  currentView === 'dashboard'
                    ? 'text-[#0052A3] border-b-2 border-[#0052A3]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('roles')}
                className={`px-4 py-2 font-medium text-sm transition-colors relative flex items-center gap-2 ${
                  currentView === 'roles'
                    ? 'text-[#0052A3] border-b-2 border-[#0052A3]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserCog className="size-4" />
                Role Management
              </button>
              <button
                onClick={() => setCurrentView('payments')}
                className={`px-4 py-2 font-medium text-sm transition-colors relative flex items-center gap-2 ${
                  currentView === 'payments'
                    ? 'text-[#0052A3] border-b-2 border-[#0052A3]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CreditCard className="size-4" />
                Payment Verification
              </button>
            </div>

            {/* Conditional Content */}
            {currentView === 'roles' ? (
              <RoleManagement dashboardType="super-admin" />
            ) : currentView === 'payments' ? (
              <PaymentVerification />
            ) : (
              <>
                {/* Title Section */}
                <div className="mb-6 md:mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
                  <h2 className="text-lg md:text-xl text-gray-700 mb-1">Welcome back, Admin!</h2>
                  <p className="text-sm text-gray-600">Bokex Booking . Smart Stays. Seamless Booking.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                  <StatCard
                    title="Total Bookings"
                    value={dashboardStats.totalBookings.toString()}
                    change={12}
                    icon={CalendarDays}
                    iconColor="bg-blue-50"
                  />
                  <StatCard
                    title="Total Earnings"
                    value={`KSh ${dashboardStats.totalEarnings.toLocaleString()}`}
                    change={8}
                    icon={DollarSign}
                    iconColor="bg-green-50"
                  />
                  <StatCard
                    title="Registered Clients"
                    value={dashboardStats.totalClients.toString()}
                    change={15}
                    icon={Building2}
                    iconColor="bg-cyan-50"
                  />
                  <StatCard
                    title="Registered Users"
                    value={dashboardStats.totalUsers.toString()}
                    change={10}
                    icon={Users}
                    iconColor="bg-purple-50"
                  />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pb-6">
                  {/* Left Column - Main Content */}
                  <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    {/* Bookings Overview Chart */}
                    <BookingsChart />

                    {/* Recent Bookings */}
                    <RecentBookings />

                    {/* Listing Performance */}
                    <ListingPerformance />
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="space-y-6 md:space-y-8">
                    {/* Customer Insights */}
                    <CustomerInsights />

                    {/* Top Agents */}
                    <TopAgents />
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Footer - Full Width */}
      <footer className="bg-[#0A2540] text-white py-6 md:py-8 mt-auto">
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