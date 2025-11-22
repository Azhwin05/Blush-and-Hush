import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, View } from "react-native";

type Manager = {
    id: string;
    full_name: string;
    avatar_url: string | null;
    projects: { name: string }[];
};

export default function ManagersScreen() {
    const [managers, setManagers] = useState<Manager[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<"All" | "Assigned" | "Unassigned">("All");

    useFocusEffect(
        useCallback(() => {
            fetchManagers();
        }, [])
    );

    const fetchManagers = async () => {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select(`
                    *,
                    projects:projects!manager_id(name)
                `)
                .eq("role", "manager")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setManagers(data as any || []);
        } catch (error) {
            console.error("Error fetching managers:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredManagers = managers.filter(manager => {
        const matchesSearch = manager.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
        const isAssigned = manager.projects && manager.projects.length > 0;

        if (filter === "Assigned") return matchesSearch && isAssigned;
        if (filter === "Unassigned") return matchesSearch && !isAssigned;
        return matchesSearch;
    });

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#F5F5F5]">
                <ActivityIndicator size="large" color="#162C3E" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#F5F5F5] px-6 pt-14">
            <Text className="font-serif text-3xl text-[#162C3E] font-bold mb-6">Managers</Text>

            {/* Search */}
            <View className="bg-white rounded-xl p-3 flex-row items-center mb-6 shadow-sm">
                <Feather name="search" size={20} color="#9CA3AF" className="mr-2" />
                <TextInput
                    placeholder="Search Managers"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 font-sans text-[#162C3E]"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Filter Tabs */}
            <View className="flex-row gap-3 mb-6">
                <FilterTab label="All" active={filter === "All"} onPress={() => setFilter("All")} />
                <FilterTab label="Assigned" active={filter === "Assigned"} onPress={() => setFilter("Assigned")} />
                <FilterTab label="Unassigned" active={filter === "Unassigned"} onPress={() => setFilter("Unassigned")} />
            </View>

            {/* List */}
            <FlatList
                data={filteredManagers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable className="bg-white p-4 rounded-2xl mb-3 shadow-sm flex-row items-center active:opacity-90">
                        {/* Avatar */}
                        <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center overflow-hidden mr-4 border border-gray-100">
                            {item.avatar_url ? (
                                <Image source={{ uri: item.avatar_url }} className="w-full h-full" />
                            ) : (
                                <Text className="font-serif text-lg text-[#162C3E] font-bold">
                                    {item.full_name?.charAt(0).toUpperCase() || "M"}
                                </Text>
                            )}
                        </View>

                        <View className="flex-1">
                            <Text className="font-serif text-lg text-[#162C3E] font-bold mb-1">{item.full_name || "Unnamed Manager"}</Text>
                            <Text className="font-sans text-xs text-gray-500">
                                {item.projects && item.projects.length > 0
                                    ? `Assigned to: ${item.projects.map(p => p.name).join(", ")}`
                                    : "Unassigned"}
                            </Text>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9CA3AF" />
                    </Pressable>
                )}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500 mt-10 font-sans">No managers found.</Text>
                }
                showsVerticalScrollIndicator={false}
            />

            {/* FAB */}
            <Pressable className="absolute bottom-6 right-6 bg-[#162C3E] w-14 h-14 rounded-full items-center justify-center shadow-lg active:opacity-90">
                <Feather name="plus" size={24} color="white" />
            </Pressable>
        </View>
    );
}

function FilterTab({ label, active, onPress }: { label: string, active?: boolean, onPress: () => void }) {
    return (
        <Pressable onPress={onPress} className={`px-5 py-2 rounded-lg ${active ? 'bg-[#162C3E]' : 'bg-gray-200'}`}>
            <Text className={`font-sans text-sm font-medium ${active ? 'text-white' : 'text-[#162C3E]'}`}>{label}</Text>
        </Pressable>
    );
}
