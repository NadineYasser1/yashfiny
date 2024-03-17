import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

const DashboardButton = ({icon, label}) => {
return (
    <View>
        <Button icon={icon} style ={styles.button}></Button>
        <Text>{label}</Text>
    </View>
)
}
export default DashboardButton;
const styles = StyleSheet.create({
    button: {

    }
})