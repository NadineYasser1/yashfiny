import { View, Text, Pressable, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from "../constants/colors";
import i18n from "../i18n";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from "dayjs";

const DatePicker = ({ date, handleChange, label, disease, selectorFor, containerStyle, labelStyle, iconSize, inputStyle, iconStyle }) => {
    const [showPicker, setShowPicker] = useState(false)
    const [val, setVal] = useState(date)

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }
    const confirmIosDate = () => {
        setShowPicker(false);
    }
    const handleConfirm = (event, selectedDate) => {
        setVal(selectedDate || val)
        setShowPicker(Platform.OS == 'ios')
        if (selectorFor == 'dob') {
            handleChange('date', selectedDate)
        } else if (disease != undefined) {
            handleChange(disease[selectorFor], selectedDate)
        }

    }
    return (
        <View style={[{ marginTop: 25, marginLeft: 10 }, containerStyle]}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
            <Pressable onPress={toggleDatePicker} style={styles.inputContainer}>
                <TextInput
                    value={dayjs(val).format("YYYY-MM-DD")}
                    editable={false}
                    style={[styles.input, dayjs(val).format('YYYY-MM-DD') == dayjs(new Date()).format('YYYY-MM-DD') ? { color: '#aaa' } : { color: 'black' }, inputStyle]}
                    placeholderTextColor="#aaa"
                    onPressIn={toggleDatePicker}
                />
                <Icon name="calendar" size={iconSize || 23} color={Colors.primary800} style={[{ marginHorizontal: 10, marginTop: 10 }, iconStyle]} />
            </Pressable>
            {
                showPicker &&
                <View style={{ borderRadius: 15, borderWidth: 1, borderColor: 'transparent', overflow: 'hidden', marginTop: 5, marginRight: 5, backgroundColor: 'white' }}>
                    <DateTimePicker
                        mode="date"
                        display='spinner'
                        value={val}
                        onChange={handleConfirm}
                        style={{ backgroundColor: 'white' }}
                        maximumDate={new Date()}

                    />
                    {
                        showPicker && Platform.OS === "ios" && (
                            <View style={styles.iosPickerButtons}>
                                <TouchableOpacity onPress={confirmIosDate} style={styles.confirmButton}>
                                    <Text style={styles.confirmText}>{i18n.t('confirm')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleDatePicker} style={styles.cancelButton} >
                                    <Text style={styles.cancelText}>{i18n.t('cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            }
        </View >
    )

}

export default DatePicker;
const styles = StyleSheet.create({
    iosPickerButtons: {
        flexDirection: "row",
        justifyContent: "center",
        // marginTop: 10,
        backgroundColor: 'white',
        padding: 20,
    },
    confirmButton: {
        borderRadius: 20,
        padding: 12,
        backgroundColor: Colors.primary600,
        paddingHorizontal: 20,
        marginHorizontal: 20,
    },
    cancelButton: {
        borderRadius: 20,
        padding: 12,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        marginHorizontal: 20
    },
    confirmText: {
        fontSize: 16,
        color: 'white'

    },
    cancelText: {
        fontSize: 16,
        color: Colors.primary700
    },
    inputContainer: {
        alignContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        height: 40,
        backgroundColor: Colors.white100,
        borderRadius: 5,
        marginTop: 5,
        padding: 10,
        fontSize: 15,
        borderColor: Colors.primary800,
        paddingEnd: 40

    },
    label: {
        fontSize: 15,
        color: "black",
        fontWeight: "600",
        paddingHorizontal: 5,
    },
})