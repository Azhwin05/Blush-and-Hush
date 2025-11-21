import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function NewProjectScreen() {
    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <Stack.Screen options={{ title: "New Project", headerBackTitle: "Back" }} />
            <ScrollView className="flex-1 px-6 pt-8">
                <Text className="font-serif text-3xl text-[#162C3E] font-bold mb-8">New Project</Text>

                <View className="gap-6 mb-12">
                    <InputGroup label="Project Name" />
                    <InputGroup label="Site Location" />
                    <InputGroup label="Client" />

                    {/* Site Manager Dropdown Placeholder */}
                    <View>
                        <View className="bg-[#E5E5E5] p-4 rounded-xl flex-row justify-between items-center">
                            <Text className="font-sans text-[#9CA3AF]">Site Manager</Text>
                            <Feather name="chevron-down" size={20} color="#162C3E" />
                        </View>
                    </View>
                </View>

                <View className="flex-row gap-4">
                    <Pressable
                        onPress={() => router.back()}
                        className="flex-1 border border-[#162C3E] py-4 rounded-full items-center active:opacity-50"
                    >
                        <Text className="font-sans font-medium text-[#162C3E]">Cancel</Text>
                    </Pressable>
                    <Pressable className="flex-1 bg-[#162C3E] py-4 rounded-full items-center active:opacity-90 shadow-lg">
                        <Text className="font-sans font-medium text-white">Next</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

function InputGroup({ label }: { label: string }) {
    return (
        <View>
            <TextInput
                placeholder={label}
                placeholderTextColor="#9CA3AF"
                className="bg-[#E5E5E5] p-4 rounded-xl font-sans text-[#162C3E]"
            />
        </View>
    );
}
