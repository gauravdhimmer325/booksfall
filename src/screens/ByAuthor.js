import React, { useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { gethome } from '../store/actions';

const ByAuthor = ({ navigation }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(gethome());
    }, []);

    return (
        <ScrollView>
            <View style={styles.mainView}>
                <View style={styles.box}>
                    <TouchableOpacity onPress={() => navigation.navigate('BookDetail')}>
                        <Image
                            style={styles.squareImage}
                            source={require('../assets//images/Book.png')}
                        />
                        <View
                            style={styles.priseView}>
                            <Text style={styles.priseTag}>
                                $ 50
                            </Text>
                            <Text style={styles.priseTag}>
                                <Icons
                                    name={'star'}
                                    size={15}
                                    color={'gold'}
                                />
                                6
                            </Text>
                        </View>
                        <Text style={styles.bookName}>Book Name</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.box}>
                    <TouchableOpacity onPress={() => navigation.navigate('BookDetail')}>
                        <Image
                            style={styles.squareImage}
                            source={require('../assets//images/Book.png')}
                        />
                        <View
                            style={styles.priseView}>
                            <Text style={styles.priseTag}>
                                $ 50
                            </Text>
                            <Text style={styles.priseTag}>
                                <Icons
                                    name={'star'}
                                    size={15}
                                    color={'gold'}
                                />
                                6
                            </Text>
                        </View>
                        <Text style={styles.bookName}>Book Name</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.box}>
                    <TouchableOpacity onPress={() => navigation.navigate('BookDetail')}>
                        <Image
                            style={styles.squareImage}
                            source={require('../assets//images/Book.png')}
                        />
                        <View
                            style={styles.priseView}>
                            <Text style={styles.priseTag}>
                                $ 50
                            </Text>
                            <Text style={styles.priseTag}>
                                <Icons
                                    name={'star'}
                                    size={15}
                                    color={'gold'}
                                />
                                6
                            </Text>
                        </View>
                        <Text style={styles.bookName}>Book Name</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 10
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
    priseView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -30,
        padding: 5,
    },
    priseTag: {
        color: '#ffffff',
        fontSize: 14
    },
    bookName: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 16,
        fontWeight: '600',
        color: '#111'
    }
});

export default ByAuthor;
