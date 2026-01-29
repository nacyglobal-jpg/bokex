import { useState } from 'react';
import { ArrowLeft, User, Mail, MapPin, Phone, Globe, Calendar, Home, ChevronRight, Check, Sparkles, Shield, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import bokexLogo from 'figma:asset/b3eec849e602f8c2161f203313ac85d8e639591b.png';
import bokexLogoDark from 'figma:asset/f4176c6116fee8091758a5f7301fe959e761c318.png';

interface OwnerRegistrationProps {
  onNavigateBack: () => void;
  onComplete: (ownerData: OwnerData) => void;
}

export interface OwnerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  location: string;
  nationality: string;
  dateOfBirth: string;
  propertyName: string;
  propertyAddress: string;
  propertyLocation: string;
  propertyPhone: string;
}

export function OwnerRegistration({ onNavigateBack, onComplete }: OwnerRegistrationProps) {
  const [step, setStep] = useState<'welcome' | 'personal' | 'property'>('welcome');
  const [formData, setFormData] = useState<OwnerData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    nationality: 'Kenyan',
    dateOfBirth: '',
    propertyName: '',
    propertyAddress: '',
    propertyLocation: '',
    propertyPhone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale',
    'Garissa', 'Kakamega', 'Nyeri', 'Machakos', 'Meru', 'Kisii', 'Kiambu', 'Kericho'
  ];

  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(?:\+254|0)[17]\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid Kenyan phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePropertyInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.propertyName.trim()) newErrors.propertyName = 'Property name is required';
    if (!formData.propertyAddress.trim()) newErrors.propertyAddress = 'Property address is required';
    if (!formData.propertyLocation) newErrors.propertyLocation = 'Property location is required';
    if (!formData.propertyPhone.trim()) {
      newErrors.propertyPhone = 'Property phone is required';
    } else if (!/^(?:\+254|0)[17]\d{8}$/.test(formData.propertyPhone)) {
      newErrors.propertyPhone = 'Invalid Kenyan phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePersonalInfoNext = () => {
    if (validatePersonalInfo()) {
      setStep('property');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (validatePropertyInfo()) {
      // Generate unique user ID
      const userId = `USR-${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const registrationData = {
        ...formData,
        userId,
        registrationDate: new Date().toISOString(),
        status: 'active',
      };

      // Store in localStorage
      const existingPartners = JSON.parse(localStorage.getItem('registeredPartners') || '[]');
      existingPartners.push(registrationData);
      localStorage.setItem('registeredPartners', JSON.stringify(existingPartners));
      localStorage.setItem('currentPartner', JSON.stringify(registrationData));

      // Set as logged in
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', formData.email);
      localStorage.setItem('userRole', 'partner');

      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <img src={bokexLogoDark} alt="Bokex" className="h-8 w-auto" />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onNavigateBack}
              className="text-[#0052A3] hover:text-[#00A8E8]"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">
        {/* Welcome Step */}
        {step === 'welcome' && (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001f3f] via-[#003d7a] to-[#001a33] p-8 md:p-12 text-white shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Sparkles className="size-5 text-yellow-300" />
                  <span className="text-sm font-medium">Partner Registration</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Welcome to Bokex
                </h1>
                <p className="text-lg md:text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
                  Join Kenya's leading hotel booking platform and reach thousands of travelers 
                  looking for the perfect stay
                </p>
                
                <div className="flex justify-center mb-8">
                  <img src={bokexLogo} alt="Bokex" className="h-12 md:h-16 w-auto drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Benefits Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-[#00A8E8] hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-[#00A8E8] to-[#0052A3] text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="size-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">Increase Bookings</h3>
                  <p className="text-sm text-gray-600">
                    Reach more customers and boost your occupancy rates with our smart booking platform
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#00A8E8] hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="size-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">Secure Platform</h3>
                  <p className="text-sm text-gray-600">
                    M-PESA payments, verified bookings, and secure data management for your peace of mind
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#00A8E8] hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="size-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">24/7 Support</h3>
                  <p className="text-sm text-gray-600">
                    Our dedicated support team is always here to help you succeed on Bokex
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* What You'll Get */}
            <Card className="border-2 border-[#00A8E8] shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="text-2xl text-center">What You'll Get as a Bokex Partner</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center">
                      <Check className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Property Management Dashboard</h4>
                      <p className="text-sm text-gray-600">Manage all your properties, rooms, and pricing from one place</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center">
                      <Check className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Real-time Booking Notifications</h4>
                      <p className="text-sm text-gray-600">Get instant alerts when customers book your property</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center">
                      <Check className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">M-PESA Integration</h4>
                      <p className="text-sm text-gray-600">Secure payment processing through M-PESA STK Push</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center">
                      <Check className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Analytics & Reports</h4>
                      <p className="text-sm text-gray-600">Track your performance with detailed insights and reports</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center">
                      <Check className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Marketing Support</h4>
                      <p className="text-sm text-gray-600">Featured listings and promotional opportunities</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center">
                      <Check className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Customer Reviews</h4>
                      <p className="text-sm text-gray-600">Build trust with verified guest reviews and ratings</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registration Steps Preview */}
            <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Quick & Easy Registration</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#00A8E8] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div>
                    <span className="text-sm font-medium text-gray-700">Your Details</span>
                  </div>
                  <ChevronRight className="size-5 text-gray-400 rotate-90 md:rotate-0" />
                  <div className="flex items-center gap-3">
                    <div className="bg-[#00A8E8] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div>
                    <span className="text-sm font-medium text-gray-700">Property Info</span>
                  </div>
                  <ChevronRight className="size-5 text-gray-400 rotate-90 md:rotate-0" />
                  <div className="flex items-center gap-3">
                    <div className="bg-[#00A8E8] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
                    <span className="text-sm font-medium text-gray-700">Property Type</span>
                  </div>
                  <ChevronRight className="size-5 text-gray-400 rotate-90 md:rotate-0" />
                  <div className="flex items-center gap-3">
                    <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                      <Check className="size-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Start Listing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Get Started Button */}
            <div className="text-center">
              <Button
                onClick={() => {
                  setStep('personal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-[#0052A3] to-[#00A8E8] hover:from-[#003d7a] hover:to-[#0086ba] text-white py-6 px-12 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Get Started - Register Now
                <ChevronRight className="size-6 ml-2" />
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                Registration takes less than 5 minutes • No credit card required
              </p>
            </div>
          </div>
        )}

        {/* Progress Indicator - Only show after welcome */}
        {step !== 'welcome' && (
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-4">
              <div className={`flex items-center gap-3 ${step === 'personal' ? 'text-[#00A8E8]' : 'text-green-600'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step === 'personal' 
                    ? 'bg-[#00A8E8] text-white' 
                    : 'bg-green-600 text-white'
                }`}>
                  {step === 'property' ? <Check className="size-6" /> : '1'}
                </div>
                <span className="font-semibold hidden sm:inline">Owner Details</span>
              </div>
              <div className="w-16 h-1 bg-gray-300">
                <div className={`h-full transition-all ${step === 'property' ? 'w-full bg-[#00A8E8]' : 'w-0'}`} />
              </div>
              <div className={`flex items-center gap-3 ${step === 'property' ? 'text-[#00A8E8]' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step === 'property' 
                    ? 'bg-[#00A8E8] text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <span className="font-semibold hidden sm:inline">Property Details</span>
              </div>
            </div>
          </div>
        )}

        {/* Header Section - Only show after welcome */}
        {step !== 'welcome' && (
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {step === 'personal' ? 'Owner Registration' : 'Property Information'}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {step === 'personal' 
                ? 'Enter your personal information to create your partner account'
                : 'Tell us about your property location and contact details'}
            </p>
          </div>
        )}

        {/* Personal Information Step */}
        {step === 'personal' && (
          <Card className="border-2 border-[#00A8E8] shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="bg-gradient-to-br from-[#00A8E8] to-[#0052A3] text-white p-3 rounded-xl">
                  <User className="size-6" />
                </div>
                Personal Information
              </CardTitle>
              <CardDescription className="text-base">
                Please provide your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-base font-semibold">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Enter your first name"
                    className={`mt-2 h-12 text-base ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-base font-semibold">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Enter your last name"
                    className={`mt-2 h-12 text-base ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                    <Mail className="size-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                    className={`mt-2 h-12 text-base ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
                    <Phone className="size-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 712 345 678"
                    className={`mt-2 h-12 text-base ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  <p className="text-xs text-gray-500 mt-1">Format: +254 or 0 followed by 9 digits</p>
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" className="text-base font-semibold flex items-center gap-2">
                  <Home className="size-4" />
                  Residential Address *
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your full address"
                  className={`mt-2 h-12 text-base ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Location & Nationality */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
                    <MapPin className="size-4" />
                    County/City *
                  </Label>
                  <select
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={`w-full mt-2 h-12 border-2 rounded-md px-3 text-base ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select County/City</option>
                    {kenyanCounties.map((county) => (
                      <option key={county} value={county}>
                        {county}
                      </option>
                    ))}
                  </select>
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
                <div>
                  <Label htmlFor="nationality" className="text-base font-semibold flex items-center gap-2">
                    <Globe className="size-4" />
                    Nationality *
                  </Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    placeholder="Enter your nationality"
                    className={`mt-2 h-12 text-base ${errors.nationality ? 'border-red-500' : ''}`}
                  />
                  {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <Label htmlFor="dateOfBirth" className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="size-4" />
                  Date of Birth *
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  className={`mt-2 h-12 text-base ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              {/* Next Button */}
              <div className="pt-6 border-t">
                <Button
                  onClick={handlePersonalInfoNext}
                  className="w-full bg-gradient-to-r from-[#0052A3] to-[#00A8E8] hover:from-[#003d7a] hover:to-[#0086ba] text-white py-6 text-lg font-bold"
                >
                  Continue to Property Details
                  <ChevronRight className="size-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Property Information Step */}
        {step === 'property' && (
          <Card className="border-2 border-[#00A8E8] shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 rounded-xl">
                  <Home className="size-6" />
                </div>
                Property Information
              </CardTitle>
              <CardDescription className="text-base">
                Provide your property location and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Property Name */}
              <div>
                <Label htmlFor="propertyName" className="text-base font-semibold">
                  Property Name *
                </Label>
                <Input
                  id="propertyName"
                  value={formData.propertyName}
                  onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                  placeholder="e.g., Sunset Beach Hotel"
                  className={`mt-2 h-12 text-base ${errors.propertyName ? 'border-red-500' : ''}`}
                />
                {errors.propertyName && <p className="text-red-500 text-sm mt-1">{errors.propertyName}</p>}
              </div>

              {/* Property Address */}
              <div>
                <Label htmlFor="propertyAddress" className="text-base font-semibold flex items-center gap-2">
                  <MapPin className="size-4" />
                  Property Address *
                </Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  placeholder="Enter full property address"
                  className={`mt-2 h-12 text-base ${errors.propertyAddress ? 'border-red-500' : ''}`}
                />
                {errors.propertyAddress && <p className="text-red-500 text-sm mt-1">{errors.propertyAddress}</p>}
              </div>

              {/* Property Location & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="propertyLocation" className="text-base font-semibold flex items-center gap-2">
                    <MapPin className="size-4" />
                    Property County/City *
                  </Label>
                  <select
                    id="propertyLocation"
                    value={formData.propertyLocation}
                    onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                    className={`w-full mt-2 h-12 border-2 rounded-md px-3 text-base ${
                      errors.propertyLocation ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select County/City</option>
                    {kenyanCounties.map((county) => (
                      <option key={county} value={county}>
                        {county}
                      </option>
                    ))}
                  </select>
                  {errors.propertyLocation && <p className="text-red-500 text-sm mt-1">{errors.propertyLocation}</p>}
                </div>
                <div>
                  <Label htmlFor="propertyPhone" className="text-base font-semibold flex items-center gap-2">
                    <Phone className="size-4" />
                    Property Phone *
                  </Label>
                  <Input
                    id="propertyPhone"
                    value={formData.propertyPhone}
                    onChange={(e) => setFormData({ ...formData, propertyPhone: e.target.value })}
                    placeholder="+254 712 345 678"
                    className={`mt-2 h-12 text-base ${errors.propertyPhone ? 'border-red-500' : ''}`}
                  />
                  {errors.propertyPhone && <p className="text-red-500 text-sm mt-1">{errors.propertyPhone}</p>}
                  <p className="text-xs text-gray-500 mt-1">Contact number for guests to reach your property</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t flex items-center gap-4">
                <Button
                  onClick={() => setStep('personal')}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-gray-300 hover:border-[#00A8E8]"
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-[#0052A3] to-[#00A8E8] hover:from-[#003d7a] hover:to-[#0086ba] text-white h-12 text-lg font-bold"
                >
                  Complete Registration
                  <Check className="size-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Box */}
        <Card className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#00A8E8]">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-[#00A8E8] text-white w-12 h-12 rounded-full flex items-center justify-center">
                  <Check className="size-6" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Secure Registration</h4>
                <p className="text-sm text-gray-700">
                  Your information is securely stored and will only be used to manage your property 
                  listings on Bokex. After registration, you'll get instant access to your Partner Dashboard 
                  where you can manage bookings, pricing, and more.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}