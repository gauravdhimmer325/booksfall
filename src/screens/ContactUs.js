import React from 'react';
import { StyleSheet, Text, SafeAreaView, Image, TouchableOpacity, Linking } from 'react-native';
import { height, width } from '../utility/Dimentions';

const emailId = 'merajaym@gmail.com'

const onPressEmailClick = (email) => {
    Linking.openURL('mailto:' + email)
    //  Linking.openURL('mailto:Care@amazon.com')
}

const ContactUs = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                style={styles.image}
                source={require('../assets/images/ContactUs.png')} />
            <TouchableOpacity
                style={{ ...styles.buttonTouch }}
                onPress={() => Linking.openURL('mailto:ajay.mer@dignizant.com')}>
                <Text style={styles.buttonText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
                // onPress={() => onButtonAdd()}
                style={{ ...styles.buttonTouch, marginTop: '-5%' }}>

                <Text style={styles.buttonText}>
                    Call
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    image: {
        height: '45%',
        width: '100%'
    },
    buttonTouch: {
        width: '90%',
        height: width * 0.13,
        backgroundColor: '#9c27b0',
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
        marginBottom: '10%'
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 14,
        color: '#fff'
    },


});


export default ContactUs;
