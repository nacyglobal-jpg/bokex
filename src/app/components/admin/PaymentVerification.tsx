import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { toast } from 'sonner';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  User, 
  CreditCard,
  RefreshCw,
  Send,
  AlertTriangle,
  Calendar,
  Building2,
  Phone,
  Mail,
  FileText,
  TrendingUp
} from 'lucide-react';

interface Transaction {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  userEmail: string;
  mpesaCode: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  bookingStatus: 'confirmed' | 'pending' | 'checked-in' | 'completed' | 'canceled';
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  timestamp: string;
  phoneNumber: string;
  failureReason?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    bookingId: 'BKX-001234567',
    userId: 'USR-123456',
    userName: 'Jessica Wong',
    userEmail: 'jessica.wong@email.com',
    mpesaCode: 'SFK3H8RQPA',
    amount: 118335,
    status: 'completed',
    bookingStatus: 'confirmed',
    hotelName: 'Sarova Stanley',
    roomType: 'Deluxe Room',
    checkIn: 'May 25, 2024',
    checkOut: 'May 28, 2024',
    timestamp: '2024-05-18 14:32:15',
    phoneNumber: '+254712345678'
  },
  {
    id: 'TXN-002',
    bookingId: 'BKX-001234892',
    userId: 'USR-789012',
    userName: 'David Smith',
    userEmail: 'david.smith@email.com',
    mpesaCode: 'SFK3H8RQPB',
    amount: 97545,
    status: 'pending',
    bookingStatus: 'pending',
    hotelName: 'Tribe Hotel Nairobi',
    roomType: 'Deluxe Room',
    checkIn: 'May 24, 2024',
    checkOut: 'May 27, 2024',
    timestamp: '2024-05-15 10:22:45',
    phoneNumber: '+254723456789'
  },
  {
    id: 'TXN-003',
    bookingId: 'BKX-001235123',
    userId: 'USR-345678',
    userName: 'Sarah R.',
    userEmail: 'sarah.r@email.com',
    mpesaCode: 'SFK3H8RQPC',
    amount: 147225,
    status: 'failed',
    bookingStatus: 'pending',
    hotelName: 'Fairmont Mount Kenya Safari Club',
    roomType: 'King Suite',
    checkIn: 'May 23, 2024',
    checkOut: 'May 26, 2024',
    timestamp: '2024-05-10 16:45:32',
    phoneNumber: '+254734567890',
    failureReason: 'Insufficient funds'
  },
];

export function PaymentVerification() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchBookingId, setSearchBookingId] = useState('');
  const [searchUserId, setSearchUserId] = useState('');
  const [searchMpesaCode, setSearchMpesaCode] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSearch = () => {
    if (!searchBookingId && !searchUserId && !searchMpesaCode) {
      toast.error('Please enter at least one search criteria');
      return;
    }

    const found = transactions.find(
      t => 
        (searchBookingId && t.bookingId.toLowerCase().includes(searchBookingId.toLowerCase())) ||
        (searchUserId && t.userId.toLowerCase().includes(searchUserId.toLowerCase())) ||
        (searchMpesaCode && t.mpesaCode.toLowerCase().includes(searchMpesaCode.toLowerCase()))
    );

    if (found) {
      setSelectedTransaction(found);
      toast.success('Transaction found!');
    } else {
      setSelectedTransaction(null);
      toast.error('No transaction found with provided details');
    }
  };

  const handleCompleteFailedTransaction = async () => {
    if (!selectedTransaction || selectedTransaction.status !== 'failed') {
      toast.error('Can only complete failed transactions');
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedTransactions = transactions.map(t =>
        t.id === selectedTransaction.id
          ? { ...t, status: 'completed' as const, bookingStatus: 'confirmed' as const, failureReason: undefined }
          : t
      );
      
      setTransactions(updatedTransactions);
      setSelectedTransaction({
        ...selectedTransaction,
        status: 'completed',
        bookingStatus: 'confirmed',
        failureReason: undefined
      });
      
      setIsProcessing(false);
      toast.success('✅ Transaction completed successfully! User, Hotel, and Admin dashboards updated.');
    }, 2000);
  };

  const handleVerifyPayment = async () => {
    if (!selectedTransaction) {
      toast.error('No transaction selected');
      return;
    }

    setIsProcessing(true);
    
    // Simulate verification API call
    setTimeout(() => {
      if (selectedTransaction.status === 'completed') {
        toast.success('✅ Payment verified successfully!');
      } else if (selectedTransaction.status === 'pending') {
        toast.info('⏳ Payment is pending confirmation');
      } else {
        toast.error('❌ Payment verification failed');
      }
      setIsProcessing(false);
    }, 1500);
  };

  const handleUpdateBookingStatus = (newStatus: Transaction['bookingStatus']) => {
    if (!selectedTransaction) return;

    const updatedTransactions = transactions.map(t =>
      t.id === selectedTransaction.id
        ? { ...t, bookingStatus: newStatus }
        : t
    );
    
    setTransactions(updatedTransactions);
    setSelectedTransaction({
      ...selectedTransaction,
      bookingStatus: newStatus
    });
    
    toast.success(`Booking status updated to ${newStatus}. All dashboards notified.`);
  };

  const handleSendNotification = () => {
    if (!selectedTransaction) return;
    toast.success(`📧 Notification sent to ${selectedTransaction.userName} (${selectedTransaction.userEmail})`);
  };

  const getStatusColor = (status: 'completed' | 'pending' | 'failed') => {
    switch (status) {
      case 'completed': return 'bg-green-500 hover:bg-green-500';
      case 'pending': return 'bg-yellow-500 hover:bg-yellow-500';
      case 'failed': return 'bg-red-500 hover:bg-red-500';
    }
  };

  const getBookingStatusColor = (status: Transaction['bookingStatus']) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500 hover:bg-blue-500';
      case 'pending': return 'bg-yellow-500 hover:bg-yellow-500';
      case 'checked-in': return 'bg-green-500 hover:bg-green-500';
      case 'completed': return 'bg-purple-500 hover:bg-purple-500';
      case 'canceled': return 'bg-red-500 hover:bg-red-500';
    }
  };

  const stats = {
    total: transactions.length,
    completed: transactions.filter(t => t.status === 'completed').length,
    pending: transactions.filter(t => t.status === 'pending').length,
    failed: transactions.filter(t => t.status === 'failed').length,
    totalRevenue: transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-green-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="size-4 text-green-600" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="size-4 text-yellow-600" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <XCircle className="size-4 text-red-600" />
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#00A8E8]/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="size-4 text-[#00A8E8]" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#00A8E8]">
              KSh {stats.totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Verification Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CreditCard className="size-6 text-[#0052A3]" />
            Payment Verification & Transaction Management
          </CardTitle>
          <CardDescription>
            Search and verify payments using Booking ID, User ID, or MPESA Code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Form */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-[#00A8E8]/20">
            <h3 className="font-bold text-base mb-4">Search Transaction</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking ID
                </label>
                <Input
                  placeholder="e.g., BKX-001234567"
                  value={searchBookingId}
                  onChange={(e) => setSearchBookingId(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User ID
                </label>
                <Input
                  placeholder="e.g., USR-123456"
                  value={searchUserId}
                  onChange={(e) => setSearchUserId(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MPESA Code
                </label>
                <Input
                  placeholder="e.g., SFK3H8RQPA"
                  value={searchMpesaCode}
                  onChange={(e) => setSearchMpesaCode(e.target.value.toUpperCase())}
                  className="font-mono"
                />
              </div>
            </div>
            <Button
              onClick={handleSearch}
              className="bg-[#0052A3] hover:bg-[#003d7a] text-white w-full md:w-auto"
            >
              <Search className="size-4 mr-2" />
              Search Transaction
            </Button>
          </div>

          {/* Transaction Details */}
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#0A2540] to-[#00A8E8] text-white p-6 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Transaction Details</h3>
                    <p className="text-cyan-100 text-sm font-mono">Transaction ID: {selectedTransaction.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${getStatusColor(selectedTransaction.status)} text-white`}>
                      {selectedTransaction.status.toUpperCase()}
                    </Badge>
                    <Badge className={`${getBookingStatusColor(selectedTransaction.bookingStatus)} text-white`}>
                      {selectedTransaction.bookingStatus.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-cyan-200 mb-1">Amount</p>
                    <p className="text-2xl font-bold">KSh {selectedTransaction.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-cyan-200 mb-1">MPESA Code</p>
                    <p className="text-xl font-mono">{selectedTransaction.mpesaCode}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="size-5 text-[#0052A3]" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-gray-500" />
                      <span className="text-gray-600">User ID:</span>
                      <span className="font-mono font-bold text-[#0052A3]">{selectedTransaction.userId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="size-4 text-gray-500" />
                      <span className="text-gray-600">Name:</span>
                      <span className="font-bold">{selectedTransaction.userName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 text-gray-500" />
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedTransaction.userEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 text-gray-500" />
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedTransaction.phoneNumber}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Building2 className="size-5 text-[#00A8E8]" />
                      Booking Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-gray-500" />
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-mono font-bold text-[#00A8E8]">{selectedTransaction.bookingId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4 text-gray-500" />
                      <span className="text-gray-600">Hotel:</span>
                      <span className="font-bold">{selectedTransaction.hotelName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="size-4 text-gray-500" />
                      <span className="text-gray-600">Room:</span>
                      <span className="font-medium">{selectedTransaction.roomType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-gray-500" />
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium">{selectedTransaction.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-gray-500" />
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium">{selectedTransaction.checkOut}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Failure Reason */}
              {selectedTransaction.failureReason && (
                <Card className="border-2 border-red-500/30 bg-red-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="size-5" />
                      <span className="font-bold">Failure Reason:</span>
                      <span>{selectedTransaction.failureReason}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Payment Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={handleVerifyPayment}
                      disabled={isProcessing}
                      className="w-full bg-[#00A8E8] hover:bg-[#0086ba]"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="size-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="size-4 mr-2" />
                          Verify Payment
                        </>
                      )}
                    </Button>
                    
                    {selectedTransaction.status === 'failed' && (
                      <Button
                        onClick={handleCompleteFailedTransaction}
                        disabled={isProcessing}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="size-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="size-4 mr-2" />
                            Complete Failed Transaction
                          </>
                        )}
                      </Button>
                    )}

                    <Button
                      onClick={handleSendNotification}
                      variant="outline"
                      className="w-full"
                    >
                      <Send className="size-4 mr-2" />
                      Send Notification to User
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Update Booking Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {(['pending', 'confirmed', 'checked-in', 'completed', 'canceled'] as const).map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={selectedTransaction.bookingStatus === status ? 'default' : 'outline'}
                        onClick={() => handleUpdateBookingStatus(status)}
                        className={`w-full ${selectedTransaction.bookingStatus === status ? 'bg-[#0052A3] hover:bg-[#003d7a]' : ''}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Recent Transactions */}
          <div>
            <h3 className="font-bold text-base mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  onClick={() => setSelectedTransaction(transaction)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedTransaction?.id === transaction.id
                      ? 'border-[#00A8E8] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-sm font-bold text-[#0052A3]">
                        {transaction.bookingId}
                      </div>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">KSh {transaction.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{transaction.userName}</span>
                    <span className="font-mono text-gray-500">{transaction.mpesaCode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
