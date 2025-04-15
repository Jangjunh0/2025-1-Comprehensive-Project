import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    Animated,
} from "react-native";
import { useRef } from "react";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth.store";
import { fetchCurrentUser } from "@/services/user.api";
import { toKoreanGender } from "@/utils/gender";

export default function HomeScreen() {
    const { user } = useAuthStore();

    const { data: profile } = useQuery({
        queryKey: ["user", user?.id],
        queryFn: () => fetchCurrentUser(user!.id),
        enabled: !!user?.id,
    });

    const cardItems = [
        { label: "자가진단", icon: "🩺", link: "/(record)/symptom" },
        { label: "건강 통계", icon: "📊" },
        { label: "의료 도감", icon: "📖" },
        { label: "기록 보기", icon: "🗂️", link: "/(tabs)/history" },
    ];

    return (
        <ScrollView
            style={{ backgroundColor: "#ffffff" }}
            contentContainerStyle={styles.container}
        >
            {/* 🔹 상단 제목 */}
            <Text style={styles.title}>프로필</Text>

            {/* 🔹 프로필 배너 */}
            <View style={styles.banner}>
                <Text style={styles.bannerTextBold}>
                    {profile?.age}세 {toKoreanGender(profile?.gender)} /{" "}
                    {profile?.height}cm · {profile?.weight}kg
                </Text>
                <Text style={styles.bannerText}>
                    지병:{" "}
                    {profile?.diseases?.length
                        ? profile.diseases.map((d) => d.name).join(", ")
                        : "없음"}
                </Text>
                <Text style={styles.bannerText}>
                    약물:{" "}
                    {profile?.medications?.length
                        ? profile.medications.map((m) => m.name).join(", ")
                        : "없음"}
                </Text>
                <TouchableWithoutFeedback
                    onPress={() => router.push("/(user)/profile-detail")}
                >
                    <Text style={styles.linkText}>자세히 보기 &gt;</Text>
                </TouchableWithoutFeedback>
            </View>

            {/* 🔹 기능 제목 */}
            <Text style={styles.sectionTitle}>기능</Text>
            <Text style={styles.sectionSub}>주요 기능들을 바로 확인해보세요</Text>

            {/* 🔹 기능 카드 */}
            <View style={styles.grid}>
                {cardItems.map((item, index) => {
                    const scale = useRef(new Animated.Value(1)).current;

                    const onPressIn = () => {
                        Animated.spring(scale, {
                            toValue: 0.95,
                            useNativeDriver: true,
                        }).start();
                    };

                    const onPressOut = () => {
                        Animated.spring(scale, {
                            toValue: 1,
                            useNativeDriver: true,
                        }).start();
                    };

                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            onPress={() => item.link && router.push(item.link)}
                        >
                            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
                                <Text style={styles.cardIcon}>{item.icon}</Text>
                                <Text style={styles.cardLabel}>{item.label}</Text>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 80,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 20,
    },
    banner: {
        backgroundColor: "#EEF2FF",
        padding: 20,
        borderRadius: 20,
        marginBottom: 32,
    },
    bannerTextBold: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E3A8A",
        marginBottom: 8,
    },
    bannerText: {
        fontSize: 14,
        color: "#374151",
    },
    linkText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2563EB",
        marginTop: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 4,
    },
    sectionSub: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 16,
        columnGap: 10,
    },
    card: {
        width: "47%",
        aspectRatio: 1,
        backgroundColor: "#ffffff",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    cardIcon: {
        fontSize: 28,
        marginBottom: 6,
    },
    cardLabel: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
    },
});
