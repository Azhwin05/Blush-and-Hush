import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, Text, View } from "react-native";

type Update = {
    id: string;
    title: string;
    description: string;
    date: string;
    images: string[];
};

export default function ClientUpdateDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [update, setUpdate] = useState<Update | null>(null);
    const [loading, setLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchUpdateDetails();
        }
    }, [id]);

    const fetchUpdateDetails = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("updates")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error("Error fetching update details:", error);
            } else {
                setUpdate(data);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#F5F5F5]">
                <ActivityIndicator size="large" color="#162C3E" />
            </View>
        );
    }

    if (!update) {
        return (
            <View className="flex-1 justify-center items-center bg-[#F5F5F5]">
                <Text className="font-sans text-gray-500">Update not found.</Text>
                <Pressable onPress={() => router.back()} className="mt-4">
                    <Text className="font-sans text-[#162C3E] font-medium">Go Back</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="flex-row items-center px-6 pt-14 pb-4 bg-white shadow-sm z-10">
                <Pressable onPress={() => router.back()} className="mr-4">
                    <Feather name="arrow-left" size={24} color="#162C3E" />
                </Pressable>
                <Text className="font-serif text-xl text-[#162C3E] font-bold flex-1" numberOfLines={1}>
                    {update.title || "Update Details"}
                </Text>
            </View>

            <ScrollView className="flex-1 px-6 pt-6">
                <Text className="font-sans text-sm text-gray-500 mb-2">
                    {new Date(update.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </Text>

                <Text className="font-sans text-base text-[#162C3E] leading-6 mb-6">
                    {update.description}
                </Text>

                {update.images && update.images.length > 0 && (
                    <View className="gap-4 mb-10">
                        <Text className="font-sans font-bold text-[#162C3E]">Attached Images</Text>
                        <View className="flex-row flex-wrap gap-3">
                            {update.images.map((img, index) => (
                                <Pressable key={index} onPress={() => setPreviewImage(img)}>
                                    <Image
                                        source={{ uri: img }}
                                        className="w-[100px] h-[100px] rounded-xl bg-gray-300"
                                    />
                                </Pressable>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Image Preview Modal */}
            <Modal visible={!!previewImage} transparent={true} animationType="fade">
                <View className="flex-1 bg-black/90 justify-center items-center relative">
                    <Pressable
                        onPress={() => setPreviewImage(null)}
                        className="absolute top-12 right-6 z-20 p-2 bg-white/20 rounded-full"
                    >
                        <Feather name="x" size={24} color="white" />
                    </Pressable>

                    {previewImage && (
                        <Image
                            source={{ uri: previewImage }}
                            className="w-full h-full"
                            resizeMode="contain"
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
}
