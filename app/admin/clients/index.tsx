import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, View } from "react-native";

type Client = {
    id: string;
    full_name: string;
    avatar_url: string | null;
    created_at: string;
};

export default function ClientsScreen() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useFocusEffect(
        useCallback(() => {
            fetchClients();
        }, [])
    );

    const fetchClients = async () => {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("role", "client")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setClients(data || []);
        } catch (error) {
            console.error("Error fetching clients:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredClients = clients.filter(client =>
        client.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#F5F5F5]">
                <ActivityIndicator size="large" color="#162C3E" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#F5F5F5] px-6 pt-14">
            <Text className="font-serif text-3xl text-[#162C3E] font-bold mb-6">Clients</Text>

            {/* Search */}
            <View className="bg-white rounded-xl p-3 flex-row items-center mb-6 shadow-sm">
                <Feather name="search" size={20} color="#9CA3AF" className="mr-2" />
                <TextInput
                    placeholder="Search Clients"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 font-sans text-[#162C3E]"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* List */}
            <FlatList
                data={filteredClients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable className="bg-white p-4 rounded-2xl mb-3 shadow-sm flex-row items-center active:opacity-90">
                        {/* Avatar */}
                        <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center overflow-hidden mr-4 border border-gray-100">
                            {item.avatar_url ? (
                                <Image source={{ uri: item.avatar_url }} className="w-full h-full" />
                            ) : (
                                <Text className="font-serif text-lg text-[#162C3E] font-bold">
                                    {item.full_name?.charAt(0).toUpperCase() || "C"}
                                </Text>
                            )}
                        </View>

                        <View className="flex-1">
                            <Text className="font-serif text-lg text-[#162C3E] font-bold mb-1">{item.full_name || "Unnamed Client"}</Text>
                            <Text className="font-sans text-xs text-gray-500">Joined: {new Date(item.created_at).toLocaleDateString()}</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9CA3AF" />
                    </Pressable>
                )}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500 mt-10 font-sans">No clients found.</Text>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
