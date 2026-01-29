import { useState } from 'react';
import { ArrowLeft, Coffee, Car, Languages, Cigarette, PartyPopper, PawPrint, Clock, Info, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import bokexLogoDark from 'figma:asset/f4176c6116fee8091758a5f7301fe959e761c318.png';

interface PropertyDetailsProps {
  onNavigateBack: () => void;
  onComplete: (details: PropertyDetailsData) => void;
}

export interface PropertyDetailsData {
  breakfast: 'yes' | 'no';
  parking: 'free' | 'paid' | 'no';
  languages: string[];
  smokingAllowed: boolean;
  partiesAllowed: boolean;
  petsPolicy: 'yes' | 'upon-request' | 'no';
  checkInFrom: string;
  checkInUntil: string;
  checkOutFrom: string;
  checkOutUntil: string;
}

export function PropertyDetails({ onNavigateBack, onComplete }: PropertyDetailsProps) {
  const [formData, setFormData] = useState<PropertyDetailsData>({
    breakfast: 'no',
    parking: 'no',
    languages: ['English', 'Swahili'],
    smokingAllowed: false,
    partiesAllowed: false,
    petsPolicy: 'no',
    checkInFrom: '15:00',
    checkInUntil: '18:00',
    checkOutFrom: '08:00',
    checkOutUntil: '11:00',
  });

  const availableLanguages = [
    'English', 'Swahili', 'French', 'German', 'Spanish', 'Italian', 
    'Chinese', 'Arabic', 'Portuguese', 'Japanese', 'Korean', 'Hindi'
  ];

  const toggleLanguage = (language: string) => {
    if (formData.languages.includes(language)) {
      setFormData({
        ...formData,
        languages: formData.languages.filter(lang => lang !== language)
      });
    } else {
      setFormData({
        ...formData,
        languages: [...formData.languages, language]
      });
    }
  };

  const handleSubmit = () => {
    onComplete(formData);
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
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Services at Your Property
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about the services and amenities you offer to make your guests' stay comfortable
          </p>
        </div>

        <div className="space-y-6">
          {/* Breakfast Section */}
          <Card className="border-2 hover:border-[#00A8E8] transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-gradient-to-br from-[#00A8E8] to-[#0052A3] text-white p-3 rounded-xl">
                  <Coffee className="size-6" />
                </div>
                Breakfast
              </CardTitle>
              <CardDescription className="text-base">
                Do you serve guests breakfast?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                onClick={() => setFormData({ ...formData, breakfast: 'yes' })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  formData.breakfast === 'yes'
                    ? 'border-[#00A8E8] bg-cyan-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Yes</span>
                  {formData.breakfast === 'yes' && (
                    <div className="size-6 rounded-full bg-[#00A8E8] flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </button>
              <button
                onClick={() => setFormData({ ...formData, breakfast: 'no' })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  formData.breakfast === 'no'
                    ? 'border-[#00A8E8] bg-cyan-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">No</span>
                  {formData.breakfast === 'no' && (
                    <div className="size-6 rounded-full bg-[#00A8E8] flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Parking Section */}
          <Card className="border-2 hover:border-[#00A8E8] transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 rounded-xl">
                  <Car className="size-6" />
                </div>
                Parking
              </CardTitle>
              <CardDescription className="text-base">
                Is parking available to guests?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                onClick={() => setFormData({ ...formData, parking: 'free' })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  formData.parking === 'free'
                    ? 'border-[#00A8E8] bg-cyan-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Yes, free</span>
                  {formData.parking === 'free' && (
                    <div className="size-6 rounded-full bg-[#00A8E8] flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </button>
              <button
                onClick={() => setFormData({ ...formData, parking: 'paid' })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  formData.parking === 'paid'
                    ? 'border-[#00A8E8] bg-cyan-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Yes, paid</span>
                  {formData.parking === 'paid' && (
                    <div className="size-6 rounded-full bg-[#00A8E8] flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </button>
              <button
                onClick={() => setFormData({ ...formData, parking: 'no' })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  formData.parking === 'no'
                    ? 'border-[#00A8E8] bg-cyan-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">No</span>
                  {formData.parking === 'no' && (
                    <div className="size-6 rounded-full bg-[#00A8E8] flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Languages Section */}
          <Card className="border-2 hover:border-[#00A8E8] transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-3 rounded-xl">
                  <Languages className="size-6" />
                </div>
                Languages
              </CardTitle>
              <CardDescription className="text-base">
                What languages do you or your staff speak?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableLanguages.map((language) => (
                  <button
                    key={language}
                    onClick={() => toggleLanguage(language)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.languages.includes(language)
                        ? 'border-[#00A8E8] bg-cyan-50 text-[#0052A3]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {language}
                    {formData.languages.includes(language) && (
                      <span className="ml-2">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Selected: {formData.languages.join(', ')}
              </p>
            </CardContent>
          </Card>

          {/* House Rules Section */}
          <Card className="border-2 hover:border-[#00A8E8] transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-3 rounded-xl">
                  <Info className="size-6" />
                </div>
                House Rules
              </CardTitle>
              <CardDescription className="text-base">
                Set the rules for your property
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Smoking */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Cigarette className="size-5 text-gray-600" />
                  <span className="font-medium">Smoking allowed</span>
                </div>
                <button
                  onClick={() => setFormData({ ...formData, smokingAllowed: !formData.smokingAllowed })}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    formData.smokingAllowed ? 'bg-[#00A8E8]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      formData.smokingAllowed ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Parties/Events */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <PartyPopper className="size-5 text-gray-600" />
                  <span className="font-medium">Parties/events allowed</span>
                </div>
                <button
                  onClick={() => setFormData({ ...formData, partiesAllowed: !formData.partiesAllowed })}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    formData.partiesAllowed ? 'bg-[#00A8E8]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      formData.partiesAllowed ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Pets Policy */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <PawPrint className="size-5 text-gray-600" />
                  <span className="font-medium">Do you allow pets?</span>
                </div>
                <div className="space-y-3 ml-8">
                  <button
                    onClick={() => setFormData({ ...formData, petsPolicy: 'yes' })}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      formData.petsPolicy === 'yes'
                        ? 'border-[#00A8E8] bg-cyan-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Yes</span>
                      {formData.petsPolicy === 'yes' && (
                        <div className="size-6 rounded-full bg-[#00A8E8] flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, petsPolicy: 'upon-request' })}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      formData.petsPolicy === 'upon-request'
                        ? 'border-[#00A8E8] bg-cyan-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Upon request</span>
                      {formData.petsPolicy === 'upon-request' && (
                        <div className="size-6 rounded-full bg-[#00A8E8] flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, petsPolicy: 'no' })}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      formData.petsPolicy === 'no'
                        ? 'border-[#00A8E8] bg-cyan-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">No</span>
                      {formData.petsPolicy === 'no' && (
                        <div className="size-6 rounded-full bg-[#00A8E8] flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Check-in & Check-out Times */}
          <Card className="border-2 hover:border-[#00A8E8] transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white p-3 rounded-xl">
                  <Clock className="size-6" />
                </div>
                Check-in & Check-out Times
              </CardTitle>
              <CardDescription className="text-base">
                Set the times when guests can check in and check out
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Check-in */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Check-in</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">From</label>
                    <input
                      type="time"
                      value={formData.checkInFrom}
                      onChange={(e) => setFormData({ ...formData, checkInFrom: e.target.value })}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#00A8E8] focus:outline-none text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Until</label>
                    <input
                      type="time"
                      value={formData.checkInUntil}
                      onChange={(e) => setFormData({ ...formData, checkInUntil: e.target.value })}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#00A8E8] focus:outline-none text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Check-out */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Check-out</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">From</label>
                    <input
                      type="time"
                      value={formData.checkOutFrom}
                      onChange={(e) => setFormData({ ...formData, checkOutFrom: e.target.value })}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#00A8E8] focus:outline-none text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Until</label>
                    <input
                      type="time"
                      value={formData.checkOutUntil}
                      onChange={(e) => setFormData({ ...formData, checkOutUntil: e.target.value })}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#00A8E8] focus:outline-none text-lg"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#00A8E8]">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Info className="size-6 text-[#00A8E8] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">What if my house rules change?</h4>
                  <p className="text-sm text-gray-700">
                    You can easily customize these house rules later, and you can set additional house rules 
                    on the Policies page of the Extranet after completing registration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 p-4 -mx-4 md:-mx-6 mt-8">
            <div className="max-w-4xl mx-auto">
              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-[#0052A3] to-[#00A8E8] hover:from-[#003d7a] hover:to-[#0086ba] text-white py-6 text-lg font-bold"
              >
                Complete Property Setup
                <ChevronRight className="size-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}