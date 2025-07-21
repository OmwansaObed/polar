import { forwardRef } from "react";

const motion = {
  div: forwardRef(({ children, className, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )),
  section: forwardRef(({ children, className, ...props }, ref) => (
    <section ref={ref} className={className} {...props}>
      {children}
    </section>
  )),
  h2: forwardRef(({ children, className, ...props }, ref) => (
    <h2 ref={ref} className={className} {...props}>
      {children}
    </h2>
  )),
  h3: forwardRef(({ children, className, ...props }, ref) => (
    <h3 ref={ref} className={className} {...props}>
      {children}
    </h3>
  )),
  p: forwardRef(({ children, className, ...props }, ref) => (
    <p ref={ref} className={className} {...props}>
      {children}
    </p>
  )),
  button: forwardRef(({ children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={`${className} hover:scale-105 active:scale-95 transition-transform`}
      {...props}
    >
      {children}
    </button>
  )),
  img: forwardRef(({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={`${className} hover:scale-105 transition-transform`}
      {...props}
    />
  )),
};

// Animation Variants
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

// Reusable Motion Components
export const MotionDiv = ({
  children,
  variant = fadeInUp,
  className = "",
  ...props
}) => (
  <motion.div
    initial={variant.initial}
    whileinview={variant.animate}
    viewport={{ once: true, margin: "-100px" }}
    transition={variant.transition}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const MotionSection = ({ children, className = "", ...props }) => (
  <motion.section
    initial="initial"
    whileinview="animate"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer}
    className={className}
    {...props}
  >
    {children}
  </motion.section>
);

export const MotionText = ({
  children,
  variant = fadeInUp,
  as = "p",
  className = "",
  ...props
}) => {
  const Component = motion[as] || motion.p;

  return (
    <Component
      initial={variant.initial}
      whileinview={variant.animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={variant.transition}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

export const MotionButton = ({ children, className = "", ...props }) => (
  <motion.button
    initial={scaleIn.initial}
    whileinview={scaleIn.animate}
    whilehover={{ scale: 1.05 }}
    whiletap={{ scale: 0.95 }}
    viewport={{ once: true }}
    transition={scaleIn.transition}
    className={className}
    {...props}
  >
    {children}
  </motion.button>
);

export const MotionCard = ({
  children,
  delay = 0,
  className = "",
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileinview={{ opacity: 1, y: 0 }}
    whilehover={{ y: -5 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const MotionImage = ({ className = "", ...props }) => (
  <motion.img
    initial={{ opacity: 0, scale: 0.8 }}
    whileinview={{ opacity: 1, scale: 1 }}
    whilehover={{ scale: 1.05 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={className}
    {...props}
  />
);

// Section wrapper with consistent styling
export const SectionWrapper = ({
  children,
  id,
  className = "",
  dark = false,
}) => (
  <MotionSection
    id={id}
    className={`py-16 md:py-24 ${
      dark ? "bg-gray-900" : "bg-white"
    } ${className}`}
  >
    <div className="max-w-7xl mx-auto px-4 lg:px-6">{children}</div>
  </MotionSection>
);

// Section title component
export const SectionTitle = ({
  title,
  subtitle,
  dark = false,
  centered = true,
}) => (
  <div className={`mb-12  md:mb-16 ${centered ? "text-center" : ""}`}>
    <MotionText
      as="h2"
      variant={fadeInUp}
      className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
        dark ? "text-white" : "text-gray-900"
      }`}
    >
      {title}
    </MotionText>
    {subtitle && (
      <MotionText
        variant={fadeInUp}
        className={`text-lg md:text-xl max-w-3xl ${centered ? "mx-auto" : ""} ${
          dark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {subtitle}
      </MotionText>
    )}
  </div>
);
