import { AuthProvider, useAuth } from "@/contexts/AuthProvider";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold
} from "@expo-google-fonts/playfair-display";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "../global.css";

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { session, loading, userRole } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";
    const inAdminGroup = segments[0] === "admin";
    const inManagerGroup = segments[0] === "manager";
    const inClientGroup = segments[0] === "client";

    if (!session) {
      // If not logged in and not in auth group, redirect to login
      // Also allow landing page (index)
      if (segments.length > 0 && segments[0] !== "index" && !inAuthGroup) {
        router.replace("/auth/login");
      }
    } else if (userRole) {
      // If logged in, redirect to appropriate dashboard if on login or landing
      if (inAuthGroup || segments.length === 0 || segments[0] === "index") {
        if (userRole === "admin") router.replace("/admin");
        else if (userRole === "manager") router.replace("/manager");
        else if (userRole === "client") router.replace("/client");
      }
    }
  }, [session, loading, userRole, segments]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#162C3E" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
