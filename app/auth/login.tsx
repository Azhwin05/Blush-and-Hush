import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert("Login Failed", error.message);
            setLoading(false);
        }
        // Redirect is handled by AuthProvider in _layout.tsx
    };

    return (
        <View className="flex-1 bg-background">
            <StatusBar style="dark" />
            <View className="flex-1 justify-center px-8">
                <View className="items-center mb-12">
                    <Text className="font-serif text-4xl text-primary mb-2">BLUSH &</Text>
                    <Text className="font-serif text-4xl text-primary">HUSH</Text>
                    <Text className="font-sans text-xs text-muted mt-2 tracking-[0.2em] uppercase">Live in Interior</Text>
                </View>

                <View className="gap-4">
                    <Text className="font-serif text-3xl text-primary mb-4">Login</Text>

                    <View className="bg-secondary/30 rounded-xl p-4">
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#6B7280"
                            className="font-sans text-primary text-base"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    <View className="bg-secondary/30 rounded-xl p-4">
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#6B7280"
                            className="font-sans text-primary text-base"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <Pressable
                        onPress={handleLogin}
                        disabled={loading}
                        className={`bg-primary p-4 rounded-xl items-center mt-4 active:opacity-90 ${loading ? "opacity-70" : ""}`}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="font-sans font-semibold text-white text-lg">Login</Text>
                        )}
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
