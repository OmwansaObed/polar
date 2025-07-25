"use client";
import { Star, Award, Users, Heart } from "lucide-react";
import { SectionWrapper, SectionTitle } from "../motion/MotionComponents";
import CountUp from "react-countup";

const features = [
  {
    icon: Star,
    title: "Premium Experience",
    description:
      "State-of-the-art facilities with top-quality roller skates and safety equipment for all skill levels.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Professional skating coaches ready to help beginners learn and experienced skaters perfect their technique.",
  },
  {
    icon: Award,
    title: "Award-Winning Venue",
    description:
      "Recognized as Nairobi's premier roller skating destination with multiple safety and excellence awards.",
  },
  {
    icon: Heart,
    title: "Community Focused",
    description:
      "Building friendships and creating memories through the joy of roller skating in a safe, inclusive environment.",
  },
];

const stats = [
  { number: "2", suffix: "+", label: "Years of Experience" },
  { number: "15", suffix: ",000+", label: "Happy Customers" },
  { number: "50", suffix: "+", label: "Events Participated" },
  { number: "4.9", suffix: "/5", label: "Customer Rating" },
];
const statsCounter = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-[1.03]"
        >
          <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2 flex items-center justify-center">
            {index < 3 ? (
              <CountUp
                start={0}
                end={parseInt(stat.number)}
                duration={3}
                enableScrollSpy
                scrollSpyDelay={200}
                separator=","
              />
            ) : (
              stat.number
            )}
            {stat.suffix && (
              <span className="text-rose-100 ml-1">{stat.suffix}</span>
            )}
          </div>
          <p className="text-rose-50 text-xs md:text-sm font-medium uppercase tracking-wider">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 py-5 gap-12  lg:gap-16 items-center mb-[100px]">
        {/* Content */}
        <div className="space-y-6">
          {/* <div className="inline-block bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-semibold">
            About Polar club
          </div> */}

          <h2 className="text-3xl py-4 text-center md:text-4xl lg:text-5xl font-bold text-gray-900">
            Nairobi's Premier
            <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Skating Destination
            </span>
          </h2>

          <div className="space-y-4 text-gray-600 text-lg leading-relaxed text-center">
            <p>
              For over 8 years, Polar club has been bringing the joy of roller
              skating to Nairobi. What started as a dream to create a safe, fun
              space for skating enthusiasts has grown into the city's most
              beloved recreational destination.
            </p>
            <p>
              Our state-of-the-art facility features smooth, professional-grade
              skating floors, top-quality rental equipment, and a vibrant
              atmosphere that welcomes skaters of all ages and skill levels.
              Whether you're taking your first wobbly steps or perfecting
              advanced tricks, we're here to support your skating journey.
            </p>
          </div>

          <div className="flex gap-4 sm:text-sm md:text-base lg:text-lg flex-wrap justify-center">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold">
              ✨ All Skill Levels Welcome
            </div>
            <div className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-semibold">
              🛡️ Safety First Approach
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://wblgzh4kzr.ufs.sh/f/7tt8vDSbwXgsNUOZ1mIM3KIyV2n8QoEGLmHaks6zedtA4XWb"
                alt="Roller skating fun"
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
              <img
                src="https://wblgzh4kzr.ufs.sh/f/7tt8vDSbwXgs5MSX40ts0ema63BoWy7FZkGwuh1IXCrlM8HP"
                alt="Skating lessons"
                className="w-full h-56 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://wblgzh4kzr.ufs.sh/f/7tt8vDSbwXgsogy5i7IbFLP7ExY3UN4uZmOk8WqBMXQSbT0C"
                alt="Group skating"
                className="w-full h-56 object-cover rounded-xl shadow-lg"
              />
              <img
                src="https://wblgzh4kzr.ufs.sh/f/7tt8vDSbwXgsvuY8JLDC8jNr4fALeRaGnmUqPXbgZu2cYFp1"
                alt="Skating equipment"
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                <Award className="text-white" size={20} />
              </div>
              <div>
                <div className="font-bold text-gray-900">Premium Quality</div>
                <div className="text-sm text-gray-600">Certified Safe</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <SectionTitle
        title="Why Choose Polar club?"
        subtitle="Experience the difference that quality, safety, and passion make"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 ">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Stats Counter */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 md:p-12 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Our Impact in Numbers
          </h3>
          <p className="text-rose-100 text-lg">
            Building Nairobi's skating community one roll at a time
          </p>
        </div>
        {statsCounter()}
      </div>
    </SectionWrapper>
  );
}
