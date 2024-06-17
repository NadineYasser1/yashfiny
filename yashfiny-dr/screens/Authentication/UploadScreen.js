import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View, Text, TextInput, Pressable, ScrollView, TouchableOpacity, Alert } from "react-native";
import i18n from "../../i18n";
import { Colors } from "../../constants/colors";
import CustomDropdown from "../../components/CustomDropDown";
import { IconButton } from "react-native-paper";
import UploadButton from "../../components/UploadButton";
import SuccessModal from "../../components/SucessModal";
import { axios } from "../../utils/axios";
import { API } from "../../utils/config";
import LoadingScreen from "../../components/LoadingScreen";
import useLoading from "../../hooks/useLoading";
import Layout from "../../components/Layout";


const UploadScreen = ({ route, navigation }) => {

    const doctorId = route.params
    const [documents, setDocuments] = useState([])
    const [Success, setSuccess] = useState(false)
    const { loading, setIsLoading } = useLoading()


    const handleAddDoc = (key, doc) => {
        setDocuments((prev) => ({
            ...prev,
            [key]: doc
        }))
    }

    const handleContinue = () => {
        setSuccess(true)
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: !Success
        });
    }, [Success]);

    const renderScreen = () => {
        if (Success) {
            return (
                <SuccessModal title={i18n.t('account_created')} text={i18n.t('awaiting_approval_signup_text')} screenName='Login' />
            )
        } else {
            return (
                <Layout loading={loading}>
                    <LinearGradient
                        colors={[Colors.primary800, 'white']}
                        locations={[0.6, 1]}
                        style={{ flex: 1 }}
                    >
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior={Platform.OS == "ios" ? "padding" : "height"}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
                        >
                            <ScrollView style={styles.container}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.fpText}>{i18n.t('one_last_step')}</Text>
                                </View>
                                <UploadButton label={i18n.t('medical_license')} buttonText={i18n.t('upload_medical_license')} handleSelection={handleAddDoc} fnKey={'medical_license'} doctorId={doctorId} />
                                <UploadButton label={i18n.t('academic_deg')} buttonText={i18n.t('upload_academic_deg')} handleSelection={handleAddDoc} fnKey={'academic_degree'} doctorId={doctorId} />
                                <UploadButton label={i18n.t('certificates')} buttonText={i18n.t('upload_certificates')} handleSelection={handleAddDoc} fnKey={'certificates'} doctorId={doctorId} />
                                <View style={styles.workinghrsContainer}>
                                    <Text style={styles.label}>{i18n.t('working_hours')}</Text>
                                    <Pressable style={styles.hoursButton} onPress={() => navigation.navigate('Availability', doctorId)}>
                                        <IconButton icon='calendar-clock' iconColor={Colors.primary800} size={25} />
                                        <Text style={{ color: Colors.primary800 }}>{i18n.t('add_working_hours')}</Text>
                                    </Pressable>
                                    <Text style={styles.text}>{i18n.t('you_can_edit_workinghrs_txt')}</Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.continueButton}
                                    onPress={handleContinue}
                                >
                                    <Text style={styles.continueButtonText}>{i18n.t("done")}</Text>
                                </TouchableOpacity>

                            </ScrollView>
                        </KeyboardAvoidingView>
                    </LinearGradient>
                </Layout>
            )
        }
    }

    return (<>
        {renderScreen()}
    </>
    )
}
export default UploadScreen;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 5,
    },
    fpText: {
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.grey100,
        fontSize: 18,
        fontWeight: "600",
        marginTop: 30,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 30
    },
    textContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        marginTop: 10,
        alignContent: "flex-start",
        marginLeft: 5,
    },
    label: {
        fontSize: 15,
        color: "white",
        fontWeight: "600",
        paddingHorizontal: 10,
    },
    input: {
        width: "50%",
        height: 40,
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 12,
        padding: 10,
        fontSize: 15,
        borderColor: Colors.primary800,
        marginEnd: 20,
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
    workinghrsContainer: {
        marginTop: 22,
        alignContent: "flex-start",
        marginLeft: 10,
    },
    hoursButton: {
        width: "70%",
        height: 40,
        backgroundColor: Colors.white100,
        borderRadius: 10,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        borderColor: Colors.primary800,
        marginEnd: 20,
    },
    text: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        color: 'grey',
        fontSize: 13,
        fontWeight: "600",
        marginTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 30
    },
    continueButton: {
        backgroundColor: Colors.primary600,
        padding: 10,
        width: '30%',
        borderRadius: 25,
        marginTop: 5,
        elevation: 2,
        shadowColor: Colors.primary800,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginLeft: 'auto',
        marginRight: 20,
        marginBottom: 50
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: "300",
        color: "white",
        alignSelf: "center",
    },
})