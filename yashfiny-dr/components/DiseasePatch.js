import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/colors";

const DiseasePatch = ({ disease, containerStyle, labelStyle }) => {

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.label, labelStyle]}>{disease}</Text>
        </View>
    )
}
export default DiseasePatch;
const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        backgroundColor: '#f4f6fc',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: Colors.link,
        paddingHorizontal: 5,
        paddingVertical: 3,
        fontSize: 11,

    }
})