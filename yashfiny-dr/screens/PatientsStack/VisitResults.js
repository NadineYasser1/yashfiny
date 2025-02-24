import React, { useContext, useEffect, useState, useMemo } from "react";
import { Text, View, Image, Pressable, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { HideTabContext } from "../../store/HideTabContext";
import InputField from "../../components/InputField";
import i18n from "../../i18n";
import CustomDropdown from "../../components/CustomDropDown";
import { Colors } from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { PatientsContext } from "../../store/PatientsContext";
import { axios } from "../../utils/axios";
import { API } from "../../utils/config";
import useLoading from "../../hooks/useLoading";
import Layout from "../../components/Layout";

const { width, height } = Dimensions.get('window');

const VisitResults = ({ navigation, route }) => {
    const appointmentId = route.params
    console.log("appointmentId " + appointmentId)
    const [results, setResults] = useState({ diagnosis: [] });
    const [diagnosis, setDiagnosis] = useState({ name: '', type: '', show: false });
    const { patientData } = useContext(PatientsContext)
    const { setIsLoading, loading } = useLoading()
    const hideTabCtx = useContext(HideTabContext);
    const dropdownOpts = [
        { key: 1, value: i18n.t('preliminary') },
        { key: 2, value: i18n.t('final') },
    ];
    console.log(results)
    const handleChange = (key, val) => {
        setResults((prev) => ({
            ...prev,
            [key]: val,
        }));
    };

    const findOptById = (id) => {
        return dropdownOpts.find((opt) => opt.key == id).value;
    };

    const handleDiagnosisChange = (key, val) => {
        setDiagnosis((prev) => ({
            ...prev,
            [key]: val,
        }));
    };

    const handleAddDiagnosis = () => {
        if (diagnosis.name && diagnosis.type) {
            setResults((prev) => ({
                ...prev,
                diagnosis: [...prev.diagnosis, diagnosis],
            }));
            setDiagnosis({ name: '', type: '', show: false });
        }
    };

    const handleDelete = (index) => {
        const updatedDiagnosis = [...results.diagnosis];
        updatedDiagnosis.splice(index, 1);
        setResults((prev) => ({
            ...prev,
            diagnosis: updatedDiagnosis,
        }));
    };

    const handleSave = () => {
        const body = {
            ...results,
            appointmentId: appointmentId
        }
        setIsLoading(true)
        axios.post(API.addVisitResults, body).then(({ data }) => {
            navigation.navigate('PatientDetails', { screen: 'PatientDetails', params: { patientId: patientData.id } });
        }).catch((err) => Alert.alert(err.response.data.message)).finally(() => setIsLoading(false))

    }

    const diagPatch = useMemo(() => {
        if (results.diagnosis) {
            return results.diagnosis.map((d, index) => (
                <View style={styles.diagnosisContainer} key={index}>
                    <Text style={styles.diagnosisText}>{d.name} {d.type}</Text>
                    <Pressable onPress={() => handleDelete(index)}>
                        <MaterialCommunityIcons name="close" color={Colors.red} size={13} />
                    </Pressable>
                </View>
            ));
        }
    }, [results.diagnosis]);

    const handleAddDrug = () => {
        navigation.navigate('AddDrug', appointmentId);
    }

    useEffect(() => {
        hideTabCtx.hideTab(true);
    }, []);

    return (
        <Layout loading={loading} style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../../assets/visitResults.png')} style={{ width: width / 3, height: height / 6 }} />
                        </View>
                    </View>
                    <InputField label={i18n.t('ix')} showLabel inputKey={'ix'} handleChange={handleChange} />

                    <View style={styles.inputRow}>
                        <InputField label={i18n.t('diagnosis')} showLabel inputKey={'name'} handleChange={(key, val) => handleDiagnosisChange(key, val)} value={diagnosis.name} style={{ width: '40%', marginEnd: 10 }} />
                        <CustomDropdown
                            options={dropdownOpts}
                            onSelect={(opt) => handleDiagnosisChange('type', findOptById(opt))}
                            selectedValue={diagnosis.type}
                            style={{ height: 44, width: 130, borderRadius: 5, marginTop: 0, padding: 0 }}
                        />
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Pressable
                                style={styles.addButton}
                                onPress={handleAddDiagnosis}
                            >
                                <MaterialCommunityIcons name="plus" color={Colors.primary800} size={22} />
                            </Pressable>
                        </View>
                    </View>
                    {diagPatch}
                    <InputField label={i18n.t('advices')} showLabel inputKey={'advices'} handleChange={handleChange} multiline />
                    <InputField label={i18n.t('summary')} showLabel inputKey={'summary'} handleChange={handleChange} multiline />
                    <View style={[styles.saveButton, { alignItems: 'flex-start', marginTop: 5, marginBottom: 0, marginStart: 10 }]}>
                        <TouchableOpacity style={styles.drugBtn} onPress={handleAddDrug}>
                            <MaterialCommunityIcons name="pill" color={Colors.accent800} size={24} />
                            <Text style={{ color: Colors.accent800, fontWeight: "600", marginHorizontal: 10 }}>{i18n.t("add_drug")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.saveButton}>
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>{i18n.t("save")}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    diagnosisContainer: {
        backgroundColor: Colors.grey200,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        margin: 10,
    },
    diagnosisText: {
        color: Colors.primary800,
        fontWeight: "400",
        fontSize: 14,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'space-between',
    },
    addButton: {
        borderRadius: 15,
        width: 30,
        height: 30,
        backgroundColor: Colors.grey200,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 5

    },
    addButtonText: {
        color: Colors.primary800,
        fontSize: 30,
        fontWeight: "500",
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveButton: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingBottom: 50
    },
    button: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary800
    },
    saveButtonText: {
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 17,
    },
    drugBtn: {
        width: "50%",
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
        elevation: 3, //shadow for android
        //shadow for ios:
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        shadowOpacity: 0.3,
    },
});

export default VisitResults;
