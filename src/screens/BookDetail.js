import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { width } from '../utility/Dimentions';

const BookDetail = ({ route, navigation }) => {
    const [json, setJson] = useState()

    useEffect(() => {
        setJson(route.params.paramKey)
    }, []);

    return (
        <>
            <Image
                style={styles.bookImage}
                source={{
                    uri: json && json.image
                }}
            />
            <View style={styles.priseView}>
                <Text style={styles.priseTag}>{json && json.book_price}</Text>
            </View>
            <Text style={styles.bookName}>{json && json.book_name}</Text>
            <Text style={styles.reviewsText}>{parseFloat(json && json.rates).toFixed(2)} ({json && json.rate_count})
                Reviews</Text>
            <Text style={styles.reviews}>
                <Icons name='star' solid={json && json.rates >= 1 ? true : false} size={15} color={'gold'} />{' '}
                <Icons name='star' solid={json && json.rates >= 2 ? true : false} size={15} color={'gold'} />{' '}
                <Icons name='star' solid={json && json.rates >= 3 ? true : false} size={15} color={'gold'} />{' '}
                <Icons name='star' solid={json && json.rates >= 4 ? true : false} size={15} color={'gold'} />{' '}
                <Icons name='star' solid={json && json.rates >= 5 ? true : false} size={15} color={'gold'} />{' '}
            </Text>

            <View style={styles.authorView}>
                <Image
                    style={styles.profilePic}
                    source={{
                        uri: json && json.owner_image
                    }}
                />
                <Text style={styles.authorName}>{json && json.owner_name}</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('More', { paramKey: json })} style={styles.moreView}>
                <Text style={styles.priseTag}>More... Introduction {'\&'} Reviews</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({

    bookImage: {
        alignSelf: 'center',
        height: width * 0.70,
        width: '50%',
        borderRadius: 10,
        marginTop: width * 0.05
    },
    priseView: {
        height: width * 0.10,
        width: width * 0.40,
        backgroundColor: '#ab47bc',
        alignSelf: 'center',
        borderRadius: 50,
        marginTop: width * -0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
    priseTag: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
    },
    bookName: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginHorizontal: 10,
        color: '#111'
    },
    reviewsText: {
        padding: 5,
        fontSize: 12,
        color: '#666',
        alignSelf: 'center',
    },
    reviews: {
        alignSelf: 'center',
        padding: 5
    },
    authorView:
    {
        marginTop: 10,
        height: width * 0.15,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    profilePic: {
        height: width * 0.12,
        width: width * 0.12,
        borderRadius: 50,
        marginLeft: width * 0.07
    },
    authorName:
    {
        marginLeft: width * 0.02,
        fontSize: 18,
        fontWeight: '600',
        color: '#111'
    },
    moreView: {
        height: width * 0.12,
        width: width * 0.70,
        backgroundColor: '#790e8b',
        alignSelf: 'center',
        borderRadius: 50,
        marginTop: width * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },

});

export default BookDetail;
