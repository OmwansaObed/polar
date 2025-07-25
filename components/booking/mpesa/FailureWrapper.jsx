import { XCircle, RefreshCw } from "lucide-react";
import React from "react";

const FailureWrapper = ({
  bookingData,
  getSelectedSession,
  calculateTotal,
  onRetry,
  errorMessage = "Something went wrong while processing your booking. Please try again.",
}) => {
  return (
    <section id="booking-failure" className="min-h-screen flex items-center">
      <div className="w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Failed
          </h1>
          <p className="text-xl text-gray-600 mb-8">{errorMessage}</p>

          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Attempted Booking Details
            </h3>
            <div className="space-y-2 text-left">
              <p>
                <strong>Session:</strong> {getSelectedSession()?.title}
              </p>
              <p>
                <strong>Date:</strong> {bookingData.date}
              </p>
              <p>
                <strong>Time:</strong> {bookingData.time}
              </p>
              <p>
                <strong>Participants:</strong> {bookingData.participants}
              </p>
              <p>
                <strong>Total:</strong> KES {calculateTotal().toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetry}
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FailureWrapper;
