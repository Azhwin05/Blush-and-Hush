import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

type Update = {
    id: string;
    title: string;
    description: string;
    date: string;
    images: string[];
    created_at: string;
};

export default function ClientTimelineScreen() {
    const { session } = useAuth();
    const [updates, setUpdates] = useState<Update[]>([]);
    const [loading, setLoading] = useState(true);
    const [projectName, setProjectName] = useState("");

    useFocusEffect(
        useCallback(() => {
            if (session?.user.id) {
                fetchProjectUpdates();
            }
        }, [session?.user.id])
    );

    const fetchProjectUpdates = async () => {
        setLoading(true);
        try {
            // 1. Get project ID
            const { data: projectData, error: projectError } = await supabase
                .from("projects")
                .select("id, name, created_at")
                .eq("client_id", session?.user.id)
                .limit(1)
                .maybeSingle();

            if (projectError || !projectData) {
                console.error("Error fetching project:", projectError);
                setLoading(false);
                return;
            }

            setProjectName(projectData.name);

            // 2. Get updates
            const { data: updatesData, error: updatesError } = await supabase
                .from("updates")
                .select("*")
                .eq("project_id", projectData.id)
                .order("date", { ascending: true });

            if (updatesError) {
                console.error("Error fetching updates:", updatesError);
            } else {
                // Add "Project Started" as the first item
                const startItem: Update = {
                    id: "start",
                    title: "Project Started",
                    description: "Project initialization and planning.",
                    date: projectData.created_at,
                    images: [],
                    created_at: projectData.created_at,
                };
                setUpdates([startItem, ...(updatesData as any || [])]);
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
            <View className="pt-14 pb-4 bg-[#162C3E] items-center shadow-md">
                <Text className="font-serif text-xl text-white font-bold">Project Timeline</Text>
                {projectName ? <Text className="font-sans text-xs text-gray-300 mt-1">{projectName}</Text> : null}
            </View>

            <ScrollView className="flex-1 px-6">
                <View className="relative pl-4 border-l-2 border-gray-300 ml-2 my-4 pb-12">
                    {updates.length === 0 ? (
                        <Text className="font-sans text-gray-500 mt-4">No updates yet.</Text>
                    ) : (
                        updates.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                date={new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                title={item.title}
                                description={item.description}
                                images={item.images}
                                isLast={index === updates.length - 1}
                            />
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

function TimelineItem({ date, title, description, images, isLast }: { date: string, title?: string, description?: string, images?: string[], isLast: boolean }) {
    return (
        <View className="mb-8 pl-6 relative">
            {/* Dot */}
            <View className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-[#162C3E] border-2 border-[#F5F5F5]" />

            {/* Content Card */}
            <View className="bg-white p-4 rounded-2xl shadow-sm">
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                        <Text className="font-sans text-[#162C3E] font-bold mb-1">{date}</Text>
                        {title && <Text className="font-sans text-sm text-[#162C3E] font-semibold">{title}</Text>}
                    </View>
                </View>

                {description && (
                    <Text className="font-sans text-sm text-gray-600 leading-5 mb-3">
                        {description}
                    </Text>
                )}

                {images && images.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                        {images.map((img, i) => (
                            <Image key={i} source={{ uri: img }} className="w-16 h-16 rounded-lg bg-gray-200" />
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
}
