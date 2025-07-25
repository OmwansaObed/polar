import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentStatusChecker({ checkoutRequestId }) {
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    async function fetchStatus() {
      try {
        const response = await axios.get(
          `/api/mpesa/payment-status/${checkoutRequestId}`
        );
        const currentStatus = response.data.payment_status;

        setStatus(currentStatus);

        if (currentStatus === "SUCCESS" || currentStatus === "FAILED") {
          clearInterval(intervalId);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch payment status:", error);
        clearInterval(intervalId);
        setStatus("ERROR");
        setLoading(false);
      }
    }

    intervalId = setInterval(fetchStatus, 3000);
    fetchStatus();

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [checkoutRequestId]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Payment Status</h2>
      {loading ? (
        <p>Checking payment status...</p>
      ) : (
        <p>
          Status: <strong>{status}</strong>
        </p>
      )}
    </div>
  );
}
