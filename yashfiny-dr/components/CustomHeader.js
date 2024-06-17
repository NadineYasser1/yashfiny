import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import i18n from '../i18n';
import { HideTabContext } from '../store/HideTabContext';

const CustomHeader = ({ title, navigation }) => {
  const hideTabCtx = useContext(HideTabContext)
  const handleCancel = () => {
    hideTabCtx.hideTab(false)
    navigation.goBack()
  }
  return (
    <View style={{ backgroundColor: Colors.primary800, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', padding: 16, height: 80 }}>
      <TouchableOpacity onPress={handleCancel}>
        <Text style={{ color: Colors.grey100, fontSize: 15, paddingRight: 10, paddingTop: 25 }}>{i18n.t('cancel')}</Text>
      </TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 18, paddingTop: 25 }} >{title}</Text>
      <View style={{ width: 60 }}></View>
    </View>
  );
};

export default CustomHeader;
