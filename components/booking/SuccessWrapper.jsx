import { CheckCircle } from "lucide-react";
import React from "react";

const SuccessWrapper = ({
  bookingData,
  getSelectedSession,
  calculateTotal,
}) => {
  return (
    <section id="booking-success" className="min-h-screen flex items-center">
      <div className="w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your skating session has been successfully booked. We'll send you a
            confirmation email shortly.
          </p>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Booking Details
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
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Book Another Session
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300">
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessWrapper;
