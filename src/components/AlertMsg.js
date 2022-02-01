import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import { height, width } from '../utility/Dimentions';

const AlertMsg = ({ navigation }) => {
    return (
        <View style={{ height: 100, width: 100, backgroundColor: 'red' }}>

        </View>
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

export default AlertMsg;
