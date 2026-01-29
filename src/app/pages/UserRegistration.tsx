import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { UserPlus, Mail, Lock, User, Phone, CheckCircle, AlertCircle, Eye, EyeOff, Shield, Star, Sparkles, Hotel, Award } from 'lucide-react';
import bokexLogo from 'figma:asset/b3eec849e602f8c2161f203313ac85d8e639591b.png';
import bokexLogoWhiteBg from 'figma:asset/f4176c6116fee8091758a5f7301fe959e761c318.png';

interface UserRegistrationProps {
  onNavigateLogin: () => void;
  onNavigateHome?: () => void;
  pendingBooking?: boolean;
}

export function UserRegistration({ onNavigateLogin, onNavigateHome, pendingBooking }: UserRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (Kenyan format)
    const phoneRegex = /^(07|01|\+2547|\+2541)[0-9]{8}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Kenyan phone number (e.g., 0712345678)';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage (in production, this would be a backend API call)
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password, // In production, never store plain passwords
        registeredAt: new Date().toISOString(),
      };

      localStorage.setItem(`user_${formData.email}`, JSON.stringify(userData));
      
      setIsSubmitting(false);
      setRegistrationSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        onNavigateLogin();
      }, 2000);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A2540] via-[#0052A3] to-[#00A8E8] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md w-full">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="size-12 text-green-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to Bokex! 🎉</h2>
          <p className="text-gray-600 mb-2 text-lg">
            Your account has been created successfully.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Get ready to discover amazing stays across Kenya
          </p>
          <div className="flex items-center justify-center gap-2 text-[#00A8E8]">
            <div className="size-2 bg-[#00A8E8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="size-2 bg-[#00A8E8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="size-2 bg-[#00A8E8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding & Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A2540] via-[#0052A3] to-[#00A8E8] relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-20" 
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1665986127994-00f974136c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwa2VueWF8ZW58MXx8fHwxNzY4NzU2NzE4fDA&ixlib=rb-4.1.0&q=80&w=1080)' }}>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          {/* Logo */}
          <button onClick={onNavigateHome} className="mb-12">
            <img src={bokexLogo} alt="Bokex" className="h-12 w-auto" />
          </button>

          {/* Hero Content */}
          <div className="space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles className="size-5 text-cyan-300" />
              <span className="text-sm font-medium">Join 10,000+ Happy Travelers</span>
            </div>
            
            <h1 className="text-5xl font-bold leading-tight">
              Your Perfect Stay
              <br />
              <span className="text-cyan-300">Starts Here</span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed max-w-md">
              Create an account to unlock exclusive deals, save your favorite hotels, and book your dream stay in Kenya.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
                <Hotel className="size-6 text-[#0A2540]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Verified Properties</h3>
                <p className="text-sm text-gray-300">Only quality-checked hotels and BnBs across Kenya</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
                <Shield className="size-6 text-[#0A2540]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure Payments</h3>
                <p className="text-sm text-gray-300">Pay safely with M-PESA STK Push</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
                <Award className="size-6 text-[#0A2540]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Best Price Guarantee</h3>
                <p className="text-sm text-gray-300">Competitive rates on all Kenyan accommodations</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300">500+</div>
              <div className="text-sm text-gray-300 mt-1">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300">10K+</div>
              <div className="text-sm text-gray-300 mt-1">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300">4.8★</div>
              <div className="text-sm text-gray-300 mt-1">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <button onClick={onNavigateHome} className="inline-block mb-4">
              <img src={bokexLogoWhiteBg} alt="Bokex" className="h-10 w-auto mx-auto" />
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Join Bokex today and start exploring</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          {/* Pending Booking Alert */}
          {pendingBooking && (
            <div className="mb-6 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="size-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Complete your booking</p>
                  <p className="text-sm text-gray-600">Create an account to continue with your reservation</p>
                </div>
              </div>
            </div>
          )}

          {/* Registration Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name *</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="John Doe"
                    className={`pl-10 h-12 border-2 focus:border-[#00A8E8] ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className={`pl-10 h-12 border-2 focus:border-[#00A8E8] ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number *</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="0712345678"
                    className={`pl-10 h-12 border-2 focus:border-[#00A8E8] ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">Password *</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Min. 8 characters"
                    className={`pl-10 pr-12 h-12 border-2 focus:border-[#00A8E8] ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password *</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Re-enter password"
                    className={`pl-10 pr-12 h-12 border-2 focus:border-[#00A8E8] ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  By creating an account, you agree to Bokex's{' '}
                  <a href="#" className="text-[#00A8E8] font-semibold hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#00A8E8] font-semibold hover:underline">Privacy Policy</a>
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-[#00A8E8] to-[#0052A3] hover:from-[#0086ba] hover:to-[#003d7a] text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting ? (
                  <>
                    <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="size-5 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={onNavigateLogin}
                  className="text-[#00A8E8] font-semibold hover:text-[#0052A3] hover:underline transition-colors"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>

          {/* Mobile Benefits */}
          <div className="lg:hidden mt-8 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="size-5 text-[#00A8E8]" />
              <span>500+ verified properties across Kenya</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="size-5 text-[#00A8E8]" />
              <span>Secure M-PESA payments</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="size-5 text-[#00A8E8]" />
              <span>Best price guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}