import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Progress from './Progress';
import i18n from '../i18n';
import { Colors } from '../constants/colors';
const windowHeight = Dimensions.get('window').height
const MonthlyEarningsCard = () => {
  const incomes = [
    { month: 'Oct', inc: '1000', progress: 0.3 },
    { month: 'Nov', inc: '2000', progress: 0.7 },
    { month: 'Dec', inc: '1000', progress: 0.8 },
    { month: 'Jan', inc: '4000', progress: 0.9 },
    { month: 'Feb', inc: '0000', progress: 1 },
    { month: 'Mar', inc: '7000', progress: 0.1 },
  ]

  const curr = 'EGP'
  const perThanLastMonth = '80'

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#5de0e6", "#004aad"]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t('monthly_earnings')}</Text>
          <MaterialCommunityIcons name="wallet" size={20} color="white" style={{ marginBottom: 26 }} />
        </View>
        <View style={styles.progressContainer}>
          {incomes.map((inc, index) => (
            <Progress key={inc.month} month={inc.month} progress={inc.progress} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.currentIncome}>{`${incomes[incomes.length - 1].inc} ${curr}`}</Text>
          <View style={{ borderRadius: 3, backgroundColor: 'green', marginLeft: 10, marginTop: 3 }}>
            <Text style={{ fontSize: 12, padding: 3, color: 'white' }}>{`+${perThanLastMonth}%`}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: windowHeight > 750 ? windowHeight * 0.21 : windowHeight * 0.25,
  },
  gradient: {
    padding: 8,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: 'white',
    marginRight: 15,
    marginLeft: 5,
    marginBottom: 25
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  progressWrapper: {
    alignItems: 'center',
  },
  monthLabel: {
    color: 'white',
    marginTop: 40,
  },
  currentIncome: {
    fontSize: 14,
    color: 'white',
    fontWeight: "700",
    marginTop: 3
  },
});

export default MonthlyEarningsCard;