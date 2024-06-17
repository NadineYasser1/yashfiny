import { KeyboardAvoidingView, Platform } from "react-native";
import RegistrationForm from "../../components/RegistrationForm";

const EditProfileScreen = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <RegistrationForm editDoctor />
        </KeyboardAvoidingView>)

}
export default EditProfileScreen;