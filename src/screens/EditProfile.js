import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Text, TextInput, Modal, Image } from 'react-native';
import { width } from '../utility/Dimentions';
import Icons from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { Base_URL } from '../store/Base_URL';
import PhoneInput from 'react-native-phone-number-input';
import Colors from '../css/helpers/Colors';
import axios from 'axios';
 const RNFS =require('react-native-fs')

const EditProfile = ({ navigation }) => {

  const api_token = useSelector(state => state.userReducer.Token)
  const [json, setJson] = useState()
  const phoneInput = useRef(null);
  const [image, setImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageinfo,setimageinfo]=useState()
const initialstate={
  name: '',
  username: '',
  email: '',
  mobile_no: '',
  country_code: '',
  profile:''
};
  const [editJson, setEditJson] = useState([])
  const [state, setState] = useState(initialstate);

  const { name, username, email, mobile_no, country_code } = state;
  const updateState = data => setState(() => ({ ...state, ...data }));
  const [phoneNumber, setphoneNumber] = useState('');
  
  const getUserProfile = async () => {
    try {
      const result = await fetch(
        Base_URL + 'getUserProfile',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            Authorization: api_token,
          },
        },
      );
      const json = await result.json();
      setJson(json.data);
      setState(json.data)
   
console.log(json.data.profile)
    } catch (error) {
      console.log(error);
    }
  };
  const onEditProfile = async () => {
  
    try {
      let formData = new FormData();
      let i = {
        uri: imageinfo.path,
        type: 'multipart/form-data',
        name: `image.jpg`,
    };
      formData.append('full_name', name);
      formData.append('email', email);
      formData.append('username', username);
     formData.append('mobile_no', mobile_no);
      formData.append('country_code', parseInt(phoneInput.current?.getCallingCode()));
      formData.append('profile_image',i);
     
      const result = await axios.post(
        `${Base_URL}updateProfile`, formData,{
          headers:{
            'X-localization': 'en',
            "Content-Type": "application/x-www-form-urlencoded" ,
             Authorization: api_token,
          }
        }
    );

      console.log("result",result.data.flag)
      if(result?.data?.flag===1)
      {
        alert(result?.data?.message);
        navigation.navigate('AccountScreen')
        }
        else {
            console.log('Unable to fetch!');
          }

    } catch (error) {
      console.log(error);
    }
  };






  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setimageinfo(image)
      setImage(image.path);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setimageinfo(image)
      setImage(image.path);
    });
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <TouchableOpacity
              onPress={() => takePhotoFromCamera()}
              style={[styles.button, styles.buttonClose]}
            >
              <Text style={styles.textStyle}>Tack from Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => choosePhotoFromLibrary()}
              style={[styles.button, styles.buttonClose]}
            >
              <Text style={styles.textStyle}>Choose from Library</Text>
            </TouchableOpacity>
            <View style={styles.brView} />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>


      <View style={styles.topView} />
      <View style={styles.bottomView}>
        <View style={styles.profileView} >
          {
            image !=null ? <Image
              style={{ height: "100%", width: "100%" }}
              source={{
                uri: image
              }}
            /> :
        
            <Image
            style={{ height: "100%", width: "100%" }}
            source={{
              uri: state.profile
            }}
          />
          }
        </View>
        <View
          style={styles.cameraView} >
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icons
              name={'camera'}
              solid size={20}
              color={'#ffffff'}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder={state.name}
          defaultValue={state.name}
          onChangeText={name => updateState({ name })}
          placeholderTextColor={'#111'}
          style={styles.inputText}
          value={state.name}
        />
        <TextInput
          placeholder={state.username}
          defaultValue={state.username}
          onChangeText={username => updateState({ username })}
          placeholderTextColor={'#111'}
          style={styles.inputText}
          value={state.username}
        />
        <TextInput
          placeholder={state.email}
          defaultValue={state.email}
          onChangeText={email => updateState({ email })}
          placeholderTextColor={'#111'}
          style={styles.inputText}
          value={state.email}
        />
        <View style={styles.container}>
          <PhoneInput
            ref={phoneInput}
            placeholder={state.mobile_no}
            defaultValue={phoneNumber}
            defaultCode="IN"
            layout="first"
            withShadow
            autoFocus
            textInputStyle={{ height: width * 0.15}}
            containerStyle={styles.inputText}
            textContainerStyle={styles.inputTextPhone}
            onChangeFormattedText={text => {
              setphoneNumber(text);
            }}
            onChangeText={mobile_no=>updateState({mobile_no})}
            value={state.mobile_no}
          />
        </View>

        <TouchableOpacity
          onPress={() => onEditProfile()}
          style={styles.buttonTouch}>
          <Text
            style={styles.buttonText}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView >
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
    borderWidth: 5,
    borderColor: '#9c27b0',
    alignSelf: 'center',
    overflow: 'hidden',
    backgroundColor: '#ccc',
    height: width * 0.35,
    width: width * 0.35,
    marginTop: width * -0.20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraView: {
    alignSelf: 'center',
    marginTop: width * -0.12,
    marginLeft: width * 0.35,
    backgroundColor: '#9c27b0',
    height: width * 0.12,
    width: width * 0.12,
    marginBottom: 20,
    marginRight: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTouch: {
    width: '90%',
    height: width * 0.13,
    backgroundColor: '#9c27b0',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.20,
    marginBottom: width * 0.20
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff'
  },
  inputText: {
    width: '90%',
    height: width * 0.13,
    paddingLeft: 20,
    backgroundColor: '#f8eafa',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 15
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modalView: {
    margin: 10,
    width: '95%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    marginTop: 10,
    width: width * 0.80,
    height: width * 0.12,
    backgroundColor: '#9c27b0',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  brView: {
    height: 1,
    marginTop: 10,
    width: '110%',
    backgroundColor: '#ccc'
  },
  inputTextPhone: {
    height: width * 0.13,
    backgroundColor: '#f8eafa',
    alignSelf: 'center',
    borderRadius: 30,
  color:Colors.black
  }
});

export default EditProfile;
