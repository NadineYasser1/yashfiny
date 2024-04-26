import { View, Text, StyleSheet, Pressable, FlatList } from "react-native"
import i18n from "../../../i18n";
import { useMemo, useState } from "react";
import { Colors } from "../../../constants/colors";
import dayjs from "dayjs";
import CustomDropdown from "../../../components/CustomDropDown";
import IncomeListItem from "../../../components/IncomeListItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IncomeScreen = () => {
    const currentDate = dayjs(new Date());
    const lastSixMonths = [];

    for (let i = 0; i < 6; i++) {
        const month = currentDate.subtract(i, 'month').format('MMMM YYYY');
        lastSixMonths.push(month);
    }

    const dummyIncome = {
        [lastSixMonths[0]]: [ // April 2024 masalan
            {
                fname: 'Nadine',
                lname: 'Yasser',
                patientId: '12345678',
                date: new Date(),
                status: { id: 1, name: 'attended' },
                payment: '150',
                cur: 'EGP',
                type: 'video'
            },
            {
                fname: 'Nadine',
                lname: 'Yasser',
                patientId: '12345678',
                date: new Date(),
                status: { id: 0, name: 'cancelled' },
                payment: '150',
                cur: 'EGP',
                type: 'video'
            },
            {
                fname: 'Nadine',
                lname: 'Yasser',
                patientId: '12345678',
                date: new Date(),
                status: { id: 0, name: 'cancelled' },
                payment: '150',
                cur: 'EGP',
                type: 'clinic'
            },
            {
                fname: 'Nadine',
                lname: 'Yasser',
                patientId: '12345678',
                date: new Date(),
                status: { id: 1, name: 'attended' },
                payment: '150',
                cur: 'EGP',
                type: 'clinic'
            },

        ],
        [lastSixMonths[1]]: [ //March 2024
            {
                fname: 'Nadine',
                lname: 'Yasser',
                patientId: '12345678',
                date: new Date(),
                status: { id: 0, name: 'cancelled' },
                payment: '150',
                cur: 'EGP',
                type: 'video'
            }
        ],
        [lastSixMonths[2]]: [ //February 2024
            {
                fname: 'Nadine',
                lname: 'Yasser',
                patientId: '12345678',
                date: new Date(),
                status: { id: 1, name: 'attended' },
                payment: '150',
                cur: 'EGP',
                type: 'clinic'
            }
        ],
        [lastSixMonths[3]]: [
            {
                fname: 'Nadine',
                lname: 'Yasser',
                patientId: '12345678',
                date: new Date(),
                status: { id: 1, name: 'attended' },
                payment: '150',
                cur: 'EGP',
                type: 'clinic'
            }
        ],
        [lastSixMonths[4]]: [
            {
                fname: 'Nadine',
                lname: 'Yasser',
                patientId: '12345678',
                date: new Date(),
                status: { id: 1, name: 'attended' },
                payment: '150',
                cur: 'EGP',
                type: 'video'
            }
        ],
        [lastSixMonths[5]]: [
            {
                fname: 'Nadine',
                lname: 'Yasser',
                patientId: '12345678',
                date: new Date(),
                status: { id: 1, name: 'attended' },
                payment: '150',
                cur: 'EGP',
                type: 'video'
            }
        ],

    }

    const calculateSumOfPayments = (appointments) => {
        let sum = 0;
        appointments.forEach(appointment => {
            if (appointment.status.name === 'attended') {
                sum += parseInt(appointment.payment);
            } else if (appointment.status.name === 'cancelled') {
                sum -= parseInt(appointment.payment);
            }
        });
        return sum;
    }
    const getOptionById = (opt) => {
        return options.find((option) => option.key == opt).value
    }

    const options = Object.entries(dummyIncome).map(([key, value], index) => {
        return { key: index, value: key };
    });
    const [filterOpt, setFilterOpt] = useState('all')
    const [selectedMonth, setSelectedMonth] = useState(options[0].value)

    const onSelect = (opt) => {
        setSelectedMonth(getOptionById(opt))
    }
    const listData = useMemo(() => {
        if (filterOpt == 'all') {
            return dummyIncome[selectedMonth]
        } else {
            return dummyIncome[selectedMonth].filter((apt) => apt.type.toLowerCase() == filterOpt)
        }
    }, [filterOpt, selectedMonth])

    const totalIncome = useMemo(() => {
        if (listData.length > 0) {
            return calculateSumOfPayments(listData)
        }

        return 0
    }, [listData])
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, paddingTop: 10 }}>
                <Pressable
                    onPress={() => setFilterOpt('all')}
                    style={[styles.buttonContainer, filterOpt == 'all' && styles.buttonContainerChosen]}
                >
                    <Text
                        style={[styles.button, filterOpt == 'all' && styles.buttonChosen]}
                    >{i18n.t('all')}</Text>
                </Pressable>
                <Pressable
                    onPress={() => setFilterOpt('video')}
                    style={[styles.buttonContainer, filterOpt == 'video' && styles.buttonContainerChosen]}
                >
                    <Text
                        style={[styles.button, filterOpt == 'video' && styles.buttonChosen]}
                    >{i18n.t('video')}</Text>
                </Pressable>
                <Pressable
                    onPress={() => setFilterOpt('clinic')}
                    style={[styles.buttonContainer, filterOpt == 'clinic' && styles.buttonContainerChosen]}
                >
                    <Text
                        style={[styles.button, filterOpt == 'clinic' && styles.buttonChosen]}
                    >{i18n.t('clinic')}</Text>
                </Pressable>
            </View>
            <View style={styles.dropdownContainer}>
                <CustomDropdown
                    options={options}
                    onSelect={onSelect}
                    defaultOption={options[0]}
                    style={{ borderRadius: 10, borderColor: Colors.grey300, height: 30, width: 140, alignItems: 'center', justifyContent: 'center', marginTop: 0, marginStart: 30, marginBottom: 20 }}
                    inputStyles={{ height: 20, fontSize: 12, padding: 3 }}
                    dropdownTextStyles={{ fontSize: 12 }}
                />
            </View>
            {listData.length > 0 ? <View>
                <FlatList
                    data={listData}
                    renderItem={({ item }) => <IncomeListItem
                        fname={item.fname}
                        lname={item.lname}
                        aptDate={item.date}
                        id={item.patientId}
                        payment={item.payment}
                        status={item.status}
                        currency={item.cur}
                    />}

                />
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: Colors.primary800, marginVertical: 20, marginHorizontal: 5, fontSize: 15, fontWeight: "500" }}>{i18n.t('total')}</Text>
                    <View style={styles.incomePatch}>
                        <Text style={styles.totalIncome}>{totalIncome} {listData[0].cur}</Text>
                    </View>
                </View>
            </View> :
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                    <MaterialCommunityIcons name="currency-usd-off" color={Colors.grey300} size={150} style={{ marginBottom: 40 }} />
                    <Text style={{ color: Colors.grey300, fontSize: 16, fontWeight: "600" }}>{i18n.t('no_income_for_chosen_filters')}</Text>
                </View>
            }
        </View>
    )
}
export default IncomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 30,
    },
    button: {
        color: Colors.primary800,
        fontSize: 15
    },
    buttonContainerChosen: {
        backgroundColor: Colors.primary800
    },
    buttonChosen: {
        color: 'white'
    },
    dropdownContainer: {
        marginTop: 40,
        width: 200
    },
    incomePatch: {
        backgroundColor: Colors.primary800,
        borderRadius: 20,
        // margin: 20
        marginVertical: 20,
        marginEnd: 20
    },
    totalIncome: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        color: 'white',
        fontSize: 17,
        fontWeight: "600"
    }
})