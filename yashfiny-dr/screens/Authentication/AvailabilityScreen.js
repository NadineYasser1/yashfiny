import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform, Modal,
  Pressable,
  Alert,
  Switch,
  Dimensions
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import i18n from '../../i18n';
import CustomDropdown from '../../components/CustomDropDown';
import { HideTabContext } from '../../store/HideTabContext';
import dayjs from 'dayjs';
import AddAvailabilityModal from '../../components/AddAvailabilityModal';
import { axios } from '../../utils/axios';
import { API } from '../../utils/config';
import { AuthContext } from '../../store/AuthContext'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AvailabilityScreen = ({ navigation, route }) => {

  const hideTabCtx = useContext(HideTabContext)
  const authCtx = useContext(AuthContext)

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const opts = [
    { value: i18n.t('video'), key: 1 },
    { value: i18n.t('clinic'), key: 2 },
  ]
  const optsArr = [
    { value: i18n.t('group'), key: 1 },
    { value: i18n.t('individual'), key: 2 },
  ]


  const [doctorId, setDoctorId] = useState(route.params)
  const [selectedDay, setSelectedDay] = useState(`${year}-${month}-${day}`);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showModalPicker, setShowModalPicker] = useState(false);
  const [pickerFor, setPickerFor] = useState('start');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditingModalVisible, setIsEditingModalVisible] = useState(false);
  const [aptMethod, setAptMethod] = useState()
  const [newChanges, setNewChanges] = useState(false)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [slotType, setSlotType] = useState()

  const fetchAvailability = () => {
    axios.get(API.availability).then(({ data }) => {
      for (let date in data.data) {
        const formattedDate = formatDateString(date);
        data.data[formattedDate] = data.data[date];
        delete data.data[date];
        data.data[formattedDate].forEach(entry => {
          entry.addSlotToScreen = true;
          entry.startTime = formatRecievedTime(entry.startTime);
          entry.endTime = formatRecievedTime(entry.endTime);
        });
      }

      setSelectedSlot(data.data)
    }).catch((err) => console.log(err))
  }

  function formatDateString(dateString) {
    const parts = dateString.split('-');
    return `20${parts[0]}-${parts[1]}-${parts[2]}`;
  }

  function formatRecievedTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return new Date(1970, 0, 1, hours, minutes, seconds);
  }
  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  const getSlotById = (optionsArray, key) => {
    return optionsArray.find((opt) => opt.key == key)
  }
  const onSelectOpt = (type, option) => {
    if (type == 'type') {
      setSlotType(getSlotById(optsArr, option).value)
    } else if (type == 'location') {
      setAptMethod(getSlotById(opts, option).value)
    }

  }

  const showAvailabilityModal = () => {
    if (startTime && endTime) {
      setAddModalVisible(true)
    } else {
      Alert.alert(i18n.t('time_slot_alert'))
    }
  }
  const addSlot = () => {
    setAddModalVisible(false)
    if (startTime && endTime && slotType && aptMethod) {
      const newSlot = {
        startTime: startTime,
        endTime: endTime,
        type: slotType,
        location: aptMethod,
        addSlotToScreen: true,
        status: 'available'
      };
      setSelectedSlot((prevSlots) => ({
        ...prevSlots,
        [selectedDay]: [...(prevSlots[selectedDay] || []), newSlot],
      }));
      const dayOne = selectedDay
      const dayTwo = selectedDay
      const dayThree = selectedDay
      const dayFour = selectedDay

      const datesArr = [
        dayjs(dayOne).add(7, 'day').format('YYYY-MM-DD'),
        dayjs(dayTwo).add(14, 'day').format('YYYY-MM-DD'),
        dayjs(dayThree).add(21, 'day').format('YYYY-MM-DD'),
        dayjs(dayFour).add(28, 'day').format('YYYY-MM-DD'),
      ]

      datesArr.forEach((date) => setSelectedSlot((prevSlots) => ({
        ...prevSlots,
        [date]: [...(prevSlots[date] || []), newSlot],
      })))

      setStartTime('')
      setEndTime('')
      setNewChanges(true)
    } else {
      Alert.alert(i18n.t('modal_slot_alert'))
    }
  };

  const deleteSlot = (index) => {
    const dayOne = selectedDay
    const dayTwo = selectedDay
    const dayThree = selectedDay
    const dayFour = selectedDay

    const datesArr = [
      dayjs(dayOne).add(7, 'day').format('YYYY-MM-DD'),
      dayjs(dayTwo).add(14, 'day').format('YYYY-MM-DD'),
      dayjs(dayThree).add(21, 'day').format('YYYY-MM-DD'),
      dayjs(dayFour).add(28, 'day').format('YYYY-MM-DD'),
    ]

    const updatedSlots = selectedSlot[selectedDay].filter((_, i) => i !== index);
    const updatedSelectedSlot = { ...selectedSlot, [selectedDay]: updatedSlots };

    setSelectedSlot(updatedSelectedSlot);

    datesArr.forEach((date) => {
      const updatedSlotsForDate = selectedSlot[date].filter((_, i) => i !== index);
      setSelectedSlot((prevSlots) => ({
        ...prevSlots,
        [date]: updatedSlotsForDate,
      }));
    });
    setNewChanges(true)
  };

  const editSlot = (index) => {
    setEditingIndex(index);
    const slot = selectedSlot[selectedDay][index];
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setSlotType(slot.type);
    setAptMethod(slot.location);
    setIsEditingModalVisible(true);
  };


  const updateSlot = () => {
    const updatedSlots = [...selectedSlot[selectedDay]];
    updatedSlots[editingIndex] = {
      startTime: startTime,
      endTime: endTime,
      type: slotType,
      location: aptMethod,
      addSlotToScreen: true,
      status: 'available'
    };
    setSelectedSlot((prevSlots) => ({
      ...prevSlots,
      [selectedDay]: updatedSlots,
    }));
    const dayOne = selectedDay
    const dayTwo = selectedDay
    const dayThree = selectedDay
    const dayFour = selectedDay

    const datesArr = [
      dayjs(dayOne).add(7, 'day').format('YYYY-MM-DD'),
      dayjs(dayTwo).add(14, 'day').format('YYYY-MM-DD'),
      dayjs(dayThree).add(21, 'day').format('YYYY-MM-DD'),
      dayjs(dayFour).add(28, 'day').format('YYYY-MM-DD'),
    ]

    datesArr.forEach((date) =>
      setSelectedSlot((prevSlots) => ({
        ...prevSlots,
        [date]: updatedSlots,
      }))
    )

    setEditingIndex(null);
    setStartTime('');
    setEndTime('');
    setIsEditingModalVisible(false);
    setNewChanges(true)
  };

  const toggleTimePicker = (type) => {
    setShowPicker(!showPicker);
    setPickerFor(type);
  };

  const toggleModalTimePicker = (type) => {
    setShowModalPicker(!showModalPicker);
    setPickerFor(type);
  };

  const confirmIosDate = () => {
    setShowPicker(false);
  };

  const handleChange = (event, selectedTime) => {
    if (isEditingModalVisible) {
      setShowModalPicker(Platform.OS == 'ios')
    } else {
      setShowPicker(Platform.OS == 'ios');
    }
    if (pickerFor == 'start') {
      setStartTime(selectedTime);
    } else {
      setEndTime(selectedTime);
    }
  };

  const renderTimePicker = () => {
    if (showPicker) {
      return (
        <View>
          <DateTimePicker
            value={(pickerFor == 'start' ? startTime : endTime) || new Date()}
            mode='time'
            display="spinner"
            onChange={handleChange}
          />
          {
            showPicker && Platform.OS === "ios" && (
              <View style={styles.iosPickerButtons}>
                <TouchableOpacity onPress={confirmIosDate} style={styles.confirmButton}>
                  <Text style={styles.confirmText}>{i18n.t('confirm')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleTimePicker} style={styles.cancelButton} >
                  <Text style={styles.cancelText}>{i18n.t('cancel')}</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      );
    }
    return null;
  };

  const renderModalTimePicker = () => {
    if (showModalPicker && isEditingModalVisible) {
      return (
        <View>
          <DateTimePicker
            value={(pickerFor == 'start' ? startTime : endTime) || new Date()}
            mode='time'
            display="spinner"
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
            textColor='black'
          />
        </View>
      );
    }
    return null;
  }

  const markedDatesArray = useMemo(() => {
    const markedDates = Object.entries(selectedSlot).map(([date, slot]) => {
      if (slot && slot.length > 0) {
        return {
          date: new Date(date),
          dots: [
            {
              color: selectedDay == date ? Colors.primary800 : 'grey'
            }
          ]
        };
      }
      return null;
    }).filter(date => date !== null);

    return markedDates;
  }, [selectedSlot, selectedDay]);

  const renderSelectedSlots = () => {
    const selectedDaySlots = selectedSlot[selectedDay];
    if (selectedDaySlots && selectedDaySlots.length > 0) {
      return selectedDaySlots.map((slot, index) => {
        if (slot?.startTime && slot?.endTime && slot?.location && slot?.type && slot?.addSlotToScreen) {
          return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} key={index}>
              <View style={[styles.slotContainer, { borderColor: slot.location.toLowerCase() == 'video' ? Colors.primary800 : Colors.accent800 }]} key={index}>
                <MaterialCommunityIcons name={slot.type.toLowerCase() == 'group' ? 'account-group' : 'account'} color={slot.location.toLowerCase() == 'video' ? Colors.primary800 : Colors.accent800} size={13} />
                <Text style={{ color: slot.location.toLowerCase() == 'video' ? Colors.primary800 : Colors.accent800, fontWeight: "600" }}>{formatTime(slot.startTime)}</Text>
                <Text style={{ color: Colors.grey100, fontWeight: "700", marginHorizontal: 20 }}>{i18n.t('to')}</Text>
                <Text style={{ color: slot.location.toLowerCase() == 'video' ? Colors.primary800 : Colors.accent800, fontWeight: "600" }}>{formatTime(slot.endTime)}</Text>
                <TouchableOpacity onPress={() => editSlot(index)} style={{ marginHorizontal: 20 }}>
                  <MaterialCommunityIcons name="pencil" size={24} color={slot.location.toLowerCase() == 'video' ? Colors.primary800 : Colors.accent800} />
                </TouchableOpacity>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => deleteSlot(index)}>
                  <View style={styles.deleteButton}>
                    <MaterialCommunityIcons name="minus" size={20} color='white' />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      });
    }
    return <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', margin: 30 }}>
      <MaterialCommunityIcons name="clock-alert" size={90} color={Colors.grey100} />
      <Text style={{ textAlign: 'center', color: Colors.grey100, marginTop: 20 }}>{i18n.t('no_time_slots_selected')}</Text>
    </View>;
  };

  const postAvailability = () => {
    const route = authCtx.isAuthenticated ? API.availability : API.newAvailability.replace('{doctorId}', doctorId)
    console.log({
      ...selectedSlot
    })
    axios.patch(route, { availability: selectedSlot }
    ).then(({ data }) => {
      console.log(data)
      hideTabCtx.hideTab(false)
      navigation.goBack()
    }).catch((err) => console.log(err))
  }

  const handleSave = () => {
    postAvailability()

  }
  useEffect(() => {
    hideTabCtx.hideTab(true)
    Alert.alert(i18n.t('avail_alert_title'), i18n.t('avail_alert_note'))
    fetchAvailability()
  }, [])
  return (
    <View style={styles.container}>
      <Modal
        visible={isEditingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditingModalVisible(false)}
      >
        <View style={styles.editContainer}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{i18n.t('edit_slot')}</Text>
            <View style={styles.timeInputs}>
              <Text style={styles.label}>{i18n.t('from')}</Text>
              <TextInput
                style={styles.timeInput}
                placeholder='hh:mm A'
                value={startTime ? formatTime(startTime) : ''}
                editable={Platform.OS == 'android'}
                onPressIn={() => {
                  toggleModalTimePicker('start')
                }}
              />
              <Text style={styles.label}>{i18n.t('to')}</Text>
              <TextInput
                style={styles.timeInput}
                placeholder='hh:mm A'
                value={endTime ? formatTime(endTime) : ''}
                editable={Platform.OS == 'android'}
                onPressIn={() => toggleModalTimePicker('end')}
              />
            </View>
            {renderModalTimePicker()}
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 20 }}>
                <Text style={styles.slotTypeTxt}>{i18n.t('slot_location')}</Text>
                <CustomDropdown
                  options={opts}

                  onSelect={(opt) => onSelectOpt('location', opt)}
                  defaultOption={opts.find((opt) => opt.value?.toLowerCase() == aptMethod?.toLowerCase())}
                  placeholder={i18n.t('select_location')}
                  style={{ borderRadius: 20, borderColor: Colors.primary800, height: 30, width: 100, alignItems: 'center', justifyContent: 'center', marginTop: 0 }}
                  inputStyles={{ height: 20, fontSize: 12, padding: 3 }}
                  dropdownTextStyles={{ fontSize: 12 }}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={[styles.slotTypeTxt, { marginEnd: 60 }]}>{i18n.t('slot_type')}</Text>
                <CustomDropdown
                  options={optsArr}
                  onSelect={(opt) => onSelectOpt('type', opt)}
                  defaultOption={optsArr.find((opt) => opt.value?.toLowerCase() == slotType?.toLowerCase())}
                  placeholder={i18n.t('select_type')}
                  style={{ borderRadius: 20, borderColor: Colors.primary800, height: 30, width: 100, alignItems: 'center', justifyContent: 'center', marginTop: 0 }}
                  inputStyles={{ height: 20, fontSize: 12, padding: 3 }}
                  dropdownTextStyles={{ fontSize: 12 }}
                />
              </View>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => updateSlot()} style={styles.updateButtonContainer}>
                <Text style={styles.updateButtonText}>{i18n.t('update')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditingModalVisible(false)}>
                <Text style={[styles.cancelButton, { color: 'red' }]}>{i18n.t('cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.topContainer}>
        <CalendarStrip
          style={{ height: windowHeight * 0.13, marginHorizontal: 10 }}
          selectedDate={selectedDay}
          onDateSelected={(date) => setSelectedDay(date.format('YYYY-MM-DD'))}
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
          minDate={currentDate}
          maxDate={dayjs(currentDate).add(1, 'month').toDate()}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <AddAvailabilityModal visible={addModalVisible} onSelectOpt={onSelectOpt} addSlot={() =>
          addSlot(selectedDay, selectedSlot[selectedDay]?.startTime, selectedSlot[selectedDay]?.endTime)}
          onRequestClose={() => setAddModalVisible(false)} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 20 }}>
        <MaterialCommunityIcons name='account' color={Colors.grey300} style={{ marginEnd: 5, marginStart: 20 }} size={18} />
        <Text style={{ color: Colors.grey300, fontSize: 13, marginEnd: 20, }}>{i18n.t('individual')}</Text>
        <MaterialCommunityIcons name='account-group' color={Colors.grey300} size={18} style={{ marginEnd: 5 }} />
        <Text style={{ color: Colors.grey300, fontSize: 13, marginEnd: 10 }}>{i18n.t('group')}</Text>
        <MaterialCommunityIcons name='square-rounded' color={Colors.accent800} style={{ marginEnd: 5, marginStart: 20 }} size={18} />
        <Text style={{ color: Colors.accent800, fontSize: 13, marginEnd: 20 }}>{i18n.t('clinic')}</Text>
        <MaterialCommunityIcons name='square-rounded' color={Colors.primary800} size={18} style={{ marginEnd: 5 }} />
        <Text style={{ color: Colors.primary800, fontSize: 13, marginEnd: 20 }}>{i18n.t('video')}</Text>
      </View>
      <View contentContainerStyle={styles.content}>
        <View style={{ backgroundColor: 'white', borderRadius: 20, marginHorizontal: 8, padding: 8, height: windowHeight > 800 && windowHeight <= 900 ? windowHeight * 0.47 : windowHeight > 900 ? windowHeight * 0.6 : windowHeight * 0.46 }}>
          <View style={styles.timePicker}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ marginHorizontal: 10, color: Colors.grey100 }}>{i18n.t('from')}</Text>
              <Pressable onPress={() => toggleTimePicker('start')}>
                <TextInput
                  name="startTime"
                  style={styles.input}
                  placeholder={i18n.t('select_start_time')}
                  placeholderTextColor='#aaa'
                  value={startTime ? formatTime(startTime) : ''}
                  editable={false}
                  onPressIn={() => toggleTimePicker('start')}
                />
              </Pressable>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ marginHorizontal: 10, color: Colors.grey100 }}>{i18n.t('to')}</Text>
              <Pressable onPress={() => toggleTimePicker('end')}>
                <TextInput
                  name="endTime"
                  style={styles.input}
                  placeholder={i18n.t('select_end_time')}
                  placeholderTextColor='#aaa'
                  value={endTime ? formatTime(endTime) : ''}
                  editable={false}
                  onPressIn={() => toggleTimePicker('end')}
                />
              </Pressable>
            </View>

            <TouchableOpacity
              onPress={showAvailabilityModal}
            >
              <View style={styles.addButton}>
                <MaterialCommunityIcons name="plus" size={25} color={Colors.accent800} />
              </View>
            </TouchableOpacity>
          </View>
          {renderTimePicker()}
          <View style={{ borderBottomWidth: 2, borderBottomColor: Colors.white100, marginBottom: 20 }}></View>
          <ScrollView>
            {renderSelectedSlots()}
          </ScrollView>
        </View>
        {newChanges && <View style={styles.saveButton}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{i18n.t("save")}</Text>
          </TouchableOpacity>
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white100,
  },
  topContainer: {
    backgroundColor: 'white',
    marginBottom: Platform.OS == 'ios' ? 20 : 5,
    paddingBottom: windowHeight * 0.005,
    borderBottomColor: Colors.grey100,
    borderBottomWidth: 1,
    paddingTop: 30
  },
  editContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
    backgroundColor: Colors.grey100,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: windowHeight * 0.01,
    margin: 10,
    marginBottom: Platform.OS == 'ios' ? 20 : 10,
  },
  variantButton: {
    paddingHorizontal: 30,
    paddingVertical: Platform.OS == 'ios' ? 10 : 3,
    borderRadius: 50,
  },
  variantButtonSelected: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'transparent'
  },
  timePicker: {
    // flexDirection: 'row',
    // marginBottom: 30,
    // marginTop: 20,
    // justifyContent: 'space-around',
    // alignItems: 'center'
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: windowHeight * 0.02,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: windowWidth * 0.9, // Adjust width based on window width
    marginLeft: windowWidth * 0.01,
    height: windowHeight * 0.06,

  },
  input: {
    width: 130,
    height: windowHeight * 0.048,
    backgroundColor: Colors.white100,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'black'
  },
  addButton: {
    backgroundColor: Colors.grey100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 25,
    marginTop: 14
  },
  slotContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.primary800,
    borderWidth: 2,
    borderRadius: 20,
    width: 300
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeInputs: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'ce'
  },
  timeInput: {
    flex: 1,
    backgroundColor: Colors.white100,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    color: 'black'
  },
  modalContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    color: Colors.primary800
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: 'white',
    marginHorizontal: 10,
  },
  cancelIcon: {
    color: 'red',
    marginTop: 10,
  },
  iosPickerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 4,
  },
  confirmButton: {
    borderRadius: 20,
    padding: 5,
    backgroundColor: Colors.primary600,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  cancelButton: {
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginHorizontal: 20
  },
  confirmText: {
    fontSize: 14,
    color: 'white'

  },
  cancelText: {
    fontSize: 14,
    color: Colors.primary700
  },
  updateButtonContainer: {
    borderRadius: 20,
    borderColor: Colors.primary600,
    borderWidth: 1,
    backgroundColor: Colors.primary600,
    padding: 5,
    margin: 10
  },
  label: {
    color: 'grey',
    marginHorizontal: 5
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]
  },
  deleteButton: {
    borderRadius: 25,
    backgroundColor: 'red',
    width: 22,
    height: 22,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: Colors.primary800,
    borderRadius: 20
  },
  saveButtonText: {
    paddingHorizontal: 40,
    paddingVertical: 8,
    color: 'white',
    fontSize: 15,
    fontWeight: "600"
  },
  slotTypeTxt: {
    marginEnd: 40,
    marginTop: 5,
    fontSize: 13,
    color: Colors.grey300
  }

});

export default AvailabilityScreen;
