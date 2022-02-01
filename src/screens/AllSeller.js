import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { width } from '../utility/Dimentions';
import { Base_URL } from '../store/Base_URL';

const AllSeller = ({ navigation }) => {
    const [data, setData] = useState([])
    const bookList = async () => {
        try {
            const result = await fetch(
                Base_URL + 'viewAllBestsellers',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                },
            );
            const json = await result.json();
            setData(json.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        bookList();
    }, []);

    return (
        <ScrollView>
            <View style={styles.mainView}>
                {data && data.map((item, key) => {
                    return (
                        <View key={item.user_id} style={styles.box}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AuthorAllBook', { paramKey: item })}>
                                <Image
                                    style={styles.squareImage}
                                    source={{
                                        uri: item.profile
                                    }}
                                />
                                <Text style={styles.bookName}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        marginTop: 10
    },
    box: {
        alignSelf: 'center',
        flexBasis: '47%',
        backgroundColor: 'red',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        padding: 5,
        margin: 5,
        height: width * 0.70,
        shadowColor: '#111111',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    squareImage: {
        height: '90%',
        width: '100%',
        borderRadius: 10,
    },
    bookName: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 14,
        fontWeight: '600',
        color: '#111'
    }
});

export default AllSeller;
