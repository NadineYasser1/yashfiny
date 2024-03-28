import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../../components/Card';
import { Button, SearchBar } from 'react-native-elements';
import i18n from '../../i18n';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardButton from '../../components/DashboardButton';
import Progress from '../../components/Progress';
import MonthlyEarningsCard from '../../components/MonthlyEarningsCard';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{justifyContent: 'center' }}>
          <Card>
            <View style={{ paddingTop: 20, width: '100%' }}>
              <SearchBar
                placeholder={i18n.t('search_home')}
                lightTheme
                round
                containerStyle={{
                  backgroundColor: 'white',
                  width: '100%',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                }}
                inputContainerStyle={{
                  borderColor: 'white',
                  backgroundColor: Colors.white100,
                }}
                inputStyle={{ color: Colors.grey100, fontSize: 13 }}
              />
            </View>
            <View style={{flexDirection: 'row', marginStart: 18, marginBottom: 25,width: '100%'}}>
            <Pressable
              style={{
                flexDirection: 'row',
              }}
            >
              <View style={styles.addButton}>
                <MaterialCommunityIcons
                  name="plus-thick"
                  size={30}
                  color={Colors.primary800}
                />
              </View>
              <Text style={styles.createButtonText}>
                {i18n.t('create_new_patient')}
              </Text>
            </Pressable>
            </View>
          </Card>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 75}}>
      <View style={styles.dashboardContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
        <DashboardButton
          icon="history"
          iconColor="white"
          iconSize={26}
          label={i18n.t('recents')}
        />
        <DashboardButton
          icon="sale"
          iconColor="white"
          iconSize={26}
          label={i18n.t('promotion')}
        />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}> 
        <DashboardButton
          icon="account-multiple-outline"
          iconColor="white"
          iconSize={26}
          label={i18n.t('assistants')}
        />
        <DashboardButton
          icon="clock-edit"
          iconColor="white"
          iconSize={26}
          label={i18n.t('availability')}
        />
        </View>
      </View>
      <Pressable style={{width: '46%', height: '100%', marginRight: 20}}>
     <MonthlyEarningsCard />
     </Pressable>
      </View>
      <Text>Upcoming Appointments</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: Colors.primary800,
    height: 100,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  addButton: {
    backgroundColor: Colors.white100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
    marginTop: 14,
  },
  createButtonText: {
    marginTop: 25,
    color: Colors.primary800,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 20,
  },
  dashboardContainer: {
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
});

export default HomeScreen;
