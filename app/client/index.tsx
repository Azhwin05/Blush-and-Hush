import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ClientDashboard() {
    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <StatusBar style="dark" />
            <ScrollView className="flex-1 px-6 pt-14">
                {/* Header */}
                <View className="flex-row justify-between items-start mb-6">
                    <View>
                        <Text className="font-sans text-xs text-gray-500 tracking-widest uppercase mb-1">Tuesday 21 June</Text>
                        <Text className="font-serif text-2xl text-[#162C3E] font-bold">Good Morning Achu</Text>
                    </View>
                    <Feather name="bell" size={24} color="#162C3E" />
                </View>

                {/* Latest Update Card */}
                <Link href="/client/update" asChild>
                    <Pressable className="bg-[#E5E5E5] p-5 rounded-2xl mb-6 active:opacity-90">
                        <Text className="font-sans font-bold text-[#162C3E] mb-1">Latest Update: Yesterday</Text>
                        <Text className="font-sans text-sm text-[#162C3E] mb-4 leading-5">
                            Wall Plastering Completed, Wiring for electrical devices/lights laid out.
                        </Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3 mb-4">
                            <View className="w-24 h-24 bg-gray-300 rounded-lg" />
                            <View className="w-24 h-24 bg-gray-300 rounded-lg" />
                            <View className="w-24 h-24 bg-gray-300 rounded-lg" />
                        </ScrollView>

                        <Text className="font-sans text-sm text-[#162C3E] font-medium mb-1">Site Location: Chennai</Text>
                        <Text className="font-sans text-xs text-[#162C3E]">Next update in 4 days</Text>
                    </Pressable>
                </Link>

                {/* Overall Progress */}
                <View className="bg-[#E5E5E5] p-5 rounded-2xl mb-6">
                    <Text className="font-sans font-bold text-[#162C3E] mb-2">Overall Progress</Text>
                    <View className="flex-row gap-1 h-3 rounded-full overflow-hidden mb-1">
                        <View className="flex-1 bg-[#22C55E]" />
                        <View className="flex-1 bg-[#22C55E]" />
                        <View className="flex-1 bg-[#22C55E]" />
                        <View className="flex-1 bg-white" />
                        <View className="flex-1 bg-white" />
                    </View>
                    <Text className="font-sans text-xs text-[#162C3E] text-center mt-1">69%</Text>
                </View>

                <View className="h-24" />
            </ScrollView>
        </View>
    );
}
