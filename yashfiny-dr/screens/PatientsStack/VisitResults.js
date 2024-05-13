import React, { useContext, useEffect, useState, useMemo } from "react";
import { Text, View, Image, Pressable, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { HideTabContext } from "../../store/HideTabContext";
import InputField from "../../components/InputField";
import i18n from "../../i18n";
import CustomDropdown from "../../components/CustomDropDown";
import { Colors } from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { PatientsContext } from "../../store/PatientsContext";

const { width, height } = Dimensions.get('window');

const VisitResults = ({ navigation }) => {
    const [results, setResults] = useState({ diagnosis: [] });
    const [diagnosis, setDiagnosis] = useState();
    const [showDiag, setShowDiag] = useState(false);
    const { patientData } = useContext(PatientsContext)
    const hideTabCtx = useContext(HideTabContext);
    const dropdownOpts = [
        { key: 1, value: i18n.t('preliminary') },
        { key: 2, value: i18n.t('final') },
    ];

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
        if (val?.type && val?.name) {
            setResults((prev) => ({
                ...prev,
                diagnosis: [...prev.diagnosis, val],
            }));
            setDiagnosis({});
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
        navigation.navigate("PatientDetails", patientData.id)
    }
    const diagPatch = useMemo(() => {
        if (showDiag && results.diagnosis.length > 0) {
            return results.diagnosis.map((d, index) => (
                <View style={styles.diagnosisContainer} key={index}>
                    <Text style={styles.diagnosisText}>{d.name} {d.type}</Text>
                    <Pressable onPress={() => handleDelete(index)}>
                        <MaterialCommunityIcons name="close" color={Colors.red} size={13} />
                    </Pressable>
                </View>
            ));
        }
    }, [showDiag, results.diagnosis]);

    useEffect(() => {
        hideTabCtx.hideTab(true);
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../assets/visitResults.png')} style={{ width: width / 3, height: height / 6 }} />
                    </View>
                </View>
                <InputField label={i18n.t('ix')} showLabel inputKey={'ix'} handleChange={handleChange} />

                {diagPatch}

                <View style={styles.inputRow}>
                    <InputField label={i18n.t('diagnosis')} showLabel inputKey={'name'} handleChange={handleDiagnosisChange} style={{ width: '40%', marginEnd: 10 }} />
                    <CustomDropdown
                        options={dropdownOpts}
                        onSelect={(opt) => handleDiagnosisChange('type', findOptById(opt))}
                        style={{ height: 41, borderRadius: 5, marginTop: 3 }}
                    />
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Pressable
                            style={styles.addButton}
                            onPress={() => setShowDiag(true)}
                        >
                            <MaterialCommunityIcons name="plus" color={Colors.primary800} size={22} />
                        </Pressable>
                    </View>
                </View>
                <InputField label={i18n.t('advices')} showLabel inputKey={'advices'} handleChange={handleChange} multiline />
                <InputField label={i18n.t('summary')} showLabel inputKey={'summary'} handleChange={handleChange} multiline />
            </ScrollView>
            <View style={styles.saveButton}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>{i18n.t("save")}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        marginBottom: 10,
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
        marginTop: 50,
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
});

export default VisitResults;
