import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Text, TextInput, SafeAreaView, } from 'react-native';
import { height, width } from '../utility/Dimentions';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Base_URL } from '../store/Base_URL';
import { useSelector } from 'react-redux';
import Colors from '../css/helpers/Colors';
import axios from 'axios';

const EditBooks = ({ navigation,route }) => {
    // console.log("book id",route.params.paramKey)
  const routedata=  route.params.paramKey
    const initstate = {
        book_name: '',
        price: '',
        description: '',
        sale_type: '',
        author: '',
        isbn: '',
        category_id: 'Select Category',
        book_id: '',
        files1: '',
        files2: ''
    }
    const api_token = useSelector(state => state.userReducer.Token)

    const [json, setJson] = useState()
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [state, setState] = useState(initstate);
    const [flag, setflag] = useState(0)

    const getCategory = async () => {
        try {
            const result = await fetch(
                Base_URL + 'categoryList',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                    },
                },
            );
            const json = await result.json();
            setData(json.data);
        } catch (error) {
            console.log(error);
        }
    };


    const { book_name, price, description, sale_type, author, isbn, category_id, book_id, files1, files2 } = state;
    const updateState = data => setState(() => ({ ...state, ...data }));
    const onButtonAdd = async () => {
     
        // console.log("61_+++++++++++++++++", bookId)
        try {
            let formData = new FormData();
            formData.append('book_name', book_name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('sale_type', '1');
            formData.append('author', author);
            formData.append('isbn', isbn);
            formData.append('category_id', selectedId);
            formData.append('book_id', routedata.id);
            // formData.append('files1', files1);
            // formData.append('files2', files2);
            console.log("form", formData)
            const result = await axios.post(
                `${Base_URL}addBook`, formData, {
                headers: {
                    'X-localization': 'en', 
                    'Content-Type': 'application/x-www-form-urlencoded', 
                   Authorization: api_token,
                }
            }
            );
            console.log(result.data)
            if(result.data.flag===1)
            {
                alert(result.data.message);
              navigation.navigate('MyBooks')
                setflag(result.data.flag)
            }
            else{
                console.log('Unable to fetch!');   
            }
                  } catch (error) {
            console.log(error);
        }
    };
    const onselectItem = (id) => {
        setSelectedId(id)
        updateState({ category_id: data[id]?.category })
    }

    useEffect(() => {
        getCategory();
        if (flag === 0) {
        setState(routedata)
        }
        else {
          setState(initstate)
        }
   
    }, []);


    return (
        <SafeAreaView style={styles.mainContainer}>
            <TouchableOpacity style={styles.imgView}>
                <Icons name='image' size={50} />
                <Text>Image upload</Text>
            </TouchableOpacity>

            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{
                    alignSelf: 'center', marginTop: width * 0.05, backgroundColor: '#fff', borderRadius: 15, height: width * 1.3, width: width * 0.95, shadowColor: '#790e8b',

                    shadowOffset: {
                        width: 0,
                        height: 0
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                    elevation: 5,
                }}>

                <TextInput placeholder={state.book_name}
                    defaultValue={state.book_name}
                    onChangeText={book_name => updateState({ book_name })}
                    placeholderTextColor={Colors.black}
                    value={state.book_name}

                    style={{

                        alignSelf: 'center',
                        marginTop: 20,
                        borderBottomWidth: 1.2,
                        borderBottomColor: '#999',
                        width: '90%',
                        height: width * 0.13,
                        color: Colors.black,

                    }} />

                <View
                    style={{
                        width: '90%',
                        // marginTop: width * 0.05,
                        alignSelf: 'center'
                    }}>
                    <TouchableOpacity
                        onPress={() => setOpen(!open)}
                        style={{
                            justifyContent: 'space-between', width: '100%', height: width * 0.10, borderBottomWidth: 1.2, borderBottomColor: '#999', flexDirection: 'row'
                        }} >
                        <Text style={{ color: Colors.black }}>{state.category_id}</Text>
                        <Icons style={{ paddingRight: 10 }} name='chevron-down' />
                    </TouchableOpacity>
                    {open == true ?
                        data.map((item, key) => {
                            const backgroundColor = item.id === selectedId ? "#fae8fc" : "#eac0f1";
                            return (
                                <TouchableOpacity key={item.id} onPress={() => onselectItem(item.id) & setOpen(!open)}
                                    style={{ backgroundColor: backgroundColor, padding: 10, borderBottomWidth: 1, borderBottomColor: '#999' }}>
                                    <Text>{item.category}</Text>
                                </TouchableOpacity>)
                        })
                        : null}

                </View>
                <TextInput
                    placeholderTextColor={Colors.placeholderClr}
                    placeholder={state.author}
                    defaultValue={state.author}
                    value={state.author}
                    onChangeText={author => updateState({ author })}
                    style={{ color: Colors.black, alignSelf: 'center', borderBottomWidth: 1.2, borderBottomColor: '#999', width: '90%', height: width * 0.10 }}
                />
                <TextInput
                    placeholder={state.isbn}
                    defaultValue={state.isbn}
                    value={state.isbn}
                    placeholderTextColor={Colors.placeholderClr}
                    onChangeText={isbn => updateState({ isbn })}
                    style={{ color: Colors.black, borderBottomWidth: 1.2, borderBottomColor: '#999', width: '90%', alignSelf: 'center', height: width * 0.10 }} />
                <TextInput
                    defaultValue={state.price}
                    value={state.price}
                    placeholder={state.price}
                    placeholderTextColor={Colors.placeholderClr}
                    onChangeText={price => updateState({ price })}
                    placeholder='Price' style={{
                        borderBottomWidth: 1.2, borderBottomColor: '#999',
                        alignSelf: 'center', width: '90%', height: width * 0.10, color: Colors.black
                    }} />
                <Text style={{ marginTop: height * 0.02, alignSelf: 'flex-start', marginLeft: width * 0.05, color: Colors.black }}>Introduction</Text>
                <TextInput
                    multiline={true}

                    defaultValue={state.description}
                    onChangeText={description => updateState({ description })}
                    numberOfLines={5}
                    placeholderTextColor={Colors.placeholderClr}
                    placeholder={state.description}
                    style={styles.inputTextReview}
                    value={state.description}
                />
                <TouchableOpacity
                    onPress={() => onButtonAdd()}
                    style={styles.buttonTouch}>
                    <Text style={styles.buttonText}>
                        Edit Book
                    </Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#eac0f1',
    },
    imgView: {
        alignSelf: 'center',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.05,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 15,
        height: width / 2.3,
        width: width / 2.7
    },
    scrollView: {
        alignSelf: 'center',
        marginTop: width * 0.05,
        paddingTop: 10,
        backgroundColor: '#fff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: width * 1.3,
        width: width * 0.95,
        shadowColor: '#790e8b',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    inputTextReview: {
        color: Colors.black,
        width: '90%',
        height: width * 0.40,
        paddingLeft: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 15,
        shadowColor: '#790e8b',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    textInput: {
        alignSelf: 'center',
        borderBottomWidth: 1.2,
        borderBottomColor: '#999',
        width: '90%',
    },
    buttonTouch: {
        width: '90%',
        height: width * 0.13,
        backgroundColor: '#9c27b0',
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: '10%'
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 14,
        color: '#fff'
    },
    dropView: {
        width: '90%',
        marginTop: width * 0.05,
        alignSelf: 'center'
    },
    dropTouch: {
        justifyContent: 'space-between',
        width: '100%',
        height: width * 0.10,
        borderBottomWidth: 1.2,
        borderBottomColor: '#999',
        flexDirection: 'row'
    },
    textIntro: {
        alignSelf: 'flex-start',
        marginTop: width * 0.03,
        marginLeft: width * 0.05
    }
});

export default EditBooks;
