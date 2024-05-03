import { Text, View } from "react-native"
import { SearchBar } from "react-native-elements";
import i18n from "../../i18n";
import { DummyPatients } from "../../constants/DummyPatientsData";
import filter from "lodash.filter";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import { FlatList } from "react-native-gesture-handler";
import ListItem from "../../components/ListItem";

const PatientsScreen = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState(DummyPatients)

    const handleSearch = (query) => {
        setSearch(query);
        const filteredData = filter(DummyPatients, (patient) => {
            return contains(patient, query.toLowerCase());
        });
        setData(filteredData);
    };

    const contains = ({ fname, lname, id }, query) => {
        return fname.toLowerCase().includes(query) ||
            lname.toLowerCase().includes(query) ||
            id.toString().includes(query) ||
            `${fname?.toLowerCase()} ${lname.toLowerCase()}`.includes(query);
    };
    const handlePatientChoice = (patientId) => {
        navigation.navigate("PatientDetails", patientId)
    }
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <SearchBar
                placeholder={i18n.t('search_home')}
                lightTheme
                round
                value={search}
                onChangeText={handleSearch}
                containerStyle={{
                    backgroundColor: 'transparent',
                    width: '100%',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                }}
                inputContainerStyle={{
                    borderColor: 'white',
                    backgroundColor: 'white',

                }}
                inputStyle={{ color: 'black', fontSize: 13 }}
            />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListItem
                        id={item.id}
                        age={item.age}
                        gender={item.gender}
                        phone={item.phoneNum}
                        avatarUri={item.avatar}
                        patientScreen={true}
                        fname={item.fname}
                        lname={item.lname}
                        handlePress={() => handlePatientChoice(item.id)}
                    />

                )}

            />
        </View>
    )
}
export default PatientsScreen;