import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Alert
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/colors";
import i18n from "../../i18n";
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from "dayjs";
import CustomDropdown from "../../components/CustomDropDown";
import CustomInput from "../../components/CustomInput";
import { CheckBox } from "react-native-elements";
import { tempDiseases } from "../../constants/DummyDiseases";
import { PAYMENT_METHODS } from "../../constants/paymentMethods";
import { axios } from "../../utils/axios";
import { API } from "../../utils/config";
import LoadingScreen from "../../components/LoadingScreen";
import useLoading from "../../hooks/useLoading";
import Layout from "../../components/Layout";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const RegistrationScreen = ({ route, navigation }) => {
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [circleCheckBoxValue, setCircleCheckBoxValue] = useState()
  const [selection, setSelection] = useState(null);
  const [gender, setGender] = useState('male')
  const [choices, setChoices] = useState([]);
  const [price, setPrice] = useState([])
  const [newData, setNewData] = useState()
  const { loading, setIsLoading } = useLoading()
  const [opts, setOpts] = useState()

  const fetchOpts = () => {
    setIsLoading(true)
    axios.get(API.specialities).then(({ data }) => {
      setOpts(data.data)
    }).catch((err) => Alert.alert(err.response.data.message)
    ).finally(() => setIsLoading(false))
  }

  const getPaymentMethodByKey = (key) => {
    switch (key) {
      case 1:
        return i18n.t('bank_account')
      case 2:
        return i18n.t('instapay')
      case 3:
        return i18n.t('phone_number')
      default:
        return i18n.t('bank_account')

    }
  }
  const data = useMemo(() => {
    return {
      ...route.params,
      ...newData,
      title: 'Dr',
      dob: dayjs(date).format('YYYY-MM-DD'),
      gender,
      price,
      handlesApts: circleCheckBoxValue,
    }
  }, [selection, circleCheckBoxValue, gender, price, newData])
  const paymentPlaceHolder = useMemo(() => {
    if (newData?.payment_method) {
      switch (newData.payment_method) {
        case 1: {
          return i18n.t('bank_acc_no')
        }
        case 2: {
          return i18n.t('instapay_mail')
        }
        case 3: {
          return i18n.t('phone_number')
        }
        default: {
          return i18n.t('bank_acc_no')
          // return newData.payment_method
        }
      }
    } else {
      return i18n.t('select_payment_method')
    }
  }, [newData])
  const handleDataChange = (key, option) => {
    setNewData((prev) => ({
      ...prev,
      [key]: option
    }))
  }
  const handleSelection = (key, option) => {
    setSelection((prev) => ({
      ...prev,
      [key]: option
    }))

  };


  const handleAddChoice = (price) => {
    setChoices(prevChoices => [
      ...prevChoices,
      `${selection.type} - ${selection.method}: EGP ${price}`
    ]);
    setPrice(prevPrices => [
      ...prevPrices,
      {
        type: selection.type,
        method: selection.method,
        price
      }
    ])
    setSelection(null)
  };

  const handleDeleteChoice = (index) => {
    const updatedChoices = [...choices];
    updatedChoices.splice(index, 1);
    setChoices(updatedChoices);
  };

  const getOptByKey = (opts, key) => {
    return opts.find(opt => opt.key == key).value
  }
  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  }

  const confirmIosDate = () => {
    setShowPicker(false);
  }
  const handleContinue = () => {
    console.log(data)
    setIsLoading(true)
    axios.post(API.register, data
    ).then(({ data }) => {
      navigation.navigate("UploadForm", data.data.id)
    }
    ).catch((err) => {
      console.log(err)
      Alert.alert(i18n.t('error'), err.response.data.message)
    }
    ).finally(() =>
      setIsLoading(false)
    )

  }

  useEffect(() => {
    fetchOpts()
  }, [])


  return (
    <Layout loading={loading}>
      <LinearGradient
        colors={[Colors.primary800, "white"]}
        locations={[0.6, 1]}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent} >
            <View style={styles.container}>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t("identification")}</Text>
                <TextInput
                  placeholder={i18n.t("national_id_or_passport")}
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  onChangeText={(val) => handleDataChange('identification', val)}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.label}>{i18n.t("bdate")}</Text>
                  <Text style={styles.genderLabel}>{i18n.t("gender")}</Text>
                </View>
                <Pressable onPress={toggleDatePicker}>
                  <View style={styles.rowContainer}>
                    <TextInput
                      value={dayjs(date).format("YYYY-MM-DD")}
                      editable={false}
                      style={[styles.smallInput, dayjs(date).format('YYYY-MM-DD') == dayjs(new Date()).format('YYYY-MM-DD') ? { color: '#aaa' } : { color: 'black' }]}
                      placeholderTextColor="#aaa"
                      onPressIn={toggleDatePicker}
                    />
                    <Icon name="calendar" size={23} color={Colors.accent800} style={{ marginHorizontal: 10, marginTop: 10 }} />
                    <View style={styles.genderContainer}>
                      <View style={styles.genderButtons}>
                        <Pressable onPress={() => { setGender('male') }} style={[styles.genderButton, gender == 'male' && styles.genderButtonPressed]}>
                          <Text style={[styles.genderText, gender == 'male' && { color: 'white' }]}>{i18n.t('male')}</Text>
                        </Pressable>
                        <Pressable onPress={() => { setGender('female') }} style={[styles.genderButton, gender == 'female' && styles.genderButtonPressed]} >
                          <Text style={[styles.genderText, gender == 'female' && { color: 'white' }]}>{i18n.t('female')}</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Pressable>
                {showPicker &&
                  <View style={{ borderRadius: 15, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginTop: 5, marginRight: 5, backgroundColor: 'white' }}>
                    <DateTimePicker
                      mode="date"
                      display='spinner'
                      value={date}
                      onChange={handleChange}
                      style={{ backgroundColor: 'white' }}
                      maximumDate={new Date()}

                    />
                    {
                      showPicker && Platform.OS === "ios" && (
                        <View style={styles.iosPickerButtons}>
                          <Pressable onPress={confirmIosDate} style={styles.confirmButton}>
                            <Text style={styles.confirmText}>{i18n.t('confirm')}</Text>
                          </Pressable>
                          <Pressable onPress={toggleDatePicker} style={styles.cancelButton} >
                            <Text style={styles.cancelText}>{i18n.t('cancel')}</Text>
                          </Pressable>
                        </View>
                      )
                    }
                  </View>
                }
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t("address")}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder={i18n.t("address_placeholder")}
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    onChangeText={(val) => handleDataChange('address', val)}
                  />
                  <Icon name="map-marker" color={Colors.accent800} size={30} style={{ marginLeft: 5, marginTop: 9 }} />
                </View>
                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                  <TextInput
                    placeholder={i18n.t('city')}
                    style={styles.addressInput}
                    placeholderTextColor="#aaa"
                    onChangeText={(val) => handleDataChange('city', val)}
                  />
                  <TextInput
                    placeholder={i18n.t('country')}
                    style={styles.addressInput}
                    placeholderTextColor="#aaa"
                    onChangeText={(val) => handleDataChange('country', val)}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t("phone_number")}</Text>
                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                  <TextInput
                    defaultValue='+20'
                    style={styles.codeInput}
                    placeholderTextColor="black"
                    inputMode="numeric"
                    onChangeText={(val) => handleDataChange('country_code', val)}
                  />
                  <TextInput
                    style={styles.phoneInput}
                    inputMode="numeric"
                    placeholder="e.g: 12345678"
                    onChangeText={(val) => handleDataChange('phone', val)}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.inputContainer, { marginRight: 10 }]}>
                  <Text style={styles.label}>{i18n.t("specialization")}</Text>
                  {opts && <View style={{ width: 160 }}>
                    <CustomDropdown
                      options={opts}
                      onSelect={(opt) => handleDataChange('specialization', getOptByKey(opts, opt))}
                      label={i18n.t('specialization')}
                      style={{ width: 160, height: 60 }}
                    />
                  </View>}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>{i18n.t("subspeciality")}</Text>
                  {opts && <View style={{ width: 160 }}>
                    <CustomDropdown
                      options={opts}
                      onSelect={(opt) => handleDataChange('subspeciality', getOptByKey(opts, opt))}
                      label={i18n.t('subspeciality')}
                      style={{ width: 160, height: 60 }}
                    />
                  </View>}
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t("pricing")}</Text>
                {choices.length > 0 && (
                  <View style={styles.choicesContainer}>
                    {choices.map((choice, index) => (
                      <Pressable
                        key={index}
                        style={styles.choice}
                        onPress={() => handleDeleteChoice(index)}>
                        <Text style={{ color: Colors.primary600, marginHorizontal: 5 }}>{choice}</Text>
                        <Text style={styles.deleteButton}>x</Text>
                      </Pressable>
                    ))}
                  </View>)}
                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                  <CustomDropdown
                    options={[i18n.t('examination'), i18n.t('consultation')]}
                    onSelect={(opt) => handleSelection('type', opt)}
                  />
                  {selection?.type && (
                    <>
                      <CustomDropdown
                        options={[i18n.t('video'), i18n.t('clinic')]}
                        onSelect={(opt) => handleSelection('method', opt)}
                        placeholder={i18n.t('select_type')}
                      />
                      {
                        selection?.method && (
                          <CustomInput placeholder={"Price"} onAdd={handleAddChoice} />
                        )
                      }

                    </>
                  )}

                </View>
              </View>
              {/* <View style={styles.inputContainer}>
              <Text style={styles.label}>{i18n.t("diseases_treated")}</Text>
              <View style={{ width: 290 }}>
                <CustomMultipleSelect
                  options={tempDiseases}
                  onSelect={(arr) => handleDataChange('diseases_treated', arr)} label={i18n.t('diseases')} />
              </View>
            </View> */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t('payment_method')}</Text>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start' }}>
                  <CustomDropdown
                    options={PAYMENT_METHODS}
                    onSelect={(opt) => handleDataChange('payment_method', getPaymentMethodByKey(opt))}
                    style={{ width: 150 }}
                  />
                  <TextInput
                    placeholder={paymentPlaceHolder}
                    placeholderTextColor="#aaa"
                    style={[styles.input, { marginTop: 12, width: '50%', height: 38 }]}
                    onChangeText={(val) => handleDataChange('payment', val)} />

                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t("will_you_handle_apts")}</Text>
                <CheckBox
                  containerStyle={{ marginLeft: 0, width: '100%', backgroundColor: 'transparent', borderColor: 'transparent' }}
                  checked={circleCheckBoxValue?.doctor}
                  title={i18n.t('yes')}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  uncheckedColor="white"
                  checkedColor={Colors.accent800}
                  textStyle={{ color: 'white' }}
                  onPress={() => setCircleCheckBoxValue((prev) => ({
                    ...prev,
                    doctor: !circleCheckBoxValue?.doctor,
                    assistant: circleCheckBoxValue?.doctor
                  }))}
                />
                <CheckBox
                  containerStyle={{ marginLeft: 0, width: '100%', backgroundColor: 'transparent', borderColor: 'transparent' }}
                  checked={circleCheckBoxValue?.assistant}
                  title={i18n.t('no_assistant_handles')}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  uncheckedColor="white"
                  textStyle={{ color: 'white' }}
                  checkedColor={Colors.accent800}
                  onPress={() => setCircleCheckBoxValue((prev) => ({
                    ...prev,
                    assistant: !circleCheckBoxValue?.assistant,
                    doctor: circleCheckBoxValue?.assistant
                  }))} />
              </View>
              <Pressable
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>{i18n.t("continue")}</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      </LinearGradient >
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30
  },
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    width: "85%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    fontSize: 15,
    borderColor: Colors.primary800,
  },
  label: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginTop: 25,
    alignContent: "flex-start",
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iosPickerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: 10,
    backgroundColor: 'white',
    padding: 20,
  },
  confirmButton: {
    borderRadius: 20,
    padding: 12,
    backgroundColor: Colors.primary600,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  cancelButton: {
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginHorizontal: 20
  },
  confirmText: {
    fontSize: 16,
    color: 'white'

  },
  cancelText: {
    fontSize: 16,
    color: Colors.primary700
  },
  smallInput: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    fontSize: 15,
    borderColor: Colors.primary800,
  },
  genderContainer: {
    marginLeft: 20,
    marginTop: 3
  },
  genderLabel: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
    marginLeft: 112
  },
  genderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  genderButton: {
    borderRadius: 20,
    width: 70,
    height: 30,
    marginHorizontal: 7,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  genderButtonPressed: {
    borderRadius: 20,
    width: 70,
    height: 30,
    marginHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: Colors.primary600,
  },
  genderText: {
    fontSize: 13,
    color: 'black',
  },
  addressInput: {
    width: "30%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 12,
    padding: 10,
    fontSize: 15,
    borderColor: Colors.primary800,
    marginEnd: 20,
  },
  phoneInput: {
    width: "69%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 12,
    padding: 10,
    fontSize: 15,
    borderColor: Colors.primary800,
    marginEnd: 20,
  },
  codeInput: {
    width: "13%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 12,
    padding: 10,
    fontSize: 15,
    borderColor: Colors.primary800,
    marginEnd: 10,
  },
  continueButton: {
    backgroundColor: Colors.primary600,
    padding: 15,
    width: '30%',
    borderRadius: 25,
    marginTop: 50,
    elevation: 2,
    shadowColor: Colors.primary800,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginLeft: 'auto',
    marginRight: 20,
    marginBottom: 50
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "300",
    color: "white",
    alignSelf: "center",
  },
  choicesContainer: {
    marginTop: 20,
    width: '70%',
  },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  deleteButton: {
    fontWeight: "700",
    fontSize: 18,
    color: Colors.primary800,
    marginStart: 10,
    marginEnd: 5
  },
  pickerContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    marginTop: 5,
    marginRight: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: 4,
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 2
  }
});

export default RegistrationScreen;