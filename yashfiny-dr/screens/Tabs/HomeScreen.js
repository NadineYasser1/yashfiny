import { StyleSheet, View, Text, Pressable} from "react-native"
import { Colors } from "../../constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../../components/Card";
import { Button, SearchBar } from "react-native-elements";
import i18n from "../../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardButton from "../../components/DashboardButton";

const HomeScreen = () => {
  return (
  <View>
    <View style={styles.topContainer}>
    <View style={{position: 'relative', justifyContent: 'center'}}>
    <Card>
        <View style={{paddingTop: 20, width: '100%'}}>
        <SearchBar 
        placeholder={i18n.t('search_home')}
        lightTheme
        round
        containerStyle={{backgroundColor: 'white', width: '100%', borderTopWidth: 0, borderBottomWidth: 0}}
        inputContainerStyle={{borderColor: 'white', backgroundColor: Colors.white100}}
        inputStyle={{color: Colors.grey100, fontSize: 13}}
        />
        </View>
        <Pressable style={{flexDirection:'row', width: '100%', marginStart: 18, paddingBottom: 25}}>
        <View style={styles.addButton}>
                <MaterialCommunityIcons name="plus-thick" size={30} color={Colors.primary800} />
              </View>
              <Text style={styles.createButtonText}>Create New Patient</Text>
        </Pressable>
    </Card>
    </View>
    </View>
  </View>);
}

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: Colors.primary800,
        height: 100,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    addButton: {
        backgroundColor: Colors.white100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 25,
        marginTop: 14
    },
    createButtonText: {
        marginTop: 25,
        color: Colors.primary800,
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 20
    }
})

export default HomeScreen;