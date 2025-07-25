"use client";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  User,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Star,
  Gift,
} from "lucide-react";
import { addOns, scrollToTop } from "@/components/constants";
import SuccessWrapper from "@/components/booking/SuccessWrapper";
import axios from "axios";
import { toast } from "sonner";
import FailureWrapper from "@/components/booking/mpesa/FailureWrapper";

// Reusing the same section components from your contact page
const SectionWrapper = ({ children, id, className }) => (
  <section
    id={id}
    className={`py-16 px-4 max-w-7xl mx-auto ${className || ""}`}
  >
    {children}
  </section>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const sessionTypes = [
  {
    id: "open-skate",
    title: "Regular Session",
    description: "Perfect for beginners and casual skaters",
    duration: "1 hours",
    // price: 800,
    price: 1,
    features: [
      "Skate rental included",
      "Basic safety gear",
      "Basic coaching available",
    ],
  },
  {
    id: "group-party",
    title: "Group Sessions",
    description: "Celebrate with friends and family",
    duration: "1hr 30 minutes",
    price: 1200,
    features: [
      "Skate rental included",
      "Advanced safety gear",
      "Intermediate coaching",
    ],
  },
  {
    id: "lessons",
    title: "Premium Session",
    description: "Learn from our professional instructors",
    duration: "2 hours",
    price: 1800,
    features: [
      "Professional instructor",
      "Small group size",
      "Progress tracking",
      "Photography",
    ],
  },
];

const timeSlots = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    sessionType: "",
    date: "",
    time: "",
    participants: 1,
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
    addOns: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [CheckoutRequestID, setCheckoutRequestID] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const [isPolling, setIsPolling] = useState(false);

  const [paymentFailed, setPaymentFailed] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    let pollInterval;

    if (CheckoutRequestID && isPolling) {
      pollInterval = setInterval(async () => {
        try {
          const response = await axios.get(
            `/api/payment-status?checkoutRequestId=${CheckoutRequestID}`
          );
          const { status } = response.data;

          setPaymentStatus(status);

          // Stop polling if payment is completed, failed, or cancelled
          console.log("Payment status:", status);
          if (
            status === "completed" ||
            status === "failed" ||
            status === "success"
          ) {
            clearInterval(pollInterval);
            setIsPolling(false);
            setIsSubmitting(false);

            if (status === "completed" || status === "success") {
              setIsSubmitted(true);
              toast.success("Payment successful! Your booking is confirmed.");
            } else if (status === "failed") {
              // Set failure state instead of trying to return JSX
              setPaymentFailed(true);
              setPaymentError("Payment failed. Please try again.");
              toast.error("Payment failed. Please try again.");
            } else {
              // Handle other failure cases
              setPaymentFailed(true);
              setPaymentError(
                `Payment ${status.toLowerCase()}. Please try again.`
              );
              toast.error(`Payment ${status.toLowerCase()}. Please try again.`);
            }
          }
        } catch (error) {
          console.error("Error polling payment status:", error);
          setPaymentFailed(true);
          setPaymentError("Error checking payment status");
          toast.error("Error checking payment status");
          clearInterval(pollInterval);
          setIsPolling(false);
          setIsSubmitting(false);
        }
      }, 3000);
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [CheckoutRequestID, isPolling]);

  // Add a retry function
  const handleRetry = () => {
    setPaymentFailed(false);
    setPaymentError("");
    setPaymentStatus("PENDING");
    setCheckoutRequestID(null);
    // Optionally reset to payment step
    setCurrentStep(4);
  };
  const handleSubmit = async () => {
    console.log("handleSubmit called");
    if (!bookingData.customerInfo.phone) {
      toast.error("Please provide a phone number for M-Pesa payment");
      console.log("No phone number provided");
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting payment, bookingData:", bookingData);

    try {
      const paymentData = {
        phone: bookingData.customerInfo.phone,
        amount: calculateTotal(),
        bookingDetails: {
          sessionType: getSelectedSession()?.title,
          date: bookingData.date,
          time: bookingData.time,
          participants: bookingData.participants,
          customerInfo: bookingData.customerInfo,
          addOns: bookingData.addOns,
          total: calculateTotal(),
        },
      };

      console.log("Sending paymentData:", paymentData);

      const response = await axios.post("/api/mpesa/stk-push", paymentData);

      console.log("Payment API response:", response.data);

      if (
        response.data.ResponseCode === "0" ||
        response.data.message === "Payment initiated"
      ) {
        const { CheckoutRequestID: requestId } = response.data?.data || {};
        console.log("CHeckoutRequestId", CheckoutRequestID);
        setCheckoutRequestID(requestId);
        setIsPolling(true);
        setPaymentStatus("PENDING");

        toast.success(
          "Payment request sent to your phone. Please complete the M-Pesa transaction."
        );
        console.log("Payment request sent, CheckoutRequestID:", requestId);
      } else {
        console.error("Payment initiation failed:", response.data);
        throw new Error(response.data.message || "Payment initiation failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setIsSubmitting(false);
      toast.error(
        error.response?.data?.message ||
          "Failed to initiate payment. Please try again."
      );
    }
  };
  // Handle input changes for booking data
  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setBookingData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setBookingData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };
  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    scrollToTop();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    scrollToTop();
  };

  const getSelectedSession = () => {
    return sessionTypes.find(
      (session) => session.id === bookingData.sessionType
    );
  };

  const calculateTotal = () => {
    const selectedSession = getSelectedSession();
    if (!selectedSession) return 0;

    const basePrice = selectedSession.price * bookingData.participants;
    const addOnTotal = bookingData.addOns.reduce(
      (sum, addOn) => sum + addOn.price,
      0
    );
    return basePrice + addOnTotal;
  };

  const toggleAddOn = (addOn) => {
    setBookingData((prev) => ({
      ...prev,
      addOns: prev.addOns.find((item) => item.id === addOn.id)
        ? prev.addOns.filter((item) => item.id !== addOn.id)
        : [...prev.addOns, addOn],
    }));
  };

  if (isSubmitted) {
    return (
      <SuccessWrapper
        bookingData={bookingData}
        getSelectedSession={getSelectedSession}
        calculateTotal={calculateTotal}
      />
    );
  }

  if (paymentFailed) {
    return (
      <FailureWrapper
        bookingData={bookingData}
        getSelectedSession={getSelectedSession}
        calculateTotal={calculateTotal}
        onRetry={handleRetry}
        errorMessage={paymentError}
      />
    );
  }

  return (
    <SectionWrapper id="booking" className="mt-10">
      <SectionTitle
        title="Book Your Session"
        subtitle="Choose your perfect skating experience and secure your spot on the rink"
      />

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step
                    ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-16 h-1 ${
                    currentStep > step ? "bg-rose-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-8 text-sm">
          <span
            className={
              currentStep >= 1 ? "text-rose-600 font-semibold" : "text-gray-400"
            }
          >
            Select Session
          </span>
          <span
            className={
              currentStep >= 2 ? "text-rose-600 font-semibold" : "text-gray-400"
            }
          >
            Date & Time
          </span>
          <span
            className={
              currentStep >= 3 ? "text-rose-600 font-semibold" : "text-gray-400"
            }
          >
            Add-ons
          </span>
          <span
            className={
              currentStep >= 4 ? "text-rose-600 font-semibold" : "text-gray-400"
            }
          >
            Payment
          </span>
        </div>
      </div>

      {/* Step 1: Session Selection */}
      {currentStep === 1 && (
        <div className="grid md:grid-cols-2 gap-8">
          {sessionTypes.map((session) => (
            <div
              key={session.id}
              className={`bg-white rounded-2xl shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                bookingData.sessionType === session.id
                  ? "border-rose-500 ring-4 ring-rose-100"
                  : "border-gray-200 hover:border-rose-300"
              }`}
              onClick={() => handleInputChange("sessionType", session.id)}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {session.title}
                  </h3>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-rose-600">
                      KES {session.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">per person</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{session.description}</p>

                <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{session.duration}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {session.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Date, Time & Participants */}
      {currentStep === 2 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Date *
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Time *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleInputChange("time", time)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        bookingData.time === time
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "border-gray-200 hover:border-rose-300"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Participants *
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange(
                        "participants",
                        Math.max(1, bookingData.participants - 1)
                      )
                    }
                    className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                    {bookingData.participants}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange(
                        "participants",
                        bookingData.participants + 1
                      )
                    }
                    className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Customer Information */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={bookingData.customerInfo.name}
                      onChange={(e) =>
                        handleInputChange("customerInfo.name", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={bookingData.customerInfo.email}
                      onChange={(e) =>
                        handleInputChange("customerInfo.email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={bookingData.customerInfo.phone}
                      onChange={(e) =>
                        handleInputChange("customerInfo.phone", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                      placeholder="07 or  254 or 011"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={bookingData.customerInfo.specialRequests}
                      onChange={(e) =>
                        handleInputChange(
                          "customerInfo.specialRequests",
                          e.target.value
                        )
                      }
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                      placeholder="Any special accommodations needed?"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Add-ons */}
      {currentStep === 3 && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Enhance Your Experience
            </h3>
            <p className="text-gray-600">
              Add optional extras to make your session even better
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {addOns.map((addOn) => {
              const isSelected = bookingData.addOns.find(
                (item) => item.id === addOn.id
              );
              return (
                <div
                  key={addOn.id}
                  className={`bg-white rounded-2xl shadow-lg border-2 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "border-rose-500 ring-2 ring-rose-100"
                      : "border-gray-200 hover:border-rose-300"
                  }`}
                  onClick={() => toggleAddOn(addOn)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-bold text-gray-900">
                        {addOn.name}
                      </h4>
                      <div className="text-right">
                        <p className="text-xl font-bold text-rose-600">
                          +KES {addOn.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{addOn.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-rose-500 bg-rose-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle className="text-white" size={16} />
                        )}
                      </div>
                      <Gift className="text-rose-400" size={20} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 4: Payment Summary */}
      {currentStep === 4 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Booking Summary
            </h3>

            {/* Booking Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Session Type:</span>
                  <span className="font-semibold">
                    {getSelectedSession()?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="font-semibold">
                    {bookingData.date} at {bookingData.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Participants:</span>
                  <span className="font-semibold">
                    {bookingData.participants}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span className="font-semibold">
                    KES{" "}
                    {(
                      getSelectedSession()?.price * bookingData.participants
                    ).toLocaleString()}
                  </span>
                </div>

                {bookingData.addOns.length > 0 && (
                  <>
                    <hr className="my-3" />
                    <div className="text-sm text-gray-600 font-medium">
                      Add-ons:
                    </div>
                    {bookingData.addOns.map((addOn) => (
                      <div
                        key={addOn.id}
                        className="flex justify-between text-sm"
                      >
                        <span>{addOn.name}</span>
                        <span>+KES {addOn.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </>
                )}

                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-rose-600">
                    KES {calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Payment Method
              </h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      id="mpesa"
                      defaultChecked
                    />
                    <label htmlFor="mpesa" className="font-semibold">
                      M-Pesa
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Pay securely with M-Pesa mobile money
                  </p>
                </div>

                <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="payment" id="card" disabled />
                    <label htmlFor="card" className="font-semibold">
                      Bank
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    KCB, NCBA e.t.c coming soon
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-rose-500 to-pink-600 hover:shadow-lg hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  <span>Confirm Booking & Pay</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            currentStep === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          ← Previous
        </button>

        <button
          onClick={nextStep}
          disabled={
            currentStep === 4 ||
            (currentStep === 1 && !bookingData.sessionType) ||
            (currentStep === 2 &&
              (!bookingData.date ||
                !bookingData.time ||
                !bookingData.customerInfo.name ||
                !bookingData.customerInfo.email ||
                !bookingData.customerInfo.phone))
          }
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            currentStep === 4 ||
            (currentStep === 1 && !bookingData.sessionType) ||
            (currentStep === 2 &&
              (!bookingData.date ||
                !bookingData.time ||
                !bookingData.customerInfo.name ||
                !bookingData.customerInfo.email ||
                !bookingData.customerInfo.phone))
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-lg"
          }`}
        >
          {currentStep === 4 ? "Complete Booking" : "Next →"}
        </button>
      </div>
    </SectionWrapper>
  );
}
