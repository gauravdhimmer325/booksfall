import React from 'react';
import { StyleSheet, View, Text, Share } from 'react-native';
import { width } from '../utility/Dimentions';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../css/helpers/Colors';


const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'BooksFall | "Books to change our world." , "A world of books for young, old and children."'
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const AccountSetting = ({ navigation }) => {
  const settingdata = [
    { iconsname: "user-edit", optiontext: "Edit profile", navigationLink: "EditProfile" },
    { iconsname: "book", optiontext: "My Books", navigationLink: "MyBooks" },
    { iconsname: "book-medical", optiontext: "Add Books", navigationLink: "AddBooks" },
    { iconsname: "bell", optiontext: "Notification", navigationLink: "Notifications" },
    { iconsname: "id-badge", optiontext: "Contact Us", navigationLink: "ContactUs" },
  ]
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.bottomView}>
        {settingdata.map((item) =>
          <TouchableOpacity style={styles.optionTouch} onPress={() => navigation.navigate(item.navigationLink)}>
            <Icons style={styles.iconLeft} name={item.iconsname} solid size={17} color={'#9c27b0'} />
            <Text style={styles.optionText}>{item.optiontext}</Text>
            <Icons style={styles.iconRight} name='angle-double-right' size={14} color={Colors.black} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onShare} style={styles.optionTouch}>
          <Icons style={styles.iconLeft} name='share-alt-square' size={17} color={'#9c27b0'} />
          <Text style={styles.optionText}>{"Share"}</Text>
          <Icons style={styles.iconRight} name='angle-double-right' size={14} color={Colors.black} />
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
  bottomView: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#ffffff',
    marginTop: '20%',
    paddingTop: '10%',
    paddingBottom: "50%"
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
    fontSize: 14,
    color:Colors.black
  },
  iconLeft: {
    position: 'absolute',
    left: 15
  },
  iconRight: {
    position: 'absolute',
    right: 15
  },
});

export default AccountSetting;
