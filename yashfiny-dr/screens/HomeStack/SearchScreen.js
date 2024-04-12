import { SearchBar } from "react-native-elements";
import i18n from "../../i18n";
import { Colors } from "../../constants/colors";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image, View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { DummyPatients } from "../../constants/DummyPatientsData";
import filter from "lodash.filter";
import { HideTabContext } from "../../store/HideTabContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SearchScreen = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState(DummyPatients);
    const [recentId, setrecentId] = useState();
    const hideTabCtx = useContext(HideTabContext);

    useEffect(() => {
        hideTabCtx.hideTab(true);
        getrecentId();
    }, [recentId]);

    const getrecentId = async () => {
        try {
            const existingItem = await AsyncStorage.getItem('recentSearch');
            if (existingItem !== null) {
                setrecentId(JSON.parse(existingItem));
            }
        } catch (error) {
            Alert.alert('error')
        }
    };

    const handlePatientChoice = async (patientId) => {
        try {
            await AsyncStorage.setItem('recentSearch', JSON.stringify(patientId.toString()));
        } catch (error) {
            Alert.alert('error')
        }
    };

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
            id.toString().includes(query);
    };

    const renderRecentItem = (patientId) => {
        const patient = DummyPatients.find(patient => patient.id == patientId);
        if (patient) {
            return (
                <View style={styles.recentsContainer}>
                    <MaterialCommunityIcons name="history" size={20} color={Colors.primary800} />
                    <Text style={styles.recentName}>{patient.fname} {patient.lname}</Text>
                </View>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder={i18n.t('search_home')}
                lightTheme
                round
                value={search}
                onChangeText={handleSearch}
                containerStyle={{
                    backgroundColor: 'white',
                    width: '100%',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                }}
                inputContainerStyle={{
                    borderColor: 'white',
                    backgroundColor: Colors.white100,
                }}
                inputStyle={{ color: 'black', fontSize: 13 }}
            />
            <View style={styles.recentContainer}>
                {renderRecentItem(recentId)}
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable style={styles.itemContainer} onPress={() => handlePatientChoice(item.id)}>
                        <Image source={{ uri: item.avatar }} style={styles.image} />
                        <View>
                            <Text style={styles.textName}>{item.fname} {item.lname}</Text>
                            <Text style={styles.textId}>{item.id}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    recentContainer: {
        padding: 10,
        borderBottomColor: Colors.grey100,
        borderBottomWidth: 0.8
    },
    recentsContainer: {
        backgroundColor: Colors.grey200,
        flexDirection: 'row',
        padding: 3,
        paddingVertical: 8,
        borderRadius: 30,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },
    recentName: {
        color: Colors.primary800,
        marginLeft: 8,
        paddingRight: 10,
    },
    headerContainer: {
        flexDirection: 'row'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 22.5
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: "600"
    },
    textId: {
        fontSize: 14,
        marginLeft: 10,
        color: "grey"
    }
})