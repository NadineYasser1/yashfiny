import { useContext, useEffect, useMemo, useState } from "react"
import { HideTabContext } from "../store/HideTabContext"
import { TouchableOpacity, View, StyleSheet, Text, Pressable } from "react-native"
import i18n from "../i18n"
import { useNavigation } from "@react-navigation/native"
import { Colors } from "../constants/colors"
import InputField from "./InputField"
import DatePicker from "./DatePicker"
import GenderPicker from "./GenderPicker"
import UploadAvatar from "./UploadAvatar"
import { ScrollView } from "react-native-gesture-handler"
import DiseaseDateSelector from "./DiseaseDateSelector"
import dayjs from "dayjs"
import { DoctorContext } from "../store/DoctorContext"
import { PAYMENT_METHODS } from "../constants/paymentMethods"
import CustomDropdown from "./CustomDropDown"
import { tempDiseases } from "../constants/DummyDiseases"
import { OPTIONS } from "../constants/options"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const RegistrationForm = ({ editDoctor }) => {
    const navigation = useNavigation()
    const doctorCtx = useContext(DoctorContext)
    const [data, setData] = useState(editDoctor ? doctorCtx.doctorData : { date: new Date() })
    const [history, setHistory] = useState()
    const [pricing, setPricing] = useState(doctorCtx.doctorData.price)
    const [showMore, setShowMore] = useState(false)
    const [newPrice, setNewPrice] = useState({})
    const hideTabCtx = useContext(HideTabContext)

    useEffect(() => {
        hideTabCtx.hideTab(true)
    }, [])

    const handleSave = () => {
        if (editDoctor) {
            handleChange('price', pricing)
            doctorCtx.updateData(data)
            console.log(data)
        } else if (!editDoctor) {
            console.log({
                ...data,
                history
            })
        }
        hideTabCtx.hideTab(false)
        navigation.goBack()
    }
    const handleChange = (key, val) => {
        setData((prev) => ({
            ...prev,
            [key]: val
        }))

    }
    const handleDiseaseChange = (key, val) => {
        setHistory((prev) => ({
            ...prev,
            [key]: val
        }))

    }
    const handleDelete = (disease) => {
        const updatedDiseases = { ...history };
        delete updatedDiseases[disease];
        setHistory(updatedDiseases);
    }
    const getPaymentMethodByKey = (key) => {
        return PAYMENT_METHODS.find((method) => method.key == key)
    }
    const getsubspecialityByValue = (val) => {
        return tempDiseases.find((dis) => dis.value == val)
    }
    const getOptByKey = (key, val) => {
        if (val == 'type') {
            return OPTIONS.types.find((opt) => opt.value.toLowerCase() == key.toLowerCase())
        } else {
            return OPTIONS.methods.find((opt) => opt.value.toLowerCase() == key.toLowerCase())
        }
    }

    const diseasePatch = useMemo(() => {
        if (history != undefined) {
            return (
                <View>
                    {Object.keys(history).map((diseaseName, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey200, padding: 8, borderRadius: 20, marginRight: 30, marginBottom: 10 }}>
                            <View style={{ marginHorizontal: 10, flexDirection: 'row' }}>
                                <Text style={{ color: Colors.primary800, fontSize: 14 }}>{diseaseName}</Text>
                                <Text style={{ color: Colors.grey300 }}> {i18n.t('from')} </Text>
                                <Text style={{ color: Colors.primary800 }}>{dayjs(history[diseaseName].from).format('DD-MM-YYYY')} </Text>
                                <Text style={{ color: Colors.grey300 }}>{i18n.t('to')} </Text>
                                <Text style={{ color: Colors.primary800 }}>{dayjs(history[diseaseName].to).format('DD-MM-YYYY')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDelete(diseaseName)}>
                                <Text style={{ color: 'red', marginLeft: 2, fontSize: 14, fontWeight: "700" }}>x</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            );
        };
        return null
    }, [history])

    const handleTypeChange = (index, selectedType) => {

        const newPricing = [...pricing];
        newPricing[index].type = OPTIONS.types.find((opt) => opt.key == selectedType).value;
        setPricing(newPricing);
    };

    const handleMethodChange = (index, selectedMethod) => {
        const newPricing = [...pricing];
        newPricing[index].method = OPTIONS.methods.find((opt) => opt.key == selectedMethod).value;
        setPricing(newPricing);
    };

    const handlePriceChange = (index, newPrice) => {
        const newPricing = [...pricing];
        newPricing[index].price = newPrice;
        setPricing(newPricing);
    };

    const handleDeleteItem = (index) => {
        const newPricing = [...pricing];
        newPricing.splice(index, 1);
        setPricing(newPricing);
    };
    const handleNewPriceChange = (opt, key) => {
        if (key == 'type') {
            setNewPrice((prev) => ({
                ...prev,
                type: OPTIONS.types.find((option) => option.key == opt).value
            }))
        } else if (key == 'method') {
            setNewPrice((prev) => ({
                ...prev,
                method: OPTIONS.methods.find((option) => option.key == opt).value
            }))
        } else {
            setNewPrice((prev) => ({
                ...prev,
                price: opt
            }))
        }
    }
    const newPriceElement = useMemo(() => {
        if (showMore) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: '40%' }}>
                        <CustomDropdown
                            options={OPTIONS.types}
                            onSelect={(opt) => handleNewPriceChange(opt, 'type')}
                            placeholder={i18n.t('type')}
                        />
                    </View>
                    {
                        newPrice.type &&
                        <View style={{ width: '28%' }}>
                            <CustomDropdown
                                options={OPTIONS.methods}
                                onSelect={(opt) => handleNewPriceChange(opt, 'method')}
                                placeholder={i18n.t('method')}
                            />
                        </View>
                    }
                    {
                        newPrice.method &&
                        <View style={{ width: '20%' }}>
                            <InputField
                                value={newPrice.price}
                                style={{ marginTop: 7 }}
                                handleChange={(inputKey, text) => handleNewPriceChange(text, 'price')}
                                inputStyles={{ paddingEnd: 0 }}
                            />
                        </View>
                    }
                    {
                        newPrice.price && <MaterialCommunityIcons
                            name="plus-circle"
                            color={Colors.primary800}
                            size={25}
                            style={{ marginTop: 12, marginHorizontal: 10 }}
                            onPress={() => {
                                pricing.push(newPrice)
                                setNewPrice({})
                                setShowMore(false)
                            }
                            } />
                    }
                </View>
            )
        }
    }, [showMore, newPrice])

    const priceElement = useMemo(() => {

        if (pricing.length > 0) {
            return pricing.map((p, index) => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
                        <View style={{ width: '40%' }}>
                            <CustomDropdown
                                options={OPTIONS.types}
                                defaultOption={getOptByKey(p.type, 'type')}
                                selectedOpt={getOptByKey(p.type, 'type')}
                                onSelect={(opt) => handleTypeChange(index, opt)}
                            />
                        </View>
                        <View style={{ width: '28%' }}>
                            <CustomDropdown
                                options={OPTIONS.methods}
                                defaultOption={getOptByKey(p.method, 'method')}
                                selectedOpt={getOptByKey(p.method, 'method')}
                                onSelect={(opt) => handleMethodChange(index, opt)}
                            />
                        </View>
                        <View style={{ width: '20%' }}>
                            <InputField
                                value={p.price}
                                style={{ marginTop: 7, paddingEnd: 0 }}
                                handleChange={(inputKey, text) => handlePriceChange(index, text)}
                                inputStyles={{ paddingEnd: 0 }}
                            />
                        </View>
                        <MaterialCommunityIcons
                            name="delete-circle"
                            color='red'
                            size={20}
                            style={{ marginHorizontal: 10, marginTop: 7 }}
                            onPress={() => handleDeleteItem(index)}
                        />

                    </View>

                )
            })
        }
        return null
    }, [data, pricing, newPrice])
    return (
        <View style={styles.container}>
            <ScrollView>
                <UploadAvatar handleChange={handleChange} editDoctor={editDoctor} />
                <View style={styles.nameInput}>
                    <InputField
                        label={i18n.t('full_name')}
                        placeholder={i18n.t('fname')}
                        showLabel
                        handleChange={handleChange}
                        inputKey={'fname'}
                        value={editDoctor ? data.fname : null}
                    />
                    <View style={styles.inputNoLabel}>
                        <InputField
                            placeholder={i18n.t('lname')}
                            handleChange={handleChange}
                            inputKey={'lname'}
                            value={editDoctor ? data.lname : null}
                        />
                    </View>
                </View>
                <View style={styles.dateGenderContainer}>
                    <DatePicker
                        date={data.date}
                        handleChange={handleChange}
                        label={i18n.t('bdate')}
                        selectorFor={'dob'}
                    />
                    {!editDoctor && <GenderPicker handleChange={handleChange} />}
                </View>
                <View style={styles.nameInput}>
                    <InputField
                        placeholder={'example@example.com'}
                        label={i18n.t('email')}
                        showLabel
                        handleChange={handleChange}
                        inputKey={'email'}
                        value={editDoctor ? data.email : null} />
                </View>
                <View style={{ width: '59.5%' }}>
                    <InputField
                        placeholder={i18n.t('addr_placeholder')}
                        label={i18n.t('address')}
                        showLabel
                        handleChange={handleChange}
                        inputKey={'address'}
                        value={editDoctor ? data.address : null}
                    />
                    <View style={styles.nameInput}>
                        <InputField
                            placeholder={i18n.t('city')}
                            style={{ marginTop: 2 }}
                            handleChange={handleChange}
                            inputKey={'city'}
                            value={editDoctor ? data.city : null}
                        />
                        <InputField
                            placeholder={i18n.t('country')}
                            style={{ marginTop: 2 }}
                            handleChange={handleChange}
                            inputKey={'country'}
                            value={editDoctor ? data.country : null}
                        />
                    </View>
                </View>
                <View style={{ width: '59.5%' }}>
                    <InputField
                        placeholder={'01234567891'}
                        label={i18n.t('phone')}
                        showLabel
                        keypad={'numeric'}
                        handleChange={handleChange}
                        inputKey={'phone'}
                        value={editDoctor ? data.phone : null} />
                </View>
                {!editDoctor && <View style={styles.inputContainer}>
                    {diseasePatch}
                    <Text style={styles.label}>{i18n.t('patient_history')}</Text>
                    <DiseaseDateSelector handleChange={handleDiseaseChange} handleDelete={handleDelete} />
                </View>
                }
                {editDoctor && (
                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{i18n.t('payment_method')}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <CustomDropdown
                                    options={PAYMENT_METHODS}
                                    selectedOpt={getPaymentMethodByKey(data.payment_method)}
                                    onSelect={(opt) => handleChange('payment_method', opt)}
                                    defaultOption={getPaymentMethodByKey(data.payment_method)}
                                />
                                <InputField
                                    handleChange={handleChange}
                                    inputKey={'payment'}
                                    value={data.payment}
                                    style={{ marginTop: 7 }}

                                />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{i18n.t('subspeciality')}</Text>
                            <CustomDropdown
                                options={tempDiseases}
                                selectedOpt={getsubspecialityByValue(data.subspeciality)}
                                onSelect={(opt) => handleChange('subspeciality', opt)}
                                defaultOption={getsubspecialityByValue(data.subspeciality)}

                            />
                        </View>
                        <View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { marginBottom: 5 }]}>{i18n.t('pricing')}</Text>
                            {priceElement}
                            {!showMore && <View style={{ alignItems: 'flex-end', margin: 20, marginEnd: 40 }}>
                                <Pressable onPress={() => setShowMore(true)}>
                                    <Text style={{ color: Colors.link }}>{i18n.t('add_more')}</Text>
                                </Pressable>
                            </View>}
                            {newPriceElement}
                        </View>
                    </View>
                )
                }
            </ScrollView >
            <View style={styles.saveButton}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>{i18n.t("save")}</Text>
                </TouchableOpacity>
            </View>
        </View >
    )

}
export default RegistrationForm
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 8,
        paddingTop: 10,
    },
    saveButton: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        paddingBottom: 50
    },
    button: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary800
    },
    saveButtonText: {
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 17,
    },
    nameInput: {
        flexDirection: 'row',
    },
    inputNoLabel: {
        marginTop: 18.4
    },
    dateGenderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    locationContainer: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 15,
        color: "black",
        fontWeight: "600",
        paddingHorizontal: 5,
    },
    inputContainer: {
        marginTop: 25,
        alignContent: "flex-start",
        marginLeft: 10,
    },
    pricePatch: {
        backgroundColor: '#f4f6fc',
        borderRadius: 20,
        width: '70%',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: {
        color: Colors.link,
        paddingHorizontal: 10,
        paddingVertical: 5,
    }

})