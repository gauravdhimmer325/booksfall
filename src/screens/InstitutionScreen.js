import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    SafeAreaView
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { height, width } from '../utility/Dimentions';
import axios from 'axios';
import { Base_URL } from '../store/Base_URL';
import Colors from '../css/helpers/Colors';

const InstitutionScreen = ({ navigation }) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);

    // const getInstitution = async () => {
    //     if (pageno === 1) {
    //         console.log('pageno1', pageno)
    //         await axios({
    //             method: 'POST',
    //             url: Base_URL + 'OrganizationList',
    //         })
    //             .then((response) => {
    //                 setlastpage(response.data.data.last_page)
    //                 setData(response.data.data.data)
    //             })
    //             .catch(function (error) {
    //                 console.log(error)
    //             })
    //     }
    //     else {
    //         console.log('pageno2', pageno)
    //         if (pageno >= lastpage)
    //             setPageno(1)
    //         await axios({
    //             method: 'POST',
    //             url: Base_URL + `OrganizationList?page=${pageno}`,
    //         })
    //             .then((response) => {
    //                 setData(response.data.data.data)
    //             })
    //             .catch(function (error) {
    //                 console.log(error)
    //             })
    //     }
    // }
    useEffect(() => {
        // setPageno(1)
        getInstitution()
    }, [page]);

  const  getInstitution = async () => {
        try {
            const result = await fetch(
                Base_URL + `OrganizationList?page=${page}`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },

                },
            );
            const json = await result.json();
            setData([...data, ...json.data.data])
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        // setPageno(1)
        getInstitution()
    }, [page]);



    const loadMore = () => {
        setPage(page + 1);
    };
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate('InstitutionDetails', { paramKey: item })}
                style={[styles.itemContainer]}>
                <View style={{ width: '30%', alignItems: 'center' }}>
                    <View style={[styles.bookContainer]}>
                        <Image style={styles.bookImage} source={{ uri: item.image }} resizeMode='cover' />
                    </View>
                </View>
                <View style={{ width: '70%' }}>
                    <View style={[styles.textContainer]}>
                        <View style={{ height: '20%', justifyContent: 'center' }}>
                            <Text style={styles.institutionName}>{item.org_name}</Text>
                        </View>
                        <View style={{ height: '35%' }}>
                            <Text numberOfLines={3} style={styles.text}>{item.description}</Text>
                        </View>
                        <View style={{ height: '30%', flexDirection: 'row' }}>
                            <View style={{ width: '10%'}}>
                                <Icons name='map-marker-alt' size={15} color={'#ab47bc'} />
                            </View>
                            <View style={{ width: '80%' }}>
                                <Text numberOfLines={3} style={styles.text}>{item.address}</Text>
                            </View>
                        </View>
                        <View style={{ height: '15%', flexDirection: 'row',alignItems:'center'}}>

                            <View style={{ width: '10%' }}>
                                <Icons name='user' solid size={15} color={'#ab47bc'} />
                            </View>
                            <View style={{ width: '70%',height:'80%',justifyContent:'center' }}>
                                <Text numberOfLines={3} style={styles.text}> {item.contact_no}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            onEndReached={loadMore}
       onMomentumScrollEnd={loadMore} />
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    itemContainer: {
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: '95%',
        height: width * 0.47,
        marginTop: 20,
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
        height: '90%',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    bookImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10
    },
    textContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        flexGrow: 1,
        flexShrink: 1
    },
    institutionName: {
        fontWeight: '600',
        fontSize: 16,
        color: Colors.black
    },
    text: {
        color: '#666',
        // marginTop: 7,
        fontSize: 12
    }
});

export default InstitutionScreen;
