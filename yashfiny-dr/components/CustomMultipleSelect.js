import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import i18n from '../i18n';
import { Colors } from '../constants/colors';

const CustomMultipleSelect = ({ options, onSelect, label, ...otherProps }) => {

  return (
    <View style={styles.dropdownContainer}>
      <MultipleSelectList
        setSelected={(val) => onSelect(val)}
        data={options}
        save="value"
        boxStyles={{ marginTop: 10, backgroundColor: 'white' }}
        dropdownStyles={{ backgroundColor: 'white' }}
        {...otherProps}
        label={label}
        labelStyles={{ color: 'grey', fontWeight: "300" }}
      />
    </View>
  );
};

export default CustomMultipleSelect;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  dropdownContainer: {
    //   marginBottom: 10,
    marginEnd: 10
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white'
  },
  option: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },

});