import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function ClientLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    height: 60,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: "#162C3E",
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontFamily: "Poppins_400Regular",
                    fontSize: 10,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="timeline"
                options={{
                    title: "Timeline",
                    tabBarIcon: ({ color }) => <Feather name="clock" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="documents"
                options={{
                    title: "Documents",
                    tabBarIcon: ({ color }) => <Feather name="file-text" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="update"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="update/[id]"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
