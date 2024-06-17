import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import i18n from "../i18n"
import { useState } from "react"
import { Colors } from "../constants/colors"

const GenderPicker = ({ handleChange }) => {
    const [gender, setGender] = useState('male')
    const onChange = (gen) => {
        setGender(gen)
        handleChange('gender', gen)
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t("gender")}</Text>
            <View style={styles.genderContainer}>
                <View style={styles.genderButtons}>
                    <TouchableOpacity onPress={() => { onChange('male') }} style={[styles.genderButton, gender == 'male' && styles.genderButtonPressed]}>
                        <Text style={[styles.genderText, gender == 'male' && { color: 'white' }]}>{i18n.t('male')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { onChange('female') }} style={[styles.genderButton, gender == 'female' && styles.genderButtonPressed]} >
                        <Text style={[styles.genderText, gender == 'female' && { color: 'white' }]}>{i18n.t('female')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}
export default GenderPicker;
const styles = StyleSheet.create({
    genderContainer: {
        marginTop: 3
    },
    genderLabel: {
        fontSize: 15,
        color: "white",
        fontWeight: "600",
    },
    genderButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    genderButton: {
        borderRadius: 20,
        width: 70,
        height: 30,
        backgroundColor: Colors.white100,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 10,
        // paddingVertical: 5,
        marginEnd: 10
    },
    genderButtonPressed: {
        borderRadius: 20,
        width: 70,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 10,
        // paddingVertical: 5,
        backgroundColor: Colors.primary600,
    },
    genderText: {
        fontSize: 13,
        color: 'black',
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
        marginHorizontal: 10,
    },

})