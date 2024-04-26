import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "react-native"
import { Avatar } from "react-native-elements";
import { Colors } from "../constants/colors";
import i18n from "../i18n";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useMemo } from "react";
import { DoctorContext } from "../store/DoctorContext";

const EditProfileDrawer = ({ navigation }) => {
    const doctorCtx = useContext(DoctorContext)
    const avatarComponent = useMemo(() => {
        if (doctorCtx.avatarUri) {
            return (
                <Avatar
                    rounded
                    source={{
                        uri: doctorCtx.avatarUri,
                    }}
                    size={70}
                />
            )
        }
        return (
            <View style={{ borderColor: Colors.grey100, borderRadius: 30, height: 60, width: 60, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name='account' size={50} color={Colors.grey100} />
            </View>
        )
    }, [doctorCtx.avatarUri])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                {avatarComponent}
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.doctorLabel}>{doctorCtx.doctorData.title} {doctorCtx.doctorData.fname}</Text>
                    <Pressable style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 0, marginTop: 10, alignItems: 'center' }}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <Text style={styles.link}>{i18n.t('edit_profile')}</Text>
                        <MaterialCommunityIcons name="pencil" color='white' size={13} style={{ marginStart: 3 }} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
export default EditProfileDrawer;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderBottomColor: Colors.white100,
        borderBottomWidth: 0.5,
        paddingBottom: 20
    },
    doctorLabel: {
        color: 'white',
        fontWeight: "700",
        marginHorizontal: 15,
        marginTop: 10,
        fontSize: 16
    },
    link: {
        fontSize: 13,
        color: 'white',
    }
})