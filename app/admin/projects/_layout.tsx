import { Stack } from "expo-router";

export default function ProjectsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: "#F5F5F5",
                },
                headerTintColor: "#162C3E",
                headerTitleStyle: {
                    fontFamily: "PlayfairDisplay_700Bold",
                },
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
            <Stack.Screen name="new" options={{ headerShown: false }} />
            <Stack.Screen name="upload" options={{ headerShown: false }} />
        </Stack>
    );
}
