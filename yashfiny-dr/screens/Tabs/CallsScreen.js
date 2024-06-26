import { useEffect, useState } from "react";
import { Text, FlatList, View, Pressable, Image, StyleSheet, Alert } from "react-native"
import { Colors } from "../../constants/colors";
import i18n from "../../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { axios } from "../../utils/axios";
import { API } from "../../utils/config";
import dayjs from "dayjs";
import useLoading from "../../hooks/useLoading";
import Layout from "../../components/Layout";

const CallsScreen = () => {
    const [data, setData] = useState();
    const { loading, setIsLoading } = useLoading()

    const fetchData = () => {
        // setIsLoading(true)
        axios.get(API.calls).then(({ data }) => {
            console.log(data.data)
            setData(data?.data?.sort((a, b) => {
                const timeA = a.timeLeft.hours * 3600 + a.timeLeft.minutes * 60 + a.timeLeft.seconds;
                const timeB = b.timeLeft.hours * 3600 + b.timeLeft.minutes * 60 + b.timeLeft.seconds;
                return timeA - timeB;
            }))
        }).catch((err) => Alert.alert(err.response.data.message)).finally(() => setIsLoading(false))
    }
    const getExp = (item) => {
        return item.timeLeft.hours <= 0 || (item.timeLeft.hours == 0 && item.timeLeft.minutes == 0 && item.timeLeft.seconds == 0)
    }
    useEffect(() => {
        fetchData()
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [])

    return (
        <Layout loading={loading}>
            {data && <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.aptId}
                    renderItem={({ item }) => (
                        <Pressable style={styles.itemContainer} onPress={() => Alert.alert(i18n.t('coming_soon'), i18n.t('coming_soon_alert_text'))}>
                            <Image source={{ uri: item.avatar }} style={styles.image} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textName}>{item.fname} {item.lname}</Text>
                                <Text style={styles.timeText}>{i18n.t('time_left_till_apt')}</Text>
                                <Text style={[styles.timeText, { color: item.timeLeft.hours == 0 && item.timeLeft.minutes == 0 && item.timeLeft.seconds == 0 ? Colors.primary800 : 'grey', fontWeight: "500" }]}>{item.timeLeft.hours} {i18n.t('hours')} {item.timeLeft.minutes} {i18n.t('mins')}</Text>
                            </View>
                            {getExp(item) &&
                                <View style={styles.iconContainer}>
                                    <View style={{
                                        borderRadius: 30,
                                        backgroundColor: Colors.green,
                                        elevation: 4, //shadow for android
                                        //shadow for ios:
                                        shadowColor: Colors.green,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowRadius: 6,
                                        shadowOpacity: 0.3,
                                        marginBottom: 15
                                    }}>
                                        <MaterialCommunityIcons
                                            name="video-wireless"
                                            color={'white'}
                                            size={25}
                                            style={styles.icon}
                                            onPress={() => console.log('start call')} />
                                    </View>
                                </View>
                            }
                        </Pressable>
                    )}
                />
            </View >}
        </Layout>
    );
}

export default CallsScreen;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10,
        borderBottomColor: Colors.grey200,
        borderBottomWidth: 2,
        paddingBottom: 20,
        position: 'relative',
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 22.5
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: "600"
    },
    timeText: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 5,
        color: "grey"
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    icon: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
});
