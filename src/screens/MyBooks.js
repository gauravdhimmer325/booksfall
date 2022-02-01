import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Text, TextInput, Modal, Image, SafeAreaView, FlatList } from 'react-native';
import { width, height } from '../utility/Dimentions';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Base_URL } from '../store/Base_URL';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Colors from '../css/helpers/Colors';
import Images from '../css/helpers/Images';
import AlertModel from '../components/AlertModel';
const MyBooks = ({ navigation, indexkey }) => {
    const [state, setState] = useState({
        bookId: '',
    });
    const [model, setmodel] = useState(false)
    const [confirm, setconfirm] = useState(false)
    const [bookid, setbookid] = useState()
    const [currentpage, setcurrentpage] = useState(1)
    const [totalpage, settotalpage] = useState()
    const updateState = data => setState(() => ({ ...state, ...data }));

    const api_token = useSelector(state => state.userReducer.Token)

    // console.log(api_token)

    const [data, setData] = useState([])
    const onselectItem = async (pgn) => {
        let formData = new FormData();
        //  formData.append('category_id', data.id);
        formData.append('category_id', 0)
        formData.append('is_best', 0)
        try {
            const result = await axios.post(
                `${Base_URL}mybookList?page=${pgn}`, { data: formData }, {
                headers: {
                    'X-localization': 'en',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    Authorization: api_token,
                }
            })

            setData(result.data.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    const bookList = async () => {
        let formData = new FormData();
        //  formData.append('category_id', data.id);
        formData.append('category_id', 0)
        formData.append('is_best', 0)
        console.log("formdata", formData)
        try {

            const result = await axios.post(
                `${Base_URL}mybookList`, formData,
                {

                    headers: {
                        'X-localization': 'en',
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: api_token,

                    }

                }
            )
            settotalpage(result.data.data.last_page)
            setData(result.data.data.data)
        }
        catch (error) {
            console.log("dd", error);
        }

    };

    const onDelete = async (item) => {
        console.log("item", item)
        setmodel(!model)
        setbookid(item)
        console.log("confirm", confirm)
        if (confirm === true) {
            console.log("conf", confirm)
            try {
                let formData = new FormData();
                formData.append('book_id', item);
                console.log(formData)
                const result = await fetch(
                    Base_URL + 'deleteMybook',
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            Authorization: api_token
                        },
                        body: formData
                    },
                );
                setmodel(false)
                setconfirm(false)
                const json = await result.json();
                console.log('JSODOS>>>>>>>>>>>', json)
                //  setData(json.data.data)
                if (json.flag === 1) {
                    bookList()

                } else {
                    console.log('Unable to fetch!');
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            setconfirm(!confirm)
        }
    };

    useEffect(() => {
        bookList();

    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: '95%' }}>
                {/* {data && */}
                <FlatList data={data}

                    style={{ flex: 1 }}
                    renderItem={({ item }) =>
                        <View key={item.id} style={styles.itemContainer} >
                            <View style={[styles.bookContainer]}>
                                {/* {item.image !==null? <Image style={styles.bookImage} source={{
                uri: item.image,
            }} /> */}
                                <Image source={Images.bookimg} style={{ height: '90%', width: '100%' }} />
                            </View>
                            <View style={[styles.textContainer]}>
                                <Text style={styles.bookName}>{item.book_name}</Text>
                                <Text style={styles.text}>{item.author}</Text>
                                <Text style={styles.text}>
                                    <Icons name='star' solid={item.rates >= 1 ? true : false} size={15} color={'gold'} />{' '}
                                    <Icons name='star' solid={item.rates >= 2 ? true : false} size={15} color={'gold'} />{' '}
                                    <Icons name='star' solid={item.rates >= 3 ? true : false} size={15} color={'gold'} />{' '}
                                    <Icons name='star' solid={item.rates >= 4 ? true : false} size={15} color={'gold'} />{' '}
                                    <Icons name='star' solid={item.rates >= 5 ? true : false} size={15} color={'gold'} />{' '}
                                    {item.rate_count} Reviews
                                </Text>
                                <Text style={styles.text}>{item.book_price}</Text>
                                <View style={{ flexDirection: 'row', position: 'absolute', right: 0, bottom: 0 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('EditBooks', { paramKey: item })}>
                                        <Text style={styles.textEdit}>Edit</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => bookList() & onDelete(item.id)} > */}
                                    <TouchableOpacity onPress={() => onDelete(item.id)} >
                                        <Text style={styles.textDelete}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <View style={{ height: width * 0.25 }}></View> */}
                        </View>

                    } />
            </View>
            <View style={{ height: '5%', width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
                <View style={{ width: '90%' }}>
                    <ScrollView horizontal={true} style={{ minWidth: '100%' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                        {Array.from(Array(totalpage), (e, i) => {
                            return (
                                <TouchableOpacity onPress={() => onselectItem(i + 1)} style={{ width: 30 }}>
                                    <Text style={{ color: Colors.black }}>{i + 1}</Text>
                                </TouchableOpacity>
                            )
                        })}

                    </ScrollView>
                </View>
            </View>
            {model === true ? <AlertModel model={model} setmodel={setmodel} confirm={confirm} setconfirm={setconfirm} onDelete={onDelete} bookid={bookid} /> : null}
        </View>

    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    inputText: {
        height: '6%',
        width: '85%',
        backgroundColor: '#fff',
        position: 'absolute',
        marginTop: 10,
        borderRadius: 7,
        padding: 10,
        paddingLeft: 40,
        marginHorizontal: 10,
        alignSelf: 'center'
    },
    mainView: {
        flex: 1,
    },
    itemContainer: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: '95%',
        height: width * 0.40,
        marginTop: width * 0.12,
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: '#111',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5
    },
    bookContainer: {
        height: width * 0.40,
        width: '35%',
        position: 'relative',
        // top: width * 0.05,
        borderRadius: 10,
        overflow: 'hidden'
    },
    bookImage: {
        resizeMode: 'stretch',
        height: '100%',
        width: '100%'
    },
    textContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        flexGrow: 1,
        flexShrink: 1
    },
    bookName: {
        fontWeight: '600',
        fontSize: 18,
        color: Colors.black
    },
    text: {
        color: '#666',
        marginTop: 3,
        fontSize: 14
    },
    textEdit: {
        color: 'green',
        marginTop: 5,
        fontSize: 14
    },
    textDelete: {
        marginLeft: 10,
        color: 'red',
        marginTop: 5,
        fontSize: 14
    }


});

export default MyBooks;
