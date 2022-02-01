import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { width } from '../utility/Dimentions';
import { useSelector } from 'react-redux';
import { Base_URL } from '../store/Base_URL';
import Colors from '../css/helpers/Colors';

const WriteYourReview = ({ route, navigation }) => {
    const initialstate = {
        book_id: '',
        rating: '',
        title: '',
        review_desc: '',
    }
    console.log("write your Review")
    const api_token = useSelector(state => state.userReducer.Token)

    const [json, setJson] = useState([])
    const [rate, setRate] = useState(0)
    useEffect(() => {
        setJson(route.params.paramKey)
    }, []);
    var js = json.id
    const [state, setState] = useState(initialstate);

    const { book_id, rating, title, review_desc } = state;
    const updateState = data => setState(() => ({ ...state, ...data }));


    const onSubmmit = async () => {
        try {
            let formData = new FormData();
            formData.append('book_id', parseInt(js));
            formData.append('rating', parseInt(rate))
            formData.append('title', title)
            formData.append('review_desc', review_desc)
          const result = await fetch(
                Base_URL + 'writeReview',
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
                if (json.flag === 1) {
                    setState(initialstate)
                    setRate()
                    navigation.navigate('More')
                }
              alert(json.message);
            } else {
                console.log('Unable to fetch!');
            }

        } catch (error) {
            console.log(error);
        }

    };


    return (
        <ScrollView>
            <Image
                style={styles.bookImage}
                source={{
                    uri: json.image
                }}
            />
            <View style={styles.priseView}>
                <Text style={styles.priseTag}>{json.book_price}</Text>
            </View>
            <Text style={styles.bookName}>{json.book_name}</Text>
            <Text style={styles.reviewsText}>{json.rates} ({json.rate_count}) Reviews</Text>
            <Text style={styles.reviews}>
                <Icons name='star' solid={json.rates >= 1 ? true : false} size={15} color={'gold'} />{' '}
                <Icons name='star' solid={json.rates >= 2 ? true : false} size={15} color={'gold'} />{' '}
                <Icons name='star' solid={json.rates >= 3 ? true : false} size={15} color={'gold'} />{' '}
                <Icons name='star' solid={json.rates >= 4 ? true : false} size={15} color={'gold'} />{' '}
                <Icons name='star' solid={json.rates >= 5 ? true : false} size={15} color={'gold'} />{' '}
            </Text>


            <View style={styles.authorView}>
                <Image
                    style={styles.profilePic}
                    source={{
                        uri: json.owner_image
                    }}
                />
                <Text style={styles.authorName}>{json.author}</Text>
            </View>

            <Text style={{ ...styles.reviews, marginTop: width * 0.10 }}>
                <Icons onPress={() => setRate('1')} solid={rate >= 1 ? true : false} name='star' size={25} color={'gold'} />{' '}
                <Icons onPress={() => setRate('2')} solid={rate >= 2 ? true : false} name='star' size={25} color={'gold'} />{' '}
                <Icons onPress={() => setRate('3')} solid={rate >= 3 ? true : false} name='star' size={25} color={'gold'} />{' '}
                <Icons onPress={() => setRate('4')} solid={rate >= 4 ? true : false} name='star' size={25} color={'gold'} />{' '}
                <Icons onPress={() => setRate('5')} solid={rate >= 5 ? true : false} name='star' size={25} color={'gold'} />{' '}

            </Text>
            <TextInput
                placeholder={'Title'}
                placeholderTextColor={Colors.placeholderClr}
                onChangeText={title => updateState({ title })}
                style={styles.inputText}
                value={state.title}
            />
            <TextInput
                multiline={true}
                onChangeText={review_desc => updateState({ review_desc })}
                numberOfLines={5}
                placeholder={'Write your Review'}
                placeholderTextColor={Colors.placeholderClr}
                value={state.review_desc}
                style={styles.inputTextReview}
            />
            <TouchableOpacity onPress={() => onSubmmit()} style={styles.buttonTouch}>
                <Text style={styles.priseTag}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
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
    buttonTouch: {
        width: '80%',
        height: width * 0.12,
        backgroundColor: '#9c27b0',
        alignSelf: 'center',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.10,
        marginBottom: width * 0.20
    },
    inputText: {
        color: "#000",
        width: '90%',
        height: width * 0.13,
        paddingLeft: 20,
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
        elevation: 5
    },
    inputTextReview: {
        color: Colors.black,
        width: '90%',
        height: width * 0.40,
        paddingLeft: 20,
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
});

export default WriteYourReview;



// import React, { useEffect, useState } from 'react';
// import {
//     StyleSheet,
//     View,
//     Text,
//     Image,
//     ScrollView,
//     TouchableOpacity,
//     TextInput
// } from 'react-native';
// import Icons from 'react-native-vector-icons/FontAwesome5';
// import { width } from '../utility/Dimentions';
// import { useSelector } from 'react-redux';
// import { Base_URL } from '../store/Base_URL';


// const WriteYourReview = ({ route, navigation }) => {
//     const api_token = useSelector(state => state.userReducer.Token)

//     const [json, setJson] = useState([])
//     const [rate, setRate] = useState()
//     useEffect(() => {
//         setJson(route.params.paramKey)
//     }, []);
//     var js = json.id
//     const [state, setState] = useState({
//         book_id: '',
//         rating: '',
//         title: '',
//         review_desc: '',
//     });

//     const { book_id, rating, title, review_desc } = state;
//     const updateState = data => setState(() => ({ ...state, ...data }));


//     const onSubmmit = async () => {
//         try {
//             let formData = new FormData();
//             formData.append('book_id', parseInt(js));
//             formData.append('rating', parseInt(rate))
//             formData.append('title', title)
//             formData.append('review_desc', review_desc)

//             const result = await fetch(
//                 Base_URL + 'writeReview',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Accept': 'application/json',
//                         Authorization: api_token,
//                     },
//                     body: formData,
//                 },
//             );
//             const json = await result.json();
//             if (json) {
//                 alert(json.message);
//             } else {
//                 console.log('Unable to fetch!');
//             }

//         } catch (error) {
//             console.log(error);
//         }
//     };


//     return (
//         <ScrollView>
//             <Image
//                 style={styles.bookImage}
//                 source={{
//                     uri: json.image
//                 }}
//             />
//             <View style={styles.priseView}>
//                 <Text style={styles.priseTag}>{json.book_price}</Text>
//             </View>
//             <Text style={styles.bookName}>{json.book_name}</Text>
//             <Text style={styles.reviewsText}>{parseFloat(json.rates).toFixed(2)} ({json.rate_count}) Reviews</Text>
//             <Text style={styles.reviews}>
//                 <Icons name='star' solid={json.rates >= 1 ? true : false} size={15} color={'gold'} />{' '}
//                 <Icons name='star' solid={json.rates >= 2 ? true : false} size={15} color={'gold'} />{' '}
//                 <Icons name='star' solid={json.rates >= 3 ? true : false} size={15} color={'gold'} />{' '}
//                 <Icons name='star' solid={json.rates >= 4 ? true : false} size={15} color={'gold'} />{' '}
//                 <Icons name='star' solid={json.rates >= 5 ? true : false} size={15} color={'gold'} />{' '}
//             </Text>


//             <View style={styles.authorView}>
//                 <Image
//                     style={styles.profilePic}
//                     source={{
//                         uri: json.owner_image
//                     }}
//                 />
//                 <Text style={styles.authorName}>{json.author}</Text>
//             </View>

//             <Text style={{ ...styles.reviews, marginTop: width * 0.10 }}>
//                 <Icons onPress={() => setRate('1')} solid={rate >= 1 ? true : false} name='star' size={25} color={'gold'} />{' '}
//                 <Icons onPress={() => setRate('2')} solid={rate >= 2 ? true : false} name='star' size={25} color={'gold'} />{' '}
//                 <Icons onPress={() => setRate('3')} solid={rate >= 3 ? true : false} name='star' size={25} color={'gold'} />{' '}
//                 <Icons onPress={() => setRate('4')} solid={rate >= 4 ? true : false} name='star' size={25} color={'gold'} />{' '}
//                 <Icons onPress={() => setRate('5')} solid={rate >= 5 ? true : false} name='star' size={25} color={'gold'} />{' '}

//             </Text>
//             <TextInput
//                 placeholder={'Title'}
//                 onChangeText={title => updateState({ title })}
//                 style={styles.inputText}
//             />
//             <TextInput
//                 //maxLength={500}
//                 multiline={true}
//                 onChangeText={review_desc => updateState({ review_desc })}
//                 numberOfLines={5}
//                 placeholder={'Write your Review'}
//                 style={styles.inputTextReview}
//             />
//             <TouchableOpacity onPress={() => onSubmmit()} style={styles.buttonTouch}>
//                 <Text style={styles.priseTag}>Submit</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({

//     bookImage: {
//         alignSelf: 'center',
//         height: width * 0.70,
//         width: '50%',
//         borderRadius: 10,
//         marginTop: width * 0.05
//     },
//     priseView: {
//         height: width * 0.10,
//         width: width * 0.40,
//         backgroundColor: '#ab47bc',
//         alignSelf: 'center',
//         borderRadius: 50,
//         marginTop: width * -0.05,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     priseTag: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         color: '#fff'
//     },
//     bookName: {
//         alignSelf: 'center',
//         fontWeight: 'bold',
//         fontSize: 16,
//         marginTop: 10,
//         color: '#111'
//     },
//     reviewsText: {
//         padding: 5,
//         fontSize: 12,
//         color: '#666',
//         alignSelf: 'center',
//     },
//     reviews: {
//         alignSelf: 'center',
//         padding: 5
//     },
//     auction: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginHorizontal: width * 0.05,
//         marginTop: 5
//     },
//     authorView:
//     {
//         marginTop: 10,
//         height: width * 0.15,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         flexDirection: 'row',
//     },
//     profilePic: {
//         height: width * 0.12,
//         width: width * 0.12,
//         borderRadius: 50,
//         marginLeft: width * 0.07
//     },
//     authorName:
//     {
//         marginLeft: width * 0.02,
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#111'
//     },

//     buttonTouch: {
//         width: '80%',
//         height: width * 0.12,
//         backgroundColor: '#9c27b0',
//         alignSelf: 'center',
//         borderRadius: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: width * 0.10,
//         marginBottom: width * 0.20
//     },
//     buttonText: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         color: '#fff'
//     },
//     inputText: {
//         width: '90%',
//         height: width * 0.13,
//         paddingLeft: 20,
//         backgroundColor: '#fff',
//         alignSelf: 'center',
//         borderRadius: 10,
//         marginTop: 15,
//         shadowColor: '#790e8b',
//         shadowOffset: {
//             width: 0,
//             height: 0
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3,
//         elevation: 5
//     },
//     inputTextReview: {
//         width: '90%',
//         height: width * 0.40,
//         paddingLeft: 20,
//         backgroundColor: '#fff',
//         alignSelf: 'center',
//         borderRadius: 10,
//         marginTop: 15,
//         shadowColor: '#790e8b',
//         shadowOffset: {
//             width: 0,
//             height: 0
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3,
//         elevation: 5,
//         // alignContent: ''
//     },
// });

// export default WriteYourReview;
