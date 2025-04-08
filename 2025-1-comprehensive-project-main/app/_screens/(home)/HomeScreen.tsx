// app/(tabs)/home.tsx

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { router } from "expo-router";

// ✅ 더미 프로필 데이터
const dummyProfile = {
    gender: "남성",
    age: "25",
    height: "175",
    weight: "68",
    disease: "고혈압",
    medication: "세비카",
};

export default function HomeScreen() {
    return (
        <ScrollView
            style={{ backgroundColor: "#ffffff" }}
            contentContainerStyle={[styles.container, { flexGrow: 1 }]}
        >
            {/* ✅ 상단 프로필 텍스트 */}
            <View style={styles.profileRow}>
                <Text style={styles.profileText}>프로필</Text>
            </View>

            {/* ✅ 배너에 프로필 정보 표시 */}
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>
                    {dummyProfile.age}세 {dummyProfile.gender} /{" "}
                    {dummyProfile.height}cm · {dummyProfile.weight}kg
                </Text>
                <Text style={styles.bannerSub}>
                    지병: {dummyProfile.disease || "없음"} | 약물:{" "}
                    {dummyProfile.medication || "없음"}
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        router.push("/_screens/(user)/ProfileDetailScreen")
                    }
                >
                    <Text style={styles.startText}>자세히 보기 &gt;</Text>
                </TouchableOpacity>
            </View>

            {/* ✅ 기능 제목 */}
            <Text style={styles.sectionTitle}>기능</Text>
            <Text style={styles.sectionSub}>
                주요 기능들을 바로 확인해보세요
            </Text>

            {/* ✅ 기능 카드 */}
            <View style={styles.grid}>
                {[
                    { label: "자가진단", icon: "🩺" }, // ✅ 아이콘 변경
                    { label: "건강 통계", icon: "📊" },
                    { label: "의료 도감", icon: "📖" },
                    { label: "기록 보기", icon: "🗂️" },
                ].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                        <Text style={styles.cardIcon}>{item.icon}</Text>
                        <Text style={styles.cardLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: "#ffffff",
    },
    profileRow: {
        marginBottom: 24,
    },
    profileText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
    },
    banner: {
        backgroundColor: "#EEF2FF",
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3730A3",
        marginBottom: 6,
    },
    bannerSub: {
        fontSize: 14,
        color: "#4B5563",
        marginBottom: 10,
    },
    startText: {
        color: "#3B82F6",
        fontWeight: "bold",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#111827",
    },
    sectionSub: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 12,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },
    card: {
        width: "47%",
        height: 100,
        backgroundColor: "#F9FAFB",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        elevation: 1,
    },
    cardIcon: {
        fontSize: 24,
        marginBottom: 6,
    },
    cardLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },
});
