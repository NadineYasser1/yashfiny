import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import i18n from '../i18n';

const CustomDropdown = ({ options, onSelect, dropdownStyles, dropdownTextStyles, inputStyles, defaultOption, selectedOpt, style, ...otherProps }) => {
  const [selectedOption, setSelectedOption] = useState(selectedOpt || null);
  console.log(defaultOption)
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={[styles.dropdownContainer, dropdownStyles]}>
      <SelectList
        setSelected={(val) => handleSelectOption(val)}
        data={options}
        save="label"
        boxStyles={[styles.dropdown, style]}
        dropdownStyles={{ backgroundColor: 'white', borderColor: style?.borderColor || styles.dropdown.borderColor }}
        dropdownTextStyles={dropdownTextStyles}
        search={false}
        inputStyles={inputStyles}
        defaultOption={defaultOption}
        {...otherProps}
      />
    </View>
  );
};

export default CustomDropdown;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdownContainer: {
    //   marginBottom: 10,
    marginEnd: 10,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: 42,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  option: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },

});