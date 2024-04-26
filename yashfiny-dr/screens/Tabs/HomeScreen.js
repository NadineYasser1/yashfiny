import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions, FlatList } from 'react-native';
import { Colors } from '../../constants/colors';
import Card from '../../components/Card';
import { SearchBar } from 'react-native-elements';
import i18n from '../../i18n';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardButton from '../../components/DashboardButton';
import MonthlyEarningsCard from '../../components/MonthlyEarningsCard';
import { DummyPatients } from '../../constants/DummyPatientsData';
import ListItem from '../../components/ListItem';
const windowHeight = Dimensions.get('window').height
const HomeScreen = ({ navigation }) => {

  const handleSearchClick = (data) => {
    navigation.navigate('SearchScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{ justifyContent: 'center', paddingTop: 2 }}>
          <Card>
            <View style={{ paddingTop: 10, width: '100%' }}>
              <SearchBar
                placeholder={i18n.t('search_home')}
                lightTheme
                round
                onPressIn={handleSearchClick}
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

            <View style={{ flexDirection: 'row', marginStart: 18, marginBottom: 10, width: '100%' }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate("NewPatient")}
              >
                <View style={styles.addButton}>
                  <MaterialCommunityIcons
                    name="plus-thick"
                    size={20}
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
      <View style={{ flexDirection: 'row', marginTop: windowHeight * 0.06 }}>
        <View style={styles.dashboardContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8 }}>
            <DashboardButton
              icon="history"
              iconColor="white"
              iconSize={windowHeight > 900 ? 28 : 20}
              label={i18n.t('recents')}
              onPress={() => navigation.navigate('Activities')}
            />
            <DashboardButton
              icon="sale"
              iconColor="white"
              iconSize={windowHeight > 900 ? 28 : 20}
              label={i18n.t('promotion')}
              onPress={() => navigation.navigate("Promotions")}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <DashboardButton
              icon="account-multiple-outline"
              iconColor="white"
              iconSize={windowHeight > 900 ? 28 : 20}
              label={i18n.t('assistants')}
              onPress={() => navigation.navigate("Assistants")}
            />
            <DashboardButton
              icon="clock-edit"
              iconColor="white"
              iconSize={windowHeight > 900 ? 28 : 20}
              label={i18n.t('availability')}
              onPress={() => navigation.navigate("Availability")}
            />
          </View>
        </View>
        <Pressable style={{ width: '50%', height: '100%', marginRight: 10 }} onPress={() => navigation.navigate("Income")}>
          <MonthlyEarningsCard />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: Colors.primary800, marginHorizontal: 20, marginTop: 25, fontWeight: "700", fontSize: 15, paddingBottom: 3 }}>{i18n.t('upcoming_apts')}</Text>
        {DummyPatients.filter((patient) => patient.appointments.some(appointment => appointment.status === 'upcoming')).length > 0 && <Pressable
          onPress={() => navigation.navigate('Appointments', { filter: 'upcoming' })}>
          <Text style={{ marginHorizontal: 30, marginTop: 30, fontWeight: "400", fontSize: 12, color: Colors.link }}>{i18n.t('view_all')}</Text>
        </Pressable>}
      </View>
      {
        DummyPatients.filter((patient) => patient.appointments.some(appointment => appointment.status === 'upcoming')).length > 0 ?
          <FlatList
            data={DummyPatients.filter((patient) => patient.appointments.some(appointment => appointment.status === 'upcoming'))}
            renderItem={({ item }) => <ListItem
              avatarUri={item.avatar}
              fname={item.fname}
              lname={item.lname}
              aptDate={item.appointments.find((apt) => apt.status == 'upcoming').date}
              gender={item.gender}
              age={item.age?.toString()}
              id={item.id}
              phone={item.phoneNum}
              diseases={item.history.chronicDis}
              aptType={item.appointments.find((apt) => apt.status == 'upcoming').type.name}
            />
            }
            keyExtractor={(patient) => patient.id.toString()} />
          :
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <MaterialCommunityIcons name='clock-alert-outline' color={Colors.grey300} size={70} style={{ marginBottom: 20 }} />
            <Text style={{ color: Colors.grey300, fontSize: 16, fontWeight: "600" }}>{i18n.t('no_upcoming_apts')}</Text>
          </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: Colors.primary800,
    height: windowHeight > 750 ? windowHeight * 0.13 : windowHeight * 0.16,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  addButton: {
    backgroundColor: Colors.white100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 25,
    marginTop: 12,
  },
  createButtonText: {
    marginTop: 20,
    color: Colors.primary800,
    fontWeight: "700",
    fontSize: 14,
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
