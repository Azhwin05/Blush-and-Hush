import { Feather } from "@expo/vector-icons";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

const MANAGERS = [
    { id: "1", name: "Bob", assignedTo: "SMS Healthcare" },
    { id: "2", name: "Deepika", assignedTo: "XO Agency" },
];

export default function ManagersScreen() {
    return (
        <View className="flex-1 bg-[#F5F5F5] px-6 pt-14">
            <Text className="font-serif text-3xl text-[#162C3E] font-bold mb-6">Managers</Text>

            {/* Search */}
            <View className="bg-[#E5E5E5] rounded-xl p-3 flex-row items-center mb-6">
                <Feather name="search" size={20} color="#9CA3AF" className="mr-2" />
                <TextInput
                    placeholder="Search Managers"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 font-sans text-[#162C3E]"
                />
                <Feather name="mic" size={20} color="#9CA3AF" />
            </View>

            {/* Filter Tabs */}
            <View className="flex-row gap-3 mb-6">
                <FilterTab label="All" />
                <FilterTab label="Assigned" active />
                <FilterTab label="Unassigned" />
            </View>

            {/* List */}
            <FlatList
                data={MANAGERS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable className="bg-[#E5E5E5] p-5 rounded-2xl mb-4 active:opacity-90 flex-row items-center justify-between">
                        <View>
                            <Text className="font-serif text-xl text-[#162C3E] font-bold mb-1">{item.name}</Text>
                            <Text className="font-sans text-sm text-[#162C3E]">Assigned To: {item.assignedTo}</Text>
                        </View>
                        <Feather name="chevron-right" size={24} color="#162C3E" />
                    </Pressable>
                )}
            />

            {/* FAB */}
            <Pressable className="absolute bottom-6 right-6 bg-[#162C3E] w-14 h-14 rounded-full items-center justify-center shadow-lg active:opacity-90">
                <Feather name="plus" size={24} color="white" />
            </Pressable>
        </View>
    );
}

function FilterTab({ label, active }: { label: string, active?: boolean }) {
    return (
        <Pressable className={`px-5 py-2 rounded-lg ${active ? 'bg-[#162C3E]' : 'bg-[#D9D9D9]'}`}>
            <Text className={`font-sans text-sm font-medium ${active ? 'text-white' : 'text-[#162C3E]'}`}>{label}</Text>
        </Pressable>
    );
}
