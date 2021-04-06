import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {BottomNavigation} from '../components';
import {
  AddAttendance,
  Company,
  DetailPetugas,
  EditAttendance,
  Home,
  HomeCompany,
  Info,
  InfoDetail,
  InputData,
  Login,
  Pelaporan,
  Penugasan,
  PersonalData,
  Profile,
  ProfileCompany,
  RekapAttendance,
  RekapData,
  SplashScreen,
  SyncData,
} from '../pages';
import DataPetugas from '../pages/DataPetugas';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Company" component={Company} />
      <Tab.Screen name="Info" component={Info} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeCompany"
        component={HomeCompany}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileCompany"
        component={ProfileCompany}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalData"
        component={PersonalData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Penugasan"
        component={Penugasan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InputData"
        component={InputData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RekapData"
        component={RekapData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DataPetugas"
        component={DataPetugas}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPetugas"
        component={DetailPetugas}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAttendance"
        component={AddAttendance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditAttendance"
        component={EditAttendance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RekapAttendance"
        component={RekapAttendance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pelaporan"
        component={Pelaporan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InfoDetail"
        component={InfoDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SyncData"
        component={SyncData}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
