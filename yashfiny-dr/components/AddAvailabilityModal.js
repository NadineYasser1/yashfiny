import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native"
import CustomDropdown from "./CustomDropDown"
import i18n from "../i18n"
import { Colors } from "../constants/colors"

const AddAvailabilityModal = ({ visible, onRequestClose, onSelectOpt, addSlot }) => {
    const opts = [
        { value: i18n.t('video'), key: 1 },
        { value: i18n.t('clinic'), key: 2 },
    ]
    const optsArr = [
        { value: i18n.t('group'), key: 1 },
        { value: i18n.t('individual'), key: 2 },
    ]
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                        <Text style={styles.slotTypeTxt}>{i18n.t('slot_location')}</Text>
                        <CustomDropdown
                            options={opts}
                            onSelect={(opt) => onSelectOpt('location', opt)}
                            placeholder={i18n.t('select_location')}
                            style={{ borderRadius: 20, borderColor: Colors.primary800, height: 30, width: 130, alignItems: 'center', justifyContent: 'center', marginTop: 0 }}
                            inputStyles={{ height: 20, fontSize: 12, padding: 3 }}
                            dropdownTextStyles={{ fontSize: 12 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                        <Text style={[styles.slotTypeTxt, { marginEnd: 60 }]}>{i18n.t('slot_type')}</Text>
                        <CustomDropdown
                            options={optsArr}
                            onSelect={(opt) => onSelectOpt('type', opt)}
                            placeholder={i18n.t('select_type')}
                            style={{ borderRadius: 20, borderColor: Colors.primary800, height: 30, width: 130, alignItems: 'center', justifyContent: 'center', marginTop: 0 }}
                            inputStyles={{ height: 20, fontSize: 12, padding: 3 }}
                            dropdownTextStyles={{ fontSize: 12 }}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.addButton} onPress={addSlot}>
                            <Text style={styles.addButtonText}>{i18n.t('add')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddAvailabilityModal

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
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: Colors.primary800,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 6,
        marginTop: 20
    },
    addButtonText: {
        color: 'white',
        fontSize: 14,
    },
    slotTypeTxt: {
        marginEnd: 40,
        marginTop: 5,
        fontSize: 13,
        color: Colors.grey300
    }
})
