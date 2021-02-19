import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CreateUser, EditUser, UserList} from '../pages';
import {BottomNavigator} from '../components';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Users" component={UserList} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="MainApp">
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreateUser"
        component={CreateUser}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
