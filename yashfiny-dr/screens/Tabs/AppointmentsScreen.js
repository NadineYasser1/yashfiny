import { Platform, View, Pressable, StyleSheet, Dimensions, Image, Text, Alert } from "react-native"
import { Colors } from "../../constants/colors";
import { useState, useMemo, useEffect } from "react";
import CalendarStrip from 'react-native-calendar-strip';
import { DummyAppointments } from "../../constants/DummyAppointments";
import { SearchBar } from "react-native-elements";
import i18n from "../../i18n";
import dayjs from "dayjs";
import { FlatList } from "react-native-gesture-handler";
import filter from "lodash.filter";
import ListItem from "../../components/ListItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FilterModal from "../../components/FilterModal";
import { axios } from "../../utils/axios";
import { API } from "../../utils/config";

const windowHeight = Dimensions.get('window').height

const AppointmentsScreen = ({ route }) => {
    const [selectedDay, setSelectedDay] = useState(dayjs(new Date()).format('YYYY-MM-DD'))
    const [appointments, setAppointments] = useState()
    const [search, setSearch] = useState('');
    const [data, setData] = useState()
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [filters, setFilters] = useState(route?.params?.statusFilter ? { statusFilter: 'upcoming' } : null)

    const fetchData = () => {
        axios.get(API.appointments).then(({ data }) => {
            setAppointments(data.data)
            console.log(data.data)
            setData(data.data[selectedDay])
        }).catch((err) => console.log(err))
    }
    const handleFilterChange = (filteringObj) => {
        setFilters(filteringObj)
    }
    // console.log(data)
    const filterData = () => {
        const filteredData = appointments && appointments[selectedDay] ? filter(appointments[selectedDay], (appointment) => {
            return handleFiltering(appointment)
        }) : []
        setData(filteredData)
    }
    const handleFiltering = (appointment) => {

        if ((!filters?.typeFilter && !filters?.locationFilter && !filters?.statusFilter)) {
            return true;
        }
        if (filters?.typeFilter && appointment.method.toLowerCase() !== filters.typeFilter.toLowerCase()) {
            return false;
        }
        if (filters?.locationFilter && appointment.type.toLowerCase() !== filters.locationFilter.toLowerCase()) {
            return false;
        }
        if (filters?.statusFilter && appointment.status.toLowerCase() !== filters.statusFilter.toLowerCase()) {
            return false;
        }
        return true;
    }

    const markedDatesArray = useMemo(() => {
        const markedDates = appointments && Object.keys(appointments).map(date => {
            if (appointments[date].length > 0) {
                return {
                    date: new Date(date),
                    dots: [
                        {
                            color: dayjs(selectedDay).format('YY-MM-DD') == dayjs(date).format('YY-MM-DD') ? Colors.primary800 : 'grey'
                        }
                    ]
                };
            }
            return null
        }).filter(Boolean)
        return markedDates
    }, [appointments, selectedDay]);

    const handleSearch = (query) => {
        setSearch(query);
        const filteredData = filter(appointments[selectedDay], (patient) => {
            return contains(patient, query.toLowerCase());
        });
        setData(filteredData);
    };

    const contains = ({ fname, lname, id }, query) => {
        return fname?.toLowerCase().includes(query) ||
            lname?.toLowerCase().includes(query) ||
            id?.toString().includes(query) ||
            `${fname?.toLowerCase()} ${lname.toLowerCase()}`.includes(query);
    };

    const handleCancel = (aptId) => {
        Alert.alert(
            i18n.t('cancel_alert_title'),
            i18n.t('cancel_alert_ques'),
            [
                {
                    text: i18n.t('cancel'),
                    style: "cancel"
                },
                {
                    text: i18n.t('confirm'),
                    onPress: () => {
                        console.log("Canceled appointment with ID: " + aptId);
                    }
                }
            ],
            { cancelable: false }
        );
    };
    useEffect(() => {
        filterData();
    }, [filters]);

    useEffect(() => {
        if (!filters && appointments && appointments[selectedDay]) {
            setData(appointments[selectedDay])
        }
    }, [selectedDay, appointments])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topContainer}>
                <CalendarStrip
                    style={{ height: windowHeight * 0.13, marginHorizontal: 10 }}
                    selectedDate={new Date(selectedDay)}
                    onDateSelected={(date) => {
                        setSelectedDay(date.format('YYYY-MM-DD'))
                        setFilters(null)
                    }}

                    dateNumberStyle={{ color: 'grey' }}
                    dateNameStyle={{ color: 'grey' }}
                    iconContainer={{ flex: 0.1 }}
                    daySelectionAnimation={{
                        type: 'background',
                        backgroundColor: Colors.primary800,
                    }}
                    highlightDateNumberStyle={{ color: Colors.primary800 }}
                    highlightDateNameStyle={{ color: Colors.primary800 }}
                    highlightDateContainerStyle={{ backgroundColor: Colors.primary800 }}
                    markedDates={markedDatesArray}
                />
            </View>
            <FilterModal
                showModal={showFilterModal}
                setShowModal={setShowFilterModal}
                handleFilterChange={handleFilterChange}
                filters={filters}
            />
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <SearchBar
                    placeholder={i18n.t('search_home')}
                    lightTheme
                    round
                    value={search}
                    onChangeText={handleSearch}
                    containerStyle={{
                        backgroundColor: 'transparent',
                        width: '87%',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                    }}
                    inputContainerStyle={{
                        borderColor: 'white',
                        backgroundColor: 'white',
                    }}
                    inputStyle={{ color: 'black', fontSize: 13 }}
                />
                <View style={{ backgroundColor: 'white', borderRadius: 6, marginEnd: 10 }}>
                    <MaterialCommunityIcons name="tune-vertical" size={24} color={Colors.primary800} style={{ paddingVertical: 10, paddingHorizontal: 5 }} onPress={() => setShowFilterModal(!showFilterModal)} />
                </View>
            </View>

            {data && <FlatList
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <ListItem
                    avatarUri={item.avatar}
                    fname={item.fname}
                    lname={item.lname}
                    aptDate={item.time}
                    gender={item.gender}
                    age={item.age?.toString() || null}
                    id={item.patientId}
                    phone={item.phoneNum}
                    diseases={item.history.chronicDis}
                    aptType={item.type}
                    cancellable={item.cancellable}
                    handleCancel={() => handleCancel(item.aptId)}
                    aptStatus={item.status}
                    aptMethod={item.method}
                    appointmentsScreen={true}

                />
                }
            />}
        </View>
    )
}
export default AppointmentsScreen;

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: 'white',
        marginBottom: Platform.OS == 'ios' ? 20 : 5,
        paddingBottom: windowHeight * 0.005,
        borderBottomColor: Colors.grey100,
        borderBottomWidth: 1,
        paddingTop: 30
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