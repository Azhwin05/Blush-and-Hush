import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";

export default function ManagerTimelineScreen() {
    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <StatusBar style="dark" />
            <View className="pt-14 pb-4 bg-[#F5F5F5] items-center">
                <Text className="font-serif text-xl text-[#162C3E] font-bold">Project Timeline</Text>
            </View>

            <ScrollView className="flex-1 px-6">
                <View className="relative pl-4 border-l-2 border-gray-300 ml-2 my-4 pb-12">

                    {/* Item 1 */}
                    <TimelineItem
                        date="June 10"
                        title="Project Started"
                        isLast={false}
                    />

                    {/* Item 2 */}
                    <TimelineItem
                        date="June 15"
                        status="Completed"
                        description="Foundation completed. All concrete poured and cured successfully."
                        images={[1, 2]}
                        isLast={false}
                    />

                    {/* Item 3 */}
                    <TimelineItem
                        date="June 20"
                        status="Completed"
                        description="Wall Plastering Completed, Wiring for electrical devices/lights laid out."
                        images={[1, 2]}
                        isLast={true}
                    />

                </View>
            </ScrollView>
        </View>
    );
}

function TimelineItem({ date, title, status, description, images, isLast }: { date: string, title?: string, status?: string, description?: string, images?: any[], isLast: boolean }) {
    return (
        <View className="mb-8 pl-6 relative">
            {/* Dot */}
            <View className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-[#162C3E]" />

            {/* Content Card */}
            <View className="bg-[#E5E5E5] p-4 rounded-2xl">
                <View className="flex-row justify-between items-start mb-2">
                    <View>
                        <Text className="font-sans text-[#162C3E] font-bold mb-1">{date}</Text>
                        {title && <Text className="font-sans text-sm text-[#162C3E]">{title}</Text>}
                    </View>
                    {status && (
                        <View className="bg-[#162C3E] px-3 py-1 rounded-full">
                            <Text className="font-sans text-[10px] text-white font-medium">{status}</Text>
                        </View>
                    )}
                </View>

                {images && (
                    <View className="flex-row gap-2 mb-3">
                        {images.map((_, i) => (
                            <View key={i} className="w-16 h-16 bg-gray-300 rounded-lg" />
                        ))}
                    </View>
                )}

                {description && (
                    <Text className="font-sans text-sm text-[#162C3E] leading-5">
                        {description}
                    </Text>
                )}
            </View>
        </View>
    );
}
