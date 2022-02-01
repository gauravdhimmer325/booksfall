import React, { useState } from 'react';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { height, width } from '../utility/Dimentions';
import {
  OnbordingScreen,
  LoginScreen,
  SignUpScreen,
  ForgotPassword,
  HomeScreen,
  ExploreScreen,
  InstitutionScreen,
  TopBookList,
  NewlyAdded,
  ByAuthor,
  BookDetail,
  AccountScreen,
  PasswordScreen,
  AccountSetting,
  EditProfile,
  WriteYourReview,
  InstitutionDetails,
  AboutUs,
  TermsAndConditions,
  PrivacyPolicy,
  AddAddress,
  MyAddress,
  MyBooks,
  AddBooks,
  ContactUs,
  Notifications,
  SearchScreen,
  AllSeller,
  AuthorAllBook,
  EditBooks,
} from './ImportIndex';
import More from '../screens/More';

const AuthStack = Stack => {
  return (
    <Stack.Group>
      <Stack.Screen name="Home" component={MyTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: '',
          headerStyle: { backgroundColor: '#ab47bc' }
        }} />

      <Stack.Screen name="More" component={More}
      // options={{
      //   headerShown: false,
      // }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ title: 'Book Detail' }}
      />

      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerStyle: { backgroundColor: '#ab47bc' },
          headerBackImage: () => {
            return (
              <Icons
                style={{ marginLeft: 10 }}
                name='chevron-left'
                size={15}
                color={'#fff'}
              />
            )
          },
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerBackImage: () => {
            return (
              <Icons
                style={{ marginLeft: 10 }}
                name='chevron-left'
                size={15}
                color={'#fff'}
              />
            )
          },
          title: '',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />

      <Stack.Screen name="OnbordingScreen" component={OnbordingScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TopBookList"
        component={TopBookList}
        options={{ title: 'Top Books List' }}
      />
      <Stack.Screen
        name="EditBooks"
        component={EditBooks}
        options={{ title: 'Top Books List' }}
      />
      <Stack.Screen
        name="NewlyAdded"
        component={NewlyAdded}
        options={{ title: 'Newly Added Books' }}
      />
      <Stack.Screen
        name="ByAuthor"
        component={ByAuthor}
        options={{ title: 'By Author Books' }}
      />

      <Stack.Screen
        name="InstitutionDetails"
        component={InstitutionDetails}
        options={{ title: 'Institution Details' }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{ title: 'Password' }}
      />
      <Stack.Screen
        name="AccountSetting"
        component={AccountSetting}
        options={{ title: 'Account Setting' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen
        name="WriteYourReview"
        component={WriteYourReview}
        options={{ title: 'Write Your Review' }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ title: 'About Us' }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{
          headerBackImage: () => {
            return (
              <Icons
                style={{ marginLeft: 10 }}
                name='chevron-left'
                size={15}
                color={'#fff'}
              />
            )
          },
          title: 'Terms and conditions',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ title: 'Privacy Policy' }}
      />
      <Stack.Screen
        name="MyAddress"
        component={MyAddress}
        options={{ title: 'My Address' }}
      />
      <Stack.Screen
        name="Add Address"
        component={AddAddress}
        options={{ title: 'Add Address' }}
      />
      <Stack.Screen
        name="MyBooks"
        component={MyBooks}
        options={{ title: 'My Books' }}
      />
      <Stack.Screen
        name="AddBooks"
        component={AddBooks}
        options={{ title: 'Add Books' }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ title: 'Contact Us' }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen
        name="AllSeller"
        component={AllSeller}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen
        name="AuthorAllBook"
        component={AuthorAllBook}
        options={{ title: 'AuthorAllBook' }}
      />
    </Stack.Group>
  )
}

const Tab = createBottomTabNavigator();
const SearchButton = ({ choldren, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={onPress}
  >
    <View style={{
      width: 50,
      height: 50,
      borderRadius: 35,
      backgroundColor: '#ab47bc',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {choldren}
      <Icons name='search' color={'#fff'} size={20} />
    </View>

  </TouchableOpacity>
)

const MyTab = () => {
  return (
    <Tab.Navigator
      shifting={false}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          position: 'absolute',
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 15,
          height: 60,
          ...styles.shadow
        },
      }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 100
              }}>
              <Icons
                name='home'
                size={15}
                color={focused ? '#ab47bc' : '#748c94'}
              />
              <Text style={{ fontSize: 12, color: focused ? '#ab47bc' : '#748c94' }}>Home</Text>
            </View>
          ),
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <View style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginLeft: width * 0.05, borderRadius: 50 }}>
                <Icons
                  onPress={() => navigation.navigate('AccountScreen')}
                  style={{ margin: 5, backgroundColor: '#fff' }}
                  name={"user-circle"}
                  solid
                  size={20}
                  color={'#ab47bc'}
                />
              </View>
            )
          },
          title: 'Book Fair',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#ab47bc'
          },
        }}
      />
      <Tab.Screen
        name='ExploreScreen'
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 100
              }}>
              <Icons
                name='book-reader'
                size={15}
                color={focused ? '#ab47bc' : '#748c94'}
              />
              <Text style={{ fontSize: 12, color: focused ? '#ab47bc' : '#748c94' }}>Explore</Text>
            </View>
          ),
          title: 'Explore',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#ab47bc'
          },
        }}
      />
      <Tab.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={{
          tabBarButton: (props) => (
            <SearchButton {...props} />
          ),
          title: 'Search',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#ab47bc'
          },
        }}
      />
      <Tab.Screen
        name='InstitutionScreen'
        component={InstitutionScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 100
              }}>
              <Icons
                name='network-wired'
                size={15}
                color={focused ? '#ab47bc' : '#748c94'}
              />
              <Text style={{ fontSize: 12, color: focused ? '#ab47bc' : '#748c94' }}>Institution</Text>
            </View>
          ),
          title: 'Institution',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#ab47bc'
          },
        }}
      />
      <Tab.Screen
        name='AccountScreen'
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 100
              }}>
              <Icons
                name='user-circle'
                solid
                size={15}
                color={focused ? '#ab47bc' : '#748c94'}
              />
              <Text style={{ fontSize: 12, color: focused ? '#ab47bc' : '#748c94' }}>Account</Text>
            </View>
          ),
          title: 'Account',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#ab47bc'
          },
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <View style={{ backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginLeft: width * 0.07, borderRadius: 50 }}>
                <Icons
                  onPress={() => navigation.navigate('Notifications')}
                  style={{ margin: 5 }}
                  name={"bell"}
                  solid
                  size={20}
                  color={'#ab47bc'}
                />
              </View>
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}


export default AuthStack;

const styles = StyleSheet.create({

  shadow: {
    shadowColor: '#790e8b',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },

  // tabText: {
  //   fontSize: 12,
  // },
  // circle: {
  //   width: 70,
  //   height: 70,
  //   borderRadius: 35,
  //   backgroundColor: 'red',
  // },
  // searchContain: {
  //   top: -35,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'red'
  // },
  // iconContainer: {
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  // searchCricle: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'green',
  //   //marginTop: -30

  // },
  // searchContainer: {
  //   //top: -23,
  //   alignItems: 'center',
  //   //justifyContent: 'center',
  //   // backgroundColor: 'red'
  // },
  // bottomBar: {
  //   //top: -23,
  //   marginTop: 3,
  //   height: 3,
  //   borderRadius: 2,
  // },
});







