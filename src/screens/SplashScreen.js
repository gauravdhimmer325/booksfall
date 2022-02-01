import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../css/helpers/Images';

const SplashScreen = ({ navigation }) => {

    const [token, setToken] = useState()
    const selectstate = useSelector(state => state.userReducer.Token);
    AsyncStorage.getItem('userToken').then(data => {
        setToken(data)
    });
    useEffect(() => {
        setTimeout(() => {
            if (token === null || token === undefined)
                navigation.navigate('OnbordingScreen')
            else
                navigation.navigate('Home')
        }, 5000)
    }, [])
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={{ height: '80%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Animatable.Image animation="slideInDown" iterationCount={20} direction="alternate"
                    source={require('../assets/images/BooksFall.png')} style={{ height: '90%', width: '50%', borderRadius: 100, resizeMode: 'contain' }} />
                <Text style={styles.text}>{"Books to change our world"}</Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ab47bc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#eac0f1'
    },
    text: {
        color: '#fff',
        fontSize: 25,
        marginTop: '5%',
        fontWeight: 'bold'
    }
});

export default SplashScreen;