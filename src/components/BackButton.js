import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {height, width} from '../utility/Dimentions';

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity>
      <View style={styles.iconBack}>
        <Icons name={'menu-left'} size={30} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconBack: {
    backgroundColor: '#b48221',
    height: height / 20,
    width: width / 18,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackButton;
