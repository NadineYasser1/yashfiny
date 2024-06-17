import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';

import { QUICK_MESSAGES } from '../constants/quickMessages';
import i18n from '../i18n';
import { Colors } from '../constants/colors';


const MessagesModal = ({ modalVisible, setModalVisible, handleSelectMessage, reqId }) => {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const toggleMessageSelection = (message) => {
        setSelectedMessage(selectedMessage === message ? null : message);
    };

    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{i18n.t('select_message')}</Text>
                    {QUICK_MESSAGES.map((message, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => toggleMessageSelection(message)}
                            style={[
                                styles.messageContainer,
                                selectedMessage === message && styles.selectedMessage,
                            ]}
                        >
                            <Text style={[styles.messageText, selectedMessage == message && { color: Colors.primary800, fontWeight: "500" }]}>{message}</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={styles.buttonContainer}>
                        <Button title={i18n.t('cancel')} onPress={() => {
                            setModalVisible(false)
                            setSelectedMessage(null)
                        }}
                        />
                        <View style={{ marginStart: 10 }}>
                            <Button
                                title={i18n.t('send')}
                                onPress={() => {
                                    handleSelectMessage(reqId, selectedMessage)
                                    setSelectedMessage(null)
                                }}
                                disabled={!selectedMessage}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        alignItems: 'flex-start',
        marginTop: 60
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.primary800
    },
    messageContainer: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.grey200,
        width: 300

    },
    selectedMessage: {
        backgroundColor: '#cfe2f3',
    },
    messageText: {
        fontSize: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        alignItems: 'flex-end',
        marginHorizontal: 10

    },
});

export default MessagesModal;
