import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import DiseaseSelectModal from "../../components/modals/DiseaseSelectModal";
import MedicationSelectModal from "../../components/modals/MedicationSelectModal";

export default function ProfileForm() {
    const [gender, setGender] = useState<"남성" | "여성" | null>(null);
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const [diseases, setDiseases] = useState<string[]>([]);
    const [medications, setMedications] = useState<string[]>([]);
    const [diseaseModalOpen, setDiseaseModalOpen] = useState(false);
    const [medicationModalOpen, setMedicationModalOpen] = useState(false);

    const handleSubmit = () => {
        router.replace("/(tabs)/home");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* 상단 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.headerText}>프로필 입력</Text>
            </View>

            {/* 성별 선택 */}
            <View style={styles.radioGroup}>
                {["남성", "여성"].map((item) => (
                    <TouchableOpacity key={item} onPress={() => setGender(item as "남성" | "여성")} style={styles.radioItem}>
                        <View
                            style={[
                                styles.radioCircle,
                                gender === item && styles.radioCircleSelected,
                            ]}
                        />
                        <Text style={styles.radioLabel}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 입력 필드 */}
            <TextInput
                style={styles.input}
                placeholder="나이"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />
            <TextInput
                style={styles.input}
                placeholder="키 (cm)"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
            />
            <TextInput
                style={styles.input}
                placeholder="몸무게 (kg)"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />

            {/* 지병 */}
            <View style={styles.inputWithButton}>
                <TextInput
                    style={styles.flexInput}
                    placeholder="지병"
                    placeholderTextColor="#9CA3AF"
                    value={diseases.join(", ")}
                    editable={false}
                />
                <TouchableOpacity onPress={() => setDiseaseModalOpen(true)}>
                    <Ionicons name="add" size={20} color="#111827" />
                </TouchableOpacity>
            </View>

            {/* 복용 중인 약물 */}
            <View style={styles.inputWithButton}>
                <TextInput
                    style={styles.flexInput}
                    placeholder="복용 중인 약물"
                    placeholderTextColor="#9CA3AF"
                    value={medications.join(", ")}
                    editable={false}
                />
                <TouchableOpacity onPress={() => setMedicationModalOpen(true)}>
                    <Ionicons name="add" size={20} color="#111827" />
                </TouchableOpacity>
            </View>

            {/* 저장 */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>저장하기</Text>
            </TouchableOpacity>

            {/* 모달 */}
            <DiseaseSelectModal
                visible={diseaseModalOpen}
                selected={diseases}
                onClose={() => setDiseaseModalOpen(false)}
                onSave={(items) => {
                    setDiseases(items);
                    setDiseaseModalOpen(false);
                }}
            />
            <MedicationSelectModal
                visible={medicationModalOpen}
                selected={medications}
                onClose={() => setMedicationModalOpen(false)}
                onSave={(items) => {
                    setMedications(items);
                    setMedicationModalOpen(false);
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingHorizontal: 24,
        paddingBottom: 60,
        backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40,
    },
    backButton: {
        marginRight: 8,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111827",
    },
    radioGroup: {
        flexDirection: "row",
        marginBottom: 24,
        gap: 24,
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: "#9CA3AF",
        marginRight: 8,
    },
    radioCircleSelected: {
        backgroundColor: "#111827",
        borderColor: "#111827",
    },
    radioLabel: {
        fontSize: 16,
        color: "#111827",
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        fontSize: 16,
        paddingVertical: 12,
        marginBottom: 24,
    },
    inputWithButton: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        marginBottom: 24,
    },
    flexInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
    },
    submitButton: {
        backgroundColor: "#D92B4B",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },
    submitButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
