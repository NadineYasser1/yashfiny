import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions, FlatList, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import Card from '../../components/Card';
import { SearchBar } from 'react-native-elements';
import i18n from '../../i18n';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardButton from '../../components/DashboardButton';
import MonthlyEarningsCard from '../../components/MonthlyEarningsCard';
import ListItem from '../../components/ListItem';
import { axios } from '../../utils/axios';
import { API } from '../../utils/config';
import LoadingScreen from '../../components/LoadingScreen';
import { DoctorContext } from '../../store/DoctorContext';
import useLoading from '../../hooks/useLoading';
import Layout from '../../components/Layout';
const windowHeight = Dimensions.get('window').height
const HomeScreen = ({ navigation }) => {

  const { loading, setIsLoading } = useLoading()
  const [incomeData, setIncomeData] = useState()
  const [patientsData, setpatientsData] = useState()
  const doctorCtx = useContext(DoctorContext)

  const fetchDoctorData = () => {
    setIsLoading(true)
    axios.get(API.profile).then(({ data }) => {
      data.data.title = 'Dr'
      doctorCtx.setNewData(data.data)
      if (!doctorCtx.avatarUri) { doctorCtx.updateAvatar(data.data.avatarUri) }
    }).catch((err) => Alert.alert(err.response.data.message)
    ).finally(() => setIsLoading(false))
  }

  const fetchPatientsData = () => {
    setIsLoading(true)
    axios.get(API.patients).then(({ data }) => {
      console.log(data.data)
      setpatientsData(data.data)
    }
    ).catch((err) => Alert.alert(err.response.data.message)
    ).finally(() => setIsLoading(false))
  }
  const fetchIncomeData = () => {
    setIsLoading(true)
    axios.get(API.incomeDashboard).then(({ data }) => {
      setIncomeData(data.data)
    }).catch((err) => Alert.alert(err.response.data.message)
    ).finally(() => setIsLoading(false))
  }
  const handleSearchClick = (data) => {
    navigation.navigate('SearchScreen')
  }
  useEffect(() => {
    fetchDoctorData()
    fetchIncomeData()
    fetchPatientsData()
  }, [doctorCtx.avatarUri])

  return (
    <Layout loading={loading}>
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
          {incomeData && <Pressable style={{ width: '50%', height: '100%', marginRight: 10 }} onPress={() => navigation.navigate("Income")}>
            <MonthlyEarningsCard incomes={incomeData} />
          </Pressable>}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: Colors.primary800, marginHorizontal: 20, marginTop: 25, fontWeight: "700", fontSize: 15, paddingBottom: 3 }}>{i18n.t('upcoming_apts')}</Text>
          {patientsData?.filter((patient) => patient.appointments.some(appointment => appointment.status === 'upcoming')).length > 0 && <Pressable
            onPress={() => navigation.navigate('Appointments', { statusFilter: true })}>
            <Text style={{ marginHorizontal: 30, marginTop: 30, fontWeight: "400", fontSize: 12, color: Colors.link }}>{i18n.t('view_all')}</Text>
          </Pressable>}
        </View>
        {
          patientsData?.filter((patient) => patient.appointments.some(appointment => appointment.status === 'upcoming')).length > 0 ?
            <FlatList
              data={patientsData?.filter((patient) => patient.appointments.some(appointment => appointment.status === 'upcoming'))}
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
                aptMethod={item.appointments.find((apt) => apt.status == 'upcoming').method}
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
    </Layout>
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
