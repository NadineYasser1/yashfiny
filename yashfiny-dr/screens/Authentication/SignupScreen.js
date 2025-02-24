import "react-native-gesture-handler";
import {
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useContext, useState } from "react";
import { LanguageContext } from "../../store/LanguageContext";
import i18n from "../../i18n";
import { Colors } from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const SignupScreen = ({ navigation }) => {
  const langCtx = useContext(LanguageContext);
  const [data, setData] = useState()
  const handleChange = (key, val) => {
    setData((prev) => ({
      ...prev,
      [key]: val
    }))
  }
  return (
    <LinearGradient
      colors={[Colors.primary800, "white"]}
      locations={[0.4, 1]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo1.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          {langCtx.locale == "en" ? (
            <Image
              source={require("../../assets/brandName_en.png")}
              style={styles.brandName}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/brandName_ar.png")}
              style={styles.brandName}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.fpText}>{i18n.t("signup_text")}</Text>
          <TextInput
            placeholder={i18n.t("email")}
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={(val) => handleChange('email', val)}
          />
          <TextInput
            placeholder={i18n.t("fname")}
            style={styles.input}
            placeholderTextColor="#aaa"
            onChangeText={(val) => handleChange('fname', val)}
          />
          <TextInput
            placeholder={i18n.t("lname")}
            style={styles.input}
            placeholderTextColor="#aaa"
            onChangeText={(val) => handleChange('lname', val)}
          />
          <TextInput
            placeholder={i18n.t("password")}
            style={styles.input}
            placeholderTextColor="#aaa"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(val) => handleChange('password', val)}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("RegistrationForm", data)}
          >
            <Text style={styles.loginButtonText}>{i18n.t("signup")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>{i18n.t("have_account_ques")}</Text>
          <TouchableOpacity>
            <Text
              style={[styles.signupText, { fontWeight: "700", fontSize: 18 }]}
              onPress={() => navigation.navigate("Login")}
            >
              {i18n.t("login")}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    paddingTop: 5,
    width: "100%",
    height: "10%",
    alignItems: "center",
    marginTop: "10",
  },
  logo: {
    width: "50%",
    height: "100%",
  },
  brandName: {
    width: "70%",
    height: "30%",
  },
  loginContainer: {
    justifyContent: "center",
    marginLeft: 20,
    marginHorizontal: 20,
    marginTop: Platform.OS == 'ios' ? 50 : 10,
    paddingTop: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.white100,
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    borderColor: Colors.primary800,
  },
  fpText: {
    alignSelf: "center",
    color: Colors.grey100,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 30,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: Colors.primary600,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 25,
    elevation: 2,
    shadowColor: Colors.primary800,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.65,
    shadowRadius: 4,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "300",
    color: "white",
    alignSelf: "center",
  },
  signupTextContainer: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: Colors.primary800,
    fontWeight: "400",
    fontSize: 16,
  },
});
export default SignupScreen;
