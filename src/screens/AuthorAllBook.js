import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { width } from '../utility/Dimentions';
import { Base_URL } from '../store/Base_URL';

const AuthorAllBook = ({ route, navigation }) => {
    console.log(route.params.paramKey)
    const [json, setJson] = useState()
   

    const [data, setData] = useState([])
    const bookList = async () => {
        var uid = route.params.paramKey.user_id
        try {
            let formData = new FormData();
            formData.append('user_id', uid);
            const result = await fetch(
                Base_URL + 'bestSellerBooks',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData
                },
            );
            const json = await result.json();
            setData(json.data.data)
        } catch (error) {
            console.log(error);
        }
    };

 
    useEffect(() => {
        bookList()
    }, []);
    return (
        <ScrollView>
            <View style={styles.mainView}>
                {data && data.map((item, key) => {
                    return (
                        <View key={item.id} style={styles.box}>
                            <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { paramKey: item })} >
                                <Image
                                    style={styles.squareImage}
                                    source={{
                                        uri: item.image
                                    }}
                                />
                                <View
                                    style={styles.priseView}>
                                    <Text style={styles.priseTag}>
                                        $  {parseFloat(item.price).toFixed(2)}
                                    </Text>
                                    <Text style={styles.priseTag}>
                                        <Icons
                                            name={'star'}
                                            size={15}
                                            color={'gold'}
                                        />
                                        {parseFloat(item.rates).toFixed(2)}
                                    </Text>
                                </View>
                                <View style={{height:'15%'}}>
                                    <Text numberOfLines={2} style={styles.bookName}>{item.book_name}</Text>
                                </View>
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
        height: '83%',
        width: '100%',
        borderRadius: 10,
    },
    priseView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -25,
        padding: 5,
    },
    priseTag: {
        color: '#ffffff',
        fontSize: 14
    },
    bookName: {
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: '600',
        color: '#111'
    }
});

export default AuthorAllBook;
