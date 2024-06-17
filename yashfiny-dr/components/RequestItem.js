import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Card from "./Card";
import dayjs from 'dayjs';
import { Colors } from '../constants/colors';
import i18n from '../i18n';
import { Avatar } from "react-native-elements";
import DiseasePatch from './DiseasePatch';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const RequestItem = ({
    avatarUri,
    fname,
    lname,
    aptDate,
    gender,
    age,
    currentComplaint,
    symptoms,
    handleAccept,
    handleDecline
}) => {
    return (
        <Pressable>
            <Card style={styles.card}>
                <View style={styles.container}>
                    <Avatar
                        rounded
                        source={{ uri: avatarUri }}
                        size={45}
                    />
                    <View style={styles.infoContainer}>
                        <View style={styles.headerCont}>
                            <Text style={styles.nameLabel}>{`${fname} ${lname}`}</Text>
                            <Text style={styles.dateLabel}>{dayjs(aptDate).format('DD MMMM, hh:mm A')}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.genderLabel}>{gender + ' .'}</Text>
                            <Text style={styles.ageLabel}>{age + i18n.t('yrs')}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                    <View style={styles.complaintContainer}>
                        <Text style={styles.complaintLabel}>{i18n.t('current_complaint')}</Text>
                        <DiseasePatch disease={currentComplaint} labelStyle={{ color: '#6e7075', fontSize: 13, fontWeight: "400", paddingHorizontal: 18, paddingVertical: 3 }} />
                    </View>
                    <View style={{ width: '100%' }}>
                        <View style={styles.complaintContainer}>
                            <Text style={styles.complaintLabel}>{i18n.t('symptoms')}</Text>
                            <View>
                                <DiseasePatch disease={symptoms} labelStyle={{ color: '#6e7075', fontSize: 13, fontWeight: "400", paddingHorizontal: 18, paddingVertical: 3 }} containerStyle={{ width: 200 }} />
                                {/* {symptoms.reduce((rows, key, index) => (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []).map((pair, index) => (
                                    <View style={{ flexDirection: 'row' }} key={index}>
                                        {pair.map((symptom, i) => (
                                            <DiseasePatch disease={symptom} key={i} labelStyle={{ color: '#6e7075', fontSize: 13, fontWeight: "400", paddingHorizontal: 12, paddingVertical: 2 }} containerStyle={{ marginBottom: 5 }} />
                                        ))}
                                    </View>
                                ))} */}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', marginTop: 20, alignItems: 'center' }}>
                    <View style={styles.buttonsContainer}>
                        <Pressable style={[styles.buttonContainer, { backgroundColor: Colors.primary800 }]} onPress={handleAccept} >
                            <Text style={styles.buttonText}>{i18n.t('accept')}</Text>
                        </Pressable>
                        <Pressable style={[styles.buttonContainer, { backgroundColor: 'grey' }]} onPress={handleDecline}>
                            <Text style={styles.buttonText}>{i18n.t('decline')}</Text>
                        </Pressable>
                    </View>
                </View>

            </Card>
        </Pressable>
    );
};

export default RequestItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    card: {
        elevation: 3,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0.1 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        marginHorizontal: 12,
        marginVertical: 1,
        padding: 10,
        justifyContent: 'center',
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
        marginBottom: 2,
    },
    genderLabel: {
        fontSize: 11,
        marginRight: 2,
    },
    ageLabel: {
        fontSize: 11,
    },
    complaintContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        paddingBottom: 8
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: Colors.red,
        marginHorizontal: 10,
        // shadowColor: 'black',
        // shadowOffset: { width: 0, height: 0.1 },
        // shadowRadius: 2,
        // shadowOpacity: 0.2,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontWeight: "500"
    },
    complaintLabel: {
        color: Colors.primary800,
        fontWeight: "600"
    }

});
