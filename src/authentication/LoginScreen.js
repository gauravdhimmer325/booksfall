import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { width } from '../utility/Dimentions';
import { useDispatch } from 'react-redux';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { LoginData, userTokenData } from '../store/actions';
import { Base_URL } from '../store/Base_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const { username, password } = state;
  const updateState = data => setState(() => ({ ...state, ...data }));

  const onLogin = async () => {
    
    try {
    
      let formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
     
      const result = await fetch(
        Base_URL + 'login',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData,
        },
      );
      const json = await result.json();
      dispatch(LoginData(json));
      dispatch(userTokenData(json.access_token));

      if (json) {
        alert(json.message);
        console.log('json', json)
        if (json.flag == 1) {
          navigation.navigate('Home');
          const userToken = json.access_token
          try {
            AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        console.log('Unable to fetch!');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [rememberPass, setRememberPass] = useState(false)
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainView}>
        <Image
          style={styles.loginImg}
          source={require('../assets/images/Onbording1.png')}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.skipText}>
          <Text style={styles.buttonText}>SKIP</Text>
        </TouchableOpacity>
        <View style={styles.loginView}>
          <View style={styles.loginIndicator}>
            <Text style={styles.loginText}>Login</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder={'Username/Email address'}
          onChangeText={username => updateState({ username })}
          style={{ ...styles.inputText, marginTop: width * 0.10, }}
        />
        <TextInput
          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={password => updateState({ password })}
          style={styles.inputText}
        />
        <View style={styles.rememberView}>
          <TouchableOpacity
            onPress={() => setRememberPass(!rememberPass)}
            style={styles.rememberPass}>
            {rememberPass == true ?
              <Icons
                style={{ padding: 4 }}
                size={15}
                name='check-square'
                solid color={'#9c27b0'}
              /> :
              <Icons
                style={{ padding: 4 }}
                size={15}
                name='check-square'
                solid color={'#999'}
              />
            }
            {rememberPass == true ?
              <Text style={{ color: '#111' }}>Remember me</Text>
              :
              <Text style={{ color: '#999' }}>Remember me</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPass}>
            <Text style={{ color: '#111' }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onLogin}
          style={styles.buttonTouch}>
          <Text
            style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
      </ScrollView >
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loginImg: {
    height: width * 0.80,
    width: width,
  },
  loginView: {
    flexDirection: 'row',
    marginTop: width * 0.05
  },
  loginIndicator: {
    borderBottomWidth: 5,
    borderBottomColor: '#ab47bc',
    paddingBottom: 5,
    marginHorizontal: 20
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ab47bc'
  },
  signupText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#999'
  },
  inputText: {
    width: '90%',
    height: width * 0.13,
    paddingLeft: 20,
    backgroundColor: '#f8eafa',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 15,
  },
  rememberView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: width * 0.05
  },
  buttonTouch: {
    width: '90%',
    height: width * 0.13,
    backgroundColor: '#9c27b0',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.05,
    marginBottom: width * 0.20
  },
  buttonText: {
    fontSize: 16,
    color: '#fff'
  },
  rememberPass: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  forgotPass: {
    marginLeft: width * 0.25
  },
  skipText: {
    position: 'absolute',
    right: 15,
    top: 15
  }

});

export default LoginScreen;
