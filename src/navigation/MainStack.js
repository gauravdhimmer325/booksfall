
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { width } from '../utility/Dimentions';
import { useNavigation } from '@react-navigation/native';
import {
  OnbordingScreen,
  LoginScreen,
  SignUpScreen,
  ForgotPassword,
  HomeScreen,
  ExploreScreen,
  InstitutionScreen,
  TopBookList,
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
  MyBooks,
  AddBooks,
  ContactUs,
  Notifications,
  SearchScreen,
  AllSeller,
  AuthorAllBook,
  More,
  EditBooks,
  SplashScreen,
} from './ImportIndex';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();
const AppStack = () => {
  const [userToken, setUserToken] = useState()
  useEffect(() => {
    setTimeout(async () => {
      let Token;
      try {
        await AsyncStorage.getItem('userToken').then(data => {
          setUserToken(data)
        });
      } catch (e) {
        console.log(e);
      }
    }, 10);
  }, []);

  //console.log('UUErererer_----------', userToken)
  return (
    <Stack.Navigator initialRouteName={SplashScreen} >
      {/* <Stack.Navigator initialRouteName={userToken ? "LoginScreen" : "LoginScreen"} > */}
      <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}} />
      <Stack.Screen name="OnbordingScreen" component={OnbordingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerBackImage: () => {
            return (
              <></>
            )
          },
          title: 'Login',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }} />
      <Stack.Screen name="Home" component={MyTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditBooks"
        component={EditBooks}
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
          title: 'Edit Books',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
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
          title: 'Sign Up',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
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

      <Stack.Screen
        name="More"
        component={More}
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
          title: 'More Book Detail',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="TopBookList"
        component={TopBookList}
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
          title: 'Top Books List',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      {/* <Stack.Screen
        name="NewlyAdded"
        component={NewlyAdded}
        options={{ title: 'Newly Added Books' }}
      />*/}
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
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
          title: 'Book Detail',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="InstitutionDetails"
        component={InstitutionDetails}
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
          title: 'Institution Details',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
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
          title: 'Change Password',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="AccountSetting"
        component={AccountSetting}
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
          title: 'Account Setting',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
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
          title: 'Edit Profile',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="WriteYourReview"
        component={WriteYourReview}
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
          title: 'Write Your Review',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
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
          title: 'About Us',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
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
          title: 'Privacy Policy',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="MyBooks"
        component={MyBooks}
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
          title: 'My Books',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="AddBooks"
        component={AddBooks}
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
          title: 'Add Books',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
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
          title: 'Contact Us',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
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
          title: 'Notifications',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="AllSeller"
        component={AllSeller}
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
          title: 'All Seller',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
      <Stack.Screen
        name="AuthorAllBook"
        component={AuthorAllBook}
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
          title: 'Author All Book',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ab47bc' }
        }}
      />
    </Stack.Navigator>
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
  const [token, settoken] = useState()
  useEffect(() => {
    setTimeout(async () => {

      try {
        await AsyncStorage.getItem('userToken').then(data => {
          settoken(data)
        });
      } catch (e) {
        console.log(e);
      }
    }, 10);
  }, []);
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
                  onPress={false ? () => navigation.navigate('AccountScreen') : () => {
                    Alert
                      .alert(
                        "App Need",
                        "You need to login first for access this functionality. Are you sure you want to login? ",
                        [
                          {
                            text: "Cancel",
                          },
                          {
                            text: "Login",
                            onPress: () => navigation.navigate('LoginScreen'),

                          },
                        ],
                      );
                  }}
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
        listeners={({ navigation }) => ({
          tabPress: e => {
            token === null ? navigation.navigate('LoginScreen') : navigation.navigate('AccountScreen')

          }
        })}
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


export default AppStack;

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

});






