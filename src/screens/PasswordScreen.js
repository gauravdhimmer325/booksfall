import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { width } from '../utility/Dimentions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Base_URL } from '../store/Base_URL';

const PasswordScreen = () => {

  const api_token = useSelector(state => state.userReducer.Token)

  const [state, setState] = useState({
    password: '',
    newpassword: '',
    confirmpassword: '',
  });

  const { password, newpassword, confirmpassword } = state;
  const updateState = data => setState(() => ({ ...state, ...data }));


  const onSavePass = async () => {
    try {
      let formData = new FormData();
      formData.append('password', password);
      formData.append('newpassword', newpassword)
      formData.append('confirmpassword', confirmpassword)

      const result = await fetch(
        Base_URL + 'changepassword',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            Authorization: api_token,
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

    <View style={styles.mainContainer}>
      <View style={styles.topView} >
        <TextInput
          onChangeText={password => updateState({ password })}
          placeholder='Old Password'
          style={styles.inputText}
        />
        <TextInput
          onChangeText={newpassword => updateState({ newpassword })}
          placeholder='New Password'
          style={styles.inputText}
        />
        <TextInput
          onChangeText={confirmpassword => updateState({ confirmpassword })}
          placeholder='Confirm New Password'
          style={styles.inputText}
        />
        <TouchableOpacity
          onPress={onSavePass}
          style={styles.buttonTouch}>
          <Text style={styles.buttonText}>
            Save password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#eac0f1',
  },
  topView: {
    flex: 1,
    marginTop: '20%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  inputText: {
    width: '90%',
    height: width * 0.12,
    paddingLeft: 20,
    backgroundColor: '#f8eafa',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 15,
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonTouch: {
    width: '90%',
    height: width * 0.13,
    backgroundColor: '#9c27b0',
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60%'
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#fff'
  },
});

export default PasswordScreen;
