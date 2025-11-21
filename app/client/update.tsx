import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ClientUpdateScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="flex-row items-center px-6 pt-14 pb-4 bg-[#F5F5F5]">
                <Pressable onPress={() => router.back()} className="mr-4">
                    <Feather name="chevron-left" size={24} color="#162C3E" />
                </Pressable>
                <Text className="font-serif text-xl text-[#162C3E] font-bold">Detailed Update</Text>
            </View>

            <ScrollView className="flex-1 px-6 pt-2">
                <View className="bg-[#E5E5E5] p-5 rounded-2xl mb-6">
                    <Text className="font-sans font-bold text-[#162C3E] text-lg mb-1">Updated by: Site Manager</Text>
                    <Text className="font-sans font-bold text-[#162C3E] text-lg mb-6">On June 20,2025</Text>

                    <Text className="font-sans text-sm text-[#162C3E] leading-6 mb-6 text-justify">
                        All wall surfaces have been expertly plastered to create smooth, even finishes ready for painting or wallpaper application. The plastering work includes proper corner alignment and surface preparation to ensure a flawless final appearance.
                        {"\n\n"}
                        Simultaneously, our certified electricians have completed the comprehensive wiring layout for all electrical devices, outlets, and lighting fixtures throughout your space. The electrical conduits have been strategically positioned and secured within the walls, following safety codes and your approved lighting design plan.
                        {"\n\n"}
                        All wire connections have been tested for proper functionality and safety compliance. The next phase will involve final electrical installations and wall finishing work. Your project remains on schedule with these crucial infrastructure elements now complete.
                    </Text>

                    <View className="flex-row gap-4">
                        <View className="flex-1 h-40 bg-gray-300 rounded-xl" />
                        <View className="flex-1 h-40 bg-gray-300 rounded-xl" />
                    </View>
                </View>

                <View className="h-12" />
            </ScrollView>
        </View>
    );
}
