import { Text, View } from "react-native"
import { SearchBar } from "react-native-elements";
import i18n from "../../i18n";
import filter from "lodash.filter";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import { FlatList } from "react-native-gesture-handler";
import ListItem from "../../components/ListItem";
import { axios } from "../../utils/axios";
import { API } from "../../utils/config";
import useLoading from "../../hooks/useLoading";
import Layout from "../../components/Layout";

const PatientsScreen = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [patientsData, setPatientsData] = useState()
    const [filteringData, setFilteringData] = useState()
    const { loading, setIsLoading } = useLoading()

    const fetchData = () => {
        setIsLoading(true)
        axios.get(API.patients).then(({ data }) => {
            console.log(data.data)
            setFilteringData(data.data)
            setPatientsData(data.data)
        }).catch((err) => console.log(err)).finally(() => setIsLoading(false))
    }

    console.log(patientsData)
    const handleSearch = (query) => {
        setSearch(query);
        const filteredData = filter(filteringData, (patient) => {
            return contains(patient, query.toLowerCase());
        });
        setPatientsData(filteredData);
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

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <Layout loading={loading}>
            {patientsData && <View style={{ flex: 1, padding: 10 }}>
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
                    data={patientsData}
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
            }
        </Layout>
    )
}
export default PatientsScreen;