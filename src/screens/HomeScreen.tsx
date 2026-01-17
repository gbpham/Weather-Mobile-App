import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Cloud } from "lucide-react-native";

import { RootStackParamList } from "../types/navigation";
import { WeatherData } from "../types/weather";
import { getCurrentWeather } from "../services/weatherService";
import { SearchInput } from "../components/SearchInput";
import { WeatherCard } from "../components/WeatherCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { colors, typography, spacing, gradients } from "../styles/theme";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<
    "network" | "notFound" | "general"
  >("general");

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    const result = await getCurrentWeather(city);

    setLoading(false);

    if (result.success && result.data) {
      setWeatherData(result.data);
    } else {
      setError(result.error || "Đã xảy ra lỗi");
      // Determine error type for icon
      if (result.error?.includes("kết nối")) {
        setErrorType("network");
      } else if (result.error?.includes("tìm thấy")) {
        setErrorType("notFound");
      } else {
        setErrorType("general");
      }
    }
  };

  const handleCardPress = () => {
    if (weatherData) {
      navigation.navigate("Detail", {
        cityName: weatherData.name,
        weatherData: weatherData,
      });
    }
  };

  return (
    <LinearGradient colors={gradients.default} style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Cloud size={40} color={colors.primaryLight} />
            <Text style={styles.title}>Weather App</Text>
            <Text style={styles.subtitle}>
              Tìm kiếm thời tiết theo thành phố
            </Text>
          </View>

          {/* Search Input */}
          <SearchInput onSearch={handleSearch} />

          {/* Content */}
          <View style={styles.content}>
            {loading && (
              <LoadingSpinner message="Đang tải dữ liệu thời tiết..." />
            )}

            {error && !loading && (
              <ErrorMessage message={error} type={errorType} />
            )}

            {weatherData && !loading && !error && (
              <WeatherCard
                weatherData={weatherData}
                onPress={handleCardPress}
              />
            )}

            {!weatherData && !loading && !error && (
              <View style={styles.placeholder}>
                <Cloud size={80} color={colors.textMuted} />
                <Text style={styles.placeholderText}>
                  Nhập tên thành phố để xem thời tiết
                </Text>
                <Text style={styles.placeholderHint}>
                  Ví dụ: Hanoi, Ho Chi Minh, London, Tokyo
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  content: {
    flex: 1,
    paddingTop: spacing.md,
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xxl,
  },
  placeholderText: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.md,
  },
  placeholderHint: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});
