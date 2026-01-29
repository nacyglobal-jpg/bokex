import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Users, UserPlus, Shield, Edit3, Trash2, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

// Generate unique user ID in format USR-XXXXXX
const generateUserId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `USR-${timestamp}${random}`;
};

interface User {
  id: string;
  userId: string;
  username: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Editor';
  createdAt: string;
  status: 'Active' | 'Inactive';
}

interface RoleManagementProps {
  dashboardType: 'super-admin' | 'client';
}

export function RoleManagement({ dashboardType }: RoleManagementProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      userId: 'USR-123456',
      username: 'admin_main',
      email: 'admin@bokex.com',
      role: 'Admin',
      createdAt: '2025-01-15',
      status: 'Active',
    },
    {
      id: '2',
      userId: 'USR-789012',
      username: 'manager_john',
      email: 'john@example.com',
      role: 'Manager',
      createdAt: '2025-12-20',
      status: 'Active',
    },
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Editor' as 'Admin' | 'Manager' | 'Editor',
  });

  const getRoleCounts = () => {
    const counts = {
      Admin: users.filter(u => u.role === 'Admin').length,
      Manager: users.filter(u => u.role === 'Manager').length,
      Editor: users.filter(u => u.role === 'Editor').length,
    };
    return counts;
  };

  const canAddRole = (role: 'Admin' | 'Manager' | 'Editor') => {
    const counts = getRoleCounts();
    if (role === 'Admin' && counts.Admin >= 2) return false;
    if (role === 'Manager' && counts.Manager >= 2) return false;
    return true;
  };

  const needsPayment = (role: 'Admin' | 'Manager' | 'Editor') => {
    const counts = getRoleCounts();
    if (role === 'Admin' && counts.Admin >= 2) return true;
    if (role === 'Manager' && counts.Manager >= 2) return true;
    return false;
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Check if payment is needed
    if (needsPayment(newUser.role)) {
      setShowPaymentModal(true);
      return;
    }

    // Check role limits
    if (!canAddRole(newUser.role) && !needsPayment(newUser.role)) {
      toast.error(`Maximum limit reached for ${newUser.role} role`);
      return;
    }

    addUserToList();
  };

  const addUserToList = () => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      userId: generateUserId(),
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Active',
    };

    setUsers([...users, user]);
    toast.success(`${newUser.role} user created successfully!`);
    setNewUser({ username: '', email: '', password: '', role: 'Editor' });
    setShowAddUserModal(false);
    setShowPaymentModal(false);
  };

  const handlePayment = () => {
    toast.success('Payment of KSh 5,000 processed successfully via MPESA!');
    addUserToList();
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    toast.success('User deleted successfully');
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } 
        : u
    ));
    toast.success('User status updated');
  };

  const roleCounts = getRoleCounts();

  return (
    <div className="space-y-6">
      {/* Role Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-[#0052A3]/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="size-5 text-[#0052A3]" />
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{roleCounts.Admin}</p>
              <p className="text-sm text-gray-600">/ 2 free</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Full platform access
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#00A8E8]/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="size-5 text-[#00A8E8]" />
              Managers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{roleCounts.Manager}</p>
              <p className="text-sm text-gray-600">/ 2 free</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Manage bookings & properties
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Edit3 className="size-5 text-green-600" />
              Editors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{roleCounts.Editor}</p>
              <p className="text-sm text-gray-600">/ unlimited</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              View & edit content only
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add User Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="size-6 text-[#0052A3]" />
                User Roles & Access Management
              </CardTitle>
              <CardDescription className="mt-2">
                Manage user roles and permissions for {dashboardType === 'super-admin' ? 'Super Admin' : 'Hotel Client'} dashboard
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowAddUserModal(!showAddUserModal)}
              className="bg-[#00A8E8] hover:bg-[#0086ba] text-white"
            >
              <UserPlus className="size-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add User Form */}
          {showAddUserModal && (
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-6 border-2 border-[#00A8E8]/20">
              <h3 className="font-bold text-lg mb-4">Create New User</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="e.g., john_manager"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'Admin' | 'Manager' | 'Editor' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] focus:border-transparent"
                  >
                    <option value="Editor">Editor</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Role Limits Warning */}
              {needsPayment(newUser.role) && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <DollarSign className="inline size-4 mr-1" />
                    <strong>Payment Required:</strong> Adding an extra {newUser.role} requires a one-time payment of <strong>KSh 5,000</strong>
                  </p>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleAddUser}
                  className="bg-[#0052A3] hover:bg-[#003d7a] text-white"
                >
                  {needsPayment(newUser.role) ? 'Proceed to Payment' : 'Create User'}
                </Button>
                <Button
                  onClick={() => {
                    setShowAddUserModal(false);
                    setNewUser({ username: '', email: '', password: '', role: 'Editor' });
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Users List */}
          <div className="space-y-3">
            <h3 className="font-bold text-base mb-3">All Users ({users.length})</h3>
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-[#0052A3]/10 p-2 rounded-full">
                      <Users className="size-4 text-[#0052A3]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900">{user.username}</p>
                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{user.userId}</span>
                      </div>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-11">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'Admin' 
                        ? 'bg-[#0052A3]/10 text-[#0052A3]' 
                        : user.role === 'Manager'
                        ? 'bg-[#00A8E8]/10 text-[#00A8E8]'
                        : 'bg-green-50 text-green-600'
                    }`}>
                      {user.role}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {user.status}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 md:mt-0">
                  <Button
                    onClick={() => handleToggleStatus(user.id)}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    {user.status === 'Active' ? (
                      <>
                        <XCircle className="size-3 mr-1" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <CheckCircle className="size-3 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                  >
                    <Trash2 className="size-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="bg-[#00A8E8]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="size-8 text-[#00A8E8]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Required</h3>
              <p className="text-gray-600">
                Adding an extra {newUser.role} role requires a one-time payment
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 mb-6 border-2 border-[#00A8E8]">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">Amount to Pay</p>
                <p className="text-4xl font-bold text-[#0052A3]">KSh 5,000</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-bold">MPESA PAYBILL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paybill Number:</span>
                  <span className="font-bold text-[#00A8E8]">4005207</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Business Name:</span>
                  <span className="font-bold text-xs">NACY GLOBAL TECHNOLOGIES</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handlePayment}
                className="flex-1 bg-[#0052A3] hover:bg-[#003d7a] text-white"
              >
                <CheckCircle className="size-4 mr-2" />
                Confirm Payment
              </Button>
              <Button
                onClick={() => {
                  setShowPaymentModal(false);
                  setShowAddUserModal(false);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}