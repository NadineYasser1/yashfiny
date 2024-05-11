import React, { useMemo } from 'react';
import { Text, View, StyleSheet, Dimensions, Pressable } from 'react-native';
import Card from "./Card";
import dayjs from 'dayjs';
import { Colors } from '../constants/colors';
import i18n from '../i18n';
import { Avatar } from "react-native-elements";
import DiseasePatch from './DiseasePatch';
import AptTypePatch from './AptTypePatch';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const ListItem = ({
    avatarUri,
    fname,
    lname,
    aptDate,
    gender,
    age,
    id,
    phone,
    diseases,
    aptType,
    cancellable,
    handleCancel,
    aptStatus,
    appointmentsScreen,
    aptMethod,
    patientScreen,
    handlePress
}) => {
    const color = useMemo(() => {
        switch (aptStatus?.toLowerCase()) {
            case 'cancelled':
                return '#ff7f7f'
            case 'upcoming':
                return '#f8c471'
            case 'visited':
                return '#78e997'
            default:
                return Colors.primary600

        }
    }, [aptStatus || null])

    const iconName = useMemo(() => {
        switch (aptStatus?.toLowerCase()) {
            case 'cancelled':
                return 'close-circle'
            case 'upcoming':
                return 'clock-fast'
            case 'visited':
                return 'check'
            default:
                return Colors.primary600

        }
    }, [aptStatus || null])


    return (
        <Pressable onPress={handlePress}>
            <Card style={styles.card}>
                <View style={[styles.container, patientScreen && { paddingVertical: 20 }]}>
                    <Avatar
                        rounded
                        source={{ uri: avatarUri }}
                        size={patientScreen ? 60 : 45}
                    />
                    <View style={styles.infoContainer}>
                        <View style={styles.headerCont}>
                            <Text style={styles.nameLabel}>{`${fname} ${lname}`}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                {aptDate && <Text style={[styles.dateLabel, { marginEnd: 5 }]}>{dayjs(aptDate).format('DD MMMM, hh:mm A')}</Text>}
                                {appointmentsScreen && <MaterialCommunityIcons name={iconName} color={color} size={23} />}
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.genderLabel, patientScreen && { color: Colors.grey300 }]}>{gender + ' .'}</Text>
                            <Text style={[styles.ageLabel, patientScreen && { color: Colors.grey300 }]}>{age + i18n.t('yrs')}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, patientScreen && { color: Colors.grey300 }]}>{i18n.t('id') + ':' + id}</Text>
                            <Text style={[styles.phoneLabel, patientScreen && { color: Colors.grey300 }]}>{i18n.t('phone') + ':' + phone}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                {appointmentsScreen && <MaterialCommunityIcons name={aptMethod?.toLowerCase() == 'group' ? 'account-group' : 'account'} color={Colors.grey300} size={25} style={{ marginStart: 50, marginEnd: 10 }} />}
                                {appointmentsScreen && <MaterialCommunityIcons name={aptType == 'video' ? 'video-marker' : 'map-marker-radius'} size={25} color={aptType == 'video' ? Colors.primary800 : Colors.accent800} />}
                            </View>
                        </View>
                    </View>
                    {patientScreen && <View>
                        <MaterialCommunityIcons name='chevron-right' color={Colors.grey300} size={40} />

                    </View>}
                </View>
                {!patientScreen && <View style={styles.patchesContainer}>
                    <View style={styles.diseasesContainer}>
                        {diseases.map((disease, index) => <DiseasePatch disease={disease} key={index} />)}
                    </View>
                    {!appointmentsScreen && <MaterialCommunityIcons name={aptMethod?.toLowerCase() == 'group' ? 'account-group' : 'account'} color={Colors.grey300} size={25} style={{ marginStart: 50, marginEnd: 10 }} />}
                    {!appointmentsScreen && <MaterialCommunityIcons name={aptType == 'video' ? 'video-marker' : 'map-marker-radius'} size={25} color={aptType == 'video' ? Colors.primary800 : Colors.accent800} />}
                </View>
                }

                {
                    appointmentsScreen && cancellable &&
                    <View style={{ marginTop: 10, marginStart: 200 }}>
                        <Pressable style={styles.cancelPatch} onPress={handleCancel}>
                            <Text style={styles.cancel}>{i18n.t('cancel')}</Text>
                        </Pressable>
                    </View>
                }


            </Card>
        </Pressable>
    );
};

export default ListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    card: {
        elevation: 3,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0.1 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        marginHorizontal: 12,
        marginVertical: 1,
        padding: 10
    },
    infoContainer: {
        marginLeft: 10,
        flex: 1,
    },
    headerCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    nameLabel: {
        fontWeight: "700",
        fontSize: 15,
        color: 'black',
        marginBottom: 1,
    },
    dateLabel: {
        fontWeight: "500",
        fontSize: 13,
        color: Colors.grey300,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginBottom: 2,
    },
    genderLabel: {
        fontSize: 11,
        marginRight: 2,
    },
    ageLabel: {
        fontSize: 11,
    },
    infoLabel: {
        fontSize: 11,
        marginRight: 25,
    },
    phoneLabel: {
        fontSize: 11,
    },
    patchesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        paddingHorizontal: 10,
    },
    diseasesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 35
    },
    cancelPatch: {
        backgroundColor: Colors.red,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: Colors.red,
        marginEnd: 10,
        shadowColor: Colors.red,
        shadowOffset: { width: 0, height: 0.1 },
        shadowRadius: 2,
        shadowOpacity: 0.2,

    },
    cancel: {
        color: 'white',
        paddingHorizontal: 19,
        paddingVertical: 3,
        fontSize: 15,
        fontWeight: '600'
    },
    statusContainer: {
        borderRadius: 5,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    aptStatus: {
        color: 'white',
        paddingVertical: 3,
        fontWeight: '600'
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 15,
    }
});
