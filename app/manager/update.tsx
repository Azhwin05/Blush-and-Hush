import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function ManagerUpdateScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <View className="flex-row justify-between items-center px-6 pt-14 pb-4 bg-white shadow-sm">
                <Pressable onPress={() => router.replace("/manager")}>
                    <Text className="font-sans text-[#162C3E] font-medium text-base">Cancel</Text>
                </Pressable>
                <Text className="font-serif text-xl text-[#162C3E] font-bold">New Update</Text>
                <Pressable onPress={() => router.replace("/manager")}>
                    <Text className="font-sans text-[#162C3E] font-medium text-base">Save</Text>
                </Pressable>
            </View>

            <ScrollView className="flex-1 px-6 pt-6">
                {/* Image Upload */}
                <View className="bg-[#E5E5E5] h-48 rounded-2xl items-center justify-center mb-6 border-2 border-dashed border-gray-400">
                    <View className="bg-[#162C3E] w-12 h-12 rounded-full items-center justify-center mb-3">
                        <Feather name="plus" size={24} color="white" />
                    </View>
                    <Text className="font-sans text-[#162C3E] font-medium">Tap to add photos</Text>
                    <Text className="font-sans text-gray-500 text-xs">Up to 6 photos</Text>
                </View>

                {/* Fields */}
                <View className="gap-4">
                    <TextInput
                        placeholder="Short Title"
                        placeholderTextColor="#9CA3AF"
                        className="bg-[#E5E5E5] p-4 rounded-xl font-sans text-[#162C3E]"
                    />

                    <Pressable className="bg-[#E5E5E5] p-4 rounded-xl flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                            <Feather name="calendar" size={20} color="#162C3E" />
                            <Text className="font-sans text-[#162C3E]">Thursday, June 19, 2025</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9CA3AF" />
                    </Pressable>

                    <TextInput
                        placeholder="Description"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={6}
                        className="bg-[#E5E5E5] p-4 rounded-xl font-sans text-[#162C3E] h-40"
                        textAlignVertical="top"
                    />
                </View>
            </ScrollView>
        </View>
    );
}
