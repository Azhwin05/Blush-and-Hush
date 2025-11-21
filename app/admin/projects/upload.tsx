import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function UploadDocumentScreen() {
    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <Stack.Screen options={{ title: "Upload Document", headerBackTitle: "Back" }} />
            <ScrollView className="flex-1 px-6 pt-8">
                <Text className="font-serif text-3xl text-[#162C3E] font-bold mb-8">Upload Document</Text>

                {/* Upload Area */}
                <View className="bg-[#E5E5E5] h-48 rounded-2xl items-center justify-center mb-6 border-2 border-dashed border-gray-300">
                    <Feather name="file-plus" size={48} color="#162C3E" />
                </View>

                <View className="gap-6 mb-6">
                    <TextInput
                        placeholder="Enter Document Detail"
                        placeholderTextColor="#9CA3AF"
                        className="bg-[#E5E5E5] p-4 rounded-xl font-sans text-[#162C3E]"
                    />
                </View>

            </ScrollView>
        </View>
    );
}
