import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileDetailScreen() {
    const router = useRouter();

    const [profile, setProfile] = useState({
        name: "홍길동",
        email: "user@example.com", // 수정 ❌
        gender: "남성",
        age: "25",
        height: "175",
        weight: "68",
        disease: "고혈압",
        medication: "세비카",
    });

    const [editField, setEditField] = useState<string | null>(null);

    const handleChange = (key: keyof typeof profile, value: string) => {
        setProfile((prev) => ({ ...prev, [key]: value }));
    };

// 기존 handleSave 함수 수정
const handleSave = () => {
    console.log("✅ 저장된 프로필:", profile);
    Alert.alert("저장 완료", "프로필 정보가 저장되었습니다.");
    router.replace("/(tabs)/home"); // ✅ 저장 후 홈으로 이동
};


    return (
        <View style={styles.root}>
            {/* 🔙 뒤로가기 버튼 */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="#111827" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* 타이틀 */}
                <Text style={styles.title}>프로필 정보</Text>

                {/* 이름 + 이메일 카드 */}
                <View style={styles.card}>
                    {/* 이름 수정 가능 */}
                    <View style={styles.rowWithEdit}>
                        {editField === "name" ? (
                            <TextInput
                                style={styles.userName}
                                value={profile.name}
                                onChangeText={(v) => handleChange("name", v)}
                                onBlur={() => setEditField(null)}
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.userName}>{profile.name}</Text>
                        )}
                        <TouchableOpacity onPress={() => setEditField("name")}>
                            <Ionicons name="create-outline" size={16} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    {/* 이메일 수정 불가 */}
                    <Text style={styles.userEmail}>{profile.email}</Text>
                </View>

                {/* 상세 정보 */}
                <View style={styles.infoBox}>
                    {[
                        { key: "gender", label: "성별" },
                        { key: "age", label: "나이" },
                        { key: "height", label: "키" },
                        { key: "weight", label: "몸무게" },
                        { key: "disease", label: "지병" },
                        { key: "medication", label: "복용 약물" },
                    ].map((item) => (
                        <EditableText
                            key={item.key}
                            label={item.label}
                            value={profile[item.key as keyof typeof profile]}
                            editable={editField === item.key}
                            onEdit={() => setEditField(item.key)}
                            onChange={(v) => handleChange(item.key as keyof typeof profile, v)}
                            onBlur={() => setEditField(null)}
                        />
                    ))}
                </View>

                {/* 저장 버튼 */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>저장</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

function EditableText({
    label,
    value,
    editable,
    onEdit,
    onChange,
    onBlur,
}: {
    label: string;
    value: string;
    editable: boolean;
    onEdit: () => void;
    onChange: (text: string) => void;
    onBlur: () => void;
}) {
    return (
        <View style={styles.itemRow}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemLabel}>{label}</Text>
                <TouchableOpacity onPress={onEdit}>
                    <Ionicons name="create-outline" size={16} color="#6B7280" />
                </TouchableOpacity>
            </View>
            {editable ? (
                <TextInput
                    style={styles.itemInput}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoFocus
                />
            ) : (
                <Text style={styles.itemValue}>{value}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 16,
        zIndex: 10,
        padding: 8,
    },
    container: {
        paddingTop: 70,
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1E3A8A",
        marginBottom: 28,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingVertical: 28,
        paddingHorizontal: 20,
        marginBottom: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    rowWithEdit: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom: 6,
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111827",
    },
    userEmail: {
        fontSize: 14,
        color: "#6B7280",
    },
    infoBox: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 28,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    itemRow: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    itemLabel: {
        fontSize: 13,
        color: "#6B7280",
    },
    itemValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
    },
    itemInput: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
        paddingVertical: 2,
    },
    saveButton: {
        backgroundColor: "#D92B4B",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
    },
    saveText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
