/**
 * _layout.tsx
 * 하단 탭 네비게이션을 구성하는 레이아웃 파일입니다.
 * 이 파일은 `/tabs/*` 하위의 모든 화면에서 공유됩니다.
 */

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#2563eb",
                tabBarLabelStyle: { fontSize: 12 },
                tabBarLabelPosition: "below-icon", // ✅ 아이콘 아래 텍스트
                tabBarStyle: {
                    height: 61, // ✅ 탭 바 높이 늘려서 텍스트 짤림 방지
                    paddingBottom: 8, // ✅ 아래 여백도 주면 더 깔끔
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "홈",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={22} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "기록",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text-outline" color={color} size={22} />
                    ),
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: "설정",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={22} />
                    ),
                }}
            />
        </Tabs>
    );
}
