import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ClientDocumentsScreen() {
    const [activeTab, setActiveTab] = useState<"Invoice" | "Agreement">("Agreement");

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <StatusBar style="dark" />
            <View className="pt-14 pb-4 bg-[#162C3E] items-center mb-6">
                <Text className="font-serif text-xl text-white font-bold">Documents</Text>
            </View>

            <ScrollView className="flex-1 px-6">
                {/* List */}
                <View className="gap-4 mb-8">
                    {activeTab === "Agreement" ? (
                        <>
                            <DocumentItem
                                title="Design Services Agreement"
                                status="Signed on June 8, 2025"
                                statusColor="#22C55E"
                            />
                            <DocumentItem
                                title="Terms & Conditions"
                                status="Signed on June 8, 2025"
                                statusColor="#22C55E"
                            />
                            <DocumentItem
                                title="Product Purchase Agreement"
                                status="Signed on June 8, 2025"
                                statusColor="#22C55E"
                            />
                        </>
                    ) : (
                        <>
                            <DocumentItem
                                title="Advance Payment"
                                status="Paid on June 8, 2025"
                                statusColor="#22C55E"
                            />
                            <DocumentItem
                                title="Progress Payment"
                                status="Due on June 30, 2025"
                                statusColor="#EAB308"
                            />
                            <DocumentItem
                                title="Final Payment"
                                status="Due on July 20, 2025"
                                statusColor="#EAB308"
                            />
                        </>
                    )}
                </View>
            </ScrollView>

            {/* Toggle */}
            <View className="absolute bottom-6 left-6 right-6 bg-[#E5E5E5] rounded-full p-1 flex-row">
                <Pressable
                    onPress={() => setActiveTab("Invoice")}
                    className={`flex-1 py-3 rounded-full items-center ${activeTab === "Invoice" ? "bg-white shadow-sm" : ""}`}
                >
                    <Text className={`font-sans font-medium ${activeTab === "Invoice" ? "text-[#162C3E]" : "text-gray-500"}`}>Invoice</Text>
                </Pressable>
                <Pressable
                    onPress={() => setActiveTab("Agreement")}
                    className={`flex-1 py-3 rounded-full items-center ${activeTab === "Agreement" ? "bg-white shadow-sm" : ""}`}
                >
                    <Text className={`font-sans font-medium ${activeTab === "Agreement" ? "text-[#162C3E]" : "text-gray-500"}`}>Agreement</Text>
                </Pressable>
            </View>
        </View>
    );
}

function DocumentItem({ title, status, statusColor }: { title: string, status: string, statusColor: string }) {
    return (
        <View className="bg-[#E5E5E5] p-4 rounded-xl flex-row justify-between items-center">
            <View className="flex-1">
                <Text className="font-sans font-bold text-[#162C3E] mb-1">{title}</Text>
                <Text className="font-sans text-xs" style={{ color: statusColor }}>{status}</Text>
            </View>
            <View className="flex-row gap-4">
                <View className="items-center gap-1">
                    <Feather name="file-text" size={20} color="#162C3E" />
                    <Text className="font-sans text-[10px] text-[#162C3E]">View</Text>
                </View>
                <View className="items-center gap-1">
                    <Feather name="download" size={20} color="#162C3E" />
                    <Text className="font-sans text-[10px] text-[#162C3E]">Download</Text>
                </View>
            </View>
        </View>
    );
}
