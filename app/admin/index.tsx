import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function AdminDashboard() {
    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <StatusBar style="dark" />
            <ScrollView className="flex-1 px-6 pt-14">
                {/* Header */}
                <View className="mb-6">
                    <Text className="font-sans text-xs text-gray-500 tracking-widest uppercase mb-1">Tuesday 21 June</Text>
                    <Text className="font-serif text-2xl text-[#162C3E] font-bold">Good Morning Admin</Text>
                </View>

                <Text className="font-serif text-xl text-[#162C3E] font-bold mb-4">Dashboard</Text>

                {/* Stats Grid */}
                <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
                    <StatsCard label="TOTAL PROJECTS" value="5" />
                    <StatsCard label="ONGOING PROJECTS" value="2" />
                    <StatsCard label="SITE MANAGERS" value="4" />
                    <StatsCard label="CLIENTS" value="10" />
                </View>

                {/* Add Project Button */}
                <Link href="/admin/projects/new" asChild>
                    <Pressable className="bg-[#162C3E] rounded-full py-4 px-6 items-center justify-center mb-8 shadow-lg active:opacity-90 self-center w-2/3">
                        <Text className="font-sans font-semibold text-white text-base">Add New Project</Text>
                    </Pressable>
                </Link>

                {/* Recent Activity */}
                <View>
                    <Text className="font-serif text-xl text-[#162C3E] font-bold mb-4">Recent Activity</Text>
                    <View className="gap-4">
                        <View className="h-24 bg-[#E5E5E5] rounded-xl w-full" />
                        <View className="h-24 bg-[#E5E5E5] rounded-xl w-full" />
                        <View className="h-24 bg-[#E5E5E5] rounded-xl w-full" />
                    </View>
                </View>

                <View className="h-24" />
            </ScrollView>
        </View>
    );
}

function StatsCard({ label, value }: { label: string, value: string }) {
    return (
        <View className="bg-[#E5E5E5] w-[48%] p-5 rounded-2xl justify-between h-32">
            <Text className="font-sans text-[10px] text-[#162C3E] uppercase tracking-wider font-medium">{label}</Text>
            <Text className="font-serif text-4xl text-[#162C3E] font-bold">{value}</Text>
        </View>
    );
}
