import React, { useRef, useState } from "react";
import { View, Modal, TouchableOpacity, Text, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../css/helpers/Colors";
import { width } from '../utility/Dimentions';
const DropDownPicker = ({ data, selectedId, setSelectedId, open, setOpen }) => {
    console.log("dropdown", data)
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible(!modalVisible) }} >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { height: '90%' }]}>
                    <ScrollView style={{ minWidth: '100%', minHeight: '100%', borderWidth: 1, borderColor: Colors.black }} contentContainerStyle={{height:'100%'}}>
                        {data.map((item) => {
                            //  const backgroundColor = item.book_id === selectedId ? "#fae8fc" : "#eac0f1";
                            <View style={{width:30,height:50,borderWidth:1,borderColor:Colors.black}}>
                                <TouchableOpacity
                                    key={item.book_id} onPress={() => setSelectedId({ book_id: item.book_id, book_name: item.book_name }) & setOpen(!open)}
                                    style={{
                                        // backgroundColor: ,
                                        // padding: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#999',
                                        height: 30,
                                        borderWidth: 1,
                                        backgroundColor: Colors.black,
                                        width: '90%'
                                    }}>
                                    <Text style={{ color: Colors.black }}>{item.book_name}</Text>

                                </TouchableOpacity>
                            </View>
                        })}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default DropDownPicker;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "70%",
        height: 280,
        marginTop: 50,
    },
    button: {
        width: "80%",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",

    },
    previewImage: {
        width: "100%",
        height: "100%"
    },
    imageCircle: {
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.LIGHT_GRAY
    },
    buttonClose: {
        marginTop: 10,
        width: width * 0.80,
        height: width * 0.12,
        backgroundColor: '#9c27b0',
        alignSelf: 'center',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        margin: 10,
        width: '95%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});