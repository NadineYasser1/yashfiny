import { Text, View, Pressable, StyleSheet, Dimensions } from "react-native"
import i18n from "../../i18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import Card from '../../components/Card'
const windowHeight = Dimensions.get('window').height
const RequestsScreen = ({ navigation }) => {
    const aptTypes = [
        {
            id: 1,
            name: 'clinic',
            label: i18n.t('clinic_apt_reqs'),
            icon: 'map-marker-radius',
            iconColor: Colors.accent800
        },
        {
            id: 2,
            name: 'video',
            label: i18n.t('video_apt_reqs'),
            icon: 'video-marker',
            iconColor: Colors.primary800
        },
        {
            id: 3,
            name: 'special',
            label: i18n.t('special_apt_reqs'),
            icon: 'folder-star',
            iconColor: Colors.accent700
        },
    ];

    const handleNavigate = (typeId) => {
        switch (typeId) {
            case 1:
                navigation.navigate('ClinicRequests');
                break;
            case 2:
                navigation.navigate('VideoRequests');
                break;
            case 3:
                navigation.navigate('SpecialRequests');
                break;
        }
    };

    return aptTypes.map((type) => (
        <Card key={type.id} style={{ marginTop: 25 }}>
            <Pressable onPress={() => handleNavigate(type.id)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: windowHeight / 7 }}>
                    <MaterialCommunityIcons name={type.icon} color={type.iconColor} size={50} />
                    <Text style={styles.label}>{type.label}</Text>
                </View>
            </Pressable>
        </Card>
    ));
};

export default RequestsScreen;
const styles = StyleSheet.create({
    label: {
        color: Colors.primary800,
        fontSize: 15,
        marginStart: 10,
        fontWeight: "500"
    }
})
