import React, { useContext, useEffect, useState, useMemo } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { HideTabContext } from "../../store/HideTabContext";
import InputField from "../../components/InputField";
import i18n from "../../i18n";
import CustomDropdown from "../../components/CustomDropDown";
import { Colors } from "../../constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import { PatientsContext } from "../../store/PatientsContext";
import { axios } from "../../utils/axios";
import { API } from "../../utils/config";
import useLoading from "../../hooks/useLoading";

const { width, height } = Dimensions.get('window');

const AddDrug = ({ navigation, route }) => {

    const hideTabCtx = useContext(HideTabContext);
    const patientCtx = useContext(PatientsContext)
    const { setIsLoading, loading } = useLoading()
    const [drug, setDrug] = useState({ name: '', duration: { time: '', type: '' }, instructions: '', time: '', dosage: '' });
    const patientId = patientCtx.patientData.id;
    const appointmentId = route.params
    console.log(appointmentId)

    const opts = [
        { key: 1, value: i18n.t('morning') },
        { key: 2, value: i18n.t('noon') },
        { key: 3, value: i18n.t('evening') },
        { key: 4, value: i18n.t('night') },
    ];

    const durationOpts = [
        { key: 1, value: i18n.t('days') },
        { key: 2, value: i18n.t('weeks') },
        { key: 3, value: i18n.t('months') },
        { key: 4, value: i18n.t('years') },
    ];

    const findOptById = (options, id) => {
        return options.find((opt) => opt.key == id).value;
    };

    const handleSave = () => {
        let updatedDrug
        if (appointmentId) {
            updatedDrug = {
                ...drug,
                duration: `${drug.duration.time} ${drug.duration.type}`,
                appointmentId: appointmentId
            }
        } else {
            updatedDrug = {
                ...drug,
                duration: `${drug.duration.time} ${drug.duration.type}`,
                patientId: patientId
            }
        }
        console.log(updatedDrug)
        setIsLoading(true)
        axios.post(API.addDrug, updatedDrug).then(({ data }) => {
            Alert.alert(i18n.t('saved'), i18n.t('drug_saved'));
        }).catch((err) => Alert.alert(err.response.data.message)).finally(() => {
            setIsLoading(false)
            setDrug({ name: '', duration: { time: '', type: '' }, instructions: '', time: '', dosage: '' });
        })

    };

    useEffect(() => {
        hideTabCtx.hideTab(true);
    }, []);

    const handleChange = (key, val) => {
        if (key.includes('duration')) {
            const durationKey = key.split('[')[1].replace(']', '');
            setDrug((prev) => ({
                ...prev,
                duration: {
                    ...prev.duration,
                    [durationKey]: val,
                },
            }));
        } else {
            setDrug((prev) => ({
                ...prev,
                [key]: val,
            }));
        }
    };

    // console.log(drug)

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../assets/drug.png')} style={{ width: width / 3, height: height / 6 }} />
                    </View>
                </View>
                <View>
                    <InputField
                        label={i18n.t('name')}
                        showLabel={true}
                        placeholder={i18n.t('drug_name')}
                        inputKey={'name'}
                        handleChange={handleChange}
                        value={drug.name}
                    />
                    <InputField
                        label={i18n.t('instructions')}
                        showLabel={true}
                        handleChange={handleChange}
                        inputKey={'instructions'}
                        value={drug.instructions}
                    />
                    <InputField
                        label={i18n.t('dosage')}
                        showLabel={true}
                        placeholder='eg: 100 mg'
                        handleChange={handleChange}
                        inputKey={'dosage'}
                        value={drug.dosage}
                    />
                    <View style={{ marginTop: 25, alignContent: "flex-start", marginLeft: 10 }}>
                        <Text style={{ fontSize: 15, color: "black", fontWeight: "600", paddingHorizontal: 5 }}>{i18n.t('time')}</Text>
                        <CustomDropdown
                            options={opts}
                            onSelect={(key) => handleChange('time', findOptById(opts, key))}
                            selectedOpt={drug.time}
                        />
                    </View>
                    <View style={{ alignContent: "flex-start", marginStart: 2 }}>
                        {/* <Text style={{ fontSize: 15, color: "black", fontWeight: "600", paddingHorizontal: 5 }}>{i18n.t('duration')}</Text> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <InputField
                                label={i18n.t('duration')}
                                showLabel={true}
                                placeholder='eg: 10'
                                keyboardType='numeric'
                                handleChange={handleChange}
                                inputKey={'duration[time]'}
                                inputStyles={{ width: '100%', marginEnd: 10 }}
                                value={drug.duration.time}
                            />
                            <CustomDropdown
                                options={durationOpts}
                                onSelect={(key) => handleChange('duration[type]', findOptById(durationOpts, key))}
                                dropdownStyles={{ marginTop: 40, marginStart: 10 }}
                                selectedOpt={drug.duration.type}
                            />
                        </View>
                    </View>
                </View>
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
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButton: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        paddingBottom: 50,
    },
    button: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary800,
    },
    saveButtonText: {
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 17,
    },
});

export default AddDrug;
