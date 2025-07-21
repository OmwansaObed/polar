import { Check, Star, Crown, Users, Clock, Calendar } from "lucide-react";
import {
  SectionWrapper,
  SectionTitle,
  MotionDiv,
  MotionCard,
  MotionButton,
  fadeInUp,
} from "../motion/MotionComponents";

const pricingPlans = [
  {
    name: "Basic Session",
    price: "800",
    period: "per session",
    description: "Perfect for trying out roller skating",
    icon: Users,
    features: [
      "1-hour skating session",
      "Skate rental included",
      "Basic safety equipment",
      // "Access to main rink",
      "Basic coaching available",
    ],
    popular: false,
    color: "gray",
  },
  {
    name: "Premium Pass",
    price: "1,200",
    period: "per session",
    description: "Enhanced experience with extras",
    icon: Star,
    features: [
      "1-hour 20 min skating session",
      "Premium skate rental",
      "Full safety gear included",
      "Access to all rinks",
      // "DJ music & lights",
      // "Free locker",
      "intermediate coaching",
      // "Refreshment discount",
    ],
    popular: true,
    color: "rose",
  },
  {
    name: "VIP Experience",
    price: "1800",
    period: "per session",
    description: "Luxury skating with personal service",
    icon: Crown,
    features: [
      "2-hour unlimited access",
      "Professional skate fitting",
      "Personal skating coach",
      "Private rink time (30 mins)",
      // "Premium sound system",
      // "Complimentary refreshments",
      // "Photo session included",
      "Priority booking",
      "Memorabe gifts",
    ],
    popular: false,
    color: "purple",
  },
];

const groupPackages = [
  {
    title: "Family Package",
    price: "3,500",
    description: "Perfect for families with kids",
    people: "Up to 5 people",
    includes: [
      "2-hour session",
      "All equipment",
      "Family photo",
      "Kid-friendly sessions",
    ],
  },
  {
    title: "Birthday Special",
    price: "8,000",
    description: "Make birthdays unforgettable",
    people: "Up to 12 people",
    includes: [
      "Private party area",
      "Skate rental for all",
      // "Birthday cake",
      // "Party host",
      "2-hour exclusive access",
    ],
  },
  {
    title: "Corporate Event",
    price: "15,000",
    description: "Team building made fun",
    people: "Up to 25 people",
    includes: [
      "Private rink rental",
      "Team activities",
      "Catering options",
      "Professional photos",
      "4-hour access",
    ],
  },
];

const membershipBenefits = [
  "20% discount on all sessions",
  "Priority event booking",
  "Free equipment upgrades",
  "Monthly member-only events",
  "Bring-a-friend discounts",
  "Extended session times",
];

export default function Pricing() {
  return (
    <SectionWrapper id="pricing">
      <SectionTitle
        title="Choose Your Skating Experience"
        subtitle="Flexible pricing options for every budget and occasion"
      />

      {/* Main Pricing Cards */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {pricingPlans.map((plan, index) => {
          const Icon = plan.icon;
          const isPopular = plan.popular;

          return (
            <MotionCard
              key={index}
              delay={index * 0.1}
              className={`relative rounded-2xl border-2 p-8 ${
                isPopular
                  ? "border-rose-500 bg-gradient-to-br from-rose-50 to-pink-50"
                  : "border-gray-200 bg-white"
              } hover:shadow-xl transition-all duration-300 ${
                isPopular ? "scale-105 lg:scale-110" : ""
              }`}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    plan.color === "rose"
                      ? "bg-gradient-to-r from-rose-500 to-pink-600"
                      : plan.color === "purple"
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                      : "bg-gradient-to-r from-gray-500 to-gray-600"
                  }`}
                >
                  <Icon className="text-white" size={24} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    KES {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <Check
                      className={`mr-3 flex-shrink-0 ${
                        isPopular ? "text-rose-500" : "text-green-500"
                      }`}
                      size={16}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <MotionButton
                className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${
                  isPopular
                    ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-lg"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Book Now
              </MotionButton>
            </MotionCard>
          );
        })}
      </div>

      {/* Group Packages Section */}
      <MotionDiv className="mb-16" delay={0.4}>
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Group Packages
          </h3>
          <p className="text-lg text-gray-600">
            Special rates for groups, parties, and corporate events
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {groupPackages.map((pkg, index) => (
            <MotionCard
              key={index}
              delay={0.5 + index * 0.1}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {pkg.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    KES {pkg.price}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-full px-4 py-2 inline-block">
                  <Users className="inline mr-2" size={16} />
                  <span className="text-sm font-medium text-gray-700">
                    {pkg.people}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.includes.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-sm">
                    <Check
                      className="mr-3 text-green-500 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <MotionButton className="w-full py-3 rounded-full font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg transition-all duration-300">
                Get Quote
              </MotionButton>
            </MotionCard>
          ))}
        </div>
      </MotionDiv>

      {/* Membership Benefits */}
      <MotionDiv
        className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white"
        delay={0.8}
      >
        <div className="text-center mb-8">
          <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-3xl font-bold mb-4">Become a Member</h3>
          <p className="text-lg text-purple-100 mb-6">
            Join our exclusive membership program and enjoy premium benefits
          </p>
          <div className="mb-6">
            <span className="text-4xl font-bold">KES 5,000</span>
            <span className="text-purple-200 ml-2">annual membership</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {membershipBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center">
              <Check className="mr-3 text-yellow-300 flex-shrink-0" size={20} />
              <span className="text-purple-100">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <MotionButton className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300">
            Join Membership
          </MotionButton>
        </div>
      </MotionDiv>

      {/* Call to Action */}
      <MotionDiv className="text-center mt-16" delay={1.0}>
        <div className="bg-gray-50 rounded-2xl p-8">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-rose-500" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Roll?
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Book your skating session today and experience the thrill of roller
            skating at our premium facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MotionButton className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-300">
              Book Online
            </MotionButton>
            <a href="tel:+254794909991">
              <MotionButton className="border-2 border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-full hover:border-gray-400 transition-all duration-300">
                Call Us: +254 794 909 991
              </MotionButton>
            </a>
          </div>
        </div>
      </MotionDiv>
    </SectionWrapper>
  );
}
