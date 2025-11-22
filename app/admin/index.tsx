import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";

type Project = {
    id: string;
    name: string;
    location: string;
    status: string;
    manager?: {
        full_name: string;
    };
};

type RecentActivity = {
    id: string;
    description: string;
    created_at: string;
    project: {
        name: string;
    };
};

export default function AdminDashboard() {
    const { signOut } = useAuth();
    const [stats, setStats] = useState({
        totalProjects: 0,
        ongoingProjects: 0,
        managers: 0,
        clients: 0,
    });
    const [projects, setProjects] = useState<Project[]>([]);
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            fetchDashboardData();
        }, [])
    );

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Stats
            const [
                { count: totalProjects },
                { count: ongoingProjects },
                { count: managers },
                { count: clients },
            ] = await Promise.all([
                supabase.from("projects").select("*", { count: "exact", head: true }),
                supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "ongoing"),
                supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "manager"),
                supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client"),
            ]);

            setStats({
                totalProjects: totalProjects || 0,
                ongoingProjects: ongoingProjects || 0,
                managers: managers || 0,
                clients: clients || 0,
            });

            // 2. Fetch Projects
            const { data: projectsData } = await supabase
                .from("projects")
                .select(`
                    id, name, location, status,
                    manager:profiles!manager_id(full_name)
                `)
                .order("created_at", { ascending: false });

            setProjects(projectsData as any || []);

            // 3. Fetch Recent Activity (Latest 5 updates)
            const { data: activityData } = await supabase
                .from("updates")
                .select(`
                    id, description, created_at,
                    project:projects(name)
                `)
                .order("created_at", { ascending: false })
                .limit(5);

            setRecentActivity(activityData as any || []);

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
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
            <ScrollView className="flex-1 px-6 pt-14" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="font-sans text-xs text-gray-500 tracking-widest uppercase mb-1">
                            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </Text>
                        <Text className="font-serif text-2xl text-[#162C3E] font-bold">Good Morning Admin</Text>
                    </View>
                    <Pressable onPress={signOut} className="p-2 bg-white rounded-full shadow-sm active:opacity-70">
                        <Feather name="log-out" size={20} color="#162C3E" />
                    </Pressable>
                </View>

                {/* Stats Grid */}
                <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
                    <StatsCard label="TOTAL PROJECTS" value={stats.totalProjects.toString()} />
                    <StatsCard label="ONGOING PROJECTS" value={stats.ongoingProjects.toString()} />
                    <StatsCard label="SITE MANAGERS" value={stats.managers.toString()} />
                    <StatsCard label="CLIENTS" value={stats.clients.toString()} />
                </View>

                {/* Add Project Button */}
                <Link href="/admin/projects/new" asChild>
                    <Pressable className="bg-[#162C3E] rounded-full py-4 px-6 items-center justify-center mb-8 shadow-lg active:opacity-90 self-center w-2/3">
                        <Text className="font-sans font-semibold text-white text-base">Add New Project</Text>
                    </Pressable>
                </Link>

                {/* Projects List */}
                <View className="mb-8">
                    <Text className="font-serif text-xl text-[#162C3E] font-bold mb-4">All Projects</Text>
                    {projects.length === 0 ? (
                        <Text className="font-sans text-gray-500">No projects found.</Text>
                    ) : (
                        projects.map((project) => (
                            <Link key={project.id} href={`/admin/projects/${project.id}`} asChild>
                                <Pressable className="bg-white p-4 rounded-xl mb-3 shadow-sm flex-row justify-between items-center">
                                    <View>
                                        <Text className="font-sans font-bold text-[#162C3E] text-lg">{project.name}</Text>
                                        <Text className="font-sans text-xs text-gray-500">{project.location}</Text>
                                        <Text className="font-sans text-xs text-[#162C3E] mt-1">Manager: {project.manager?.full_name || "Unassigned"}</Text>
                                    </View>
                                    <Feather name="chevron-right" size={20} color="#9CA3AF" />
                                </Pressable>
                            </Link>
                        ))
                    )}
                </View>

                {/* Recent Activity */}
                <View className="mb-12">
                    <Text className="font-serif text-xl text-[#162C3E] font-bold mb-4">Recent Activity</Text>
                    {recentActivity.length === 0 ? (
                        <Text className="font-sans text-gray-500">No recent activity.</Text>
                    ) : (
                        recentActivity.map((activity) => (
                            <View key={activity.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm border-l-4 border-[#162C3E]">
                                <Text className="font-sans text-xs text-gray-400 mb-1">
                                    {new Date(activity.created_at).toLocaleDateString()} • {activity.project?.name}
                                </Text>
                                <Text className="font-sans text-[#162C3E] text-sm" numberOfLines={2}>
                                    {activity.description}
                                </Text>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

function StatsCard({ label, value }: { label: string, value: string }) {
    return (
        <View className="bg-white w-[48%] p-5 rounded-2xl justify-between h-32 shadow-sm">
            <Text className="font-sans text-[10px] text-[#162C3E] uppercase tracking-wider font-medium">{label}</Text>
            <Text className="font-serif text-4xl text-[#162C3E] font-bold">{value}</Text>
        </View>
    );
}
