import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { IconButton } from "react-native-paper";

const DashboardButton = ({ icon, iconColor, iconSize, label, onPress }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
            <View style={styles.buttonContainer}>
                <IconButton icon={icon} iconColor={iconColor} size={iconSize} style={styles.buttonContainer} onPress={onPress} />
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}
export default DashboardButton;
const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        elevation: 4, // Shadow for Android
        // Shadow for iOS:
        shadowColor: Colors.primary800,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: Colors.primary800,
        borderRadius: 15,
        marginHorizontal: 5,
        backgroundColor: Colors.primary800,
        margin: 5,
    },
    label: {
        color: Colors.primary800,
        fontSize: 11
    }
})