import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { 
  Building2, 
  Plus, 
  Upload, 
  MapPin, 
  DollarSign,
  Trash2,
  Edit,
  Save,
  X,
  Home as HomeIcon,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Waves,
  Dumbbell,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import bokexLogoDark from 'figma:asset/f4176c6116fee8091758a5f7301fe959e761c318.png';

interface PropertyManagementProps {
  onNavigateHome?: () => void;
  onNavigateDashboard?: () => void;
  onNavigateListProperty?: () => void;
}

interface RoomType {
  id: string;
  name: string;
  price: number;
  capacity: number;
  beds: string;
  available: number;
}

interface Property {
  id: string;
  name: string;
  category: 'BNB' | 'Self Stay House' | 'Hotel';
  location: string;
  description: string;
  amenities: string[];
  photos: string[];
  roomTypes?: RoomType[];
  price?: number; // For BNB and Self Stay House (flat price)
}

const AMENITIES = [
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'parking', label: 'Parking', icon: Car },
  { id: 'breakfast', label: 'Breakfast', icon: Coffee },
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'pool', label: 'Pool', icon: Waves },
  { id: 'gym', label: 'Gym', icon: Dumbbell },
];

const HOTEL_ROOM_TYPES = [
  { id: 'single-1bed', name: 'Single Room', beds: '1 Bed', capacity: 1 },
  { id: 'single-2beds', name: 'Single Room', beds: '2 Beds', capacity: 2 },
  { id: 'double-1bed', name: 'Double Room', beds: '1 Double Bed', capacity: 2 },
  { id: 'double-2beds', name: 'Double Room', beds: '2 Beds', capacity: 2 },
  { id: 'twin-2beds', name: 'Twin Room', beds: '2 Single Beds', capacity: 2 },
  { id: 'triple-3beds', name: 'Triple Room', beds: '3 Beds', capacity: 3 },
  { id: 'quad-4beds', name: 'Quad Room', beds: '4 Beds', capacity: 4 },
  { id: 'suite', name: 'Suite', beds: '1 King Bed', capacity: 2 },
  { id: 'family-suite', name: 'Family Suite', beds: 'Multiple Beds', capacity: 4 },
];

export function PropertyManagement({ onNavigateHome, onNavigateDashboard, onNavigateListProperty }: PropertyManagementProps = {}) {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      name: 'Mountain Lodge Kenya',
      category: 'Hotel',
      location: 'Nairobi, Kenya',
      description: 'Luxury hotel with amazing views',
      amenities: ['wifi', 'parking', 'restaurant', 'pool', 'gym'],
      photos: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
      roomTypes: [
        { id: 'r1', name: 'Single Room', price: 8000, capacity: 1, beds: '1 Single Bed', available: 10 },
        { id: 'r2', name: 'Double Room', price: 12000, capacity: 2, beds: '1 Double Bed', available: 8 },
        { id: 'r3', name: 'Twin Room', price: 11000, capacity: 2, beds: '2 Single Beds', available: 6 },
      ],
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<string | null>(null);
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null);

  // New property form state
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    name: '',
    category: 'Hotel',
    location: '',
    description: '',
    amenities: [],
    photos: [],
    roomTypes: [],
    price: 0,
  });

  const [newRoomType, setNewRoomType] = useState<Partial<RoomType>>({
    name: '',
    price: 0,
    capacity: 1,
    beds: '',
    available: 0,
  });

  const handleAddProperty = () => {
    if (!newProperty.name || !newProperty.location) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingProperty) {
      // Update existing property
      setProperties(properties.map(p => 
        p.id === editingProperty 
          ? {
              id: p.id,
              name: newProperty.name!,
              category: newProperty.category!,
              location: newProperty.location!,
              description: newProperty.description || '',
              amenities: newProperty.amenities || [],
              photos: newProperty.photos || [],
              roomTypes: newProperty.category === 'Hotel' ? newProperty.roomTypes : undefined,
              price: newProperty.category !== 'Hotel' ? newProperty.price : undefined,
            }
          : p
      ));
      setEditingProperty(null);
    } else {
      // Add new property
      const property: Property = {
        id: Date.now().toString(),
        name: newProperty.name!,
        category: newProperty.category!,
        location: newProperty.location!,
        description: newProperty.description || '',
        amenities: newProperty.amenities || [],
        photos: newProperty.photos || [],
        roomTypes: newProperty.category === 'Hotel' ? newProperty.roomTypes : undefined,
        price: newProperty.category !== 'Hotel' ? newProperty.price : undefined,
      };
      setProperties([...properties, property]);
    }
    
    setShowAddForm(false);
    resetForm();
  };

  const resetForm = () => {
    setNewProperty({
      name: '',
      category: 'Hotel',
      location: '',
      description: '',
      amenities: [],
      photos: [],
      roomTypes: [],
      price: 0,
    });
    setNewRoomType({
      name: '',
      price: 0,
      capacity: 1,
      beds: '',
      available: 0,
    });
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const toggleAmenity = (amenityId: string) => {
    const current = newProperty.amenities || [];
    if (current.includes(amenityId)) {
      setNewProperty({
        ...newProperty,
        amenities: current.filter(a => a !== amenityId),
      });
    } else {
      setNewProperty({
        ...newProperty,
        amenities: [...current, amenityId],
      });
    }
  };

  const addRoomType = () => {
    if (!newRoomType.name || !newRoomType.price) {
      alert('Please fill in room type details');
      return;
    }

    const roomType: RoomType = {
      id: Date.now().toString(),
      name: newRoomType.name!,
      price: newRoomType.price!,
      capacity: newRoomType.capacity!,
      beds: newRoomType.beds || '',
      available: newRoomType.available!,
    };

    setNewProperty({
      ...newProperty,
      roomTypes: [...(newProperty.roomTypes || []), roomType],
    });

    setNewRoomType({
      name: '',
      price: 0,
      capacity: 1,
      beds: '',
      available: 0,
    });
  };

  const removeRoomType = (roomId: string) => {
    setNewProperty({
      ...newProperty,
      roomTypes: (newProperty.roomTypes || []).filter(r => r.id !== roomId),
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In real app, upload to server. For now, create preview URLs
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setNewProperty({
        ...newProperty,
        photos: [...(newProperty.photos || []), ...urls],
      });
    }
  };

  const handleEditProperty = (property: Property) => {
    setNewProperty({
      name: property.name,
      category: property.category,
      location: property.location,
      description: property.description,
      amenities: property.amenities,
      photos: property.photos,
      roomTypes: property.roomTypes || [],
      price: property.price || 0,
    });
    setEditingProperty(property.id);
    setShowAddForm(true);
    setExpandedProperty(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0A2540] text-white shadow-lg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={bokexLogoDark} alt="Bokex" className="h-8 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-base md:text-lg font-semibold">Property Management</h1>
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
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Properties</h2>
            <p className="text-gray-600 text-sm md:text-base">Manage your listings, rooms, and pricing</p>
          </div>
          <Button
            onClick={onNavigateListProperty}
            className="bg-gradient-to-r from-[#0052A3] to-[#00A8E8] hover:from-[#003d7a] hover:to-[#0086ba] text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Plus className="size-4 mr-2" />
            Add New Property
          </Button>
        </div>

        {/* Add Property Form - Only show when editing */}
        {showAddForm && editingProperty && (
          <Card className="mb-6 border-2 border-[#00A8E8]">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {editingProperty ? (
                    <>
                      <Edit className="size-5 text-[#00A8E8]" />
                      Edit Property
                    </>
                  ) : (
                    <>
                      <Plus className="size-5 text-[#00A8E8]" />
                      Add New Property
                    </>
                  )}
                </span>
                <button onClick={() => {
                  setShowAddForm(false);
                  setEditingProperty(null);
                  resetForm();
                }}>
                  <X className="size-5 text-gray-500 hover:text-gray-700" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyName">Property Name *</Label>
                  <Input
                    id="propertyName"
                    value={newProperty.name}
                    onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                    placeholder="e.g., Sunset Beach Resort"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={newProperty.category}
                    onChange={(e) => setNewProperty({ ...newProperty, category: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="BNB">BNB</option>
                    <option value="Self Stay House">Self Stay House</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={newProperty.location}
                    onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                    placeholder="e.g., Mombasa, Kenya"
                  />
                </div>
                {newProperty.category !== 'Hotel' && (
                  <div>
                    <Label htmlFor="flatPrice">Price per Night (KSh) *</Label>
                    <Input
                      id="flatPrice"
                      type="number"
                      value={newProperty.price}
                      onChange={(e) => setNewProperty({ ...newProperty, price: Number(e.target.value) })}
                      placeholder="e.g., 5000"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={newProperty.description}
                  onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[80px]"
                  placeholder="Describe your property..."
                />
              </div>

              {/* Amenities */}
              <div>
                <Label className="mb-3 block">Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AMENITIES.map((amenity) => {
                    const Icon = amenity.icon;
                    const isSelected = (newProperty.amenities || []).includes(amenity.id);
                    return (
                      <button
                        key={amenity.id}
                        type="button"
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-[#00A8E8] bg-blue-50 text-[#00A8E8]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="size-5" />
                        <span className="text-sm font-medium">{amenity.label}</span>
                        {isSelected && <Check className="size-4 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photos */}
              <div>
                <Label className="mb-3 block">Property Photos</Label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#00A8E8] transition-colors">
                  <Upload className="size-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Click to upload photos</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
                {newProperty.photos && newProperty.photos.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {newProperty.photos.map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`Property ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Room Types (for Hotels only) */}
              {newProperty.category === 'Hotel' && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Building2 className="size-5 text-[#00A8E8]" />
                    Room Types & Pricing
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Select room types available at your hotel and set their pricing and availability</p>

                  {/* Predefined Room Types Selection */}
                  <div className="space-y-3">
                    {HOTEL_ROOM_TYPES.map((roomTemplate) => {
                      const existingRoom = (newProperty.roomTypes || []).find(
                        r => r.name === roomTemplate.name && r.beds === roomTemplate.beds
                      );
                      
                      return (
                        <div
                          key={roomTemplate.id}
                          className={`border-2 rounded-lg p-4 transition-all ${
                            existingRoom
                              ? 'border-[#00A8E8] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Room Type Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">
                                  {roomTemplate.name}
                                </h4>
                                <span className="text-sm text-gray-600">
                                  ({roomTemplate.beds})
                                </span>
                                <span className="text-xs text-gray-500">
                                  Up to {roomTemplate.capacity} {roomTemplate.capacity === 1 ? 'guest' : 'guests'}
                                </span>
                              </div>

                              {/* Price and Availability Inputs */}
                              {existingRoom ? (
                                <div className="grid grid-cols-2 gap-3 mt-3">
                                  <div>
                                    <Label className="text-xs">Price per Night (KSh) *</Label>
                                    <Input
                                      type="number"
                                      value={existingRoom.price}
                                      onChange={(e) => {
                                        const updatedRooms = (newProperty.roomTypes || []).map(r =>
                                          r.id === existingRoom.id
                                            ? { ...r, price: Number(e.target.value) }
                                            : r
                                        );
                                        setNewProperty({ ...newProperty, roomTypes: updatedRooms });
                                      }}
                                      placeholder="e.g., 8000"
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs">Available Rooms *</Label>
                                    <Input
                                      type="number"
                                      value={existingRoom.available}
                                      onChange={(e) => {
                                        const updatedRooms = (newProperty.roomTypes || []).map(r =>
                                          r.id === existingRoom.id
                                            ? { ...r, available: Number(e.target.value) }
                                            : r
                                        );
                                        setNewProperty({ ...newProperty, roomTypes: updatedRooms });
                                      }}
                                      placeholder="e.g., 10"
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                              ) : null}
                            </div>

                            {/* Add/Remove Button */}
                            <div>
                              {existingRoom ? (
                                <Button
                                  onClick={() => {
                                    setNewProperty({
                                      ...newProperty,
                                      roomTypes: (newProperty.roomTypes || []).filter(r => r.id !== existingRoom.id),
                                    });
                                  }}
                                  variant="outline"
                                  size="sm"
                                  className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="size-4 mr-1" />
                                  Remove
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    const newRoom: RoomType = {
                                      id: `${roomTemplate.id}-${Date.now()}`,
                                      name: roomTemplate.name,
                                      beds: roomTemplate.beds,
                                      capacity: roomTemplate.capacity,
                                      price: 0,
                                      available: 0,
                                    };
                                    setNewProperty({
                                      ...newProperty,
                                      roomTypes: [...(newProperty.roomTypes || []), newRoom],
                                    });
                                  }}
                                  variant="outline"
                                  size="sm"
                                  className="border-[#00A8E8] text-[#00A8E8] hover:bg-blue-50"
                                >
                                  <Plus className="size-4 mr-1" />
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary */}
                  {newProperty.roomTypes && newProperty.roomTypes.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <Check className="size-4 inline mr-1" />
                        <strong>{newProperty.roomTypes.length}</strong> room {newProperty.roomTypes.length === 1 ? 'type' : 'types'} added
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <Button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProperty(null);
                    resetForm();
                  }}
                  variant="outline"
                  className="border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddProperty}
                  className="bg-[#00A8E8] hover:bg-[#0086ba] text-white"
                >
                  <Save className="size-4 mr-2" />
                  {editingProperty ? 'Update Property' : 'Save Property'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Properties List */}
        <div className="space-y-4">
          {properties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-[#0052A3] text-xs font-semibold rounded-full">
                        {property.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                      <MapPin className="size-4" />
                      <span>{property.location}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{property.description}</p>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {property.amenities.map((amenityId) => {
                        const amenity = AMENITIES.find(a => a.id === amenityId);
                        if (!amenity) return null;
                        const Icon = amenity.icon;
                        return (
                          <div
                            key={amenityId}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-700"
                          >
                            <Icon className="size-3" />
                            <span>{amenity.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Flat Price for BnB and Self Stay House */}
                    {property.category !== 'Hotel' && property.price && (
                      <div className="flex items-center gap-2 text-lg font-bold text-[#00A8E8]">
                        <DollarSign className="size-5" />
                        <span>KSh {property.price.toLocaleString()}/night</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setExpandedProperty(expandedProperty === property.id ? null : property.id)}
                      variant="outline"
                      size="sm"
                      className="border-[#00A8E8] text-[#00A8E8]"
                    >
                      {expandedProperty === property.id ? (
                        <>
                          <ChevronUp className="size-4 mr-1" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="size-4 mr-1" />
                          View Details
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleEditProperty(property)}
                      variant="outline"
                      size="sm"
                      className="border-[#00A8E8] text-[#00A8E8]"
                    >
                      <Edit className="size-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteProperty(property.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedProperty === property.id && (
                  <div className="border-t pt-4 mt-4">
                    {/* Photos */}
                    {property.photos.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2">Photos</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {property.photos.map((photo, idx) => (
                            <img
                              key={idx}
                              src={photo}
                              alt={`${property.name} ${idx + 1}`}
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Room Types (for Hotels) */}
                    {property.category === 'Hotel' && property.roomTypes && (
                      <div>
                        <h4 className="font-semibold text-sm mb-3">Room Types & Pricing</h4>
                        <div className="space-y-2">
                          {property.roomTypes.map((room) => (
                            <div
                              key={room.id}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                            >
                              <div className="flex-1 grid grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="font-medium text-gray-900">{room.name}</p>
                                  <p className="text-xs text-gray-500">{room.beds}</p>
                                </div>
                                <div>
                                  <p className="font-bold text-[#00A8E8]">
                                    KSh {room.price.toLocaleString()}/night
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Up to {room.capacity} guests</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">{room.available} rooms available</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {properties.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <Building2 className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first property</p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-[#00A8E8] hover:bg-[#0086ba] text-white"
            >
              <Plus className="size-4 mr-2" />
              Add Your First Property
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white mt-12 py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <img src={bokexLogoDark} alt="Bokex" className="h-8 mx-auto mb-3" />
          </div>
          <p className="text-sm md:text-base">&copy; 2026 Bokex. All rights reserved.</p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">
            Smart Hotel Booking Platform for Kenya
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