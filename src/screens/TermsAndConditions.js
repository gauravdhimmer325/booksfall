import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { width } from '../utility/Dimentions';
import axios from 'axios';
import { Base_URL } from '../store/Base_URL';
import HTMLView from 'react-native-htmlview';

const TermsAndConditions = () => {
    const [data, setData] = useState()
    postHomePage = async () => {
        await axios({
            method: 'POST',
            url: Base_URL + 'terms',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then((response) => {
                setData(response.data.data.terms)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(() => {
        postHomePage();
    }, []);

    const htmlContent = data
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.bottomView}>
                <HTMLView
                    value={htmlContent}
                    stylesheet={styles}
                />
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
        backgroundColor: '#fff',
        marginTop: '10%',
        paddingTop: '10%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: width * 0.20
    }
});

export default TermsAndConditions;
