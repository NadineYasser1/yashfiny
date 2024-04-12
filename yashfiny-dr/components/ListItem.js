import React from 'react';
import { Text, View, StyleSheet, Dimensions, Pressable } from 'react-native';
import Card from "./Card";
import dayjs from 'dayjs';
import { Colors } from '../constants/colors';
import i18n from '../i18n';
import { Avatar } from "react-native-elements";
import DiseasePatch from './DiseasePatch';
import AptTypePatch from './AptTypePatch';

const windowWidth = Dimensions.get('window').width;

const ListItem = ({ avatarUri, fname, lname, aptDate, gender, age, id, phone, diseases, aptType }) => {
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
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>{i18n.t('id') + ':' + id}</Text>
                            <Text style={styles.phoneLabel}>{i18n.t('phone') + ':' + phone}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.patchesContainer}>
                    <View style={styles.diseasesContainer}>
                        {diseases.map((disease, index) => <DiseasePatch disease={disease} key={index} />)}
                    </View>
                    <AptTypePatch type={aptType} />
                </View>
            </Card>
        </Pressable>
    );
};

export default ListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // paddingHorizontal: 1,
        // paddingVertical: 4,
    },
    card: {
        elevation: 3, //shadow for android
        //shadow for ios:
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
        justifyContent: 'space-between',
        marginTop: 5,
        paddingHorizontal: 10,
    },
    diseasesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 35
    },
});
