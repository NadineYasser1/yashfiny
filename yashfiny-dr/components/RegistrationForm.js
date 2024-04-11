import { useContext, useEffect } from "react"
import { HideTabContext } from "../store/HideTabContext"
import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import i18n from "../i18n"
import { useNavigation } from "@react-navigation/native"

const RegistrationForm = () => {
    const navigation = useNavigation()
    const hideTabCtx = useContext(HideTabContext)
    useEffect(() => {
        hideTabCtx.hideTab(true)
    }, [])
    const handleSave = () => {
        hideTabCtx.hideTab(false)
        navigation.goBack()
    }
    return (
        <View style={styles.saveButton}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.saveButtonText}>{i18n.t("save")}</Text>
            </TouchableOpacity>
        </View>
    )

}
export default RegistrationForm
const styles = StyleSheet.create({

})