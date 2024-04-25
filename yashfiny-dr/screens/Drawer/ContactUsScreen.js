import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native"
import i18n from "../../i18n";
import { Colors } from "../../constants/colors";

const ContactUsScreen = () => {
    const navigation = useNavigation()
    const [message, setMessage] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: i18n.t('contact_us')
        })
    }, [navigation])

    const sendMessage = () => {
        console.log("Message sent:", message);
        setMessage('');
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Image source={require('../../assets/contactUsIcon.png')} style={styles.image} />
                    <Text style={styles.messagesText}>{i18n.t('contact_us_text')}</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type your message here..."
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendButtonText}>{i18n.t('send')}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
export default ContactUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    image: {
        width: 250,
        height: 200,
        marginBottom: 5,
    },
    messagesText: {
        marginHorizontal: 15,
        paddingHorizontal: 5,
        textAlign: 'center',
        color: Colors.primary800,
        fontSize: 16,
        marginBottom: 30,
    },
    textInput: {
        width: '80%',
        height: 120,
        borderColor: Colors.primary800,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: 'white'
    },
    sendButton: {
        backgroundColor: Colors.primary800,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
    }
})
