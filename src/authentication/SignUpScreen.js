import React, { useState, useRef } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { height, width } from '../utility/Dimentions';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { Base_URL } from '../store/Base_URL';
import PhoneInput from 'react-native-phone-number-input';
import { nameValidate, emailValidate } from '../components/ValidationCmp';
import { RegisterData } from '../store/actions';
import Colors from '../css/helpers/Colors';
import axios from 'axios';
const SignUpScreen = ({ navigation }) => {
  const [rememberPass, setRememberPass] = useState(false)
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);

  const dispatch = useDispatch();
  const initstate = {
    full_name: '',
    username: '',
    email: '',
    password: '',
    mobile_no: '',
    country_code: '',
    confirmpwd: ''

  }
  const [state, setState] = useState(initstate);
  const [errstate, seterrstate] = useState('')
  const { full_name, username, email, password, mobile_no, country_code, confirmpwd } = state;
  const updateState = data => setState(() => ({ ...state, ...data }));
  const validation = (key, data) => {
    var res;
    switch (key) {
      case "username":
        res = nameValidate(data);
        seterrstate(res)
        break;
      case "email":
        res = emailValidate(data);
        seterrstate(res)
        break;
      default:
        break;
    }
  }

  const onSignUp = async () => {
    console.log(state)
    if ((mobile_no !== null) && (confirmpwd !== null)) {
      if (password === confirmpwd) {

        try {
          let formData = new FormData();
          formData.append('full_name', full_name);
          formData.append('email', email);
          formData.append('username', username);
          formData.append('mobile_no', mobile_no);
          formData.append('password', password);
          formData.append('country_code', parseInt(phoneInput.current?.getCallingCode()));
          console.log(formData)

          const response = await axios.post(
            `${Base_URL}register`, formData, {
            headers: {
              'X-localization': 'en',
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
          );


          const json = response.data;
          dispatch(RegisterData(json));
          if (json) {
            alert(json.message);
            if (json.flag ===1) {
              navigation.navigate('LoginScreen');
            }
          } else {
            console.log('Unable to fetch!');
          }

        } catch (error) {
          console.log(error);
        }
      }
      else {
        alert("The password  don't match.")
      }
    }
    else {
      alert("Please Enter the value")
    }
  };

  return (
    <ScrollView style={styles.mainView} showsVerticalScrollIndicator={false}>
      <Image
        style={styles.loginImg}
        source={require('../assets/images/Onbording1.png')}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.skipTouch}>
        <Text style={styles.buttonText}>SKIP</Text>
      </TouchableOpacity>
      <View style={styles.loginView}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signupText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.loginIndicator}>
          <Text style={styles.loginText}>Sign Up</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', height: height * 0.05, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: "red" }}>{errstate}</Text>
      </View>
      <TextInput
        placeholder={'Full Name'}
        // onEndEditing={() => validation('username', state.username)}
      
        onChangeText={full_name => updateState({ full_name })}
        style={styles.inputText}
        value={state.full_name}
      />
       <TextInput
        placeholder={'User Name'}
        // onEndEditing={() => validation('username', state.username)}
      
        onChangeText={username => updateState({ username })}
        style={styles.inputText}
        value={state.username}
      />
      <TextInput
        // onEndEditing={() => validation('email', state.email)}
        placeholder={'Email Address'}
        onChangeText={email => updateState({ email })}
        style={styles.inputText}
        value={state.email}
      />

      <View style={styles.container}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="IN"
          layout="first"
          withShadow
          autoFocus
          withDarkTheme={true}

          textInputStyle={{ height: width * 0.15 }}
          containerStyle={[styles.inputText]}
          textContainerStyle={[styles.inputTextPhone]}
          onChangeFormattedText={text => {
            setphoneNumber(text);
          }}
          onChangeText={mobile_no => updateState({ mobile_no })}

        />
      </View>

      <TextInput
        placeholder={'Password'}
        onChangeText={password => updateState({ password })}
        style={styles.inputText}
        value={state.password}
        secureTextEntry={true}
      />
      <TextInput
        placeholder={'Confirm Password'}
        style={styles.inputText}
        value={state.confirmpwd}
        secureTextEntry={true}
        onChangeText={confirmpwd => updateState({ confirmpwd })}
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
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')}>
          {rememberPass == true ?
            <Text style={{ color: '#111' }}>Please agree to term an conditions</Text>
            :
            <Text style={{ color: '#999' }}>Please agree to term an conditions</Text>
          }
        </TouchableOpacity>

      </View>
      <TouchableOpacity
        onPress={onSignUp}
        style={styles.buttonTouch}>
        <Text
          style={styles.buttonText}>
          Sign Up
        </Text>
      </TouchableOpacity>
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
    color: '#999',
    marginLeft: 20
  },
  inputText: {
    width: '90%',
    height: width * 0.13,
    paddingLeft: 20,
    backgroundColor: '#f8eafa',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 15,
    color: Colors.black
  },
  rememberView: {
    flexDirection: 'row',
    alignItems: 'center',
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
  skipTouch: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  inputTextPhone: {
    height: width * 0.13,
    backgroundColor: '#f8eafa',
    alignSelf: 'center',
    borderRadius: 30,
    color: Colors.black
  }
});

export default SignUpScreen;
