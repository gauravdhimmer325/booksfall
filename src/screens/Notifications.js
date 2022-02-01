import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Base_URL } from '../store/Base_URL';


const Notifications = () => {

    const api_token = useSelector(state => state.userReducer.Token)
    const [data, setData] = useState([])
    const [state, setState] = useState({
        username: '',
    });

    const { username } = state;
    const updateState = data => setState(() => ({ ...state, ...data }));

    const notificationList = async () => {
        try {
            let formData = new FormData();
            formData.append('username', 'ajay');

            const result = await fetch(
                Base_URL + 'notificationList',
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
            setData(json)
            if (json) {
                alert(json.message);
            } else {
                console.log('Unable to fetch!');
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        notificationList();
    }, []);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text>{data.message}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#eac0f1',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Notifications;
