import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { width } from '../utility/Dimentions';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Base_URL } from '../store/Base_URL';
import Colors from '../css/helpers/Colors';
import axios from 'axios';

const More = ({ route, navigation }) => {
    
    const [json, setJson] = useState([])
    useEffect(() => {
        setJson(route.params.paramKey)
    }, []);

    const Tab = createMaterialTopTabNavigator();
    //Introduction tab
    const Introduction = () => {
     
        const book_id = json.id;
        const [description, setdescription] = useState();

        const onIntroduction = async () => {
            let formData = new FormData();
            formData.append('book_id', JSON.stringify(book_id));
            try {
                const response = await axios.post( `${Base_URL}bookDetails`, formData );
                setdescription(response.data.data.description);
            } catch (error) {
              console(error.message);
            }
        }
        useEffect(() => {
            onIntroduction();
        }, [])
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <Text style={{ marginHorizontal: 20, marginVertical: 20, color: Colors.black }}>
                    {description}
                </Text>
            </ScrollView>
        )
    }

    //Review tab

    const Reviews = () => {
        const [api, setApi] = useState([]);
        const [state, setState] = useState({
            book_id: json.id
        });
        const { book_id } = state;
        const updateState = data => setState(() => ({ ...state, ...data }));
        const onReview = async () => {
            try {
                let formData = new FormData();
                formData.append('book_id', JSON.stringify(book_id));
                  try {
                    const response = await axios.post(
                        `${Base_URL}reviewList`, formData
                    );
                    console.log("response", response.data.data.data)
                  // console.log("response", response.data.data.data)
                    setApi(response.data.data.data);
                } catch (error) {
                    // handle error
                    console.log(error.message);
                }
            } catch (error) {
                console.log(error);
            }
        };

        useEffect(() => {
            onReview()
        }, []);

        return (
            <>
                <ScrollView style={{ paddingHorizontal: 15, backgroundColor: '#fff' }}>
                    {api && api.map((item, key) => {
                        return (
                            <View key={item.id} style={{ backgroundColor: '#f2f2f2', marginTop: 15, borderRadius: 5, flexDirection: 'row', paddingVertical: 10 }}>
                                <Image
                                    style={styles.profilePic}
                                    source={require('../assets//images/User1.jpeg')}
                                />
                                <View style={{
                                    marginHorizontal: 10, flexGrow: 1,
                                    flexShrink: 1
                                }}>
                                    <Text style={styles.auctionText}>{item.name}</Text>
                                    <Text >
                                        <Icons name='star' solid={json.rates >= 1 ? true : false} size={15} color={'gold'} />{' '}
                                        <Icons name='star' solid={json.rates >= 2 ? true : false} size={15} color={'gold'} />{' '}
                                        <Icons name='star' solid={json.rates >= 3 ? true : false} size={15} color={'gold'} />{' '}
                                        <Icons name='star' solid={json.rates >= 4 ? true : false} size={15} color={'gold'} />{' '}
                                        <Icons name='star' solid={json.rates >= 5 ? true : false} size={15} color={'gold'} />{' '}
                                    </Text>
                                    <Text style={{
                                        color: '#111', paddingTop: 2, fontSize: 12,
                                    }}>{item.description}</Text>
                                </View>
                            </View>
                        )
                    })
                    }
                    <Text style={{ alignSelf: 'center', marginTop: width / 10 }}>{api.message}</Text>


                </ScrollView>
                <TouchableOpacity
                    onPress={() => navigation.navigate('WriteYourReview', { paramKey: json })}
                    style={styles.buttonTouch}>
                    <Text
                        style={styles.buttonText}>
                        Write Reviews
                    </Text>
                </TouchableOpacity>
            </>
        )
    }



    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#f4d1fa'
                },

            }}
        >
            <Tab.Screen
                name="Introduction"
                component={Introduction}
                options={{
                    title: 'Introduction'
                }} />
            <Tab.Screen
                name="Reviews"
                component={Reviews}
                options={{
                    title: 'Reviews'
                }} />

        </Tab.Navigator>
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
    auction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: width * 0.05,
        marginTop: 5
    },
    auctionText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#111'
    },
    auctionTime: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'green'
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
    buttonTouch: {
        width: '85%',
        height: width * 0.12,
        backgroundColor: '#9c27b0',
        alignSelf: 'center',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: width * 0.10
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
    },
});

export default More;
