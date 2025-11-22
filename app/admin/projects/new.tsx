import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";

type Profile = {
    id: string;
    full_name: string;
};

export default function NewProjectScreen() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [selectedClient, setSelectedClient] = useState<Profile | null>(null);
    const [selectedManager, setSelectedManager] = useState<Profile | null>(null);

    const [clients, setClients] = useState<Profile[]>([]);
    const [managers, setManagers] = useState<Profile[]>([]);

    const [loading, setLoading] = useState(false);
    const [fetchingUsers, setFetchingUsers] = useState(true);

    // Modal states
    const [clientModalVisible, setClientModalVisible] = useState(false);
    const [managerModalVisible, setManagerModalVisible] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const [{ data: clientsData }, { data: managersData }] = await Promise.all([
                supabase.from("profiles").select("id, full_name").eq("role", "client"),
                supabase.from("profiles").select("id, full_name").eq("role", "manager"),
            ]);

            setClients(clientsData || []);
            setManagers(managersData || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setFetchingUsers(false);
        }
    };

    const handleCreateProject = async () => {
        if (!name || !location || !selectedClient || !selectedManager) {
            Alert.alert("Missing Fields", "Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from("projects").insert({
                name,
                location,
                client_id: selectedClient.id,
                manager_id: selectedManager.id,
                status: "ongoing",
                start_date: new Date().toISOString(),
            });

            if (error) throw error;

            Alert.alert("Success", "Project created successfully!");
            router.back();
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <Stack.Screen options={{ title: "New Project", headerBackTitle: "Back" }} />
            <ScrollView className="flex-1 px-6 pt-8">
                <Text className="font-serif text-3xl text-[#162C3E] font-bold mb-8">New Project</Text>

                <View className="gap-6 mb-12">
                    <InputGroup label="Project Name" value={name} onChangeText={setName} />
                    <InputGroup label="Site Location" value={location} onChangeText={setLocation} />

                    {/* Client Selector */}
                    <Pressable onPress={() => setClientModalVisible(true)}>
                        <View className="bg-[#E5E5E5] p-4 rounded-xl flex-row justify-between items-center">
                            <Text className={`font-sans ${selectedClient ? "text-[#162C3E]" : "text-[#9CA3AF]"}`}>
                                {selectedClient ? selectedClient.full_name : "Select Client"}
                            </Text>
                            <Feather name="chevron-down" size={20} color="#162C3E" />
                        </View>
                    </Pressable>

                    {/* Site Manager Selector */}
                    <Pressable onPress={() => setManagerModalVisible(true)}>
                        <View className="bg-[#E5E5E5] p-4 rounded-xl flex-row justify-between items-center">
                            <Text className={`font-sans ${selectedManager ? "text-[#162C3E]" : "text-[#9CA3AF]"}`}>
                                {selectedManager ? selectedManager.full_name : "Select Site Manager"}
                            </Text>
                            <Feather name="chevron-down" size={20} color="#162C3E" />
                        </View>
                    </Pressable>
                </View>

                <View className="flex-row gap-4">
                    <Pressable
                        onPress={() => router.back()}
                        disabled={loading}
                        className="flex-1 border border-[#162C3E] py-4 rounded-full items-center active:opacity-50"
                    >
                        <Text className="font-sans font-medium text-[#162C3E]">Cancel</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleCreateProject}
                        disabled={loading}
                        className={`flex-1 bg-[#162C3E] py-4 rounded-full items-center active:opacity-90 shadow-lg ${loading ? "opacity-70" : ""}`}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="font-sans font-medium text-white">Create Project</Text>
                        )}
                    </Pressable>
                </View>
            </ScrollView>

            {/* Selection Modals */}
            <SelectionModal
                visible={clientModalVisible}
                onClose={() => setClientModalVisible(false)}
                title="Select Client"
                items={clients}
                onSelect={setSelectedClient}
            />
            <SelectionModal
                visible={managerModalVisible}
                onClose={() => setManagerModalVisible(false)}
                title="Select Manager"
                items={managers}
                onSelect={setSelectedManager}
            />
        </View>
    );
}

function InputGroup({ label, value, onChangeText }: { label: string, value: string, onChangeText: (text: string) => void }) {
    return (
        <View>
            <TextInput
                placeholder={label}
                placeholderTextColor="#9CA3AF"
                className="bg-[#E5E5E5] p-4 rounded-xl font-sans text-[#162C3E]"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

function SelectionModal({ visible, onClose, title, items, onSelect }: { visible: boolean, onClose: () => void, title: string, items: Profile[], onSelect: (item: Profile) => void }) {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View className="flex-1 bg-black/50 justify-end">
                <View className="bg-white rounded-t-3xl p-6 h-1/2">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="font-serif text-xl font-bold text-[#162C3E]">{title}</Text>
                        <Pressable onPress={onClose}>
                            <Feather name="x" size={24} color="#162C3E" />
                        </Pressable>
                    </View>
                    <ScrollView>
                        {items.map((item) => (
                            <Pressable
                                key={item.id}
                                onPress={() => {
                                    onSelect(item);
                                    onClose();
                                }}
                                className="p-4 border-b border-gray-100 active:bg-gray-50"
                            >
                                <Text className="font-sans text-lg text-[#162C3E]">{item.full_name || "Unnamed"}</Text>
                            </Pressable>
                        ))}
                        {items.length === 0 && (
                            <Text className="text-center text-gray-500 mt-4 font-sans">No users found.</Text>
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
