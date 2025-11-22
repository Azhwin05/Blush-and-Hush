import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from "react-native";

type Project = {
    id: string;
    name: string;
    location: string;
    status: "ongoing" | "completed";
    manager?: {
        full_name: string;
    };
};

export default function ProjectsScreen() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<"All" | "Ongoing" | "Completed">("Ongoing");
    const [searchQuery, setSearchQuery] = useState("");

    useFocusEffect(
        useCallback(() => {
            fetchProjects();
        }, [])
    );

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("projects")
                .select(`
                    id,
                    name,
                    location,
                    status,
                    manager:profiles!manager_id(full_name)
                `)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setProjects(data as any);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = projects.filter((project) => {
        const matchesFilter =
            activeFilter === "All" ||
            (activeFilter === "Ongoing" && project.status === "ongoing") ||
            (activeFilter === "Completed" && project.status === "completed");

        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <View className="flex-1 bg-[#F5F5F5] px-6 pt-14">
            <Text className="font-serif text-3xl text-[#162C3E] font-bold mb-6">Projects</Text>

            {/* Search */}
            <View className="bg-[#E5E5E5] rounded-xl p-3 flex-row items-center mb-6">
                <Feather name="search" size={20} color="#9CA3AF" className="mr-2" />
                <TextInput
                    placeholder="Search Projects"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 font-sans text-[#162C3E]"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Feather name="mic" size={20} color="#9CA3AF" />
            </View>

            {/* Filter Tabs */}
            <View className="flex-row gap-3 mb-6">
                <FilterTab label="All" active={activeFilter === "All"} onPress={() => setActiveFilter("All")} />
                <FilterTab label="Ongoing" active={activeFilter === "Ongoing"} onPress={() => setActiveFilter("Ongoing")} />
                <FilterTab label="Completed" active={activeFilter === "Completed"} onPress={() => setActiveFilter("Completed")} />
            </View>

            {/* List */}
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#162C3E" />
                </View>
            ) : (
                <FlatList
                    data={filteredProjects}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Link href={`/admin/projects/${item.id}`} asChild>
                            <Pressable className="bg-[#E5E5E5] p-5 rounded-2xl mb-4 active:opacity-90 flex-row items-center justify-between">
                                <View>
                                    <Text className="font-serif text-xl text-[#162C3E] font-bold mb-2">{item.name}</Text>
                                    <Text className="font-sans text-sm text-[#162C3E] mb-1">Site Location : {item.location}</Text>
                                    <Text className="font-sans text-sm text-[#162C3E]">
                                        Site Manager : {item.manager?.full_name || "Unassigned"}
                                    </Text>
                                </View>
                                <Feather name="chevron-right" size={24} color="#162C3E" />
                            </Pressable>
                        </Link>
                    )}
                    ListEmptyComponent={
                        <Text className="text-center text-gray-500 mt-10 font-sans">No projects found</Text>
                    }
                />
            )}

            {/* FAB */}
            <Link href="/admin/projects/new" asChild>
                <Pressable className="absolute bottom-6 right-6 bg-[#162C3E] w-14 h-14 rounded-full items-center justify-center shadow-lg active:opacity-90">
                    <Feather name="plus" size={24} color="white" />
                </Pressable>
            </Link>
        </View>
    );
}

function FilterTab({ label, active, onPress }: { label: string, active?: boolean, onPress: () => void }) {
    return (
        <Pressable onPress={onPress} className={`px-5 py-2 rounded-lg ${active ? 'bg-[#162C3E]' : 'bg-[#D9D9D9]'}`}>
            <Text className={`font-sans text-sm font-medium ${active ? 'text-white' : 'text-[#162C3E]'}`}>{label}</Text>
        </Pressable>
    );
}
