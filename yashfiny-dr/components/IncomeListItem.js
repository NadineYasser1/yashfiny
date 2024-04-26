import { StyleSheet, View, Text } from "react-native";
import i18n from "../i18n";
import Card from "./Card";
import { Colors } from "../constants/colors";
import dayjs from "dayjs";

const IncomeListItem = ({ fname, lname, aptDate, id, status, payment, currency }) => {
    return (
        <Card style={styles.card}>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.headerCont}>
                        <Text style={styles.nameLabel}>{`${fname} ${lname}`}</Text>
                        <Text style={styles.dateLabel}>{dayjs(aptDate).format('DD MMMM, hh:mm A')}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>{i18n.t('id') + ':' + id}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.statusPatch}>
                            <Text style={[styles.statusText, { color: status.id == 1 ? Colors.green : Colors.red }]}>{status.id == 1 ? i18n.t('attended') : i18n.t('cancelled')}</Text>
                        </View>
                        <Text style={{ color: status.id == 1 ? Colors.green : Colors.red, fontSize: 15, fontWeight: "600" }}>{status.id == 1 ? '+' : '-'} {payment} {currency}</Text>
                    </View>
                </View>
            </View>
        </Card>
    )
}

export default IncomeListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
        padding: 10,
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
    infoLabel: {
        fontSize: 11,
    },
    statusPatch: {
        backgroundColor: Colors.white100,
        borderRadius: 20,
        marginTop: 10,
        marginEnd: 150,
    },
    statusText: {
        paddingHorizontal: 12,
        paddingVertical: 3,
        fontSize: 13,
        fontWeight: "500"
    }
});
