import { Calendar, Clock, Users, MapPin, Star, ArrowRight } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "80s Retro Skate Night",
    date: "July 25, 2025",
    time: "7:00 PM - 10:00 PM",
    image: "/api/placeholder/400/250",
    category: "Special Event",
    attendees: 45,
    maxAttendees: 60,
    description:
      "Get groovy with our 80s themed skating night! Come dressed in your best retro outfit and skate to classic hits.",
    price: "KES 800",
    featured: true,
  },
  {
    id: 2,
    title: "Family Fun Sunday",
    date: "July 27, 2025",
    time: "2:00 PM - 6:00 PM",
    image: "/api/placeholder/400/250",
    category: "Family Event",
    attendees: 32,
    maxAttendees: 80,
    description:
      "Perfect for families! Special rates for kids under 12 and beginner-friendly activities.",
    price: "KES 500",
  },
  {
    id: 3,
    title: "Speed Skating Competition",
    date: "August 2, 2025",
    time: "6:00 PM - 9:00 PM",
    image: "/api/placeholder/400/250",
    category: "Competition",
    attendees: 28,
    maxAttendees: 40,
    description:
      "Test your skills against other speed demons! Prizes for top 3 finishers in each category.",
    price: "KES 1,200",
  },
  {
    id: 4,
    title: "Beginner's Workshop",
    date: "August 5, 2025",
    time: "10:00 AM - 12:00 PM",
    image: "/api/placeholder/400/250",
    category: "Learning",
    attendees: 15,
    maxAttendees: 25,
    description:
      "New to skating? Join our comprehensive beginner's workshop with certified instructors.",
    price: "KES 1,000",
  },
];

const eventTypes = [
  {
    name: "Themed Nights",
    description:
      "Monthly themed events with music, costumes, and special atmospheres",
    icon: "🎭",
  },
  {
    name: "Family Days",
    description:
      "Special family-friendly sessions with reduced rates for children",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    name: "Competitions",
    description:
      "Speed skating, artistic, and fun competitions for all skill levels",
    icon: "🏆",
  },
  {
    name: "Workshops",
    description: "Learn new skills with our professional skating instructors",
    icon: "📚",
  },
  {
    name: "Private Parties",
    description:
      "Book the rink for birthdays, corporate events, and celebrations",
    icon: "🎉",
  },
  {
    name: "Adult Nights",
    description:
      "21+ exclusive sessions with music, drinks, and mature atmosphere",
    icon: "🍸",
  },
];

// Simple replacements for SectionWrapper, SectionTitle, Card, Button, Div
function SectionWrapper({ id, className, children }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-4xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 text-lg">{subtitle}</p>
    </div>
  );
}
function Card({ className, children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
function Button({ className, children, ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
function Div({ className, children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default function Events() {
  return (
    <SectionWrapper id="events" className="md:py-24 bg-white">
      <SectionTitle
        title="Upcoming Events"
        subtitle="Join the fun! From themed nights to competitions, there's always something exciting happening at Polar club"
      />

      {/* Featured Event */}
      {/* {upcomingEvents[0] && (
        <MotionCard className="mb-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-bl-2xl font-bold">
            FEATURED
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {upcomingEvents[0].category}
                </span>
                <div className="flex items-center text-yellow-300">
                  <Star size={16} className="mr-1" />
                  <span className="text-sm">Featured Event</span>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {upcomingEvents[0].title}
              </h3>
              <p className="text-rose-100 text-lg mb-6">
                {upcomingEvents[0].description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {upcomingEvents[0].date}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {upcomingEvents[0].time}
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  {upcomingEvents[0].attendees}/{upcomingEvents[0].maxAttendees}{" "}
                  going
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  {upcomingEvents[0].price}
                </div>
              </div>

              <MotionButton className="bg-white text-rose-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Register Now
              </MotionButton>
            </div>

            <div className="relative">
              <img
                src={upcomingEvents[0].image}
                alt={upcomingEvents[0].title}
                className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </MotionCard>
      )} */}

      {/* Other Events Grid */}
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {upcomingEvents.slice(1).map((event, index) => (
          <MotionCard
            key={event.id}
            delay={index * 0.1}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {event.price}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <Users size={14} className="mr-2" />
                  {event.attendees}/{event.maxAttendees} registered
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                  <div
                    className="bg-gradient-to-r from-rose-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(event.attendees / event.maxAttendees) * 100}%`,
                    }}
                  ></div>
                </div>
                <button className="text-rose-600 font-semibold flex items-center hover:text-rose-700 transition-colors">
                  Join
                  <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </MotionCard>
        ))}
      </div> */}

      {/* Event Types */}
      <Div className="rounded-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Types of Events Participate In
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            From casual family fun to competitive skating, we create memorable
            experiences for every occasion
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventTypes.map((type, index) => (
            <Card
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-rose-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{type.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {type.name}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {type.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300">
            View All Events
          </Button>
        </div>
      </Div>
    </SectionWrapper>
  );
}
