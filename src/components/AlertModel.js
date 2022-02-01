import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import Colors from "../css/helpers/Colors";
import { Base_URL } from '../store/Base_URL';
import { useSelector } from 'react-redux';
import axios from "axios";
const AlertModel = ({ model, setmodel,confirm,setconfirm,onDelete, bookid}) => {
 const [modalVisible, setModalVisible] = useState(model);
 
return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={model}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView,{backgroundColor:Colors.white}]}>

                    <View style={{ width: '50%', alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>setconfirm(true) & setmodel(false) &setModalVisible(false) & onDelete(bookid) } style={[styles.btn,{backgroundColor:model===true?Colors.primary:Colors.white}]}>
                                <Text style={[styles.btntext,{color:model===true?Colors.white:Colors.black}]}>{"Ok"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%',alignItems:'center' }}>
                        <TouchableOpacity onPress={()=>setModalVisible(!modalVisible) & setmodel(!model) &setconfirm(false)} style={styles.btn}>
                        <Text style={styles.btntext}>{"Cancel"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    btn:{
        width: '90%', 
        height: 30,
       borderRadius:23 ,
         justifyContent:'center',
         alignItems:'center',
    },
    btntext:{
color:Colors.black
    },
    modalView: {
        height: '10%',
        width: '80%',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF60"
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default AlertModel;