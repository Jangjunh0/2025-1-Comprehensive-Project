import { View, Text, StyleSheet } from "react-native";

export default function HistoryTab() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>기록 탭</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    text: { fontSize: 18 },
});
