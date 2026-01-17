import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, Droplets, Wind } from "lucide-react-native";
import { WeatherData } from "../types/weather";
import { getWeatherIconUrl } from "../services/weatherService";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  getWeatherGradient,
} from "../styles/theme";

interface WeatherCardProps {
  weatherData: WeatherData;
  onPress: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  onPress,
}) => {
  const { name, main, weather, wind, sys } = weatherData;
  const currentWeather = weather[0];
  const isNight =
    Date.now() / 1000 < sys.sunrise || Date.now() / 1000 > sys.sunset;
  const gradientColors = getWeatherGradient(currentWeather.main, isNight);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={gradientColors}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* City Name */}
        <View style={styles.locationRow}>
          <MapPin size={20} color={colors.textPrimary} />
          <Text style={styles.cityName}>{name}</Text>
          <Text style={styles.country}>{sys.country}</Text>
        </View>

        {/* Temperature and Icon */}
        <View style={styles.mainRow}>
          <View style={styles.tempContainer}>
            <Text style={styles.temperature}>{Math.round(main.temp)}°</Text>
            <Text style={styles.feelsLike}>
              Cảm giác như {Math.round(main.feels_like)}°
            </Text>
          </View>
          <Image
            source={{ uri: getWeatherIconUrl(currentWeather.icon) }}
            style={styles.weatherIcon}
          />
        </View>

        {/* Weather Description */}
        <Text style={styles.description}>
          {currentWeather.description.charAt(0).toUpperCase() +
            currentWeather.description.slice(1)}
        </Text>

        {/* Additional Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Droplets size={18} color={colors.textSecondary} />
            <Text style={styles.infoText}>{main.humidity}%</Text>
          </View>
          <View style={styles.infoItem}>
            <Wind size={18} color={colors.textSecondary} />
            <Text style={styles.infoText}>{wind.speed} m/s</Text>
          </View>
        </View>

        {/* Tap hint */}
        <Text style={styles.tapHint}>Nhấn để xem chi tiết →</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  cityName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  country: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tempContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: typography.fontSize.giant,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  feelsLike: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  description: {
    fontSize: typography.fontSize.lg,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    marginTop: spacing.md,
    gap: spacing.lg,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  infoText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  tapHint: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    textAlign: "right",
    marginTop: spacing.md,
  },
});
