"use client";
import { useState } from "react";
import {
  X,
  Play,
  Heart,
  Share2,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  SectionWrapper,
  SectionTitle,
  MotionDiv,
  MotionCard,
  MotionImage,
  fadeInUp,
} from "../motion/MotionComponents";

const categories = [
  "All",
  "Events",
  "Skating",
  "Kids",
  "Competitions",
  "Facilities",
];

const galleryItems = [
  {
    id: 1,
    type: "image",
    src: "/api/placeholder/400/300",
    category: "Events",
    title: "80s Retro Night",
    description: "Amazing turnout for our themed skating event",
  },
  {
    id: 2,
    type: "video",
    src: "/api/placeholder/400/300",
    videoSrc: "/api/placeholder/video",
    category: "Skating",
    title: "Speed Skating Demo",
    description: "Professional speed skating demonstration",
  },
  {
    id: 3,
    type: "image",
    src: "/api/placeholder/400/300",
    category: "Kids",
    title: "Kids Learning Session",
    description: "Children's skating workshop in action",
  },
  {
    id: 4,
    type: "image",
    src: "/api/placeholder/400/300",
    category: "Facilities",
    title: "Main Skating Rink",
    description: "Our spacious main skating area",
  },
  {
    id: 5,
    type: "image",
    src: "/api/placeholder/400/300",
    category: "Competitions",
    title: "Annual Championship",
    description: "Intense competition moments",
  },
  {
    id: 6,
    type: "video",
    src: "/api/placeholder/400/300",
    videoSrc: "/api/placeholder/video",
    category: "Events",
    title: "Birthday Party",
    description: "Special birthday celebration",
  },
  {
    id: 7,
    type: "image",
    src: "/api/placeholder/400/300",
    category: "Skating",
    title: "Advanced Techniques",
    description: "Learning advanced skating moves",
  },
  {
    id: 8,
    type: "image",
    src: "/api/placeholder/400/300",
    category: "Facilities",
    title: "Rental Equipment",
    description: "High-quality skating equipment",
  },
  {
    id: 9,
    type: "image",
    src: "/api/placeholder/400/300",
    category: "Kids",
    title: "Family Fun Day",
    description: "Families enjoying skating together",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(new Set());

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
    );
  };

  const toggleLike = (id) => {
    const newLiked = new Set(liked);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLiked(newLiked);
  };

  return (
    <SectionWrapper id="gallery" className="bg-gray-50">
      <SectionTitle
        title="Gallery"
        subtitle="Capturing the joy, excitement, and memorable moments at Polar club"
      />

      {/* Category Filter */}
      <MotionDiv
        variant={fadeInUp}
        className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </MotionDiv>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <MotionCard
            key={item.id}
            delay={index * 0.1}
            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Video indicator */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <Play className="text-rose-600" size={24} />
                  </div>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                  className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-300 ${
                    liked.has(item.id)
                      ? "bg-rose-500 text-white"
                      : "bg-white/80 text-gray-700 hover:bg-white"
                  }`}
                >
                  <Heart
                    size={16}
                    className={liked.has(item.id) ? "fill-current" : ""}
                  />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Share functionality
                  }}
                  className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white backdrop-blur-sm transition-colors duration-300"
                >
                  <Share2 size={16} />
                </button>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </span>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight size={48} />
            </button>

            {/* Image */}
            <img
              src={filteredItems[currentImage]?.src}
              alt={filteredItems[currentImage]?.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
              <h3 className="text-xl font-bold mb-2">
                {filteredItems[currentImage]?.title}
              </h3>
              <p className="text-gray-200">
                {filteredItems[currentImage]?.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-300">
                  {currentImage + 1} of {filteredItems.length}
                </span>

                <div className="flex space-x-3">
                  <button
                    onClick={() => toggleLike(filteredItems[currentImage]?.id)}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      liked.has(filteredItems[currentImage]?.id)
                        ? "bg-rose-500 text-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <Heart
                      size={18}
                      className={
                        liked.has(filteredItems[currentImage]?.id)
                          ? "fill-current"
                          : ""
                      }
                    />
                  </button>

                  <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-300">
                    <Download size={18} />
                  </button>

                  <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-300">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to action */}
      <MotionDiv variant={fadeInUp} className="text-center mt-16">
        <div className="bg-white rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Want to be featured in our gallery?
          </h3>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            Share your amazing skating moments with us! Tag @PolarclubNairobi in
            your posts and use #PolarclubNairobi to get featured.
          </p>
          <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300">
            Follow Us on Instagram
          </button>
        </div>
      </MotionDiv>
    </SectionWrapper>
  );
}
