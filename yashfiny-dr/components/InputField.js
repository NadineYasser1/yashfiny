import { View, Text, TextInput, StyleSheet } from "react-native"
import { Colors } from "../constants/colors";

const InputField = ({ label, placeholder, showLabel, style, keypad, handleChange, inputKey }) => {
    return (
        <View style={[styles.inputContainer, style]}>
            {showLabel && <Text style={styles.label}>{label}</Text>}
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#aaa"
                style={styles.input}
                keyboardType={keypad}
                onChangeText={(text) => handleChange(inputKey, text)}
            />
        </View>
    )
}
export default InputField;

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 40,
        backgroundColor: Colors.white100,
        borderRadius: 5,
        marginTop: 5,
        padding: 10,
        fontSize: 15,
        borderColor: Colors.primary800,
        paddingEnd: 50
    },
    label: {
        fontSize: 15,
        color: "black",
        fontWeight: "600",
        paddingHorizontal: 5,
    },
    inputContainer: {
        marginTop: 25,
        alignContent: "flex-start",
        marginLeft: 10,
    },
})