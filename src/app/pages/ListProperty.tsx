import { Building2, Home, Hotel, Tent, ChevronRight, ArrowLeft, BedDouble } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import bokexLogoDark from 'figma:asset/f4176c6116fee8091758a5f7301fe959e761c318.png';
import { useState } from 'react';

interface ListPropertyProps {
  onNavigateHome: () => void;
  onSelectPropertyType: (propertyType: string, roomType?: string) => void;
}

export function ListProperty({ onNavigateHome, onSelectPropertyType }: ListPropertyProps) {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [showRoomTypeSelection, setShowRoomTypeSelection] = useState(false);

  const handlePropertyTypeClick = (propertyId: string) => {
    if (propertyId === 'hotels') {
      // Show room type selection for BnBs
      setSelectedPropertyType(propertyId);
      setShowRoomTypeSelection(true);
    } else {
      // Directly navigate for other property types
      onSelectPropertyType(propertyId);
    }
  };

  const handleRoomTypeSelect = (roomType: string) => {
    if (selectedPropertyType) {
      onSelectPropertyType(selectedPropertyType, roomType);
    }
  };

  const handleBackToPropertyTypes = () => {
    setShowRoomTypeSelection(false);
    setSelectedPropertyType(null);
  };

  const propertyTypes = [
    {
      id: 'apartment',
      title: 'Apartment',
      description: 'Furnished and self-catering accommodations where guests rent the entire place.',
      icon: Building2,
      gradient: 'from-blue-500 to-cyan-500',
      examples: ['Studio Apartments', 'Serviced Apartments', 'Self-Catering Units']
    },
    {
      id: 'homes',
      title: 'Homes',
      description: 'Properties like apartments, vacation homes, villas, etc.',
      icon: Home,
      gradient: 'from-[#0052A3] to-[#00A8E8]',
      examples: ['Vacation Homes', 'Villas', 'Cottages', 'Beach Houses']
    },
    {
      id: 'hotels',
      title: 'Hotel, B&Bs & More',
      description: 'Properties like hotels, B&Bs, guest houses, hostels, condo hotels, etc.',
      icon: Hotel,
      gradient: 'from-purple-500 to-pink-500',
      examples: ['Hotels', 'Bed & Breakfasts', 'Guest Houses', 'Hostels']
    },
    {
      id: 'alternative',
      title: 'Alternative Places',
      description: 'Properties like boats, campgrounds, luxury tents, etc.',
      icon: Tent,
      gradient: 'from-green-500 to-emerald-500',
      examples: ['Campgrounds', 'Luxury Tents', 'Boats', 'Unique Stays']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onNavigateHome}
                className="flex items-center gap-2 text-gray-600 hover:text-[#0052A3] transition-colors"
              >
                <ArrowLeft className="size-5" />
                <span className="hidden sm:inline text-sm font-medium">Back to Home</span>
              </button>
            </div>
            <img src={bokexLogoDark} alt="Bokex" className="h-8 w-auto" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A2540] to-[#00A8E8] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-cyan-100 text-sm font-medium">🚀 Quick Start - Partner with Bokex</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              List Your Property on Bokex
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 mb-4">
              Start welcoming guests in no time!
            </p>
            <p className="text-lg text-cyan-200 max-w-2xl mx-auto">
              Join Kenya's leading smart hotel booking platform and reach thousands of travelers looking for their perfect stay.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-3xl font-bold text-white">1,500+</p>
                <p className="text-cyan-200 text-sm">Active Properties</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="text-cyan-200 text-sm">Monthly Guests</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-3xl font-bold text-white">4.8★</p>
                <p className="text-cyan-200 text-sm">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Selection Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Select Your Property Type
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the category that best describes your property to get started with the listing process
              </p>
            </div>

            {/* Property Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {propertyTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card 
                    key={type.id}
                    className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#00A8E8] cursor-pointer overflow-hidden"
                  >
                    <CardHeader className={`bg-gradient-to-br ${type.gradient} text-white pb-4`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 flex items-center gap-3">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                              <Icon className="size-7" />
                            </div>
                            {type.title}
                          </CardTitle>
                          <CardDescription className="text-white/90 text-base">
                            {type.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {/* Examples */}
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Includes:</p>
                        <div className="flex flex-wrap gap-2">
                          {type.examples.map((example, idx) => (
                            <span 
                              key={idx}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-[#0052A3] to-[#00A8E8] hover:from-[#003d7a] hover:to-[#0086ba] text-white group-hover:scale-105 transition-transform"
                        size="lg"
                        onClick={() => handlePropertyTypeClick(type.id)}
                      >
                        List Your Property
                        <ChevronRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Room Type Selection */}
            {showRoomTypeSelection && (
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#00A8E8] p-8 md:p-12 mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Select Room Type for Your BnB
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleBackToPropertyTypes}
                    className="text-[#0052A3] hover:text-[#00A8E8]"
                  >
                    <ArrowLeft className="size-4 mr-2" />
                    Back
                  </Button>
                </div>
                
                <p className="text-gray-600 mb-8 text-center">
                  Choose the room configuration that best describes your property
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                  {/* Studio Room */}
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#00A8E8] cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-br from-[#00A8E8] to-[#0052A3] text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <BedDouble className="size-10" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">Studio Room</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Open-plan living space
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-[#0052A3] to-[#00A8E8] hover:from-[#003d7a] hover:to-[#0086ba] text-white"
                        onClick={() => handleRoomTypeSelect('Studio Room')}
                      >
                        Select
                        <ChevronRight className="size-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>

                  {/* 1 Bedroom */}
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#00A8E8] cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <div className="text-center">
                          <BedDouble className="size-8 mx-auto mb-1" />
                          <span className="text-xs font-bold">×1</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">1 Bedroom</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Separate bedroom
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        onClick={() => handleRoomTypeSelect('1 Bedroom')}
                      >
                        Select
                        <ChevronRight className="size-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>

                  {/* 2 Bedroom */}
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#00A8E8] cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <div className="text-center">
                          <BedDouble className="size-8 mx-auto mb-1" />
                          <span className="text-xs font-bold">×2</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">2 Bedroom</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Two separate bedrooms
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                        onClick={() => handleRoomTypeSelect('2 Bedroom')}
                      >
                        Select
                        <ChevronRight className="size-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>

                  {/* 3 Bedroom */}
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#00A8E8] cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <div className="text-center">
                          <BedDouble className="size-8 mx-auto mb-1" />
                          <span className="text-xs font-bold">×3</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">3 Bedroom</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Three separate bedrooms
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                        onClick={() => handleRoomTypeSelect('3 Bedroom')}
                      >
                        Select
                        <ChevronRight className="size-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>

                  {/* 4 Bedroom */}
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#00A8E8] cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <div className="text-center">
                          <BedDouble className="size-8 mx-auto mb-1" />
                          <span className="text-xs font-bold">×4</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">4 Bedroom</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Four separate bedrooms
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white"
                        onClick={() => handleRoomTypeSelect('4 Bedroom')}
                      >
                        Select
                        <ChevronRight className="size-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                    Need a different room configuration? Contact our support team.
                  </p>
                </div>
              </div>
            )}

            {/* Benefits Section */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[#00A8E8]/20 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Why List on Bokex?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#00A8E8] to-[#0052A3] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Easy Setup</h4>
                  <p className="text-gray-600">
                    List your property in minutes with our simple, guided process
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#00A8E8] to-[#0052A3] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Reach More Guests</h4>
                  <p className="text-gray-600">
                    Connect with thousands of travelers across Kenya and beyond
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#00A8E8] to-[#0052A3] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">MPESA Payments</h4>
                  <p className="text-gray-600">
                    Secure, instant payments via MPESA Paybill - Kenya's trusted payment method
                  </p>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Need help getting started? Our partner support team is here for you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-[#00A8E8] text-[#0052A3] hover:bg-[#00A8E8] hover:text-white"
                >
                  📞 Call: +254 700 000 000
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-[#00A8E8] text-[#0052A3] hover:bg-[#00A8E8] hover:text-white"
                >
                  📧 Email: partners@bokex.ke
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <img src={bokexLogoDark} alt="Bokex" className="h-8 mx-auto mb-4" />
          <p className="text-sm md:text-base mb-2">&copy; 2026 Bokex. All rights reserved.</p>
          <p className="text-gray-400 text-xs md:text-sm">
            Bokex Booking . Smart Stays. Seamless Booking.
          </p>
          <p className="text-xs md:text-sm mt-3">
            Powered by <span className="text-[#00A8E8] font-semibold">Nacy Global Technologies</span>
          </p>
        </div>
      </footer>
    </div>
  );
}