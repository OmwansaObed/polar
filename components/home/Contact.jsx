"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

// Section wrapper and title (unchanged)
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

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    details: ["Virtual Office", "Nairobi", "Kenya"],
    action: "Online Meet",
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+254 791 891 471", "+254 794 909 991"],
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["polarclub@gmail.com", "polarclub.vercel.app"],
    action: "Send Email",
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon-Fri: 8AM-7PM", "Sat-Sun: 9AM-7PM"],
    action: "View Schedule",
  },
];

const operatingHours = [
  { day: "Monday", hours: "8:00 AM - 7:00 PM" },
  { day: "Tuesday", hours: "8:00 AM - 7:00 PM" },
  { day: "Wednesday", hours: "8:00 AM - 7:00 PM" },
  { day: "Thursday", hours: "8:00 AM - 7:00 PM" },
  { day: "Friday", hours: "8:00 AM - 7:00 PM" },
  { day: "Saturday", hours: "8:00 AM - 7:00 PM" },
  { day: "Sunday", hours: "8:00 AM - 7:00 PM" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1000);
  };

  return (
    <SectionWrapper id="contact" className="">
      <SectionTitle
        title="Get In Touch"
        subtitle="Ready to roll? Contact us to book your skating session or ask any questions"
      />

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-3 rounded-lg">
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p
                          key={detailIndex}
                          className="text-gray-600 text-sm mb-1"
                        >
                          {detail}
                        </p>
                      ))}
                      <button className="text-rose-600 font-semibold text-sm hover:text-rose-700 transition-colors mt-2">
                        {info.action} →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operating Hours */}
          <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Operating Hours
            </h3>
            <div className="space-y-2">
              {operatingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{schedule.day}</span>
                  <span className="font-semibold text-gray-900">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3  rounded-lg">
              <p className="text-rose-600 text-sm font-medium">
                💡 Pro Tip: Weekday evenings are less crowded!
              </p>
            </div>
            <p className="text-black font-light text-sm ">
              These are holiday hours, different from non-holiday hours. Non
              holiday hours are from 1:00 PM to 7:00 PM.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </div>

            {!isSubmitted ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                      placeholder="+254 700 123 456"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Session Booking</option>
                      <option value="group">Group/Party Booking</option>
                      <option value="membership">Membership Inquiry</option>
                      <option value="general">General Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 resize-vertical"
                    placeholder="Tell us about your skating needs, preferred dates, group size, or any questions you have..."
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500 focus:ring-2"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    I'd like to receive updates about special offers and events
                    via email.
                  </label>
                </div>

                <button
                  type="submit"
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
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h4>
                <p className="text-gray-600 mb-4">
                  Thank you for contacting Polar club! We've received your
                  message and will get back to you within 24 hours.
                </p>
                <p className="text-sm text-gray-500">
                  Form will reset automatically...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6">
            <h3 className="text-2xl font-bold mb-2">Find Us</h3>
            <p className="text-rose-100">
              Just call us at +254 794 909 991 or email us at
              polarclub@gmail.com
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="font-medium">Interactive Map</p>
              <p className="text-sm">Virtual Office, Nairobi</p>
              <button className="mt-2 text-rose-600 hover:text-rose-700 font-semibold">
                Open in Google Maps →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Bar */}
      <div className="mt-12">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">
              Need Immediate Assistance?
            </h3>
            <p className="text-gray-300">
              Our team is ready to help you plan the perfect skating experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-2 text-rose-400" />
              <p className="font-semibold">Call Us</p>
              <p className="text-gray-300 text-sm">+254 794 909 991</p>
            </div>

            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-2 text-rose-400" />
              <p className="font-semibold">Email Us</p>
              <p className="text-gray-300 text-sm">info@Polarclub.co.ke</p>
            </div>

            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 mb-2 text-rose-400" />
              <p className="font-semibold">Visit Us</p>
              <p className="text-gray-300 text-sm">Mon-Sun: 8AM-7PM</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
