import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RoleManagement } from '@/app/components/RoleManagement';
import { 
  Building2, 
  Upload, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  DollarSign,
  Home as HomeIcon,
  X,
  CheckCircle2,
  AlertCircle,
  UserCog
} from 'lucide-react';
import bokexLogo from 'figma:asset/b3eec849e602f8c2161f203313ac85d8e639591b.png';

interface ClientAccountProps {
  onNavigateHome?: () => void;
  onNavigateDashboard?: () => void;
}

export function ClientAccount({ onNavigateHome, onNavigateDashboard }: ClientAccountProps = {}) {
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop');
  const [certificateFile, setCertificateFile] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    businessName: 'Mountain Lodge Kenya',
    registrationNumber: 'BN-2019-45678',
    phoneNumber: '+254 722 123 456',
    alternateNumber: '+254 733 987 654',
    email: 'info@mountainlodgekenya.com',
    googleMapLink: 'https://goo.gl/maps/example123',
    paymentMethod: 'MPESA Paybill',
    paybillNumber: '4005207',
    accountNumber: 'MTN-LODGE-001'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('Certificate file must be below 1MB');
        return;
      }
      setCertificateFile(file.name);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0A2540] text-white shadow-lg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={bokexLogo} alt="Bokex" className="h-8 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-base md:text-lg font-semibold">Hotel/Client Account</h1>
              </div>
            </div>
            <button
              onClick={onNavigateDashboard}
              className="flex items-center gap-2 bg-[#00A8E8] hover:bg-[#0086ba] text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <Building2 className="size-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-5xl">
        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center gap-3 animate-in slide-in-from-top">
            <CheckCircle2 className="size-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-800 font-medium">Account information updated successfully!</p>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Hotel/Client Account Information</h2>
          <p className="text-gray-600 text-sm md:text-base">Manage your business details and registration information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logo Upload Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Business Logo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <img 
                      src={logoPreview} 
                      alt="Business Logo" 
                      className="w-40 h-40 object-cover rounded-lg border-2 border-gray-200"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-[#00A8E8] hover:bg-[#0086ba] text-white p-2 rounded-full cursor-pointer transition-colors">
                        <Upload className="size-4" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleLogoUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      <AlertCircle className="size-3 inline mr-1" />
                      Upload PNG, JPG (Max 2MB)
                    </p>
                  </div>
                )}

                {/* Certificate Upload */}
                <div className="pt-4 border-t">
                  <Label className="text-sm font-semibold mb-2 block">Registration Certificate</Label>
                  {isEditing ? (
                    <label className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-[#00A8E8] transition-colors">
                      <FileText className="size-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">
                          {certificateFile || 'Upload PDF (Max 1MB)'}
                        </p>
                      </div>
                      <Upload className="size-4 text-[#00A8E8]" />
                      <input 
                        type="file" 
                        accept=".pdf" 
                        className="hidden" 
                        onChange={handleCertificateUpload}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <FileText className="size-5 text-green-600" />
                      <p className="text-sm text-gray-700">registration-cert.pdf</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Information Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="size-5 text-[#00A8E8]" />
                  Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationNumber">Registration Certificate Number *</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="size-5 text-[#00A8E8]" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alternateNumber">Alternate Number</Label>
                    <Input
                      id="alternateNumber"
                      value={formData.alternateNumber}
                      onChange={(e) => handleInputChange('alternateNumber', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address (Gmail) *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                      placeholder="business@gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="googleMapLink">Google Map Link *</Label>
                    <Input
                      id="googleMapLink"
                      value={formData.googleMapLink}
                      onChange={(e) => handleInputChange('googleMapLink', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                      placeholder="https://goo.gl/maps/..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="size-5 text-[#00A8E8]" />
                  Preferred Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method *</Label>
                    <select
                      id="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm ${!isEditing ? 'bg-gray-50' : ''}`}
                    >
                      <option>MPESA Paybill</option>
                      <option>MPESA Till Number</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="paybillNumber">Paybill/Till Number *</Label>
                    <Input
                      id="paybillNumber"
                      value={formData.paybillNumber}
                      onChange={(e) => handleInputChange('paybillNumber', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                      placeholder="123456"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                      placeholder="Account ID"
                    />
                  </div>
                </div>

                {/* Platform Payment Info */}
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Platform Payment Collection</p>
                  <p className="text-xs text-gray-700 mb-3">
                    All customer payments are collected via Bokex platform MPESA Paybill and transferred to your account within 24-48 hours.
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-gray-600">Paybill:</span>
                      <span className="font-bold text-[#00A8E8] ml-1">4005207</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Business:</span>
                      <span className="font-bold text-gray-900 ml-1">NACY GLOBAL TECHNOLOGIES</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    <X className="size-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-[#00A8E8] hover:bg-[#0086ba] text-white"
                  >
                    <CheckCircle2 className="size-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#0052A3] hover:bg-[#003d7a] text-white"
                >
                  Edit Information
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Role Management Section */}
        <div className="mt-8 pt-8 border-t-2 border-gray-200">
          <div className="mb-6 flex items-center gap-3">
            <UserCog className="size-8 text-[#00A8E8]" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">User Role Management</h2>
              <p className="text-gray-600 text-sm md:text-base">Manage user access and permissions for your hotel account</p>
            </div>
          </div>
          <RoleManagement dashboardType="client" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white mt-12 py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <img src={bokexLogo} alt="Bokex" className="h-8 mx-auto mb-3" />
          </div>
          <p className="text-sm md:text-base">&copy; 2026 Bokex. All rights reserved.</p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">
            Smart Hotel Booking Platform for Kenya
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