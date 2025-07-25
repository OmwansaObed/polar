export const addOns = [
  {
    id: "photography",
    name: "Professional Photography",
    price: 500,
    description: "Capture your skating memories",
  },
  {
    id: "refreshments",
    name: "Refreshment Package",
    price: 300,
    description: "Drinks and snacks for all participants",
  },
  {
    id: "extended-time",
    name: "Extended Session (+1 hour)",
    price: 400,
    description: "Add an extra hour to your session",
  },
  {
    id: "premium-skates",
    name: "Premium Skate Upgrade",
    price: 200,
    description: "High-performance skating equipment",
  },
];

// scroll to top
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
