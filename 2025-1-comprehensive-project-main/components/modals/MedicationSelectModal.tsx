import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    visible: boolean;
    selected: string[];
    onClose: () => void;
    onSave: (items: string[]) => void;
}

const medicationOptions = ["세비카", "타이레놀", "아모잘탄", "루센티스"];

export default function MedicationSelectModal({ visible, selected, onClose, onSave }: Props) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        setSelectedItems(selected);
    }, [visible]);

    const toggleItem = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((i) => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="none">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>약물 선택</Text>
                    <FlatList
                        data={medicationOptions}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemRow}
                                onPress={() => toggleItem(item)}
                            >
                                <Ionicons
                                    name={selectedItems.includes(item) ? "checkbox" : "square-outline"}
                                    size={20}
                                    color="#111827"
                                    style={{ marginRight: 8 }}
                                />
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeText}>닫기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onSave(selectedItems)}>
                            <Text style={styles.saveText}>저장</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    container: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    footer: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    closeText: {
        color: "#6B7280",
        fontSize: 15,
    },
    saveText: {
        color: "#D92B4B",
        fontWeight: "bold",
        fontSize: 15,
    },
});
