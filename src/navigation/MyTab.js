import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import {height} from '../utility/Dimentions';
import {HomeScreen} from './ImportIndex';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: height / 10},
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#b48221',
          tabBarIcon: ({color}) => (
            <Icons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="HealthcareTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#b48221',
          tabBarIcon: ({color}) => (
            <Icons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="DiagnosticsTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#b48221',
          tabBarIcon: ({color}) => (
            <Icons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#b48221',
          tabBarIcon: ({color}) => (
            <Icons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#b48221',
          tabBarIcon: ({color}) => (
            <Icons name="home" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
