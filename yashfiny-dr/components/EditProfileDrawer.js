import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "react-native"
import { Avatar } from "react-native-elements";
import { Colors } from "../constants/colors";
import i18n from "../i18n";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const EditProfileDrawer = () => {
    const DummyDrData = {
        avatarUri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        drName: 'Mohamed Aly',
        drTitle: 'Dr.'
    }
    return (<View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Avatar
                rounded
                source={{
                    uri: DummyDrData.avatarUri,
                }}
                size={70}
            />
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.doctorLabel}>{DummyDrData.drTitle} {DummyDrData.drName}</Text>
                <Pressable style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 35, marginTop: 10, alignItems: 'center' }}>
                    <Text style={styles.link}>{i18n.t('edit_profile')}</Text>
                    <MaterialCommunityIcons name="pencil" color='white' size={13} style={{ marginStart: 3 }} />
                </Pressable>
            </View>
        </View>
    </View>)
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