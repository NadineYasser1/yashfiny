import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Alert, Platform } from "react-native";
import { IconButton } from "react-native-paper";
import { Colors } from "../constants/colors";
import * as DocumentPicker from 'expo-document-picker';
import { documentUploader } from "../utils/documentUploader";

const UploadButton = ({ label, buttonText, handleSelection, fnKey }) => {

    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const data = new FormData()

    useEffect(() => {
        handleSelection(fnKey, selectedDocuments);

    }, [selectedDocuments]);

    const handleSuccess = (result) => {
        result.assets.map((res) => {
            setSelectedDocuments((prev) => [
                ...prev,
                {
                    name: res.name,
                    type: res.mimeType,
                    size: res.size,
                    uri: res.uri
                }
            ]);
        });

    }

    const onPress = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                multiple: true,
            });
            if (result.canceled == false) {
                result.assets.map((res) => {
                    data.append('file', {
                        name: res.name,
                        type: res.mimeType,
                        size: res.size,
                        uri: Platform.OS == 'ios' ? res.uri.replace('file://', '') : res.uri

                    })
                });
                documentUploader(data, result, handleSuccess)
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "An error occurred while selecting document. Please try again later.",
                [
                    { text: "OK", onPress: () => { } }
                ],
                { cancelable: true }
            );
        }

    };

    const deleteDocument = (index) => {
        setSelectedDocuments((prev) => prev.filter((_, i) => i !== index));
    };

    const getIconName = (type) => {
        switch (type) {
            case 'application/pdf': {
                return 'file-pdf-box'
            }
            case 'text/plain': {
                return 'text-box'
            }
            case 'application/msword': {
                return 'file-word'
            }
            case 'image/jpeg': {
                return 'image'
            }
            case 'image/png': {
                return 'image'
            }
            default: {
                return 'text-box'
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{label}</Text>
                <Pressable style={styles.uploadButton} onPress={onPress}>
                    <IconButton icon='cloud-upload' iconColor={Colors.accent800} size={25} />
                    <Text style={{ color: Colors.primary800 }}>{buttonText}</Text>
                </Pressable>
                {selectedDocuments.length > 0 && (
                    <View>
                        {selectedDocuments.map((document, index) => (
                            <View key={index} style={styles.documentContainer}>
                                <View style={styles.documentInfoContainer}>
                                    <IconButton icon={getIconName(document.type)} size={30} iconColor={Colors.accent800} />
                                    <Text style={styles.documentName}>{document.name}</Text>
                                </View>
                                <IconButton
                                    icon='delete'
                                    size={25}
                                    iconColor={Colors.accent700}
                                    onPress={() => deleteDocument(index)}
                                    style={styles.deleteButton}
                                />
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

export default UploadButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    documentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    documentInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    documentName: {
        marginLeft: 10,
        fontSize: 16,
        color: 'white'
    },
    inputContainer: {
        marginTop: 25,
        alignContent: "flex-start",
        marginLeft: 5,
    },
    label: {
        fontSize: 15,
        color: "white",
        fontWeight: "600",
        paddingHorizontal: 10,
    },
    uploadButton: {
        width: "70%",
        height: 40,
        backgroundColor: Colors.white100,
        borderRadius: 20,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        borderColor: Colors.primary800,
        marginEnd: 20,
    },
    deleteButton: {
        alignSelf: 'flex-start',
    },
});
