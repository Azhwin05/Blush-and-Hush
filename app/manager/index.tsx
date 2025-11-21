import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ManagerDashboard() {
    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <StatusBar style="dark" />
            <ScrollView className="flex-1 px-6 pt-14">
                {/* Header */}
                <View className="flex-row justify-between items-start mb-6">
                    <View>
                        <Text className="font-sans text-xs text-gray-500 tracking-widest uppercase mb-1">Tuesday 21 June</Text>
                        <Text className="font-serif text-2xl text-[#162C3E] font-bold">Good Morning Bob</Text>
                    </View>
                    <Feather name="bell" size={24} color="#162C3E" />
                </View>

                {/* Project Info Card */}
                <View className="bg-[#E5E5E5] p-5 rounded-2xl mb-6">
                    <Text className="font-serif text-xl text-[#162C3E] font-bold mb-3">SMS Healthcare</Text>
                    <View className="gap-1">
                        <Text className="font-sans text-sm text-[#162C3E]">Site Location : Thousand Lights, Chennai</Text>
                        <Text className="font-sans text-sm text-[#162C3E]">Site Manager : Bob</Text>
                        <Text className="font-sans text-sm text-[#162C3E]">Start Date : June 10, 2025</Text>
                        <Text className="font-sans text-sm text-[#162C3E]">Expected Finish Date : June 30, 2025</Text>
                    </View>
                </View>

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
                    <Text className="font-sans text-xs text-[#162C3E] text-center mt-1">65%</Text>
                </View>

                {/* Latest Update */}
                <View className="bg-[#E5E5E5] p-5 rounded-2xl mb-8">
                    <Text className="font-sans font-bold text-[#162C3E] mb-1">Latest Update: Yesterday</Text>
                    <Text className="font-sans text-sm text-[#162C3E] mb-4 leading-5">
                        Wall Plastering Completed, Wiring for electrical devices/lights laid out.
                    </Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3 mb-4">
                        {/* Placeholders for images */}
                        <View className="w-24 h-24 bg-gray-300 rounded-lg" />
                        <View className="w-24 h-24 bg-gray-300 rounded-lg" />
                        <View className="w-24 h-24 bg-gray-300 rounded-lg" />
                    </ScrollView>

                    <Text className="font-sans text-sm text-[#162C3E] font-medium mb-1">Site Location: Chennai</Text>
                    <Text className="font-sans text-xs text-[#162C3E]">Next update in 4 days</Text>
                </View>

                {/* Add Update Button */}
                <Link href="/manager/update" asChild>
                    <Pressable className="bg-[#162C3E] rounded-full py-4 px-6 items-center justify-center mb-8 shadow-lg active:opacity-90 self-center w-2/3">
                        <Text className="font-sans font-semibold text-white text-base">Add Update</Text>
                    </Pressable>
                </Link>

                <View className="h-24" />
            </ScrollView>
        </View>
    );
}
