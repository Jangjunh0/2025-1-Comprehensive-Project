// 📄 ProfileDetailScreen.tsx
// 사용자의 전체 프로필 정보를 조회하고 수정할 수 있는 화면입니다.
// 이름, 성별, 나이, 키, 몸무게, 지병, 약물을 포함합니다.

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
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { fetchCurrentUser, updateUserProfile } from "@/services/user.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import BackButton from "@/common/BackButton";
import { toKoreanGender, toEnglishGender } from "@/utils/gender";

import DiseaseSelectModal from "@/modals/disease-select.modal";
import MedicationSelectModal from "@/modals/medication-select.modal";
import { fetchAllDiseases } from "@/services/disease.api";
import { fetchAllMedications } from "@/services/medication.api";

export default function ProfileDetailScreen() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [editField, setEditField] = useState<string | null>(null);

    // ✅ 사용자 전체 프로필 정보 가져오기
    const { data: profile, refetch } = useQuery({
        queryKey: ["user", user?.id],
        queryFn: () => fetchCurrentUser(user!.id),
        enabled: !!user?.id,
    });

    const [editableProfile, setEditableProfile] = useState({
        name: "",
        gender: "",
        age: "",
        height: "",
        weight: "",
        diseases: "",
        medications: "",
    });

    useEffect(() => {
        if (profile) {
            setEditableProfile({
                name: profile.name ?? "",
                gender: toKoreanGender(profile.gender ?? ""),
                age: String(profile.age ?? ""),
                height: String(profile.height ?? ""),
                weight: String(profile.weight ?? ""),
                diseases: profile.diseases?.map((d: any) => d.name).join(", ") ?? "",
                medications: profile.medications?.map((m: any) => m.name).join(", ") ?? "",
            });
        }
    }, [profile]);

    // ✅ 질병/약물 리스트 가져오기
    const { data: diseaseList = [], isLoading: isDiseaseLoading } = useQuery({
        queryKey: ["diseases"],
        queryFn: fetchAllDiseases,
    });
    const { data: medicationList = [], isLoading: isMedicationLoading } = useQuery({
        queryKey: ["medications"],
        queryFn: fetchAllMedications,
    });

    const [diseaseModalOpen, setDiseaseModalOpen] = useState(false);
    const [medicationModalOpen, setMedicationModalOpen] = useState(false);

    // ✅ 서버에 수정사항 저장
    const mutation = useMutation({
        mutationFn: async () => {
            return updateUserProfile({
                id: user!.id,
                gender: toEnglishGender(editableProfile.gender),
                age: Number(editableProfile.age),
                height: parseFloat(editableProfile.height),
                weight: parseFloat(editableProfile.weight),
                diseases: editableProfile.diseases
                    .split(",")
                    .map((d) => d.trim())
                    .filter(Boolean),
                medications: editableProfile.medications
                    .split(",")
                    .map((m) => m.trim())
                    .filter(Boolean),
            });
        },
        onSuccess: () => {
            Alert.alert("저장 완료", "프로필 정보가 저장되었습니다.");
            refetch();
            router.replace("/(tabs)/home");
        },
        onError: () => {
            Alert.alert("오류", "프로필 저장에 실패했습니다.");
        },
    });

    const handleChange = (key: keyof typeof editableProfile, value: string) => {
        setEditableProfile((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        mutation.mutate();
    };

    return (
        <View style={styles.root}>
            <BackButton style={{ position: "absolute", top: 20, left: 16, zIndex: 10 }} />

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>프로필 정보</Text>

                {/* 이름 + 이메일 */}
                <View style={styles.card}>
                    <View style={styles.rowWithEdit}>
                        {editField === "name" ? (
                            <TextInput
                                style={styles.userName}
                                value={editableProfile.name}
                                onChangeText={(v) => handleChange("name", v)}
                                onBlur={() => setEditField(null)}
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.userName}>{editableProfile.name}</Text>
                        )}
                        <TouchableOpacity onPress={() => setEditField("name")}>
                            <Ionicons name="create-outline" size={16} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userEmail}>{user?.email}</Text>
                </View>

                {/* 상세 정보 항목들 */}
                <View style={styles.infoBox}>
                    {[
                        { key: "gender", label: "성별" },
                        { key: "age", label: "나이" },
                        { key: "height", label: "키" },
                        { key: "weight", label: "몸무게" },
                        { key: "diseases", label: "지병" },
                        { key: "medications", label: "복용 약물" },
                    ].map((item) => (
                        <EditableText
                            key={item.key}
                            label={item.label}
                            value={editableProfile[item.key as keyof typeof editableProfile]}
                            editable={editField === item.key}
                            onEdit={() => {
                                if (item.key === "diseases") return setDiseaseModalOpen(true);
                                if (item.key === "medications") return setMedicationModalOpen(true);
                                setEditField(item.key);
                            }}
                            onChange={(v) =>
                                handleChange(item.key as keyof typeof editableProfile, v)
                            }
                            onBlur={() => setEditField(null)}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>저장</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* 지병 모달 */}
            <DiseaseSelectModal
                visible={diseaseModalOpen}
                selected={editableProfile.diseases
                    .split(",")
                    .map((d) => d.trim())
                    .filter(Boolean)}
                diseaseList={diseaseList}
                isLoading={isDiseaseLoading}
                onClose={() => setDiseaseModalOpen(false)}
                onSave={(items) => {
                    setEditableProfile((prev) => ({
                        ...prev,
                        diseases: items.join(", "),
                    }));
                    setDiseaseModalOpen(false);
                }}
            />

            {/* 약물 모달 */}
            <MedicationSelectModal
                visible={medicationModalOpen}
                selected={editableProfile.medications
                    .split(",")
                    .map((m) => m.trim())
                    .filter(Boolean)}
                medicationList={medicationList}
                isLoading={isMedicationLoading}
                onClose={() => setMedicationModalOpen(false)}
                onSave={(items) => {
                    setEditableProfile((prev) => ({
                        ...prev,
                        medications: items.join(", "),
                    }));
                    setMedicationModalOpen(false);
                }}
            />
        </View>
    );
}

// 🔸 항목 단위 입력 필드 컴포넌트
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
    const isAddButton = label === "지병" || label === "복용 약물";

    return (
        <View style={styles.itemRow}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemLabel}>{label}</Text>
                <TouchableOpacity onPress={onEdit}>
                    <Ionicons
                        name={isAddButton ? "add" : "create-outline"}
                        size={isAddButton ? 20 : 16}
                        color="#6B7280"
                    />
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
        backgroundColor: "#F9FAFB",
    },
    container: {
        paddingTop: 70,
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1D4ED8",
        marginBottom: 32,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        paddingVertical: 30,
        paddingHorizontal: 24,
        marginBottom: 28,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    rowWithEdit: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom: 8,
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#111827",
    },
    userEmail: {
        fontSize: 14,
        color: "#6B7280",
    },
    infoBox: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 12,
        marginBottom: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    itemRow: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    itemLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B7280",
    },
    itemValue: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1F2937",
    },
    itemInput: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1F2937",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#F9FAFB",
    },
    saveButton: {
        backgroundColor: "#D92B4B", // 기존 빨간색 유지
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    saveText: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 16,
    },
});
