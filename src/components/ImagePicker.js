
import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Modal,
    TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { width } from '../utility/Dimentions';
import Colors from '../css/helpers/Colors';
const ImagePickerCmp = (props) => {
    console.log("props", props.image)
    const [state, setState] = useState({ uploadImgUri: null })
    const [modalVisible, setModalVisible] = useState(true);

 const resetHandler = () => {
       props.setImage("")
       setModalVisible(!modalVisible)
    }

    const openImageHandler = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            // cropping: cropit,
            // cropperCircleOverlay: circular,
            sortOrder: 'none',
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
            cropperStatusBarColor: 'white',
            cropperToolbarColor: 'white',
            cropperActiveWidgetColor: 'white',
            cropperToolbarWidgetColor: '#3498DB',
        }).then(image => {
            props.setImage(image.path)
            props.setimageinfo(image)
        });
        setModalVisible(!modalVisible);
    }

    const openCameraHandler = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            props.setImage(image.path)
            props.setimageinfo(image)
        });
        setModalVisible(!modalVisible);
    }
 return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible)}} >
            <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                    <View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={ openImageHandler}
                                style={[styles.buttonClose]}
                            >
                                <Text style={styles.textStyle}>Choose from Library</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={openCameraHandler}
                                style={[styles.button, styles.buttonClose]}
                            >
                                <Text style={styles.textStyle}>Tack from Camera</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={resetHandler}
                                style={[styles.button, styles.buttonClose]}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                   
                </View>
            </View>
        </Modal>
    );
}

export default ImagePickerCmp;
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