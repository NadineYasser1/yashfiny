import { Pressable, View, Text } from "react-native";
import PdfRead from "./PdfRead";
import { useNavigation } from "@react-navigation/native";
import i18n from "../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { ScrollView } from "react-native-gesture-handler";

const PdfView = ({ src, onPress }) => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Pressable onPress={onPress} style={{ padding: 10 }}>
                <MaterialCommunityIcons name="chevron-left" color={Colors.grey300} size={20} />
            </Pressable>

            <PdfRead
                src={src}
            />
        </View>
    )
}
export default PdfView