import { useContext, useEffect, useMemo, useState } from "react"
import { HideTabContext } from "../store/HideTabContext"
import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import i18n from "../i18n"
import { useNavigation } from "@react-navigation/native"
import { Colors } from "../constants/colors"
import InputField from "./InputField"
import DatePicker from "./DatePicker"
import GenderPicker from "./GenderPicker"
import UploadAvatar from "./UploadAvatar"
import { ScrollView } from "react-native-gesture-handler"
import DiseaseDateSelector from "./DiseaseDateSelector"
import dayjs from "dayjs"

const RegistrationForm = () => {
    const navigation = useNavigation()
    const [data, setData] = useState({ date: new Date() })
    const [history, setHistory] = useState()
    const hideTabCtx = useContext(HideTabContext)
    useEffect(() => {
        hideTabCtx.hideTab(true)
    }, [])

    const handleSave = () => {
        hideTabCtx.hideTab(false)
        navigation.goBack()
    }
    const handleChange = (key, val) => {
        setData((prev) => ({
            ...prev,
            [key]: val
        }))
    }
    const handleDiseaseChange = (key, val) => {
        setHistory((prev) => ({
            ...prev,
            [key]: val
        }))

    }
    const handleDelete = (disease) => {
        const updatedDiseases = { ...history };
        delete updatedDiseases[disease];
        setHistory(updatedDiseases);
    }
    console.log({
        ...data,
        history: history
    })


    const diseasePatch = useMemo(() => {
        if (history != undefined) {
            return (
                <View>
                    {Object.keys(history).map((diseaseName, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey200, padding: 8, borderRadius: 20, marginRight: 30, marginBottom: 10 }}>
                            <View style={{ marginHorizontal: 10, flexDirection: 'row' }}>
                                <Text style={{ color: Colors.primary800, fontSize: 14 }}>{diseaseName}</Text>
                                <Text style={{ color: Colors.grey300 }}> {i18n.t('from')} </Text>
                                <Text style={{ color: Colors.primary800 }}>{dayjs(history[diseaseName].from).format('DD-MM-YYYY')} </Text>
                                <Text style={{ color: Colors.grey300 }}>{i18n.t('to')} </Text>
                                <Text style={{ color: Colors.primary800 }}>{dayjs(history[diseaseName].to).format('DD-MM-YYYY')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDelete(diseaseName)}>
                                <Text style={{ color: 'red', marginLeft: 2, fontSize: 14, fontWeight: "700" }}>x</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            );
        };
        return null
    }, [history])


    return (
        <View style={styles.container}>
            <ScrollView>
                <UploadAvatar handleChange={handleChange} />
                <View style={styles.nameInput}>
                    <InputField label={i18n.t('full_name')} placeholder={i18n.t('fname')} showLabel handleChange={handleChange} inputKey={'fname'} />
                    <View style={styles.inputNoLabel}>
                        <InputField placeholder={i18n.t('lname')} handleChange={handleChange} inputKey={'lname'} />
                    </View>
                </View>
                <View style={styles.dateGenderContainer}>
                    <DatePicker date={data.date} handleChange={handleChange} label={i18n.t('bdate')} selectorFor={'dob'} />
                    <GenderPicker handleChange={handleChange} />
                </View>
                <View style={styles.nameInput}>
                    <InputField placeholder={'example@example.com'} label={i18n.t('email')} showLabel handleChange={handleChange} inputKey={'email'} />
                </View>
                <View style={{ width: '59.5%' }}>
                    <InputField placeholder={i18n.t('addr_placeholder')} label={i18n.t('address')} showLabel handleChange={handleChange} inputKey={'address'} />
                    <View style={styles.nameInput}>
                        <InputField placeholder={i18n.t('city')} style={{ marginTop: 2 }} handleChange={handleChange} inputKey={'city'} />
                        <InputField placeholder={i18n.t('country')} style={{ marginTop: 2 }} handleChange={handleChange} inputKey={'country'} />
                    </View>
                </View>
                <View style={{ width: '59.5%' }}>
                    <InputField placeholder={'01234567891'} label={i18n.t('phone')} showLabel keypad={'numeric'} handleChange={handleChange} inputKey={'phone'} />
                </View>
                <View style={styles.inputContainer}>
                    {diseasePatch}
                    <Text style={styles.label}>{i18n.t('patient_history')}</Text>
                    <DiseaseDateSelector handleChange={handleDiseaseChange} handleDelete={handleDelete} />
                </View>
            </ScrollView>
            <View style={styles.saveButton}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>{i18n.t("save")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}
export default RegistrationForm
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 8,
        paddingTop: 10
    },
    saveButton: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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
    nameInput: {
        flexDirection: 'row',
    },
    inputNoLabel: {
        marginTop: 18.4
    },
    dateGenderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    locationContainer: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 15,
        color: "black",
        fontWeight: "600",
        paddingHorizontal: 5,
    },
    inputContainer: {
        marginTop: 25,
        alignContent: "flex-start",
        marginLeft: 10,
    },

})