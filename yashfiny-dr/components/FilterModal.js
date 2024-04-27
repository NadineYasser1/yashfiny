import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Colors } from '../constants/colors';
import i18n from '../i18n';

const FilterModal = ({ showModal, setShowModal, handleFilterChange, filters }) => {

    const [typeFilter, setTypeFilter] = useState(filters?.typeFilter || null);
    const [locationFilter, setLocationFilter] = useState(filters?.locationFilter || null);
    const [statusFilter, setStatusFilter] = useState(filters?.statusFilter || null);

    const clearFilters = () => {
        setTypeFilter(null);
        setLocationFilter(null);
        setStatusFilter(null);
    };

    useEffect(() => {
        if (!filters) {
            clearFilters()
        }
    }, [filters])

    const applyFilters = () => {

        handleFilterChange({ typeFilter, locationFilter, statusFilter })

        setShowModal(false);
    };

    return (
        <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>{i18n.t('filter_by')}</Text>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ borderBottomColor: Colors.grey100, borderBottomWidth: 2, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 16, color: Colors.grey100, fontWeight: "600" }}>{i18n.t('type')}</Text>
                        </View>
                        <CheckBox
                            title={i18n.t('group')}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={typeFilter?.toLowerCase() === 'group'}
                            onPress={() => typeFilter?.toLowerCase() == 'group' ? setTypeFilter(null) : setTypeFilter('group')}
                            checkedColor={Colors.primary800}
                            containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                        />
                        <CheckBox
                            title={i18n.t('individual')}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={typeFilter?.toLowerCase() === 'individual'}
                            onPress={() => typeFilter?.toLowerCase() == 'individual' ? setTypeFilter(null) : setTypeFilter('individual')}
                            checkedColor={Colors.primary800}
                            containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                        />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ borderBottomColor: Colors.grey100, borderBottomWidth: 2, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 16, color: Colors.grey100, fontWeight: "600" }}>{i18n.t('location')}</Text>
                        </View>
                        <CheckBox
                            title={i18n.t('video')}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={locationFilter?.toLowerCase() === 'video'}
                            onPress={() => locationFilter?.toLowerCase() == 'video' ? setLocationFilter(null) : setLocationFilter('video')}
                            checkedColor={Colors.primary800}
                            containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                        />
                        <CheckBox
                            title={i18n.t('clinic')}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={locationFilter?.toLowerCase() === 'clinic'}
                            onPress={() => locationFilter?.toLowerCase() == 'clinic' ? setLocationFilter(null) : setLocationFilter('clinic')}
                            checkedColor={Colors.primary800}
                            containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                        />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ borderBottomColor: Colors.grey100, borderBottomWidth: 2, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 16, color: Colors.grey100, fontWeight: "600" }}>{i18n.t('status')}</Text>
                        </View>
                        <CheckBox
                            title={i18n.t('upcoming')}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={statusFilter?.toLowerCase() === 'upcoming'}
                            onPress={() => statusFilter?.toLowerCase() == 'upcoming' ? setStatusFilter(null) : setStatusFilter('upcoming')}
                            checkedColor={Colors.primary800}
                            containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                        />
                        <CheckBox
                            title={i18n.t('cancelled')}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={statusFilter?.toLowerCase() === 'cancelled'}
                            onPress={() => statusFilter?.toLowerCase() == 'cancelled' ? setStatusFilter(null) : setStatusFilter('cancelled')}
                            checkedColor={Colors.primary800}
                            containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                        />
                        <CheckBox
                            title={i18n.t('visited')}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={statusFilter?.toLowerCase() === 'visited'}
                            onPress={() => statusFilter?.toLowerCase() == 'visited' ? setStatusFilter(null) : setStatusFilter('visited')}
                            checkedColor={Colors.primary800}
                            containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: 20 }}>
                        <TouchableOpacity onPress={clearFilters}>
                            <Text style={{ color: 'blue', fontSize: 18 }}>{i18n.t('clear')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={applyFilters}>
                            <Text style={{ color: 'blue', fontSize: 18 }}>{i18n.t('apply')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FilterModal;

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
        alignItems: 'flex-start',
        marginTop: 60
    },
})
