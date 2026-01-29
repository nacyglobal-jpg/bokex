import { useState, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { 
  UserCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Camera, 
  Save,
  Edit,
  User,
  Home as HomeIcon,
  Calendar,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner';
import bokexLogo from 'figma:asset/f4176c6116fee8091758a5f7301fe959e761c318.png';

interface UserAccountProps {
  onNavigateHome: () => void;
  onNavigateMyBookings?: () => void;
}

export function UserAccount({ onNavigateHome, onNavigateMyBookings }: UserAccountProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User profile state
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+254 712 345 678');
  const [location, setLocation] = useState('Nairobi, Kenya');
  const [dateOfBirth, setDateOfBirth] = useState('1990-01-15');
  const [nationality, setNationality] = useState('Kenyan');
  
  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
        toast.success('Profile photo updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!firstName || !lastName || !email || !phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    toast.success('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={bokexLogo} alt="Bokex Logo" className="h-8 md:h-10" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Account</h1>
            </div>
            <Button
              onClick={onNavigateHome}
              variant="outline"
              className="flex items-center gap-2"
            >
              <HomeIcon className="size-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Photo & Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              {/* Profile Photo */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00A8E8] to-[#0052A3] p-1">
                    <div className="w-full h-full rounded-full bg-white p-1">
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00A8E8] to-[#0052A3] flex items-center justify-center">
                          <UserCircle className="size-16 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Camera Icon Overlay */}
                  <button
                    onClick={handlePhotoClick}
                    className="absolute bottom-0 right-0 bg-gradient-to-r from-[#0052A3] to-[#003D7A] hover:from-[#003D7A] hover:to-[#002855] text-white p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Camera className="size-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
                
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-600">{email}</p>
                
                {/* Quick Stats */}
                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
                    <Calendar className="size-5 text-[#00A8E8]" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Total Bookings</p>
                      <p className="font-semibold text-gray-900">12</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <CreditCard className="size-5 text-[#0052A3]" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Total Spent</p>
                      <p className="font-semibold text-gray-900">KSh 285,000</p>
                    </div>
                  </div>
                  
                  {/* My Bookings Button */}
                  {onNavigateMyBookings && (
                    <Button
                      onClick={onNavigateMyBookings}
                      className="w-full bg-gradient-to-r from-[#00A8E8] to-[#0052A3] hover:from-[#0052A3] hover:to-[#003D7A] text-white shadow-lg"
                    >
                      <Calendar className="size-4 mr-2" />
                      View My Bookings
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <User className="size-5 text-[#00A8E8]" />
                  Personal Information
                </h3>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit className="size-4" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2">
                    <User className="size-4 text-gray-500" />
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-60"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2">
                    <User className="size-4 text-gray-500" />
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-60"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="size-4 text-gray-500" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-60"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="size-4 text-gray-500" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                    placeholder="+254 712 345 678"
                    className="disabled:opacity-60"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="size-4 text-gray-500" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-60"
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dob" className="flex items-center gap-2">
                    <Calendar className="size-4 text-gray-500" />
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-60"
                  />
                </div>

                {/* Nationality */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="nationality" className="flex items-center gap-2">
                    <MapPin className="size-4 text-gray-500" />
                    Nationality
                  </Label>
                  <Input
                    id="nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-60"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-[#0052A3] to-[#003D7A] hover:from-[#003D7A] hover:to-[#002855] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <Save className="size-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                <Lock className="size-5 text-[#00A8E8]" />
                Security Settings
              </h3>

              <div className="space-y-4">
                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password *</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password *</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 8 characters)"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={handleChangePassword}
                    className="bg-gradient-to-r from-[#0052A3] to-[#003D7A] hover:from-[#003D7A] hover:to-[#002855] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <Lock className="size-4" />
                    Change Password
                  </Button>
                </div>
              </div>
            </div>

            {/* Account Preferences */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive booking updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-[#00A8E8] rounded" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Get text alerts for bookings</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-[#00A8E8] rounded" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Marketing Emails</p>
                    <p className="text-sm text-gray-600">Receive special offers and promotions</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-[#00A8E8] rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <img src={bokexLogo} alt="Bokex" className="h-8" />
            <div className="text-center">
              <p className="text-sm">&copy; 2026 Bokex. All rights reserved.</p>
              <p className="text-xs text-gray-400 mt-1">
                Powered by <span className="text-[#00A8E8] font-semibold">Nacy Global Technologies</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}