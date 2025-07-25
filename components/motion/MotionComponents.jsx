// Section wrapper with consistent styling
export const SectionWrapper = ({
  children,
  id,
  className = "",
  dark = false,
}) => (
  <div
    id={id}
    className={`py-16 md:py-24 ${
      dark ? "bg-gray-900" : "bg-white"
    } ${className}`}
  >
    <div className="max-w-7xl mx-auto px-4 lg:px-6">{children}</div>
  </div>
);

// Section title component
export const SectionTitle = ({
  title,
  subtitle,
  dark = false,
  centered = true,
}) => (
  <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
    <p
      as="h2"
      className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
        dark ? "text-white" : "text-gray-900"
      }`}
    >
      {title}
    </p>
    {subtitle && (
      <p
        className={`text-lg md:text-xl max-w-3xl ${centered ? "mx-auto" : ""} ${
          dark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);
