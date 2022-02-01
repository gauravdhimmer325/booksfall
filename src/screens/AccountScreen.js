import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { width } from '../utility/Dimentions';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { Base_URL } from '../store/Base_URL';
import { userTokenData } from '../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [api_token, setapi_token] = useState();
  const [json, setJson] = useState()
  const getUserProfile = async () => {
    try {
      AsyncStorage.getItem('userToken').then(async (data) => {
        setapi_token(data)
        const result = await fetch(
          Base_URL + 'getUserProfile',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              Authorization: data,
            },
          },
        );
        const json = await result.json();
        setJson(json.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = async () => {
   
    try {
      const result = await fetch(
        Base_URL + 'logout',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            Authorization: api_token,
          },
        },
      );
      const json = await result.json();
      if (json.flag === 1) {
        alert(json.message);
        try {
          await AsyncStorage.removeItem('userToken');
          dispatch(userTokenData(''));
          navigation.navigate('LoginScreen')
        } catch (e) {
          console.log(e);
        }
      }
      if (json.flag == 0) {
        alert(json.msg);
      }
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.topView} />
      <View style={styles.bottomView}>
        <View style={styles.profileView} >
          {
            !api_token ? <Icons name={'user'} solid size={80} color={'#ffffff'} /> :
              <>
                <Image
                  style={styles.profileImg}
                  source={{
                    uri: json && json.profile
                  }} />
              </>
          }
        </View>
        <Text style={styles.userName}>{json && json.name}</Text>
        <Text style={styles.emailText}>
          {json && json.email}
        </Text>
        <TouchableOpacity
          style={styles.optionTouch}
          onPress={() => navigation.navigate('AccountSetting')}>
          <Icons style={styles.iconLeft} name='user' solid size={17} color={'#9c27b0'} />
          <Text style={styles.optionText}>Account Setting</Text>
          <Icons style={styles.iconRight} name='angle-double-right' size={14} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionTouch}
          onPress={() => navigation.navigate('PasswordScreen')}>
          <Icons style={styles.iconLeft} name='lock' solid size={17} color={'#9c27b0'} />
          <Text style={styles.optionText}>Password</Text>
          <Icons style={styles.iconRight} name='angle-double-right' size={14} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionTouch}
          onPress={() => navigation.navigate('AboutUs')}>
          <Icons style={styles.iconLeft} name='exclamation-circle' size={17} color={'#9c27b0'} />
          <Text style={styles.optionText}>About Us</Text>
          <Icons style={styles.iconRight} name='angle-double-right' size={14} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionTouch}
          onPress={() => navigation.navigate('TermsAndConditions')}>
          <Icons style={styles.iconLeft} name='clipboard-list' size={17} color={'#9c27b0'} />
          <Text style={styles.optionText}>Terms and conditions</Text>
          <Icons style={styles.iconRight} name='angle-double-right' size={14} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionTouch}
          onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Icons style={styles.iconLeft} name='shield-alt' size={17} color={'#9c27b0'} />
          <Text style={styles.optionText}>Privacy policy</Text>
          <Icons style={styles.iconRight} name='angle-double-right' size={14} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onLogout()}
          style={styles.logoutTouch}>
          <Icons style={styles.iconLeft} name='sign-out-alt' size={17} color={'#fff'} />
          <Text style={styles.logoutText}>Logout</Text>
          <Icons style={styles.iconRight} name='angle-double-right' size={14} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#eac0f1',
  },
  topView: {
    height: width * 0.4
  },
  bottomView: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#ffffff'
  },
  profileView: {
    alignSelf: 'center',
    backgroundColor: '#9c27b0',
    height: width * 0.35,
    width: width * 0.35,
    marginTop: width * -0.20,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 10
  },
  emailText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#cccccc',
    alignSelf: 'center',
    padding: 5
  },
  optionTouch: {
    width: '90%',
    height: width * 0.12,
    backgroundColor: '#f8eafa',
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  optionText: {
    marginLeft: width * 0.12,
    fontWeight: '600',
    fontSize: 14
  },
  iconLeft: {
    position: 'absolute',
    left: 15
  },
  iconRight: {
    position: 'absolute',
    right: 15
  },
  logoutTouch: {
    width: '90%',
    height: width * 0.12,
    backgroundColor: '#9c27b0',
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: width * 0.20,
    marginBottom: width * 0.40
  },
  logoutText: {
    marginLeft: width * 0.12,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff'
  },
  profileImg: {
    height: "100%",
    width: "100%"
  }
});

export default AccountScreen;
