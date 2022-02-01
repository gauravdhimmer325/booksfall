import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Text, TextInput, Modal, Image, SafeAreaView, FlatList, LogBox } from 'react-native';
import { width } from '../utility/Dimentions';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Base_URL } from '../store/Base_URL';
import { useSelector } from 'react-redux';
import Colors from '../css/helpers/Colors';
import ImagePickerCmp from '../components/ImagePicker';
import axios from 'axios';

const AddBooks = ({ navigation }) => {
    const api_token = useSelector(state => state.userReducer.Token)

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [selectedId, setSelectedId] = useState();

    //add by priyanka
    const [imagePkShow, setimagePkShow] = useState(false);
    const [image, setImage] = useState();

    const initstate = {
        book_name: '',
        price: '',
        description: '',
        sale_type: '',
        author: '',
        isbn: '',
        category_id: 'Select Category',
        book_id: '',
        // files1: '',
        // files2: ''
    }

    const [state, setState] = useState(initstate);
    const [imageinfo, setimageinfo] = useState()
    const { book_name, price, description, sale_type, author, isbn, category_id, book_id, files1, files2 } = state;
    const updateState = data => setState(() => ({ ...state, ...data }));
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
    var arrval = []


    const onButtonAdd = async () => {

        // const image_name = image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf('.'))
        // console.log("image",image_name)
        try {
            let formData = new FormData();
            // let i = {
            //     uri: imageinfo.path,
            //     type: 'multipart/form-data',
            //     name: `image.jpg`,

            // };

            arrval.push({ "image_id": "27", "name": "image", "is_del": "1" })
            arrval.push({ "image_id": "0", "name": "image", "is_del": "0" })


            formData.append('book_name', book_name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('sale_type', '1');
            formData.append('author', author);
            formData.append('isbn', isbn);
            formData.append('category_id', selectedId);
            formData.append('book_id', 0);
            //       formData.append("image",i);
            //        for (let i = 0; i < arrval.length; i++) {
            //         formData.append('files', arrval[i])
            //   }


            console.log("formdata", formData)
            const result = await axios.post(
                `${Base_URL}addBook`, formData, {
                headers: {
                    'X-localization': 'en',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: api_token,
                }
            }
            );
            if (result.data.flag === 1) {
                alert(result.data.message)
                setState(initstate)
                setImage('')
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

    }, []);

    return (
        <ScrollView style={styles.mainContainer}>
            {imagePkShow === true ? (<ImagePickerCmp image={image} setImage={setImage} setimageinfo={setimageinfo} />) : null}
            <TouchableOpacity style={styles.imageTouch} onPress={() => {
                setimagePkShow(!imagePkShow) }} >
                {(imagePkShow === true &&image!==null) ?
                    (<Image source={{ uri: image }} style={styles._profile} resizeMode='cover' />)
                    : (
                        <>
                            <Icons name='image' size={50} color={Colors.placeholderClr} />
                            <Text style={styles.uploadimg}>Image upload</Text>
                        </>
                    )
                }

            </TouchableOpacity>
            <View
                nestedScrollEnabled={true}
                style={styles.bottomView}>
                <TextInput placeholder='Book name'
                    placeholderTextColor={Colors.placeholderClr}
                    onChangeText={book_name => updateState({ book_name })}
                    style={styles.inputText}
                    value={state.book_name}
                />
                <View
                    style={styles.dropView}>
                    <TouchableOpacity
                        onPress={() => setOpen(!open)}
                        style={styles.dropTouch} >
                        <Text style={styles.sltCtg}>{state.category_id}</Text>
                        <Icons style={{ paddingRight: 10 }} name='chevron-down' />
                    </TouchableOpacity>
                    {open == true ?
                        data.map((item, key) => {
                            const backgroundColor = item.id === selectedId ? "#fae8fc" : "#eac0f1";
                            return (
                                <TouchableOpacity key={item.id} onPress={() => onselectItem(item.id) & setOpen(!open)}
                                    style={{
                                        backgroundColor: backgroundColor,
                                        padding: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#999'
                                    }}>
                                    <Text>{item.category}</Text>
                                </TouchableOpacity>)
                        })
                        : null}
                </View>
                <TextInput
                    placeholder='Authore name'
                    placeholderTextColor={Colors.placeholderClr}
                    onChangeText={author => updateState({ author })}
                    style={styles.inputText}
                    value={state.author}
                />
                <TextInput placeholder='ISBN'
                    placeholderTextColor={Colors.placeholderClr}
                    onChangeText={isbn => updateState({ isbn })}
                    style={styles.inputText}
                    value={state.isbn}
                    keyboardType='numeric'
                />
                <TextInput
                    placeholderTextColor={Colors.placeholderClr}
                    onChangeText={price => updateState({ price })}
                    placeholder='Price'
                    value={state.price}
                    keyboardType='numeric'
                    style={styles.inputText} />
                <Text style={styles.introduction}>Introduction</Text>
                <TextInput
                    multiline={true}
                    onChangeText={description => updateState({ description })}
                    numberOfLines={5}
                    placeholder={'Enter Here'}
                    placeholderTextColor={Colors.placeholderClr}
                    style={styles.inputTextReview}
                    value={state.description}
                />
                <TouchableOpacity
                    onPress={() => onButtonAdd()}
                    style={styles.buttonTouch}>
                    <Text style={styles.buttonText}>
                        Add Book
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#eac0f1',
    },
    inputTextReview: {
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
        color: Colors.black
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
    imageTouch: {
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
    bottomView: {
        alignSelf: 'center',
        marginTop: width * 0.05,
        backgroundColor: '#fff',
        borderRadius: 15,
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
    inputText: {
        alignSelf: 'center',
        borderBottomWidth: 1.2,
        borderBottomColor: '#999',
        width: '90%',
        color: Colors.black
    },
    introduction: {
        alignSelf: 'flex-start',
        marginTop: width * 0.03,
        marginLeft: width * 0.05
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
    sltCtg: {
        color: Colors.placeholderClr
    },
    uploadimg: {
        color: Colors.placeholderClr
    },
    _profile: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderWidth: 1
    }
});

export default AddBooks;
