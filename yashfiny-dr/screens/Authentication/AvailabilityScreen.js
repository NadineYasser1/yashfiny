import React, { useMemo, useState } from 'react';
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
  Switch
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import i18n from '../../i18n';
import CustomDropdown from '../../components/CustomDropDown';
// use ctx to set availability
const AvailabilityScreen = () => {
  const currentDate = new Date();

// Get year, month, and day from the current date
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
const day = String(currentDate.getDate()).padStart(2, '0');

  const [selectedFlag, setSelectedFlag] = useState(1);
  const [selectedDay, setSelectedDay] = useState(`${year}-${month}-${day}`);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showModalPicker, setShowModalPicker] = useState(false);
  const [pickerFor, setPickerFor] = useState('start');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditingModalVisible, setIsEditingModalVisible] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const addSlot = () => {
    if (startTime && endTime) {
      const newSlot = {
        startTime: startTime,
        endTime: endTime,
        addSlotToScreen: true
      };
      setSelectedSlot((prevSlots) => ({
        ...prevSlots,
        [selectedDay]: [...(prevSlots[selectedDay] || []), newSlot],
      }));
      setStartTime('')
      setEndTime('')
    } else {
      Alert.alert(i18n.t('time_slot_alert'))
    }
  };

  const deleteSlot = (index) => {
    const updatedSlots = selectedSlot[selectedDay].filter((_, i) => i !== index);
    if (updatedSlots.length === 0) {
      delete updatedSlots[selectedDay];
      const { [selectedDay]: deletedDay, ...rest } = selectedSlot;
      setSelectedSlot(rest);
    } else {
      setSelectedSlot((prevSlots) => ({
        ...prevSlots,
        [selectedDay]: updatedSlots,
      }));
    }
  };

  const editSlot = (index) => {
    setEditingIndex(index);
    setStartTime(selectedSlot[selectedDay][index].startTime);
    setEndTime(selectedSlot[selectedDay][index].endTime);
    setIsEditingModalVisible(true);
  };

  const updateSlot = () => {
    const updatedSlots = [...selectedSlot[selectedDay]];
    updatedSlots[editingIndex] = {
      startTime: startTime,
      endTime: endTime,
      addSlotToScreen: true
    };
    setSelectedSlot((prevSlots) => ({
      ...prevSlots,
      [selectedDay]: updatedSlots,
    }));
    setEditingIndex(null);
    setStartTime('');
    setEndTime('');
    setIsEditingModalVisible(false);
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
      setShowModalPicker(Platform.OS === 'ios')
    } else {
      setShowPicker(Platform.OS === 'ios');
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
              color: 'grey',
              selectedColor: Colors.accent700
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
        if (slot?.startTime && slot?.endTime && slot?.addSlotToScreen) {
          return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} key={index}>
              <View style={styles.slotContainer} key={index}>
                <Text style={{ color: Colors.primary800, fontWeight: '600' }}>{formatTime(slot.startTime)}</Text>
                <Text style={{ color: Colors.grey100, fontWeight: 'bold', marginHorizontal: 20 }}>{i18n.t('to')}</Text>
                <Text style={{ color: Colors.primary800, fontWeight: '600' }}>{formatTime(slot.endTime)}</Text>
                <TouchableOpacity onPress={() => editSlot(index)} style={{ marginHorizontal: 20 }}>
                  <MaterialCommunityIcons name="pencil" size={24} color={Colors.primary800} />
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

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
                editable={false}
                onPressIn={() => toggleModalTimePicker('start')}
              />
              <Text style={styles.label}>{i18n.t('to')}</Text>
              <TextInput
                style={styles.timeInput}
                placeholder='hh:mm A'
                value={endTime ? formatTime(endTime) : ''}
                editable={false}
                onPressIn={() => toggleModalTimePicker('end')}
              />
            </View>
            {renderModalTimePicker()}
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
        <View style={styles.bar}>
          <TouchableOpacity onPress={() => setSelectedFlag(1)}>
            <View
              style={[
                styles.variantButton,
                selectedFlag === 1 && styles.variantButtonSelected,
              ]}
            >
              <Text>{i18n.t('day')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedFlag(7)}>
            <View
              style={[
                styles.variantButton,
                selectedFlag === 7 && styles.variantButtonSelected,
              ]}
            >
              <Text>{i18n.t('week')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedFlag(30)}>
            <View
              style={[
                styles.variantButton,
                selectedFlag === 30 && styles.variantButtonSelected,
              ]}
            >
              <Text>{i18n.t('month')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <CalendarStrip
          style={{ height: 100, marginHorizontal: 10 }}
          selectedDate={selectedDay}
          onDateSelected={(date) => setSelectedDay(date.format('YYYY-MM-DD'))}
          dateNumberStyle={{ color: 'grey' }}
          dateNameStyle={{ color: 'grey' }}
          iconContainer={{ flex: 0.1 }}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: Colors.primary800,
            backgroundColor: Colors.primary800,
          }}
          // calendarAnimation={{ type: 'parallel', duration: 10 }}
          highlightDateNumberStyle={{ color: 'white' }}
          highlightDateNameStyle={{ color: 'white' }}
          highlightDateContainerStyle={{ backgroundColor: Colors.primary800 }}
          markedDates={markedDatesArray}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.switchContainer}>
          <Text
            style={[{ width: 50, color: Colors.primary800, fontWeight: 'bold' }, !isSwitchOn && { fontWeight: 'normal' }]}
          >
            {isSwitchOn ? i18n.t('group') : i18n.t('single')}
            </Text>
          <Switch
            trackColor={{ false: '#767577', true: Colors.primary800 }}
            thumbColor='white'
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsSwitchOn(!isSwitchOn)}
            value={isSwitchOn}
  
          />

        </View>
        <View style={styles.dropdownContainer}>
          <CustomDropdown
            options={[i18n.t('video'), i18n.t('clinic')]}
            onSelect={(opt) => console.log(opt)}
            placeholder={i18n.t('select_type')}
            style={{ borderRadius: 30, borderColor: Colors.primary800, height: 30, width: 110, alignItems: 'center', justifyContent: 'center', marginTop: 0 }}
            inputStyles={{ height: 20, fontSize: 12, padding: 3 }}
            dropdownTextStyles={{ fontSize: 12 }}
            defaultOption={i18n.t('clinic')}
          />
        </View>
      </View>
      <View contentContainerStyle={styles.content}>
        <View style={{ backgroundColor: 'white', borderRadius: 20, marginHorizontal: 8, padding: 8, height: 400 }}>
          <View style={styles.timePicker}>
            <View style={{flexDirection: 'column'}}>
            <Text style={{marginHorizontal: 10, color: Colors.grey100}}>{i18n.t('from')}</Text>
            <Pressable onPress={() => toggleTimePicker('start')}>
              <TextInput
                name="startTime"
                style={styles.input}
                placeholder={i18n.t('select_start_time')}
                value={startTime ? formatTime(startTime) : ''}
                editable={false}
                onPressIn={() => toggleTimePicker('start')}
              />
            </Pressable>
            </View>
            <View style={{flexDirection: 'column'}}>
            <Text  style={{marginHorizontal: 10, color: Colors.grey100}}>{i18n.t('to')}</Text>
            <Pressable onPress={() => toggleTimePicker('end')}>
              <TextInput
                name="endTime"
                style={styles.input}
                placeholder={i18n.t('select_end_time')}
                value={endTime ? formatTime(endTime) : ''}
                editable={false}
                onPressIn={() => toggleTimePicker('end')}
              />
            </Pressable>
            </View>
            <TouchableOpacity
              onPress={() =>
                addSlot(selectedDay, selectedSlot[selectedDay]?.startTime, selectedSlot[selectedDay]?.endTime)
              }
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
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomColor: Colors.grey100,
    borderBottomWidth: 1,
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
    marginBottom: 10,
    backgroundColor: Colors.grey100,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
    marginBottom: 20,
  },
  variantButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  variantButtonSelected: {
    backgroundColor: 'white',
  },
  timePicker: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 20,
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  input: {
    width: 130,
    height: 40,
    backgroundColor: Colors.white100,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
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
    backgroundColor: Colors.grey100,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
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
    fontWeight: 'bold',
    marginBottom: 20,
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
  }

});

export default AvailabilityScreen;
