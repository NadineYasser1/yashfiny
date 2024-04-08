import 'react-native-gesture-handler';
import { Image, StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useContext } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import i18n from '../../i18n';
import { Colors } from '../../constants/colors';
import { Icon } from 'react-native-elements'; import Card from '../../components/Card';
import { LinearGradient } from 'expo-linear-gradient';
;

const ForgotPasswordScreen = ({ navigation }) => {
  const langCtx = useContext(LanguageContext);
  return (
    <LinearGradient
      colors={[Colors.primary800, "white"]}
      locations={[0.4, 1]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo1.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          {langCtx.locale == 'en' ? <Image
            source={require('../../assets/brandName_en.png')}
            style={styles.brandName}
            resizeMode="contain"
          /> : <Image
            source={require('../../assets/brandName_ar.png')}
            style={styles.brandName}
            resizeMode="contain"
          />}
        </View>
        <View style={styles.fpContainer}>
          <Icon name="lock" type='font-awesome' color={Colors.primary600} size={Platform.OS == 'ios' ? 80 : 60}></Icon>
          <Text style={styles.fpText}>{i18n.t('forgot_pass_text')}</Text>
          <TextInput placeholder={i18n.t('phone_numb_or_email')} style={styles.input} placeholderTextColor="#aaa" autoCompleteType='email' keyboardType='email-address' textContentType='emailAddress' />
          <TouchableOpacity style={styles.fpButton} onPress={() => console.log('send pass setup link to email')}>
            <Text style={styles.fpButtonText}>{i18n.t('forgot_pass')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>{i18n.t('dont_have_account_ques')}</Text>
          <TouchableOpacity>
            <Text style={[styles.signupText, { fontWeight: '700', fontSize: 18 }]} onPress={() => navigation.navigate("Signup")}>{i18n.t('signup')} </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </LinearGradient>

  )
}
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    paddingTop: windowHeight * 0.03,
    width: '100%',
    height: '20%',
    alignItems: 'center',

  },
  logo: {
    width: '50%',
    height: '100%',
  },
  brandName: {
    width: '70%',
    height: '30%',

  },
  fpContainer: {
    justifyContent: "center",
    marginLeft: 20,
    marginHorizontal: 20,
    marginTop: windowHeight * 0.04,
    paddingTop: 20,

  },
  input: {
    width: '100%',
    height: windowHeight * 0.07,
    backgroundColor: Colors.white100,
    borderRadius: 30,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 15,

  },
  fpText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.grey100,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10
  },
  fpButton: {
    backgroundColor: Colors.primary600,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 25,
  },
  fpButtonText: {
    fontSize: 16.5,
    fontWeight: "300",
    color: 'white',
    alignSelf: 'center'
  },
  signupTextContainer: {
    marginTop: windowHeight < 650 ? 75 : 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signupText: {
    color: Colors.primary800,
    fontWeight: "400",
    fontSize: 16
  }
})
export default ForgotPasswordScreen;