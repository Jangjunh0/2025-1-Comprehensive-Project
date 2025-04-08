import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#D92B4B",
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarLabelStyle: { fontSize: 12 },
                tabBarLabelPosition: "below-icon", // ✅ 아이콘 아래로 라벨 배치
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    borderTopWidth: 0.5,
                    borderTopColor: "#E5E7EB",
                    height: 60,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "홈",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "기록",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: "설정",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
