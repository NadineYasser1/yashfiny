import React, { useContext } from 'react';
import { View, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LanguageContext } from '../store/LanguageContext';
import { Colors } from '../constants/colors';


const CustomDrawerHeader = ({ navigation }) => {
  const langCtx = useContext(LanguageContext)
  const notification = true; 

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.toggleDrawer()} style={styles.notificationButton}>
        <MaterialCommunityIcons name="menu" size={22} color='white' />
      </Pressable>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {langCtx.locale === 'en' ? (
          <Image
            source={require('../assets/brandName_en.png')}
            style={styles.brandName}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require('../assets/brandName_ar.png')}
            style={styles.brandName}
            resizeMode="contain"
          />
        )}
      </View>
      <Pressable style={styles.notificationButton}>
        <MaterialCommunityIcons name="bell" size={22} color='white' />
        {notification && <View style={styles.redDot} />}
      </Pressable>
    </View>
  );
};

const styles = {
  container: {
    paddingTop: 70,
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.primary800
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 40,
    marginRight: 10,
  },
  brandName: {
    width: 80,
    height: 30,
    marginRight: 10
  },
  notificationButton: {
    borderRadius: 40,
    width: 40,
    height: 40,
    borderColor: Colors.primary600,
    backgroundColor: Colors.primary600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
};

export default CustomDrawerHeader;
