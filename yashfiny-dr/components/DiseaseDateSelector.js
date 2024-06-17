import CustomDropdown from "./CustomDropDown"
import i18n from "../i18n"
import { Colors } from "../constants/colors"
import { StyleSheet, View, Text, Dimensions, Pressable, Alert } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import DatePicker from "./DatePicker"
import { useMemo, useState } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"

const windowWidth = Dimensions.get('window').width

const DiseaseDateSelector = ({ handleChange, handleDelete }) => {
    const tempOpts = ['disease1', 'disease2', 'disease3']
    const [dis, setDis] = useState(null)
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

    const onChange = (selectedDate, selectorFor) => {
        if (selectorFor === 'start') {
            setStart(selectedDate || start)
        } else {
            setEnd(selectedDate || end)
        }

    }

    const handleAddDisease = () => {
        if (dis && start && end) {
            handleChange(dis, { from: start, to: end })
            setDis(null)
            setStart(new Date())
            setEnd(new Date())
        } else if (!dis) {
            Alert.alert(i18n.t('disease_missing_alert'))
        }

    }


    return (
        <View>

            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                    <SelectList
                        data={tempOpts}
                        setSelected={(val) => setDis(val)}
                        placeholder={i18n.t('disease')}
                        boxStyles={styles.input}
                        search={false}
                        dropdownStyles={styles.dropdown}
                        defaultOption={tempOpts[0]}
                    />
                </View>
                <View style={{ alignContent: 'flex-end', alignItems: 'center', justifyContent: 'center', marginStart: windowWidth - (windowWidth * 0.7) }}>
                    <Pressable
                        style={{ marginTop: 10, marginEnd: 20, backgroundColor: Colors.primary800, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={handleAddDisease} >
                        <Text style={{ color: 'white', paddingHorizontal: 10, paddingVertical: 5 }}>{i18n.t('add')}</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ alignItems: 'flex-start', width: '50%' }}>
                <DatePicker
                    label={i18n.t('from')}
                    selectorFor={'from'}
                    disease={dis}
                    date={start}
                    containerStyle={{ marginTop: 0, marginLeft: 0 }}
                    labelStyle={{ fontSize: 10, color: 'grey', marginTop: 10 }}
                    iconSize={23}
                    inputStyle={{ paddingEnd: 90, marginStart: 0, marginLeft: 0 }}
                    iconStyle={{ marginHorizontal: 10 }}
                    handleChange={(e, val) => onChange(val, 'start')}
                />
                <DatePicker
                    label={i18n.t('to')}
                    selectorFor={'to'}
                    disease={dis}
                    date={end}
                    containerStyle={{ marginTop: 10, marginLeft: 0 }}
                    labelStyle={{ fontSize: 10, color: 'grey' }}
                    iconSize={23}
                    inputStyle={{ paddingEnd: 90 }}
                    iconStyle={{ marginHorizontal: 10 }}
                    handleChange={(e, val) => onChange(val, 'end')}
                />
            </View>
        </View >
    )
}
export default DiseaseDateSelector;

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        // width: '50%',
        backgroundColor: Colors.white100,
        borderRadius: 5,
        marginTop: 5,
        padding: 2,
        fontSize: 15,
        borderColor: Colors.primary800,
        paddingEnd: 10,
        borderWidth: 0,
    },
    dropdown: {
        flex: 1,
        borderColor: 'transparent',
        backgroundColor: Colors.white100
    }
});
