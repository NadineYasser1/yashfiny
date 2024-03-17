import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import i18n from '../i18n';

const CustomHeader = ({ title, navigation }) => {
  return (
    <View style={{ backgroundColor: Colors.primary800, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', padding: 16, height: 80 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: Colors.grey100 ,fontSize: 15, paddingRight: 10 }}>{i18n.t('cancel')}</Text>
      </TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 18 }} >{title}</Text>
      <View style={{ width: 60 }}></View> 
    </View>
  );
};

export default CustomHeader;
