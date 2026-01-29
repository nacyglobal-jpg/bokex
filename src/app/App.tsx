import { useState, useMemo, useEffect } from 'react';
import { AdminDashboard } from '@/app/pages/AdminDashboard';
import { ClientDashboard } from '@/app/pages/ClientDashboard';
import { UserAccount } from '@/app/pages/UserAccount';
import { ClientAccount } from '@/app/pages/ClientAccount';
import { PropertyManagement } from '@/app/pages/PropertyManagement';
import { UserRegistration } from '@/app/pages/UserRegistration';
import { UserLogin } from '@/app/pages/UserLogin';
import { BookingConfirmation } from '@/app/pages/BookingConfirmation';
import { MyBookings } from '@/app/pages/MyBookings';
import { ListProperty } from '@/app/pages/ListProperty';
import { PropertyDetails, PropertyDetailsData } from '@/app/pages/PropertyDetails';
import { OwnerRegistration, OwnerData } from '@/app/pages/OwnerRegistration';
import { mockHotels } from '@/app/data/hotels';
import { Hotel } from '@/app/types/hotel';
import { Hotel as HotelIcon, SlidersHorizontal, Sparkles, Shield, LayoutDashboard, Home, UserCircle, LogOut, Calendar, Menu, Building2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/app/components/ui/sheet';
import { Toaster } from '@/app/components/ui/sonner';
import { SearchBar, SearchParams } from '@/app/components/SearchBar';
import { FilterSidebar, Filters } from '@/app/components/FilterSidebar';
import { HotelCard } from '@/app/components/HotelCard';
import { BookingModal } from '@/app/components/BookingModal';
import { SortSelector, SortOption } from '@/app/components/SortSelector';
import { QuickFilters } from '@/app/components/QuickFilters';
import { StatsSection } from '@/app/components/StatsSection';
import { PopularDestinations } from '@/app/components/PopularDestinations';
import bokexLogo from 'figma:asset/b3eec849e602f8c2161f203313ac85d8e639591b.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin' | 'client' | 'account' | 'clientAccount' | 'propertyManagement' | 'register' | 'login' | 'bookingConfirmation' | 'myBookings' | 'listProperty' | 'propertyDetails' | 'ownerRegistration'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [pendingBooking, setPendingBooking] = useState<Hotel | null>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    checkIn: undefined,
    checkOut: undefined,
    days: 1,
    guests: 2,
  });

  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 40000],
    starRating: [],
    amenities: [],
    propertyTypes: [],
  });

  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('currentUser');
    const role = localStorage.getItem('userRole');
    if (loggedIn && user && role) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setUserRole(role);
    }
  }, []);

  const handleLoginSuccess = (userEmail: string, role: string) => {
    setIsLoggedIn(true);
    setCurrentUser(userEmail);
    setUserRole(role);
    
    // If there's a pending booking, open it
    if (pendingBooking) {
      setSelectedHotel(pendingBooking);
      setIsBookingModalOpen(true);
      setPendingBooking(null);
    }
    
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserRole(null);
    setCurrentPage('home');
  };

  const handleBookHotel = (hotel: Hotel) => {
    // Check if user is logged in
    if (!isLoggedIn) {
      // Save the hotel they want to book
      setPendingBooking(hotel);
      // Redirect to registration/login
      setCurrentPage('register');
      return;
    }

    // User is logged in, proceed with booking
    setSelectedHotel(hotel);
    setIsBookingModalOpen(true);
  };

  const filteredHotels = useMemo(() => {
    let filtered = mockHotels.filter((hotel) => {
      // Location filter
      if (searchParams.location && !hotel.location.toLowerCase().includes(searchParams.location.toLowerCase())) {
        return false;
      }

      // Price filter
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
        return false;
      }

      // Star rating filter
      if (filters.starRating.length > 0 && !filters.starRating.includes(hotel.stars)) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          hotel.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Property type filter
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(hotel.propertyType)) {
        return false;
      }

      return true;
    });

    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchParams, filters, sortOption]);

  const getActiveFilters = () => {
    const active: string[] = [];
    filters.starRating.forEach(rating => active.push(`${rating}star`));
    filters.amenities.forEach(amenity => active.push(amenity));
    filters.propertyTypes.forEach(type => active.push(type));
    return active;
  };

  const removeFilter = (filter: string) => {
    if (filter.includes('star')) {
      const rating = parseInt(filter.charAt(0));
      setFilters({
        ...filters,
        starRating: filters.starRating.filter(r => r !== rating),
      });
    } else if (filters.propertyTypes.includes(filter)) {
      setFilters({
        ...filters,
        propertyTypes: filters.propertyTypes.filter(t => t !== filter),
      });
    } else {
      setFilters({
        ...filters,
        amenities: filters.amenities.filter(a => a !== filter),
      });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 40000],
      starRating: [],
      amenities: [],
      propertyTypes: [],
    });
  };

  // Show admin dashboard if enabled
  if (currentPage === 'admin') {
    return <AdminDashboard onNavigateHome={() => setCurrentPage('home')} />;
  }

  // Show client dashboard if enabled
  if (currentPage === 'client') {
    return <ClientDashboard 
      onNavigateHome={() => setCurrentPage('home')} 
      onNavigateAccount={() => setCurrentPage('account')} 
      onNavigateClientAccount={() => setCurrentPage('clientAccount')}
      onNavigatePropertyManagement={() => setCurrentPage('propertyManagement')}
    />;
  }

  // Show user account if enabled
  if (currentPage === 'account') {
    return <UserAccount 
      onNavigateHome={() => setCurrentPage('home')} 
      onNavigateMyBookings={() => setCurrentPage('myBookings')}
    />
  }

  // Show client account if enabled
  if (currentPage === 'clientAccount') {
    return <ClientAccount 
      onNavigateHome={() => setCurrentPage('home')} 
      onNavigateDashboard={() => setCurrentPage('client')}
    />;
  }

  // Show property management if enabled
  if (currentPage === 'propertyManagement') {
    return (
      <PropertyManagement 
        onNavigateHome={() => setCurrentPage('home')}
        onNavigateDashboard={() => setCurrentPage('client')}
        onNavigateListProperty={() => setCurrentPage('listProperty')}
      />
    );
  }

  // Show user registration if enabled
  if (currentPage === 'register') {
    return (
      <UserRegistration 
        onNavigateLogin={() => setCurrentPage('login')} 
        onNavigateHome={() => {
          setPendingBooking(null);
          setCurrentPage('home');
        }}
        pendingBooking={!!pendingBooking}
      />
    );
  }

  // Show user login if enabled
  if (currentPage === 'login') {
    return (
      <UserLogin 
        onLoginSuccess={handleLoginSuccess}
        onNavigateRegister={() => setCurrentPage('register')} 
        onNavigateHome={() => {
          setPendingBooking(null);
          setCurrentPage('home');
        }} 
        pendingBooking={!!pendingBooking}
      />
    );
  }

  // Show booking confirmation if enabled
  if (currentPage === 'bookingConfirmation') {
    return (
      <BookingConfirmation 
        bookingDetails={bookingDetails}
        onBackToHome={() => {
          setCurrentPage('home');
          setBookingDetails(null);
        }}
      />
    );
  }

  // Show my bookings if enabled
  if (currentPage === 'myBookings') {
    return (
      <MyBookings 
        onBackToHome={() => setCurrentPage('home')}
        userEmail={currentUser || ''}
      />
    );
  }

  // Show list property if enabled
  if (currentPage === 'listProperty') {
    return (
      <ListProperty 
        onNavigateHome={() => setCurrentPage('home')}
        onSelectPropertyType={(propertyType, roomType) => {
          // Store the selected property type and room type
          localStorage.setItem('selectedPropertyType', propertyType);
          if (roomType) {
            localStorage.setItem('selectedRoomType', roomType);
          }
          // Navigate to property details page
          setCurrentPage('propertyDetails');
        }}
      />
    );
  }

  // Show owner registration if enabled (FIRST STEP after clicking List Property)
  if (currentPage === 'ownerRegistration') {
    return (
      <OwnerRegistration 
        onNavigateBack={() => setCurrentPage('home')}
        onComplete={(ownerData: OwnerData) => {
          // Owner data is already saved in OwnerRegistration component
          // Navigate to property type selection
          setCurrentPage('listProperty');
        }}
      />
    );
  }

  // Show property details if enabled
  if (currentPage === 'propertyDetails') {
    return (
      <PropertyDetails 
        onNavigateBack={() => setCurrentPage('listProperty')}
        onComplete={(details: PropertyDetailsData) => {
          // Store property details
          localStorage.setItem('propertyDetails', JSON.stringify(details));
          // Navigate to client dashboard now that everything is complete
          setCurrentPage('client');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      {/* Header */}
      <header className="bg-[#0A2540] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={bokexLogo} alt="Bokex" className="h-8 md:h-10 w-auto" />
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <p className="hidden lg:block text-sm md:text-base text-gray-300">Where to Stay in Kenya</p>
              <Button
                onClick={() => setCurrentPage('ownerRegistration')}
                className="bg-gradient-to-r from-[#00A8E8] to-[#0052A3] hover:from-[#0086ba] hover:to-[#003d7a] text-white border-0 flex items-center gap-2"
              >
                <Building2 className="size-4" />
                <span className="hidden sm:inline">List Property</span>
              </Button>
              <Button
                onClick={() => setCurrentPage('account')}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white flex items-center gap-2"
              >
                <UserCircle className="size-4" />
                <span className="hidden md:inline">My Account</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-[#0A2540] via-[#0D3A5C] to-[#00A8E8] py-8 md:py-12 relative overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1729708790927-d14be7384d10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdGVsJTIwaXNsYW5kJTIwcmVzb3J0fGVufDF8fHx8MTc2ODc2MjU3OHww&ixlib=rb-4.1.0&q=80&w=1080')"
          }}
        />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Sparkles className="size-4 text-cyan-300" />
              <span className="text-sm text-cyan-100">Hotels & BnBs • Stays Only • KES Currency</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3">
              Where to Stay in Kenya
            </h1>
            <p className="text-sm md:text-lg text-cyan-100">
              Hotels, BnBs & Self-Stay Houses across Kenya
            </p>
          </div>
          <SearchBar onSearch={setSearchParams} />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 bg-white">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Hotels Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">
                  {filteredHotels.length} {filteredHotels.length === 1 ? 'Hotel' : 'Hotels'} Found
                </h2>
                {searchParams.location && (
                  <p className="text-sm md:text-base text-gray-600 mt-1">in {searchParams.location}</p>
                )}
              </div>

              <div className="flex gap-2">
                <SortSelector currentSort={sortOption} onSortChange={setSortOption} />
                
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="size-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetTitle className="sr-only">Filters</SheetTitle>
                    <SheetDescription className="sr-only">Filter hotels by price, rating, amenities, and property type</SheetDescription>
                    <div className="mt-6">
                      <FilterSidebar filters={filters} onFilterChange={setFilters} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Quick Filters */}
            <QuickFilters
              selectedFilters={getActiveFilters()}
              onRemoveFilter={removeFilter}
              onClearAll={clearAllFilters}
            />

            {filteredHotels.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <HotelIcon className="size-12 md:size-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">
                  No hotels found
                </h3>
                <p className="text-sm md:text-base text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onBook={handleBookHotel}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white mt-12 md:mt-16 py-6 md:py-8 pb-24 md:pb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <img src={bokexLogo} alt="Bokex" className="h-8 mx-auto mb-3" />
          </div>
          <p className="text-sm md:text-base">&copy; 2026 Bokex. All rights reserved.</p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">
            Bokex Booking . Smart Stays. Seamless Booking.
          </p>
        </div>
      </footer>

      {/* Desktop Only - Floating Buttons */}
      <button
        onClick={() => setCurrentPage('admin')}
        className="hidden md:flex fixed bottom-6 right-6 bg-[#0052A3] hover:bg-[#003d7a] text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
        title="Go to Admin Dashboard"
      >
        <LayoutDashboard className="size-6" />
      </button>

      <button
        onClick={() => setCurrentPage('client')}
        className="hidden md:flex fixed bottom-6 left-6 bg-[#0052A3] hover:bg-[#003d7a] text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
        title="Go to Client Dashboard"
      >
        <Building2 className="size-6" />
      </button>

      {/* Mobile Bottom Navigation with Hamburger Menu */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around h-16">
          {/* Home Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-[#00A8E8] transition-colors"
          >
            <Home className="size-6" />
            <span className="text-xs mt-1">Home</span>
          </button>

          {/* My Bookings */}
          <button
            onClick={() => setCurrentPage('myBookings')}
            className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-[#00A8E8] transition-colors"
          >
            <Calendar className="size-6" />
            <span className="text-xs mt-1">Bookings</span>
          </button>

          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center flex-1 h-full bg-gradient-to-r from-[#00A8E8] to-[#0052A3] text-white">
                <Menu className="size-6" />
                <span className="text-xs mt-1">Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto rounded-t-3xl">
              <SheetTitle className="sr-only">Access Dashboards</SheetTitle>
              <SheetDescription className="sr-only">Select your portal to access different dashboards</SheetDescription>
              <div className="py-6 space-y-4">
                <div className="text-center mb-6">
                  <img src={bokexLogo} alt="Bokex" className="h-10 mx-auto mb-2" />
                  <h3 className="font-bold text-lg text-gray-900">Access Dashboards</h3>
                  <p className="text-sm text-gray-600">Select your portal</p>
                </div>

                {/* Super Admin Button */}
                <button
                  onClick={() => {
                    setCurrentPage('admin');
                  }}
                  className="w-full bg-gradient-to-r from-[#0052A3] to-[#003d7a] hover:from-[#003d7a] hover:to-[#002d5a] text-white p-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center gap-4"
                >
                  <div className="bg-white/20 p-3 rounded-lg">
                    <LayoutDashboard className="size-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-base">Super Admin</p>
                    <p className="text-xs text-white/80">Platform Management</p>
                  </div>
                  <Shield className="size-5 opacity-50" />
                </button>

                {/* Hotel/Client Partner Button */}
                <button
                  onClick={() => {
                    setCurrentPage('client');
                  }}
                  className="w-full bg-gradient-to-r from-[#00A8E8] to-[#0080b8] hover:from-[#0080b8] hover:to-[#006a9a] text-white p-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center gap-4"
                >
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Building2 className="size-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-base">Hotel/Client Partner</p>
                    <p className="text-xs text-white/80">Property Dashboard</p>
                  </div>
                  <HotelIcon className="size-5 opacity-50" />
                </button>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* My Account Button */}
                <button
                  onClick={() => {
                    setCurrentPage('account');
                  }}
                  className="w-full bg-white border-2 border-gray-200 hover:border-[#00A8E8] text-gray-900 p-4 rounded-xl transition-all hover:scale-[1.02] flex items-center gap-4"
                >
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <UserCircle className="size-6 text-[#0052A3]" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-base">My Account</p>
                    <p className="text-xs text-gray-600">Profile & Settings</p>
                  </div>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        hotel={selectedHotel}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        checkIn={searchParams.checkIn}
        checkOut={searchParams.checkOut}
        guests={searchParams.guests}
        onConfirmBooking={(details) => {
          setBookingDetails(details);
          setCurrentPage('bookingConfirmation');
        }}
      />
    </div>
  );
}