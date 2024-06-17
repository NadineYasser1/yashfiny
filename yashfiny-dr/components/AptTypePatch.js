import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/colors";

const AptTypePatch = ({ type }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{type}</Text>
        </View>
    )

}
export default AptTypePatch;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: '#8aa2d4'
    },
    label: {
        color: 'white',
        padding: 6,
        fontSize: 14
    }
})