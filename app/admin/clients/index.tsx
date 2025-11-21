import { Feather } from "@expo/vector-icons";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

const CLIENTS = [
    { id: "1", name: "SMS Healthcare", date: "01 June, 2025" },
    { id: "2", name: "XO Agency", date: "01 June, 2025" },
];

export default function ClientsScreen() {
    return (
        <View className="flex-1 bg-[#F5F5F5] px-6 pt-14">
            <Text className="font-serif text-3xl text-[#162C3E] font-bold mb-6">Clients</Text>

            {/* Search */}
            <View className="bg-[#E5E5E5] rounded-xl p-3 flex-row items-center mb-6">
                <Feather name="search" size={20} color="#9CA3AF" className="mr-2" />
                <TextInput
                    placeholder="Search Clients"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 font-sans text-[#162C3E]"
                />
                <Feather name="mic" size={20} color="#9CA3AF" />
            </View>

            {/* List */}
            <FlatList
                data={CLIENTS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable className="bg-[#E5E5E5] p-5 rounded-2xl mb-4 active:opacity-90 flex-row items-center justify-between">
                        <View>
                            <Text className="font-serif text-xl text-[#162C3E] font-bold mb-1">{item.name}</Text>
                            <Text className="font-sans text-sm text-[#162C3E]">Date Added: {item.date}</Text>
                        </View>
                        <Feather name="chevron-right" size={24} color="#162C3E" />
                    </Pressable>
                )}
            />
        </View>
    );
}
