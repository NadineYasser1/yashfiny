import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert, Dimensions, Platform, StyleSheet, View } from "react-native";
import {
  Menu,
  IconButton,
  PaperProvider,
  Button,
  MD3LightTheme as ReactDefTheme,
} from "react-native-paper";
import i18n from "./i18n";
import LangContextProvider, { LanguageContext } from "./store/LanguageContext";
import { useContext, useEffect, useState } from "react";
import { Colors } from "./constants/colors";
import LoginScreen from "./screens/Authentication/LoginScreen";
import SignupScreen from "./screens/Authentication/SignupScreen";
import ForgotPasswordScreen from "./screens/Authentication/ForgotPasswordScreen";
import { AuthContext } from "./store/AuthContext";
import AuthContextProvider from "./store/AuthContext";
import RegistrationScreen from "./screens/Authentication/RegistrationScreen";
import UploadScreen from "./screens/Authentication/UploadScreen";
import AvailabilityScreen from "./screens/Authentication/AvailabilityScreen";
import CustomHeader from "./components/CustomHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Tabs/HomeScreen";
import AppointmentsScreen from "./screens/Tabs/AppointmentsScreen";
import PatientsScreen from "./screens/Tabs/PatientsScreen";
import RequestsScreen from "./screens/Tabs/RequestsScreen";
import CallsScreen from "./screens/Tabs/CallsScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import MessagesScreen from "./screens/Drawer/MessagesScreen";
import ArticlesScreen from "./screens/Drawer/ArticlesScreen";
import GroupsScreen from "./screens/Drawer/GroupsScreen";
import ContactUsScreen from "./screens/Drawer/ContactUsScreen";
import LoadingScreen from "./components/LoadingScreen";
import EditProfileDrawer from "./components/EditProfileDrawer";
import { useFonts } from "expo-font";
import CustomDrawerHeader from "./components/CustomDrawerHeader";
import AssistantsScreen from "./screens/HomeStack/Assistant/AssistantsScreen";
import AssistantDetailsScreen from "./screens/HomeStack/Assistant/AssistantDetailsScreen";
import EditAssitantProfileScreen from "./screens/HomeStack/Assistant/EditAssistantProfileScreen";
import NewAssistantScreen from "./screens/HomeStack/Assistant/NewAssistantScreen";
import PromotionsScreen from "./screens/HomeStack/PromotionsScreen";
import ActivitiesScreen from "./screens/HomeStack/ActivitiesScreen";
import IncomeScreen from "./screens/HomeStack/Income/IncomeScreen";
import IncomeDetailsScreen from "./screens/HomeStack/Income/IncomeDetailsScreen";
import NewPatientScreen from "./screens/HomeStack/NewPatientScreen";
import NewArticleScreen from "./screens/Drawer/NewArticleScreen";
import PatientDetails from "./screens/PatientsStack/PatientDetails";
import VisitResults from "./screens/PatientsStack/VisitResults";
import AddDrug from "./screens/PatientsStack/AddDrug";
import ClinicRequestsScreen from "./screens/Tabs/ClinicRequestsScreen";
import VideoRequestsScreen from "./screens/Tabs/VideoRequestsScreen";
import SpecialRequestsScreen from "./screens/Tabs/SpecialRequestsScreen";
import HideTabContextProvider, { HideTabContext } from "./store/HideTabContext";
import SearchScreen from "./screens/HomeStack/SearchScreen";
import EditProfileScreen from "./screens/Drawer/EditDoctorProfileScreen";
import DoctorContextProvider from "./store/DoctorContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PatientsContextProvider from "./store/PatientsContext";
import { setupInterceptor } from "./utils/axios";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const MenuView = ({ tintColor }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const newTheme = {
    ...ReactDefTheme,
    colors: {
      ...ReactDefTheme.colors,
      onSurfaceVariant: Colors.primary800,
      background: Colors.white100,
    },
  };

  return (
    <PaperProvider>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="dots-vertical"
            onPress={openMenu}
            iconColor={tintColor}
          ></IconButton>
        }
      >
        <Menu.Item
          title={i18n.t("login_assistant")}
          leadingIcon="account-multiple-outline"
          titleStyle={{ color: Colors.primary800 }}
          theme={newTheme}
          style={styles.menuItem}
        />
      </Menu>
    </PaperProvider>
  );
};
const CustomDrawerContent = (props) => {
  const authCtx = useContext(AuthContext)
  const langCtx = useContext(LanguageContext)

  return (
    <DrawerContentScrollView {...props}>
      <EditProfileDrawer navigation={props.navigation} />
      <DrawerItemList {...props} />
      <DrawerItem
        label={i18n.t('other_lang')}
        activeTintColor="white"
        inactiveTintColor="white"
        labelStyle={{ textAlign: 'left' }}
        onPress={() => langCtx.changeLang(langCtx.locale === "ar" ? "en" : "ar")}
        icon={({ color, size }) => <MaterialCommunityIcons name='earth' color={color} size={size} />} />
      <View style={{ marginTop: 10 }}>
        <DrawerItem
          label={i18n.t('signout')}
          activeTintColor="white"
          inactiveTintColor="white"
          onPress={() => authCtx.logout()}
          icon={({ color, size }) => <MaterialCommunityIcons name='logout' color={color} size={size} />} />
      </View>
    </DrawerContentScrollView>
  );
}
const AssistantStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Assistants Screen"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800, height: windowHeight > 650 ? 120 : 80 },
        headerTintColor: "white",
        // headerTitleStyle: { color: "transparent" },
        headerBackTitleVisible: false,
        // headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Assistants Screen" component={AssistantsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Assistant Details" component={AssistantDetailsScreen} />
      <Stack.Screen name="Edit Assistant" component={EditAssitantProfileScreen} />
      <Stack.Screen name="New Assistant" component={NewAssistantScreen} />
    </Stack.Navigator>
  )
}

const IncomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Income Screen"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800, height: windowHeight > 650 ? 120 : 80 },
        headerTintColor: "white",
        // headerTitleStyle: { color: "transparent" },
        headerBackTitleVisible: false,
        // headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Income Screen" component={IncomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Income Details" component={IncomeDetailsScreen} />
    </Stack.Navigator>
  )
}
const ArticlesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Articles Screen"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800, height: windowHeight > 650 ? 120 : 80 },
        headerTintColor: "white",
        // headerTitleStyle: { color: "transparent" },
        headerBackTitleVisible: false,
        // headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Articles Screen" component={ArticlesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="New Article" component={NewArticleScreen} />
    </Stack.Navigator>
  )
}
const DashboardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800, height: windowHeight > 650 ? 120 : 80 },
        headerTintColor: "white",
        // headerTitleStyle: { color: "transparent" },
        headerBackTitleVisible: false,
        // headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation }) => <CustomDrawerHeader navigation={navigation} />,

          headerStyle: { height: 150 },
          headerTitleStyle: { color: 'transparent' },
          headerTitle: i18n.t('home')
          // headerShown: false

        }}
      />
      <Stack.Screen name="Availability" component={AvailabilityScreen} options={{
        animationTypeForReplace: 'pop',
        presentation: 'modal',
        tabBarVisible: false,
        headerStyle: { height: 100 },
        header: ({ navigation, route, options, back }) => {
          const title = i18n.t('availability')
          return (
            <CustomHeader
              title={title}
              navigation={navigation}
              style={options.headerStyle} />
          )
        }

      }} />
      <Stack.Screen name="Assistants" component={AssistantStack} options={{ headerTitle: i18n.t('assistants') }} />
      <Stack.Screen name="Promotions" component={PromotionsScreen} options={{ headerTitle: i18n.t('promotions') }} />
      <Stack.Screen name="Activities" component={ActivitiesScreen} options={{ headerTitle: i18n.t('activities') }} />
      <Stack.Screen name="Income" component={IncomeStack} options={{ headerTitle: i18n.t('income') }} />
      <Stack.Screen name="NewPatient" component={NewPatientScreen} options={{
        animationTypeForReplace: 'pop',
        presentation: 'modal',
        tabBar: { visible: false },
        headerStyle: { height: 100 },
        header: ({ navigation, route, options, back }) => {
          return (
            <CustomHeader
              title={i18n.t('new_patient')}
              navigation={navigation}
              style={options.headerStyle} />
          )
        }

      }} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{
        animationTypeForReplace: 'pop',
        presentation: 'modal',
        tabBar: { visible: false },
        headerStyle: { height: 100 },

        header: ({ navigation, route, options, back }) => {
          return (
            <CustomHeader
              navigation={navigation}
              style={options.headerStyle} />
          )
        }


      }}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
        animationTypeForReplace: 'pop',
        presentation: 'modal',
        tabBar: { visible: false },
        headerStyle: { height: 100 },
        header: ({ navigation, route, options, back }) => {
          return (
            <CustomHeader
              title={i18n.t('edit_profile')}
              navigation={navigation}
              style={options.headerStyle} />
          )
        }

      }} />
    </Stack.Navigator>
  )
}
const PatientsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PatientsScreen"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800, height: windowHeight > 650 ? 120 : 80 },
        headerTintColor: "white",
        // headerTitleStyle: { color: "transparent" },
        headerBackTitleVisible: false,
        // headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="PatientsScreen" component={PatientsScreen} options={{
        headerTitle: i18n.t('patients'),
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="PatientDetails" component={PatientDetails} options={({ navigation, route }) => ({
        headerTitle: i18n.t('patient_details'),
        headerLeft: ({ tintColor }) => <MaterialCommunityIcons name="chevron-left" color={tintColor} size={30} onPress={() => navigation.navigate('PatientsScreen')} />
      })} />
      <Stack.Screen name="VisitResults" component={VisitResults}
        options={{
          animationTypeForReplace: 'pop',
          presentation: 'modal',
          headerStyle: { height: 100 },
          header: ({ navigation, route, options, back }) => {
            const title = i18n.t('add_visit_results')
            return (
              <CustomHeader
                title={title}
                navigation={navigation}
                style={options.headerStyle} />
            )
          }

        }} />
      <Stack.Screen name="AddDrug" component={AddDrug}
        options={{
          animationTypeForReplace: 'pop',
          presentation: 'modal',
          headerStyle: { height: 100 },
          header: ({ navigation, route, options, back }) => {
            const title = i18n.t('add_drug')
            return (
              <CustomHeader
                title={title}
                navigation={navigation}
                style={options.headerStyle} />
            )
          }

        }} />
    </Stack.Navigator>
  )
}
const RequestsStack = () => {

  return (
    <Stack.Navigator
      initialRouteName="RequestsScreen"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800, height: windowHeight > 650 ? 120 : 80 },
        headerTintColor: "white",
        // headerTitleStyle: { color: "transparent" },
        headerBackTitleVisible: false,
        // headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="RequestsScreen" component={RequestsScreen} options={{ headerTitle: i18n.t('requests') }} />
      <Stack.Screen name="ClinicRequests" component={ClinicRequestsScreen} options={{ headerTitle: i18n.t('clinic_requests') }} />
      <Stack.Screen name="VideoRequests" component={VideoRequestsScreen} options={{ headerTitle: i18n.t('video_requests') }} />
      <Stack.Screen name="SpecialRequests" component={SpecialRequestsScreen} options={{ headerTitle: i18n.t('special_requests') }} />
    </Stack.Navigator>
  )

}
const DrawerNav = () => {

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="HomeStack"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800, height: windowHeight > 650 ? 120 : 80 },
        headerTintColor: 'white',
        drawerStyle: { backgroundColor: Colors.primary800 },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: 'white',
        drawerItemStyle: { marginVertical: 10 },
      }}
    >
      <Drawer.Screen name="HomeStack" component={DashboardStack} options={{
        drawerLabel: i18n.t('home'),
        headerShown: false,
        drawerIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />),
      }} />
      <Drawer.Screen name="Messages" component={MessagesScreen} options={{
        drawerLabel: i18n.t('messages'),
        drawerIcon: ({ color, size }) => (<MaterialCommunityIcons name="forum" color={color} size={size} />)
      }} />
      <Drawer.Screen
        name="Articles"
        component={ArticlesStack}
        options={{
          drawerLabel: i18n.t('articles'),
          headerTitle: i18n.t('articles'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-account" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          headerTitle: i18n.t('groups'),
          drawerLabel: i18n.t('groups'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          drawerLabel: i18n.t('contact_us'),
          headerTitle: i18n.t('contact_us'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-agent" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

const TabsNavigator = () => {
  const hideTabCtx = useContext(HideTabContext)
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: Colors.primary800,
        tabBarInactiveTintColor: Colors.grey300,
        headerStyle: { backgroundColor: Colors.primary800, height: windowHeight > 650 ? 120 : 80 },
        headerTintColor: 'white',
        tabBarStyle: hideTabCtx.hidden && { display: 'none' },
        tabBarBadgeStyle: hideTabCtx.hidden && { display: 'none' },
      }}
      >
        <Tab.Screen name="Dashboard" component={DrawerNav} options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
          headerTitleStyle: { color: 'transparent' },
          headerShown: false,
          tabBarLabel: i18n.t('home')
        }} />
        <Tab.Screen name="Appointments" component={AppointmentsScreen} options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="calendar-blank" color={color} size={size} />,
          tabBarLabel: i18n.t('appointments'),
          headerTitle: i18n.t('appointments')
        }} />
        <Tab.Screen name="Patients" component={PatientsStack} options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-group" color={color} size={size} />,
          tabBarLabel: i18n.t('patients'),
          headerShown: false
        }} />
        <Tab.Screen name="Requests" component={RequestsStack} options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="link" color={color} size={size} />,
          tabBarLabel: i18n.t('requests'),
          headerShown: false
        }} />
        <Tab.Screen name="Calls" component={CallsScreen} options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="video-box" color={color} size={size} />,
          tabBarLabel: i18n.t('calls'),
          headerTitle: i18n.t('calls')
        }} />
      </Tab.Navigator>
    </NavigationContainer>)
}


const AuthStack = () => {
  const langCtx = useContext(LanguageContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        transitionStyle={{ backgroundColor: Colors.primary800 }}
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary800 },
          headerTintColor: "white",
          headerTitleStyle: { color: "transparent" },
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerRight: ({ tintColor }) => (
              <View style={styles.buttonContainer}>
                <Button
                  icon="earth"
                  textColor={tintColor}
                  onPress={() => {
                    langCtx.changeLang(langCtx.locale === "ar" ? "en" : "ar");
                  }}
                >
                  {i18n.t("other_lang")}
                </Button>
              </View>
            ),
            headerLeft: ({ tintColor }) => (
              <View style={styles.menuContainer}>
                <MenuView tintColor={tintColor} />
              </View>
            ),
          }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerRight: ({ tintColor }) => (
              <View style={styles.buttonContainer}>
                <Button
                  icon="earth"
                  textColor={tintColor}
                  onPress={() => {
                    langCtx.changeLang(langCtx.locale === "ar" ? "en" : "ar");
                  }}
                >
                  {i18n.t("other_lang")}
                </Button>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerRight: ({ tintColor }) => (
              <View style={styles.buttonContainer}>
                <Button
                  icon="earth"
                  textColor={tintColor}
                  onPress={() => {
                    langCtx.changeLang(langCtx.locale === "ar" ? "en" : "ar");
                  }}
                >
                  {i18n.t("other_lang")}
                </Button>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="RegistrationForm"
          component={RegistrationScreen}
          options={{
            headerRight: ({ tintColor }) => (
              <View style={styles.buttonContainer}>
                <Button
                  icon="earth"
                  textColor={tintColor}
                  onPress={() => {
                    langCtx.changeLang(langCtx.locale === "ar" ? "en" : "ar");
                  }}
                >
                  {i18n.t("other_lang")}
                </Button>
              </View>
            ),

          }}
        />
        <Stack.Screen
          name="UploadForm"
          component={UploadScreen}
          options={{
            headerRight: ({ tintColor }) => (
              <View style={styles.buttonContainer}>
                <Button
                  icon="earth"
                  textColor={tintColor}
                  onPress={() => {
                    langCtx.changeLang(langCtx.locale === "ar" ? "en" : "ar");
                  }}
                >
                  {i18n.t("other_lang")}
                </Button>
              </View>
            ),

          }}
        />
        <Stack.Screen
          name="Availability"
          component={AvailabilityScreen}
          options={{
            animationTypeForReplace: 'pop',
            presentation: 'modal',
            headerStyle: { height: 100 },
            header: ({ navigation, route, options, back }) => {
              const title = i18n.t('availability')
              return (
                <CustomHeader
                  title={title}
                  navigation={navigation}
                  style={options.headerStyle} />
              )
            }

          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AuthenticatedStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HideTabContextProvider>
        <PatientsContextProvider>
          <TabsNavigator />
        </PatientsContextProvider>
      </HideTabContextProvider>
    </GestureHandlerRootView>
  )
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </>
  );
}

const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(false)
  const authCtx = useContext(AuthContext)
  setupInterceptor(authCtx)
  const fetchToken = async () => {
    try {
      setIsTryingLogin(true)
      const storedToken = await AsyncStorage.getItem('token')
      if (storedToken) {
        authCtx.authenticate(storedToken)
      }
    } catch (err) {
      Alert.alert(i18n.t('error'))
    } finally {
      setIsTryingLogin(false)
    }


  }
  useEffect(() => {
    fetchToken()
  }, [])

  if (isTryingLogin) {
    return <LoadingScreen notFromNav={true} />
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary700,
    backgroundColor: Colors.primary700,
    overflow: "hidden",
    marginRight: 10,
  },
  menuContainer: {
    marginLeft: 10,
  },
  menuItem: {
    width: 210,
    backgroundColor: "#f1f1f1",
    height: 30,
  },
  logoContainer: {
    width: '40',
    height: '20'
  },
  notificationButton: {
    borderRadius: 40,
    width: 40,
    height: 40,
    borderColor: Colors.primary700,
    backgroundColor: Colors.primary700,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
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
});


export default App = () => {

  const [isLoaded] = useFonts({
    "boahmed-alharf-bold": require("./assets/fonts/boahmed-alharf-bold.ttf"),
    "boulder-regular": require("./assets/fonts/boulder-regular.ttf"),
  });

  if (!isLoaded) {
    return <LoadingScreen notFromNav={true} />
  }

  return (
    <AuthContextProvider>
      <LangContextProvider>
        <DoctorContextProvider>
          <Root />
        </DoctorContextProvider>
      </LangContextProvider>
    </AuthContextProvider>
  );
}
