export const colors = {
  // Primary colors
  primary: "#4A90E2",
  primaryDark: "#2E5C99",
  primaryLight: "#7AB8F5",

  // Background colors
  background: "#1E3A5F",
  backgroundLight: "#2E5C99",
  backgroundDark: "#0F1E32",

  // Text colors
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.7)",
  textMuted: "rgba(255, 255, 255, 0.5)",

  // Status colors
  error: "#FF6B6B",
  success: "#4ECDC4",
  warning: "#FFE66D",

  // Card colors
  cardBackground: "rgba(255, 255, 255, 0.15)",
  cardBorder: "rgba(255, 255, 255, 0.2)",
};

export const gradients = {
  // Weather-based gradients
  clear: ["#4A90E2", "#7AB8F5", "#87CEEB"] as const,
  clouds: ["#536976", "#292E49", "#485461"] as const,
  rain: ["#373B44", "#4286f4", "#373B44"] as const,
  thunderstorm: ["#0F2027", "#203A43", "#2C5364"] as const,
  snow: ["#E6DADA", "#274046", "#E6DADA"] as const,
  mist: ["#606c88", "#3f4c6b", "#606c88"] as const,
  night: ["#0F2027", "#203A43", "#2C5364"] as const,
  default: ["#1E3A5F", "#2E5C99", "#4A90E2"] as const,
};

export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 48,
    giant: 72,
  },

  // Font weights
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  round: 9999,
};

// Map weather condition to gradient
export const getWeatherGradient = (
  weatherMain: string,
  isNight: boolean = false,
) => {
  if (isNight) return gradients.night;

  const condition = weatherMain.toLowerCase();

  switch (condition) {
    case "clear":
      return gradients.clear;
    case "clouds":
      return gradients.clouds;
    case "rain":
    case "drizzle":
      return gradients.rain;
    case "thunderstorm":
      return gradients.thunderstorm;
    case "snow":
      return gradients.snow;
    case "mist":
    case "fog":
    case "haze":
    case "smoke":
    case "dust":
    case "sand":
    case "ash":
    case "squall":
    case "tornado":
      return gradients.mist;
    default:
      return gradients.default;
  }
};
