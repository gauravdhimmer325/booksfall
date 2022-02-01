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
import { Base_URL } from '../store/Base_URL';

const ForgotPassword = ({ navigation }) => {
  const [state, setState] = useState({
    email: ''
  });

  const { email } = state;
  const updateState = data => setState(() => ({ ...state, ...data }));
  const forgotPass = async () => {
    try {
      let formData = new FormData();
      formData.append('email', email)
      const result = await fetch(
        Base_URL + 'request-reset-password',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData,
        },
      );
      const json = await result.json();
      if (json) {
        alert(json.message);
      } else {
        console.log('Unable to fetch!');
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ScrollView style={styles.mainView}>
      <Image
        style={styles.loginImg}
        source={require('../assets/images/Onbording1.png')}
      />
      <Text style={styles.loginText}>Forgor your Password?</Text>
      <Text style={styles.description}>Enter your registrered email below To receive password instructions in tour Email Id.</Text>
      <TextInput
        placeholder={'Email address'}
        onChangeText={email => updateState({ email })}
        style={{ ...styles.inputText, marginTop: width * 0.10, }}
      />
      <TouchableOpacity
        onPress={forgotPass}
        style={styles.buttonTouch}>
        <Text
          style={styles.buttonText}>
          Send
        </Text>
      </TouchableOpacity>
      <View style={styles.rememberView}>
        <Text style={styles.rememberText}>Remember password </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginBottom}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView >
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
    marginBottom: 15
  },
  loginText: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ab47bc'
  },
  description: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#999',
    marginTop: 15
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
  buttonTouch: {
    width: '90%',
    height: width * 0.13,
    backgroundColor: '#9c27b0',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.05,
    marginBottom: width * 0.05
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  rememberText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#999',
  },
  rememberView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginBottom: {
    color: '#9c27b0',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: width * 0.30
  }
});

export default ForgotPassword;
