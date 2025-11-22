import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";

type Project = {
    id: string;
    name: string;
    location: string;
    start_date: string;
    end_date: string;
    progress: number;
};

type Update = {
    id: string;
    description: string;
    date: string;
    images: string[];
};

export default function ClientDashboard() {
    const { session, signOut } = useAuth();
    const [project, setProject] = useState<Project | null>(null);
    const [latestUpdate, setLatestUpdate] = useState<Update | null>(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            if (session?.user.id) {
                fetchAssignedProject();
            }
        }, [session?.user.id])
    );

    const fetchAssignedProject = async () => {
        setLoading(true);
        try {
            // 1. Get the project assigned to this client
            const { data: projectData, error: projectError } = await supabase
                .from("projects")
                .select("*")
                .eq("client_id", session?.user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (projectError) {
                console.error("Error fetching project:", projectError);
                setProject(null);
            } else if (projectData) {
                setProject(projectData as any);

                // 2. Get the latest update for this project
                const { data: updateData, error: updateError } = await supabase
                    .from("updates")
                    .select("*")
                    .eq("project_id", projectData.id)
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (!updateError && updateData) {
                    setLatestUpdate(updateData as any);
                } else {
                    setLatestUpdate(null);
                }
            } else {
                setProject(null);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        } finally {
            setLoading(false);
        }
    };

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
            <ScrollView className="flex-1 px-6 pt-14">
                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="font-sans text-xs text-gray-500 tracking-widest uppercase mb-1">
                            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </Text>
                        <Text className="font-serif text-2xl text-[#162C3E] font-bold">Good Morning Client</Text>
                    </View>
                    <Pressable onPress={signOut} className="p-2 bg-white rounded-full shadow-sm active:opacity-70">
                        <Feather name="log-out" size={20} color="#162C3E" />
                    </Pressable>
                </View>

                {project ? (
                    <>
                        {/* Latest Update Card */}
                        <Link href={latestUpdate ? `/client/update/${latestUpdate.id}` : "/client"} asChild>
                            <Pressable className="bg-[#E5E5E5] p-5 rounded-2xl mb-6 active:opacity-90" disabled={!latestUpdate}>
                                {latestUpdate ? (
                                    <>
                                        <Text className="font-sans font-bold text-[#162C3E] mb-1">
                                            Latest Update: {new Date(latestUpdate.date).toLocaleDateString()}
                                        </Text>
                                        <Text className="font-sans text-sm text-[#162C3E] mb-4 leading-5" numberOfLines={3}>
                                            {latestUpdate.description}
                                        </Text>

                                        {latestUpdate.images && latestUpdate.images.length > 0 && (
                                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3 mb-4">
                                                {latestUpdate.images.map((img, index) => (
                                                    <Image key={index} source={{ uri: img }} className="w-24 h-24 rounded-lg bg-gray-300" />
                                                ))}
                                            </ScrollView>
                                        )}
                                    </>
                                ) : (
                                    <Text className="font-sans text-sm text-gray-500 mb-4">No updates yet.</Text>
                                )}

                                <Text className="font-sans text-sm text-[#162C3E] font-medium mb-1">Site Location: {project.location}</Text>
                                <Text className="font-sans text-xs text-[#162C3E]">Project: {project.name}</Text>
                            </Pressable>
                        </Link>

                        {/* Overall Progress */}
                        <View className="bg-[#E5E5E5] p-5 rounded-2xl mb-6">
                            <Text className="font-sans font-bold text-[#162C3E] mb-2">Overall Progress</Text>
                            <View className="flex-row gap-1 h-3 rounded-full overflow-hidden mb-1 bg-white">
                                <View className="h-full bg-[#22C55E]" style={{ width: `${project.progress || 0}%` }} />
                            </View>
                            <Text className="font-sans text-xs text-[#162C3E] text-center mt-1">{project.progress || 0}%</Text>
                        </View>
                    </>
                ) : (
                    <View className="flex-1 justify-center items-center mt-20">
                        <Text className="font-sans text-lg text-gray-500">No projects assigned yet.</Text>
                        <Text className="font-sans text-sm text-gray-400 mt-2 text-center px-10">
                            Contact the Admin to get access to your project.
                        </Text>
                    </View>
                )}

                <View className="h-24" />
            </ScrollView>
        </View>
    );
}
