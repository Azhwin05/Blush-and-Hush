import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";

export default function LandingScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <StatusBar style="dark" />
            <View className="items-center mb-8">
                <Text className="font-serif text-4xl text-accent mb-2">Blush & Hush</Text>
                <Text className="font-sans text-lg text-text tracking-widest">WORKS!</Text>
            </View>

            <View className="gap-4 w-full px-8">
                <Link href="/auth/login" asChild>
                    <Pressable className="bg-primary p-4 rounded-2xl items-center shadow-lg active:opacity-80">
                        <Text className="font-sans font-semibold text-white">Login</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}
