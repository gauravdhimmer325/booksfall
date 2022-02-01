
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { userTokenData } from '../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStack from './AppStack';

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();

  const [userToken, setUserToken] = useState()
  useEffect(() => {
    setTimeout(async () => {
      let Token;
      try {
        AsyncStorage.getItem('userToken').then(data => {
          setUserToken(data)
          dispatch(userTokenData(data));
        });
      } catch (e) {
        console.log(e);
      }
    }, 10);
  }, []);


  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer >
  )

}

export default App;

