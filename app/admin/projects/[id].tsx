import { Feather } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ProjectDetailsScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <Stack.Screen options={{ title: "Projects", headerBackTitle: "Back" }} />
            <ScrollView className="flex-1 px-6 pt-4">
                <Text className="font-serif text-xl text-[#162C3E] font-bold mb-4">About</Text>

                {/* Project Info Card */}
                <View className="bg-[#E5E5E5] p-5 rounded-2xl mb-6">
                    <Text className="font-serif text-2xl text-[#162C3E] font-bold mb-2">SMS Healthcare</Text>
                    <Text className="font-sans text-sm text-[#162C3E] mb-1">Site Location : Thousand Lights, Chennai</Text>
                    <Text className="font-sans text-sm text-[#162C3E] mb-1">Site Manager : Bob</Text>
                    <Text className="font-sans text-sm text-[#162C3E] mb-1">Start Date : June 10, 2025</Text>
                    <Text className="font-sans text-sm text-[#162C3E]">Expected Finish Date : June 30, 2025</Text>
                </View>

                {/* Progress */}
                <View className="bg-[#E5E5E5] p-5 rounded-2xl mb-6">
                    <View className="flex-row justify-between mb-2">
                        <Text className="font-sans font-bold text-[#162C3E]">Overall Progress</Text>
                        <Text className="font-sans font-bold text-[#162C3E]">65%</Text>
                    </View>
                    <View className="flex-row gap-1 h-3 rounded-full overflow-hidden">
                        <View className="flex-1 bg-[#22C55E]" />
                        <View className="flex-1 bg-[#22C55E]" />
                        <View className="flex-1 bg-[#22C55E]" />
                        <View className="flex-1 bg-white" />
                        <View className="flex-1 bg-white" />
                    </View>
                </View>

                {/* Latest Update */}
                <View className="mb-6">
                    <Text className="font-serif text-xl text-[#162C3E] font-bold mb-4">Latest Update</Text>
                    <View className="bg-[#E5E5E5] p-5 rounded-2xl">
                        <Text className="font-sans text-[#162C3E] font-bold mb-1">Latest Update: Yesterday</Text>
                        <Text className="font-sans text-sm text-[#162C3E] mb-4">
                            Wall Plastering Completed, Wiring for electrical devices/lights laid out.
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3 mb-2">
                            <View className="w-24 h-24 bg-gray-300 rounded-lg" />
                            <View className="w-24 h-24 bg-gray-300 rounded-lg" />
                            <View className="w-24 h-24 bg-gray-300 rounded-lg" />
                        </ScrollView>
                        <Text className="font-sans text-xs text-[#162C3E] mt-2">Next update in 4 days</Text>
                    </View>
                </View>

                {/* More Actions */}
                <View className="mb-12">
                    <Text className="font-serif text-xl text-[#162C3E] font-bold mb-4">More Actions</Text>
                    <View className="flex-row gap-4 justify-between">
                        <Link href="/admin/projects/upload" asChild>
                            <ActionButton icon="file-text" label="Documents" />
                        </Link>
                        <ActionButton icon="dollar-sign" label="Budget" />
                        <ActionButton icon="message-square" label="Chat" />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const ActionButton = React.forwardRef(({ icon, label, ...props }: { icon: keyof typeof Feather.glyphMap, label: string }, ref: any) => {
    return (
        <Pressable ref={ref} {...props} className="items-center gap-2">
            <View className="w-16 h-16 bg-[#E5E5E5] rounded-2xl items-center justify-center shadow-sm">
                <Feather name={icon} size={24} color="#162C3E" />
            </View>
            <Text className="font-sans text-xs text-[#162C3E] font-medium">{label}</Text>
        </Pressable>
    );
});
