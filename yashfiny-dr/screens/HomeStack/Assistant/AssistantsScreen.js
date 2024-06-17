import { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native"
import i18n from "../../../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

const AssistantsScreen = ({ navigation }) => {
    useEffect(() => {
        Alert.alert(i18n.t('coming_soon'), i18n.t('coming_soon_alert_text'), [
            {
                text: i18n.t('ok'),
                onPress: () => {
                    navigation.goBack()
                },
            },
        ])
    }, [])

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="clock-fast" size={150} color={Colors.grey300} />
        </View>
    )
}
export default AssistantsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})