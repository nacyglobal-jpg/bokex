import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff, CheckCircle, Sparkles, Hotel, Shield, Award } from 'lucide-react';
import bokexLogo from 'figma:asset/b3eec849e602f8c2161f203313ac85d8e639591b.png';
import bokexLogoWhiteBg from 'figma:asset/f4176c6116fee8091758a5f7301fe959e761c318.png';

interface UserLoginProps {
  onLoginSuccess: (userEmail: string) => void;
  onNavigateRegister: () => void;
  onNavigateHome?: () => void;
  pendingBooking?: boolean;
}

export function UserLogin({ onLoginSuccess, onNavigateRegister, onNavigateHome, pendingBooking }: UserLoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Check if user exists in localStorage
      const storedUser = localStorage.getItem(`user_${formData.email}`);

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        // Verify password
        if (userData.password === formData.password) {
          // Store logged-in user
          localStorage.setItem('currentUser', formData.email);
          localStorage.setItem('isLoggedIn', 'true');
          
          setIsSubmitting(false);
          onLoginSuccess(formData.email);
        } else {
          setIsSubmitting(false);
          setLoginError('Incorrect password. Please try again.');
        }
      } else {
        setIsSubmitting(false);
        setLoginError('No account found with this email. Please register first.');
      }
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    if (loginError) {
      setLoginError('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding & Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A2540] via-[#0052A3] to-[#00A8E8] relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-20" 
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3Njg2NTE5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080)' }}>
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
              <span className="text-sm font-medium">Welcome Back to Bokex</span>
            </div>
            
            <h1 className="text-5xl font-bold leading-tight">
              Continue Your
              <br />
              <span className="text-cyan-300">Journey</span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed max-w-md">
              Login to access your bookings, saved properties, and exclusive member benefits.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
                <Hotel className="size-6 text-[#0A2540]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Your Bookings</h3>
                <p className="text-sm text-gray-300">Manage and track all your reservations in one place</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
                <Shield className="size-6 text-[#0A2540]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Saved Favorites</h3>
                <p className="text-sm text-gray-300">Quick access to your favorite hotels and BnBs</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
                <Award className="size-6 text-[#0A2540]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Exclusive Deals</h3>
                <p className="text-sm text-gray-300">Member-only discounts and special offers</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="size-5 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-white/90 italic mb-3">"Bokex made finding the perfect hotel in Nairobi so easy. The booking process was seamless!"</p>
            <p className="text-sm text-cyan-300 font-medium">- Sarah M., Verified Guest</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <button onClick={onNavigateHome} className="inline-block mb-4">
              <img src={bokexLogoWhiteBg} alt="Bokex" className="h-10 w-auto mx-auto" />
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Login to your Bokex account</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Enter your credentials to continue</p>
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
                  <p className="text-sm text-gray-600">Login to continue with your reservation</p>
                </div>
              </div>
            </div>
          )}

          {/* Login Error Message */}
          {loginError && (
            <div className="mb-6 bg-red-50 border-2 border-red-300 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="size-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800 font-medium">{loginError}</p>
              </div>
            </div>
          )}

          {/* Login Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
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

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password *</Label>
                  <a href="#" className="text-xs text-[#00A8E8] hover:text-[#0052A3] font-semibold hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-[#00A8E8] to-[#0052A3] hover:from-[#0086ba] hover:to-[#003d7a] text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all mt-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="size-5 mr-2" />
                    Login to Bokex
                  </>
                )}
              </Button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={onNavigateRegister}
                  className="text-[#00A8E8] font-semibold hover:text-[#0052A3] hover:underline transition-colors"
                >
                  Create account
                </button>
              </p>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">New to Bokex?</span>
              </div>
            </div>

            {/* Registration CTA */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
              <p className="text-xs text-gray-800 leading-relaxed">
                <strong className="text-[#0052A3]">Don't have an account?</strong> Create your free Bokex account to start booking hotels, BnBs, and self-stay houses across Kenya with secure M-PESA payments.
              </p>
            </div>
          </div>

          {/* Mobile Benefits */}
          <div className="lg:hidden mt-8 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="size-5 text-[#00A8E8]" />
              <span>Access your bookings anytime</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="size-5 text-[#00A8E8]" />
              <span>Save your favorite properties</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="size-5 text-[#00A8E8]" />
              <span>Get exclusive member deals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}