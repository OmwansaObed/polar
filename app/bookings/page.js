"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Calendar,
  Clock,
  Users,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  RefreshCw,
  Eye,
  Download,
  Phone,
  Mail,
  DollarSignIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const MyBookings = () => {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const router = useRouter();

  // Fetch bookings when component mounts or session changes
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchBookings();
    } else if (status === "unauthenticated") {
      setLoading(false);
      setError("Please log in to view your bookings");
      router.push("/auth/login");
      toast.warning("Please log in to view your bookings");
    }
  }, [session, status]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `/api/bookings?email=${encodeURIComponent(session.user.email)}`
      );

      if (response.status !== 200) {
        return setError("Error during fetching bookings");
      }

      setBookings(response.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.response?.data.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get payment status from booking
  const getPaymentStatus = (booking) => {
    const latestPayment = booking.payments?.[booking.payments.length - 1];
    if (!latestPayment) {
      return "pending";
    }
    return latestPayment.status;
  };

  // Filter and sort bookings based on payment status
  const filteredAndSortedBookings = bookings
    .filter((booking) => {
      // Filter by payment status instead of booking status
      if (filterStatus !== "all") {
        const paymentStatus = getPaymentStatus(booking);
        if (paymentStatus !== filterStatus) {
          return false;
        }
      }

      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          booking.sessionType?.toLowerCase().includes(searchLower) ||
          booking.customerName?.toLowerCase().includes(searchLower) ||
          booking.id.toString().includes(searchLower)
        );
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "date":
          return new Date(a.date) - new Date(b.date);
        case "amount":
          return (b.totalAmount || 0) - (a.totalAmount || 0);
        default:
          return 0;
      }
    });

  const getPaymentStatusBadge = (booking) => {
    const latestPayment = booking.payments?.[booking.payments.length - 1];
    const paymentStatus = latestPayment?.status || "pending";

    const styles = {
      pending: "bg-orange-100 text-orange-800 border-orange-200",
      success: "bg-green-100 text-green-800 border-green-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      expired: "bg-gray-100 text-gray-800 border-gray-200",
    };

    const icons = {
      pending: <Clock className="w-3 h-3" />,
      success: <CheckCircle className="w-3 h-3" />,
      failed: <XCircle className="w-3 h-3" />,
      expired: <AlertCircle className="w-3 h-3" />,
    };

    const labels = {
      pending: "Pending Payment",
      success: "Payment Completed",
      failed: "Payment Failed",
      expired: "Payment Expired",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
          styles[paymentStatus] || styles.pending
        }`}
      >
        {icons[paymentStatus] || icons.pending}
        {labels[paymentStatus] || labels.pending}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    try {
      // Handle both full ISO timestamps and time-only strings
      let date;
      if (timeString.includes("T")) {
        // Full ISO timestamp - extract time part
        date = new Date(timeString);
      } else {
        // Time only string
        date = new Date(`2000-01-01T${timeString}`);
      }

      if (isNaN(date.getTime())) return "Invalid Time";

      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return "Invalid Time";
    }
  };

  const parseAddOns = (addOns) => {
    if (!addOns) return [];
    try {
      return typeof addOns === "string" ? JSON.parse(addOns) : addOns;
    } catch {
      return [];
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to view your bookings
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-[70px]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600 mt-1">
                Track your skating sessions and payments
              </p>
            </div>
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Payment Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="all">All Payments</option>
                  <option value="pending">Pending Payment</option>
                  <option value="success">Payment Completed</option>
                  <option value="failed">Payment Failed</option>
                  <option value="expired">Payment Expired</option>
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="date">By Session Date</option>
                <option value="amount">By Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Error: {error}</span>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {filteredAndSortedBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "You haven't made any bookings yet"}
            </p>
            <button
              onClick={() => router.push("/booking")}
              className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Make a Booking
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredAndSortedBookings.map((booking) => {
              const latestPayment =
                booking.payments?.[booking.payments.length - 1];
              const addOns = parseAddOns(booking.addOns);

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Booking #{booking.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Created on {formatDate(booking.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getPaymentStatusBadge(booking)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Session Details */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Session Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{booking.sessionType || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>
                              {booking.date ? formatDate(booking.date) : "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{formatTime(booking.time)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span>
                              {booking.participants || 0} participants
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Contact Info
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 text-gray-400">👤</span>
                            <span>{booking.customerName || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{booking.customerPhone || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="truncate">
                              {booking.customerEmail || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Add-ons */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Add-ons
                        </h4>
                        <div className="space-y-1 text-sm">
                          {addOns.length > 0 ? (
                            addOns.map((addOn, index) => (
                              <div key={index} className="flex justify-between">
                                <span>{addOn.name}</span>
                                <span className="font-medium">
                                  KSh {addOn.price}
                                </span>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-500">No add-ons</span>
                          )}
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Payment
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center">
                            <span>Total Amount:</span>
                            <span className="font-bold text-lg text-rose-600">
                              KSh {booking.totalAmount || 0}
                            </span>
                          </div>
                          {latestPayment && (
                            <>
                              <div className="flex justify-between">
                                <span>Payment Method:</span>
                                <span>M-Pesa</span>
                              </div>
                              {latestPayment.mpesaReceiptNumber && (
                                <div className="flex justify-between">
                                  <span>Receipt:</span>
                                  <span className="font-mono text-xs">
                                    {latestPayment.mpesaReceiptNumber}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Last updated: {formatDate(booking.createdAt)}
                        </div>
                        <div className="flex items-center gap-2">
                          {getPaymentStatus(booking) === "success" ? (
                            <button className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded text-sm font-medium">
                              <Download className="w-4 h-4" />
                              Download Receipt
                            </button>
                          ) : (
                            <span className="text-sm font-extralight font-italic ">
                              🔴 Action not available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Summary */}
        {bookings.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Booking Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {bookings.length}
                </div>
                <div className="text-sm text-gray-600">Total Booking(s)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {
                    bookings.filter((b) => getPaymentStatus(b) === "success")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Paid</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {
                    bookings.filter((b) => getPaymentStatus(b) === "pending")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Pending Payment(s)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600">
                  KSh
                  {/* {just add where payment status is success */}
                  {bookings
                    .filter((b) => getPaymentStatus(b) === "success")
                    .reduce(
                      (sum, b) => sum + (parseFloat(b.totalAmount) || 0),
                      0
                    )
                    .toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
