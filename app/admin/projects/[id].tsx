import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

type ProjectDetails = {
    id: string;
    name: string;
    location: string;
    start_date: string;
    end_date: string;
    progress: number;
    manager?: {
        full_name: string;
    };
};

type Update = {
    id: string;
    description: string;
    date: string;
    created_at: string;
    images: string[];
};

export default function ProjectDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [project, setProject] = useState<ProjectDetails | null>(null);
    const [latestUpdate, setLatestUpdate] = useState<Update | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProjectDetails();
        }
    }, [id]);

    const fetchProjectDetails = async () => {
        try {
            // Fetch Project
            const { data: projectData, error: projectError } = await supabase
                .from("projects")
                .select(`
                    *,
                    manager:profiles!manager_id(full_name)
                `)
                .eq("id", id)
                .single();

            if (projectError) throw projectError;
            setProject(projectData as any);

            // Fetch Latest Update
            const { data: updateData, error: updateError } = await supabase
                .from("updates")
                .select("*")
                .eq("project_id", id)
                .order("created_at", { ascending: false })
                .limit(1)
                .maybeSingle();

            if (!updateError && updateData) {
                setLatestUpdate(updateData as any);
            }
        } catch (error) {
            console.error("Error fetching details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = () => {
        Alert.alert(
            "Delete Project",
            "Are you sure you want to delete this project? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setDeleting(true);
                        try {
                            const { error } = await supabase
                                .from("projects")
                                .delete()
                                .eq("id", id);

                            if (error) throw error;

                            Alert.alert("Success", "Project deleted successfully.");
                            router.back();
                        } catch (error: any) {
                            Alert.alert("Error", error.message);
                            setDeleting(false);
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#F5F5F5]">
                <ActivityIndicator size="large" color="#162C3E" />
            </View>
        );
    }

    if (!project) {
        return (
            <View className="flex-1 justify-center items-center bg-[#F5F5F5]">
                <Text>Project not found</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <Stack.Screen options={{ title: "Projects", headerBackTitle: "Back" }} />
            <ScrollView className="flex-1 px-6 pt-4">
                <Text className="font-serif text-xl text-[#162C3E] font-bold mb-4">About</Text>

                {/* Project Info Card */}
                <View className="bg-white p-5 rounded-2xl mb-6 shadow-sm">
                    <Text className="font-serif text-2xl text-[#162C3E] font-bold mb-2">{project.name}</Text>
                    <Text className="font-sans text-sm text-[#162C3E] mb-1">Site Location : {project.location}</Text>
                    <Text className="font-sans text-sm text-[#162C3E] mb-1">
                        Site Manager : {project.manager?.full_name || "Unassigned"}
                    </Text>
                    <Text className="font-sans text-sm text-[#162C3E] mb-1">Start Date : {project.start_date ? new Date(project.start_date).toLocaleDateString() : "N/A"}</Text>
                    <Text className="font-sans text-sm text-[#162C3E]">Expected Finish Date : {project.end_date ? new Date(project.end_date).toLocaleDateString() : "N/A"}</Text>
                </View>

                {/* Progress */}
                <View className="bg-white p-5 rounded-2xl mb-6 shadow-sm">
                    <View className="flex-row justify-between mb-2">
                        <Text className="font-sans font-bold text-[#162C3E]">Overall Progress</Text>
                        <Text className="font-sans font-bold text-[#162C3E]">{project.progress || 0}%</Text>
                    </View>
                    <View className="flex-row gap-1 h-3 rounded-full overflow-hidden bg-[#E5E5E5]">
                        <View className="h-full bg-[#22C55E]" style={{ width: `${project.progress || 0}%` }} />
                    </View>
                </View>

                {/* Latest Update */}
                <View className="mb-6">
                    <Text className="font-serif text-xl text-[#162C3E] font-bold mb-4">Latest Update</Text>
                    <View className="bg-white p-5 rounded-2xl shadow-sm">
                        {latestUpdate ? (
                            <>
                                <Text className="font-sans text-[#162C3E] font-bold mb-1">
                                    Latest Update: {new Date(latestUpdate.date).toLocaleDateString()}
                                </Text>
                                <Text className="font-sans text-sm text-[#162C3E] mb-4 leading-5">
                                    {latestUpdate.description}
                                </Text>
                                {latestUpdate.images && latestUpdate.images.length > 0 && (
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3 mb-2">
                                        {latestUpdate.images.map((img, index) => (
                                            <Image key={index} source={{ uri: img }} className="w-24 h-24 rounded-lg bg-gray-200" />
                                        ))}
                                    </ScrollView>
                                )}
                            </>
                        ) : (
                            <Text className="font-sans text-sm text-gray-500">No updates yet.</Text>
                        )}
                    </View>
                </View>

                {/* More Actions */}
                <View className="mb-12">
                    <Text className="font-serif text-xl text-[#162C3E] font-bold mb-4">More Actions</Text>
                    <View className="flex-row gap-4 justify-between flex-wrap">
                        <Link href="/admin/projects/upload" asChild>
                            <ActionButton icon="file-text" label="Documents" />
                        </Link>
                        <ActionButton icon="dollar-sign" label="Budget" />
                        <ActionButton icon="message-square" label="Chat" />

                        <Pressable onPress={handleDeleteProject} disabled={deleting} className="items-center gap-2">
                            <View className="w-16 h-16 bg-red-50 rounded-2xl items-center justify-center shadow-sm border border-red-100">
                                {deleting ? (
                                    <ActivityIndicator color="#EF4444" />
                                ) : (
                                    <Feather name="trash-2" size={24} color="#EF4444" />
                                )}
                            </View>
                            <Text className="font-sans text-xs text-red-500 font-medium">Delete</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const ActionButton = React.forwardRef(({ icon, label, ...props }: { icon: keyof typeof Feather.glyphMap, label: string }, ref: any) => {
    return (
        <Pressable ref={ref} {...props} className="items-center gap-2">
            <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center shadow-sm border border-gray-100">
                <Feather name={icon} size={24} color="#162C3E" />
            </View>
            <Text className="font-sans text-xs text-[#162C3E] font-medium">{label}</Text>
        </Pressable>
    );
});
