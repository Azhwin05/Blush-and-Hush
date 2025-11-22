import { useAuth } from "@/contexts/AuthProvider";
import { useImagePicker } from "@/hooks/useImagePicker";
import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system/legacy';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function ManagerUpdateScreen() {
    const router = useRouter();
    const { projectId } = useLocalSearchParams();
    const { session } = useAuth();
    const { images, pickImages, removeImage } = useImagePicker();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (projectId) {
            fetchProjectProgress();
        }
    }, [projectId]);

    const fetchProjectProgress = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('progress')
                .eq('id', projectId)
                .single();

            if (data) {
                setProgress(data.progress || 0);
            }
        } catch (error) {
            console.error("Error fetching progress:", error);
        }
    };

    const uploadImages = async () => {
        const uploadedUrls: string[] = [];
        for (const uri of images) {
            try {
                const base64 = await FileSystem.readAsStringAsync(uri, {
                    encoding: 'base64',
                });
                const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

                const { error } = await supabase.storage
                    .from('project-updates')
                    .upload(fileName, decode(base64), {
                        contentType: 'image/jpeg',
                    });

                if (error) throw error;

                const { data: { publicUrl } } = supabase.storage
                    .from('project-updates')
                    .getPublicUrl(fileName);

                uploadedUrls.push(publicUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
                throw new Error("Failed to upload one or more images.");
            }
        }
        return uploadedUrls;
    };

    const handleSave = async () => {
        if (!title || !description) {
            Alert.alert("Missing Fields", "Please provide a title and description.");
            return;
        }

        if (!projectId) {
            Alert.alert("Error", "No project selected.");
            return;
        }

        setLoading(true);
        try {
            // 1. Upload images first
            const imageUrls = await uploadImages();

            // 2. Save update with image URLs
            const { error: updateError } = await supabase.from("updates").insert({
                project_id: projectId,
                title,
                description,
                created_by: session?.user.id,
                date: date.toISOString(),
                images: imageUrls,
            });

            if (updateError) throw updateError;

            // 3. Update project progress
            const { error: projectError } = await supabase
                .from('projects')
                .update({ progress })
                .eq('id', projectId);

            if (projectError) throw projectError;

            Alert.alert("Success", "Update added successfully!");
            router.replace("/manager");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <View className="flex-row justify-between items-center px-6 pt-14 pb-4 bg-white shadow-sm">
                <Pressable onPress={() => router.replace("/manager")}>
                    <Text className="font-sans text-[#162C3E] font-medium text-base">Cancel</Text>
                </Pressable>
                <Text className="font-serif text-xl text-[#162C3E] font-bold">New Update</Text>
                <Pressable onPress={handleSave} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#162C3E" />
                    ) : (
                        <Text className="font-sans text-[#162C3E] font-medium text-base">Save</Text>
                    )}
                </Pressable>
            </View>

            <ScrollView className="flex-1 px-6 pt-6">
                {/* Image Upload Area */}
                <View className="mb-6">
                    {images.length === 0 ? (
                        <Pressable onPress={pickImages} className="bg-[#E5E5E5] h-48 rounded-2xl items-center justify-center border-2 border-dashed border-gray-400">
                            <View className="bg-[#162C3E] w-12 h-12 rounded-full items-center justify-center mb-3">
                                <Feather name="plus" size={24} color="white" />
                            </View>
                            <Text className="font-sans text-[#162C3E] font-medium">Tap to add photos</Text>
                            <Text className="font-sans text-gray-500 text-xs">Up to 6 photos</Text>
                        </Pressable>
                    ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                            <Pressable onPress={pickImages} className="w-24 h-32 bg-[#E5E5E5] rounded-xl items-center justify-center border-2 border-dashed border-gray-400 mr-3">
                                <Feather name="plus" size={24} color="#162C3E" />
                            </Pressable>
                            {images.map((uri, index) => (
                                <View key={index} className="relative mr-3">
                                    <Image source={{ uri }} className="w-32 h-32 rounded-xl" />
                                    <Pressable
                                        onPress={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                                    >
                                        <Feather name="x" size={12} color="white" />
                                    </Pressable>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>

                {/* Fields */}
                <View className="gap-4 mb-10">
                    <TextInput
                        placeholder="Short Title"
                        placeholderTextColor="#9CA3AF"
                        className="bg-[#E5E5E5] p-4 rounded-xl font-sans text-[#162C3E]"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Pressable
                        onPress={() => setShowDatePicker(true)}
                        className="bg-[#E5E5E5] p-4 rounded-xl flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center gap-3">
                            <Feather name="calendar" size={20} color="#162C3E" />
                            <Text className="font-sans text-[#162C3E]">
                                {date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </Text>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9CA3AF" />
                    </Pressable>

                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}

                    <View className="bg-[#E5E5E5] p-4 rounded-xl">
                        <View className="flex-row justify-between mb-2">
                            <Text className="font-sans text-[#162C3E] font-medium">Overall Progress</Text>
                            <Text className="font-sans text-[#162C3E] font-bold">{progress}%</Text>
                        </View>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            value={progress}
                            onValueChange={setProgress}
                            minimumTrackTintColor="#162C3E"
                            maximumTrackTintColor="#9CA3AF"
                            thumbTintColor="#162C3E"
                        />
                    </View>

                    <TextInput
                        placeholder="Description"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={6}
                        className="bg-[#E5E5E5] p-4 rounded-xl font-sans text-[#162C3E] h-40"
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
