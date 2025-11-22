import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

type Project = {
    id: string;
    name: string;
    location: string;
    start_date: string;
    end_date: string;
    progress: number;
};

type Update = {
    description: string;
    date: string;
    images: string[];
};

export default function ManagerDashboard() {
    const { session, signOut } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            if (session?.user.id) {
                fetchAssignedProjects();
            }
        }, [session?.user.id])
    );

    const fetchAssignedProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .eq("manager_id", session?.user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching projects:", error);
            } else {
                setProjects(data as any || []);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderProjectItem = ({ item }: { item: Project }) => (
        <View className="mb-8">
            {/* Project Info Card */}
            <View className="bg-[#E5E5E5] p-5 rounded-2xl mb-4">
                <Text className="font-serif text-xl text-[#162C3E] font-bold mb-3">{item.name}</Text>
                <View className="gap-1">
                    <Text className="font-sans text-sm text-[#162C3E]">Site Location : {item.location}</Text>
                    <Text className="font-sans text-sm text-[#162C3E]">Start Date : {item.start_date ? new Date(item.start_date).toLocaleDateString() : "N/A"}</Text>
                    <Text className="font-sans text-sm text-[#162C3E]">Expected Finish Date : {item.end_date ? new Date(item.end_date).toLocaleDateString() : "N/A"}</Text>
                </View>
            </View>

            {/* Overall Progress */}
            <View className="bg-[#E5E5E5] p-5 rounded-2xl mb-4">
                <Text className="font-sans font-bold text-[#162C3E] mb-2">Overall Progress</Text>
                <View className="flex-row gap-1 h-3 rounded-full overflow-hidden mb-1 bg-white">
                    <View className="h-full bg-[#22C55E]" style={{ width: `${item.progress || 0}%` }} />
                </View>
                <Text className="font-sans text-xs text-[#162C3E] text-center mt-1">{item.progress || 0}%</Text>
            </View>

            {/* Add Update Button */}
            <Link href={`/manager/update?projectId=${item.id}`} asChild>
                <Pressable className="bg-[#162C3E] rounded-full py-3 px-6 items-center justify-center shadow-lg active:opacity-90 self-start">
                    <Text className="font-sans font-semibold text-white text-sm">Add Update</Text>
                </Pressable>
            </Link>
        </View>
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#F5F5F5]">
                <ActivityIndicator size="large" color="#162C3E" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <StatusBar style="dark" />
            <View className="flex-1 px-6 pt-14">
                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="font-sans text-xs text-gray-500 tracking-widest uppercase mb-1">
                            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </Text>
                        <Text className="font-serif text-2xl text-[#162C3E] font-bold">Good Morning Manager</Text>
                    </View>
                    <Pressable onPress={signOut} className="p-2 bg-white rounded-full shadow-sm active:opacity-70">
                        <Feather name="log-out" size={20} color="#162C3E" />
                    </Pressable>
                </View>

                <FlatList
                    data={projects}
                    keyExtractor={(item) => item.id}
                    renderItem={renderProjectItem}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center mt-20">
                            <Text className="font-sans text-lg text-gray-500">No projects assigned yet.</Text>
                            <Text className="font-sans text-sm text-gray-400 mt-2 text-center px-10">
                                Ask the Admin to assign a project to you.
                            </Text>
                        </View>
                    }
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </View>
        </View>
    );
}
