import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [emailCheckResult, setEmailCheckResult] = useState<null | boolean>(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const checkEmailDuplicate = () => {
        if (!email.trim()) return;

        // ✅ 더미 로직 (실제 API로 교체 예정)
        if (email === "test@example.com") {
            setEmailCheckResult(false); // 이미 존재
        } else {
            setEmailCheckResult(true); // 사용 가능
        }
    };

    const isPasswordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

    return (
        <View style={styles.container}>
            {/* 상단 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.headerText}>회원가입</Text>
            </View>

            {/* 이름 */}
            <TextInput
                style={styles.input}
                placeholder="이름"
                placeholderTextColor="#9CA3AF"
            />

            {/* 이메일 + 중복 확인 */}
            <View style={styles.emailRow}>
                <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="이메일"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailCheckResult(null); // 메시지 초기화
                    }}
                />
                <TouchableOpacity style={styles.checkButton} onPress={checkEmailDuplicate}>
                    <Text style={styles.checkButtonText}>중복 확인</Text>
                </TouchableOpacity>
            </View>

            {/* ✅ 이메일 중복 확인 메시지 or 간격 유지용 View */}
            {emailCheckResult !== null ? (
                <Text
                    style={[
                        styles.resultMessage,
                        { color: emailCheckResult ? "#10B981" : "#EF4444" },
                    ]}
                >
                    {emailCheckResult
                        ? "가입 가능한 이메일입니다"
                        : "이미 존재하는 이메일입니다"}
                </Text>
            ) : (
                <View style={{ height: 24 }} /> // 고정 간격 확보
            )}

            {/* 비밀번호 */}
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* 비밀번호 확인 */}
            <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            {/* 비밀번호 불일치 메시지 */}
            {isPasswordMismatch ? (
                <Text style={styles.errorText}>비밀번호가 일치하지 않습니다</Text>
            ) : (
                <View style={{ height: 24 }} /> // 고정 간격 확보
            )}

            {/* 회원가입 버튼 */}
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => router.push("/(auth)/login")}
            >
                <Text style={styles.signupButtonText}>회원가입</Text>
            </TouchableOpacity>

            {/* 하단 로그인 링크 */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>이미 계정이 있으신가요?</Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                    <Text style={[styles.footerText, { fontWeight: "bold", marginLeft: 6 }]}>
                        로그인
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 80,
        paddingHorizontal: 24,
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
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        fontSize: 16,
        paddingVertical: 12,
        marginBottom: 24,
    },
    emailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
        gap: 8,
    },
    checkButton: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 6,
        backgroundColor: "#D92B4B",
        justifyContent: "center",
    },
    checkButtonText: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#ffffff",
    },
    resultMessage: {
        fontSize: 13,
        marginBottom: 24, // ✅ 통일된 간격
        marginLeft: 2,
    },
    errorText: {
        fontSize: 13,
        color: "#EF4444",
        marginBottom: 24, // ✅ 통일된 간격
        marginLeft: 2,
    },
    signupButton: {
        backgroundColor: "#D92B4B",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 32,
    },
    signupButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    footerText: {
        color: "#111827",
        fontSize: 14,
    },
});
