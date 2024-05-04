import { Dimensions, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Colors } from '../../constants/colors'
import { ScrollView } from "react-native-gesture-handler"
import { patient } from "../../constants/DummyPatient"
import { useContext, useEffect, useMemo } from "react"
import { Avatar } from "react-native-elements"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { PatientsContext } from "../../store/PatientsContext"
import i18n from '../../i18n'
import dayjs from "dayjs"
import Timeline from 'react-native-timeline-flatlist'

const windowHeight = Dimensions.get('window').height

const PatientDetails = ({ route }) => {
    const patientCtx = useContext(PatientsContext)
    useEffect(() => {
        patientCtx.addPatient(patient)
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
        <View style={{ flex: 1, padding: 20 }}>
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
            <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 25, height: windowHeight * 0.6 }}>
                <TopTabs.Navigator
                    initialRouteName="co"
                    screenOptions={{
                        tabBarActiveTintColor: Colors.primary800,
                        tabBarLabelStyle: { fontWeight: "500", fontSize: 10 },
                        tabBarIndicatorStyle: { borderBottomColor: Colors.primary800 },
                        tabBarItemStyle: { width: 85 },
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
        </View>
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
    }
})

const Co = () => {
    const patientCtx = useContext(PatientsContext)
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
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

        </ScrollView>
    )
}
const Rx = () => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

        </ScrollView>
    )
}
const Visits = () => {
    const patientCtx = useContext(PatientsContext)
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} >

        </ScrollView>
    )
}
