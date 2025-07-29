import { CheckCircle, Clock, CreditCard, XCircle } from "lucide-react";

const getStatusBadge = (status) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const icons = {
    pending: <Clock className="w-3 h-3" />,
    confirmed: <CheckCircle className="w-3 h-3" />,
    cancelled: <XCircle className="w-3 h-3" />,
    completed: <CheckCircle className="w-3 h-3" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
        styles[status] || styles.pending
      }`}
    >
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const getPaymentStatusBadge = (payment) => {
  if (!payment) {
    return <span className="text-xs text-gray-500">No payment</span>;
  }

  const styles = {
    pending: "bg-orange-100 text-orange-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    expired: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        styles[payment.status] || styles.pending
      }`}
    >
      <CreditCard className="w-3 h-3" />
      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
    </span>
  );
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (timeString) => {
  if (!timeString) return "N/A";
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const parseAddOns = (addOns) => {
  if (!addOns) return [];
  try {
    return typeof addOns === "string" ? JSON.parse(addOns) : addOns;
  } catch {
    return [];
  }
};

export {
  filteredAndSortedBookings,
  getStatusBadge,
  getPaymentStatusBadge,
  formatDate,
  formatTime,
  parseAddOns,
};
