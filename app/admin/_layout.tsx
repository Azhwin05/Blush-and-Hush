import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AdminLayout() {
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
                name="projects"
                options={{
                    title: "Projects",
                    tabBarIcon: ({ color }) => <Feather name="clipboard" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="clients/index"
                options={{
                    title: "Clients",
                    tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="managers/index"
                options={{
                    title: "Managers",
                    tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
