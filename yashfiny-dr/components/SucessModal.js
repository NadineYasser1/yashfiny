import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import i18n from '../i18n';

const SuccessModal = ({ title, text, screenName }) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const handleSwipe = () => {
    navigation.navigate(screenName);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View style={styles.container}>
      <GestureRecognizer
        onSwipe={(direction, state) => {
          if (direction === swipeDirections.SWIPE_RIGHT) {
            handleSwipe();
          }
        }}
        config={config}
        style={styles.gestureRecognizerContainer}>
        <MaterialCommunityIcons name="check-circle" size={130} color={Colors.accent800} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.bottomContainer}>
          <MaterialCommunityIcons name='chevron-double-left' size={60} color='white' />
          <Text style={styles.swipeUpTitle}>{i18n.t('home')}</Text>
        </View>
      </GestureRecognizer>
    </View>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary800,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gestureRecognizerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 30,
  },
  text: {
    color: Colors.grey200,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  swipeUpTitle: {
    color: 'white',
    fontSize: 18,
  }
});
