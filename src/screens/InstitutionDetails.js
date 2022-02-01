import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { height, width } from '../utility/Dimentions';
import { useSelector } from 'react-redux';
import { Base_URL } from '../store/Base_URL';
import Colors from '../css/helpers/Colors';
import DropDownPicker from '../components/DropDownPicker';
const InstitutionDetails = ({ route, navigation }) => {
    const api_token = useSelector(state => state.userReducer.Token)
    const initialValue={book_id: 0, book_name: "Select Category"  }
    const [json, setJson] = useState()
    const [data, setData] = useState([])
    const [selectedId, setSelectedId] = useState(initialValue);
    const [open, setOpen] = useState(false);

    const myDonateBook = async () => {
        try {
            const result = await fetch(
                Base_URL + 'myDonateBook',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        Authorization: api_token,
                    },
                },
            );
            const json = await result.json();
         console.log(json.data)
            setData(json.data);
        } catch (error) {
            console.log(error);
        }
    };

    const donateBook = async () => {
        var org_id = json.id
        try {
            let formData = new FormData();
            formData.append('book_id', selectedId.book_id);
            formData.append('org_id', org_id);
            console.log("formdata", formData)
            const result = await fetch(
                Base_URL + 'donateBook',
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
       
            if (json) {
                alert(json.message);
                if(json.flag===1)
                {
                 setSelectedId(initialValue)
                }
            } else {
                console.log('Unable to fetch!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        myDonateBook();
        setJson(route.params.paramKey)
    }, []);
  
    return (
        <>
            <View style={styles.mainContainer}>
                <Image style={styles.ractangleImage} source={{ uri: json && json.image }} />
                <Text style={styles.bookName}>{json && json.org_name}</Text>
                <Text style={styles.reviewsText}>
                    <Icons name='map-marker-alt' color={'#790e8b'} />  {json && json.address}</Text>
                <Text style={styles.reviewsText}>
                    <Icons name='user' solid color={'#790e8b'} />  {json && json.contact_no}</Text>
                <View style={styles.descriptionView}>
                    <Text style={styles.description}>{json && json.description}
                    </Text>
                    <View style={styles.dropView}>
                        <TouchableOpacity
                            onPress={() => setOpen(!open)}
                            style={styles.dropTouch} >
                            <Text style={{ color: Colors.black }}>{selectedId.book_name}</Text>
                            <Icons style={{ paddingRight: 10 }} name='chevron-down' />
                        </TouchableOpacity>
                        {open===true?
                        (<View style={{ height: height * 0.3, width: '90%' }}>
                            <ScrollView style={{minHeight:'100%',minWidth:'100%'}}>
                               {data && data.map((item, key) => {
                                        const backgroundColor = item.book_id === selectedId ? "#fae8fc" : "#eac0f1";
                                        return (
                                            <TouchableOpacity
                                                key={item.book_id} onPress={() => setSelectedId({ book_id: item.book_id, book_name: item.book_name }) & setOpen(!open)}
                                                style={{
                                                    backgroundColor: backgroundColor,
                                                    padding: 10,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: '#999'
                                                }}>
                                                <Text>{item.book_name}</Text>
                                            </TouchableOpacity>)
                                    })
                                }
                            </ScrollView>
                        </View> ):null}
                    </View>
                </View>

            </View>
            <TouchableOpacity onPress={() => donateBook()} style={styles.buttonTouch}>
                <Text style={styles.priseTag}>Donate Book</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    ractangleImage: {
        height: width * 0.40,
        width: '100%',
        borderRadius: 10,
        resizeMode: 'stretch',
        marginTop: 15
    },
    priseTag: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
    },
    bookName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        color: '#111'
    },
    reviewsText: {
        padding: 5,
        fontSize: 12,
        color: '#666',
    },
    reviews: {
        alignSelf: 'center',
        padding: 5
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
    description: {
        color: '#111',
        paddingTop: 2,
        fontSize: 12
    },
    descriptionView: {
        marginHorizontal: 10,
        marginTop: 20,
        flexGrow: 1,
        flexShrink: 1
    },
    dropView: {
        width: '100%',
        // height:30,
        marginTop: width * 0.05,
        alignSelf: 'center'
    },
    dropTouch: {
        padding: 5,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'space-between',
        width: '100%',
        height: width * 0.12,
        borderWidth: 1.2,
        borderColor: '#999',
        flexDirection: 'row'
    }
});

export default InstitutionDetails;
