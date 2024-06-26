import { Dimensions, Text, View, StyleSheet, Alert, Pressable, FlatList } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Colors } from '../../constants/colors'
import { ScrollView } from "react-native-gesture-handler"
import { patient } from "../../constants/DummyPatient"
import { useContext, useEffect, useMemo, useState } from "react"
import { Avatar } from "react-native-elements"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { PatientsContext } from "../../store/PatientsContext"
import i18n from '../../i18n'
import Collapsible from 'react-native-collapsible';
import dayjs from "dayjs"
import Card from "../../components/Card"
import PdfView from "../../components/PdfView"
import { axios } from "../../utils/axios"
import { API } from "../../utils/config"
import useLoading from "../../hooks/useLoading"
import Layout from "../../components/Layout"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const PatientDetails = ({ route }) => {
    const patientCtx = useContext(PatientsContext)
    const { setIsLoading, loading } = useLoading()
    const fetchPatientData = () => {
        setIsLoading(true)
        axios.get(API.patient.replace('{patientId}', route.params)).then(({ data }) => {
            if (data.data?.history?.chronicDis) {
                data.data.history.chronicDis = data.data.history.chronicDis.map(item => item.disease);
            }
            console.log(data.data.history.allergies)
            if (data.data?.history?.allergies) {
                data.data.history.allergies = data.data.history.allergies.map(item => item.allergy);
            }
            patientCtx.addPatient(data.data)
        }).catch((err) => Alert.alert(err.response.data.message)).finally(() => setIsLoading(false))
        // patientCtx.addPatient(patient)
    }
    useEffect(() => {
        fetchPatientData()
        // patientCtx.addPatient(patient)
    }, [])
    console.log(route.params)
    const avatarComponent = useMemo(() => {
        if (patientCtx.patientData?.avatarUri) {
            return (
                <Avatar
                    rounded
                    source={{
                        uri: patientCtx.patientData?.avatarUri,
                    }}
                    size={55}
                />
            )
        }
        return (
            <View style={{ borderColor: Colors.grey100, borderRadius: 30, height: 60, width: 60, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name='account' size={35} color={Colors.grey100} />
            </View>
        )
    }, [patientCtx.patientData])
    const TopTabs = createMaterialTopTabNavigator()
    return (
        <Layout loading={loading} style={{ flex: 1, padding: 20 }}>
            <View style={{ paddingBottom: 20, paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    {avatarComponent}
                    <View style={styles.infoContainer}>
                        <Text style={styles.nameLabel}>{patientCtx.patientData?.fname} {patientCtx.patientData?.lname}</Text>
                        <View style={styles.infoSubContainer}>
                            <Text style={styles.label}>{i18n.t('id')}:</Text>
                            <Text>{patientCtx.patientData?.id}</Text>
                        </View>
                        <View style={styles.infoSubContainer}>
                            <Text style={styles.label}>{i18n.t('age')}:</Text>
                            <Text>{patientCtx.patientData?.age?.years}</Text>
                            <Text style={{ fontWeight: '400', margin: 3, color: Colors.grey300 }}>{i18n.t('years')}</Text>
                            <Text>{patientCtx.patientData?.age?.months}</Text>
                            <Text style={{ fontWeight: '400', margin: 3, color: Colors.grey300 }}>{i18n.t('months')}</Text>
                            <Text>{patientCtx.patientData?.age?.days}</Text>
                            <Text style={{ fontWeight: '400', margin: 3, color: Colors.grey300 }}>{i18n.t('days')}</Text>
                        </View>
                        <View style={styles.infoSubContainer}>
                            <Text style={styles.label}>{i18n.t('gender')}: </Text>
                            <Text>{patientCtx.patientData?.gender}</Text>
                        </View>

                    </View>

                </View>
            </View>
            <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 25, height: windowHeight > 900 ? windowHeight * 0.7 : windowHeight * 0.6 }}>
                <TopTabs.Navigator
                    initialRouteName="co"
                    screenOptions={{
                        tabBarActiveTintColor: Colors.primary800,
                        tabBarLabelStyle: { fontWeight: "500", fontSize: 10 },
                        tabBarIndicatorStyle: { borderBottomColor: Colors.primary800 },
                        tabBarItemStyle: { width: (windowWidth - 50) / 4 },
                        tabBarStyle: { borderBottomColor: Colors.primary800 },
                        tabBarAllowFontScaling: true,
                        lazy: true,
                    }}

                >
                    <TopTabs.Screen name="co" component={Co} options={{
                        tabBarLabel: i18n.t('co_history')
                    }} />
                    <TopTabs.Screen name="visits" component={Visits} options={{
                        tabBarLabel: i18n.t('visits'),
                    }} />
                    <TopTabs.Screen name="ix" component={Ix} options={{
                        tabBarLabel: i18n.t('ix')
                    }} />
                    <TopTabs.Screen name="rx" component={Rx} options={{
                        tabBarLabel: i18n.t('rx')
                    }} />
                </TopTabs.Navigator>
            </View>
        </Layout>
    )
}
export default PatientDetails
const styles = StyleSheet.create({
    nameLabel: {
        fontWeight: "700",
        fontSize: 15,
        color: 'black',
        marginBottom: 3,
    },
    infoContainer: {
        marginLeft: 10
    },
    infoSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    label: {
        color: Colors.grey300,
        fontWeight: "500",
        marginEnd: 2
    },
    timeline: {
        position: "relative",
    },
    verticalLine: {
        position: "absolute",
        backgroundColor: "black",
        width: 2,
        height: "100%",
        left: 28,
        zIndex: -1,
    },
    timelineItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginLeft: 10,
        paddingLeft: 10,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
    },
    yearText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 20
    },
    content: {
        flex: 1,
        // flexDirection: "row",
        alignItems: "flex-start",
    },
})

const Co = () => {
    const patientCtx = useContext(PatientsContext)
    console.log(patientCtx?.patientData?.history?.allergies)
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
            {patientCtx.patientData?.complaint && <View style={{ backgroundColor: Colors.grey200, borderRadius: 20, width: 300, padding: 10, overflow: 'hidden', marginTop: 10, justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 13 }}>
                <Text style={{ color: Colors.accent800, fontWeight: "600", fontSize: 15, marginBottom: 5 }}>{i18n.t('current_complaint')}</Text>
                <Text>{patientCtx.patientData?.complaint}</Text>
            </View>
            }
            {patientCtx.patientData?.symptoms && <View style={{ backgroundColor: Colors.grey200, borderRadius: 20, width: 300, padding: 10, overflow: 'hidden', marginTop: 10, justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 13 }}>
                <Text style={{ color: Colors.accent800, fontWeight: "600", fontSize: 15, marginBottom: 5 }}>{i18n.t('symptoms')}</Text>
                <Text>{patientCtx.patientData?.symptoms}</Text>
            </View>
            }
            {patientCtx.patientData?.history ? <View style={{ marginTop: 20, borderTopColor: Colors.white100, borderTopWidth: patientCtx.patientData?.complaint ? 1 : 0, paddingVertical: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.primary800, marginBottom: 10 }}>{i18n.t('patient_history')}</Text>

                {patientCtx.patientData?.history?.chronicDis?.length > 0 && patientCtx.patientData.history.chronicDis.map((dis, index) =>
                    <View style={{ borderRadius: 10, borderColor: Colors.grey100, borderWidth: 2, paddingVertical: 10, width: '100%', marginVertical: 5 }} key={index}>
                        <View style={[styles.infoSubContainer, { paddingHorizontal: 10 }]}>
                            <MaterialCommunityIcons name="heart-pulse" size={18} />
                            <Text style={[styles.label, { fontSize: 10, marginHorizontal: 4 }]}>{i18n.t('chronic_disease')}</Text>
                        </View>
                        <Text style={{ paddingHorizontal: 35, fontSize: 15, fontWeight: "600" }}>{dis}</Text>
                    </View>
                )}
                {patientCtx.patientData?.history?.allergies?.length > 0 && patientCtx.patientData.history.allergies.map((dis, index) =>
                    <View style={{ borderRadius: 10, borderColor: Colors.grey100, borderWidth: 2, paddingVertical: 10, width: '100%', marginVertical: 5 }} key={index}>
                        <View style={[styles.infoSubContainer, { paddingHorizontal: 10 }]}>
                            <MaterialCommunityIcons name="allergy" size={18} />
                            <Text style={[styles.label, { fontSize: 10, marginHorizontal: 4 }]}>{i18n.t('allergies')}</Text>
                        </View>
                        <Text style={{ paddingHorizontal: 35, fontSize: 15, fontWeight: "600" }}>{dis}</Text>
                    </View>

                )}
            </View>
                :
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: 30 }}>
                    <MaterialCommunityIcons name="note-off" color={Colors.grey100} size={100} />
                    <Text style={{ color: Colors.grey100, fontSize: 15, fontWeight: "600" }}>{i18n.t('no_history_to_show')}</Text>
                </View>
            }

        </ScrollView>
    )
}
const Ix = () => {
    const patientCtx = useContext(PatientsContext)
    const [pdf, setPdf] = useState(null)
    // console.log(pdf)

    return !pdf ? <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 20 }}>
        <FlatList
            keyExtractor={(item, index) => index}
            data={patientCtx.patientData.tests}
            renderItem={({ item }) => (
                <Pressable onPress={() => setPdf(item.uri)}>
                    <Card
                        style={{
                            alignItems: 'flex-start',
                            elevation: 3, //shadow for android
                            //shadow for ios:
                            shadowColor: "black",
                            shadowOffset: { width: 0.5, height: 0.5 },
                            shadowRadius: 2,
                            shadowOpacity: 0.5,
                            // borderColor: Colors.grey100,
                            // borderWidth: 1
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="file-pdf-box" color={Colors.primary800} size={25} />
                                <Text style={{ fontSize: 17, fontWeight: "500", margin: 3 }}>{item.name}</Text>
                            </View>
                            <Text style={{ color: Colors.grey300, margin: 5, marginStart: 10, fontSize: 13 }}>{dayjs(item.date).format('YYYY-MM-DD')}</Text>
                        </View>
                    </Card>
                </Pressable>
            )}
        />
    </View> :
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <PdfView src={pdf} onPress={() => setPdf(null)} />
        </View >


}
const Rx = ({ navigation }) => {
    const patientCtx = useContext(PatientsContext)
    const [timing, setTiming] = useState('')
    console.log(patientCtx.patientData?.drugs)
    const contentArr = useMemo(() => {
        const mappedDrugs = {}
        patientCtx?.patientData?.drugs?.forEach(drug => {
            const { name, duration, instructions, time, dosage } = drug;
            if (!mappedDrugs[time.toLowerCase()]) {
                mappedDrugs[time.toLowerCase()] = [];
            }
            mappedDrugs[time.toLowerCase()].push({
                name: name,
                dosage: dosage,
                description: `for ${duration} ${instructions}`
            });
        });
        return mappedDrugs
    }, [patientCtx.patientData])
    const sections = [
        {
            title: i18n.t('morning'),
            content: contentArr?.morning || null

        },
        {
            title: i18n.t('noon'),
            content: contentArr?.noon || null

        },
        {
            title: i18n.t('evening'),
            content: contentArr?.evening || null

        },
        {
            title: i18n.t('night'),
            content: contentArr?.night || null

        }
    ]

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <Pressable
                style={{
                    flexDirection: 'row',
                    borderBottomColor: Colors.grey200,
                    borderBottomWidth: 2,
                    paddingVertical: 20,
                    alignItems: 'center'
                }}
                onPress={() => navigation.navigate('AddDrug')}>
                <View style={{ borderRadius: 15, backgroundColor: Colors.grey200, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: Colors.primary800, fontWeight: "600", fontSize: 22, marginBottom: 3 }}>+</Text>
                </View>
                <Text style={{ color: Colors.primary800, marginHorizontal: 10, fontSize: 14, fontWeight: "500" }}>{i18n.t('add_new_drug')}</Text>
            </Pressable>
            {
                sections.map((section, index) =>
                    <View key={index}>
                        <Pressable
                            onPress={() => setTiming(timing.toLowerCase() == section.title.toLowerCase() ? '' : section.title)}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: 20,
                                borderTopColor: Colors.grey200,
                                borderBottomColor: Colors.grey200,
                                borderBottomWidth: 2,
                                // borderTopWidth: 2,
                                paddingHorizontal: 10
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 18, fontWeight: "600" }}>{section.title}</Text>
                                <View style={{ backgroundColor: Colors.primary800, borderRadius: 30, height: 23, width: 23, justifyContent: 'center', alignItems: 'center', marginStart: 10 }}>
                                    <Text style={{ color: 'white', fontWeight: "600" }}>{section.content?.length.toString()}</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name={timing.toLowerCase() == section.title.toLowerCase() ? "chevron-up" : "chevron-down"} color={Colors.grey300} size={18} />
                        </Pressable>
                        <Collapsible
                            collapsed={timing.toLowerCase() != section.title.toLowerCase()}
                        >
                            {section.content && section.content.map((item, index) => (
                                <View key={index} style={{
                                    backgroundColor: '#f4f6fc',
                                    borderBottomColor: 'white',
                                    borderBottomWidth: 2,
                                    paddingVertical: 10
                                }}>
                                    <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                                        <MaterialCommunityIcons name="pill" size={23} color={Colors.accent800} style={{ marginEnd: 10 }} />
                                        <Text style={{ fontWeight: "500", fontSize: 16, marginBottom: 8 }}>{item.name} {item.dosage}</Text>
                                    </View>
                                    <Text style={{ fontSize: 12, paddingHorizontal: 30 }}>{item.description}</Text>
                                </View>
                            ))}
                        </Collapsible>
                    </View>
                )
            }
        </ScrollView>
    )
}
const Visits = ({ navigation }) => {
    const patientCtx = useContext(PatientsContext);

    const timelineData = useMemo(() => {
        if (patientCtx.patientData?.visits) {
            return patientCtx.patientData.visits.sort((a, b) => b.date - a.date).map(visit => ({
                id: visit.id,
                date: dayjs(visit.date).format('DD MMM, YYYY hh:mm A'),
                color: visit.status === 'cancelled' ? '#ff3131' : visit.status === 'upcoming' ? '#ffdb15' : visit.status === 'visited' ? '#26f7b2' : 'grey',
                diagnosis: visit.diagnosis.map(diagnosis => diagnosis.name || '').join(', '),
                prescription: visit.prescription.map(prescription => prescription.name + ' (' + prescription.dosage + ')').join(', '),
                status: visit.status,
                icon: visit.status == 'upcoming' ? 'clock-fast' : visit.status == 'cancelled' ? 'close' : 'check-bold'
            }))
        }
        return null;
    }, [patientCtx.patientData]);

    const renderTimeline = (status, other) => {
        const filteredData = timelineData.filter((visit) => visit.status === status || (visit.status == other));

        if (filteredData.length === 0) return null;

        return (
            <View style={{ marginVertical: 10, marginBottom: 50 }}>
                <Text style={{ paddingHorizontal: 20, marginBottom: 20, fontWeight: "600", fontSize: 16, color: Colors.grey100 }}>{i18n.t(status === 'upcoming' ? 'upcoming' : 'visited')}</Text>
                <View style={styles.timeline}>
                    <View style={styles.verticalLine} />
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View>
                                <View
                                    style={[
                                        styles.timelineItem,
                                        { borderLeftColor: item.color || 'gray' },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.circle,
                                            {
                                                backgroundColor: item.color || 'gray',
                                            },
                                        ]}
                                    >
                                        <MaterialCommunityIcons name={item.icon} color='white' />
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={styles.content}>
                                            <Text style={styles.yearText}>{item.date}</Text>
                                            {console.log(item.prescription)}
                                            {item.diagnosis != null && <Text style={{ color: 'black', fontSize: 13 }}>{item.diagnosis}</Text>}
                                            {item.prescription != 'null (null)' && <Text style={{ color: 'black', fontSize: 13 }}>{item.prescription}</Text>}
                                        </View>
                                        {item.status == 'upcoming' &&
                                            <Pressable
                                                style={{
                                                    marginEnd: 25,
                                                    marginVertical: 20,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: Colors.grey200,
                                                    borderRadius: 25,
                                                    paddingHorizontal: 5,
                                                    paddingVertical: 2
                                                }}
                                                onPress={() => navigation.navigate('VisitResults', item.id)}>
                                                <MaterialCommunityIcons name="plus-thick" size={12} color={Colors.primary800} />
                                                <Text style={{ color: Colors.primary800, fontWeight: "600", paddingHorizontal: 3 }}>Results</Text>
                                            </Pressable>}
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={{ flex: 1, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 10, backgroundColor: 'white' }}>
            {renderTimeline('upcoming', 'cancelled')}
            {renderTimeline('visited')}
        </ScrollView>
    );
};

