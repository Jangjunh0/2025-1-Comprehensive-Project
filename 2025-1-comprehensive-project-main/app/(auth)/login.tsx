import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
    return (
        <View style={styles.container}>
            {/* 상단 헤더: 뒤로가기 + 타이틀 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.headerText}>이메일 로그인</Text>
            </View>

            {/* 이메일 입력 */}
            <TextInput
                style={styles.input}
                placeholder="이메일"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {/* 비밀번호 입력 */}
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
            />

            {/* 로그인 버튼 */}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => router.push("/(auth)/profile-form")}
            >
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>

            {/* 하단 링크 */}
            <View style={styles.footer}>
                <TouchableOpacity>
                    <Text style={styles.footerText}>아이디 찾기</Text>
                </TouchableOpacity>
                <Text style={styles.footerDivider}> | </Text>
                <TouchableOpacity>
                    <Text style={styles.footerText}>비밀번호 찾기</Text>
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
    loginButton: {
        backgroundColor: "#D92B4B",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 32,
    },
    loginButtonText: {
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
    footerDivider: {
        marginHorizontal: 12,
        color: "#D1D5DB",
    },
});
