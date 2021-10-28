import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Dimensions, Image,
    FlatList, TextInput, TouchableOpacity,
} from 'react-native';
import Modal from "react-native-modalbox";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');
const operationScreen = (props) => {


    const mode = props.route.params
    console.log('mode ----->', mode);


    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [data, setData] = useState([])
    const [ratings, setRatings] = useState('')

    const [selectedFile, setSelectedFile] = useState('')


    useEffect(() => {
        if (mode.item != '') {
            setName(mode.item.name)
            setAddress(mode.item.adress)
            setRatings(mode.item.rating)
            setSelectedFile(mode.item.image)
        }
    }, [])
    const captureImage = () => {
        launchCamera(
            {
                quality: 0.8,
                mediaType: 'photo',
                includeBase64: false,
            },
            (response) => {

                if (!response.didCancel) {
                    console.log("image response----------------->", response);
                    setSelectedFile(response.assets[0].uri)
                }
            }
        )
    }

    const sopenGallaryy = () => {
        launchImageLibrary(
            {
                quality: 0.8,
                mediaType: 'photo',
                includeBase64: false,
            },
            (response) => {

                if (!response.didCancel) {
                    console.log("image response----------------->", response);
                    setSelectedFile(response.assets[0].uri)
                }
            }
        )
    }


    var modal1 = ''
    const renderModal = () => {
        return (
            <Modal
                style={{
                    height: width / 1.6,
                    borderTopRightRadius: 20, borderTopLeftRadius: 20,
                }}
                position={"bottom"}
                swipeArea={200}
                ref={(e) => { modal1 = e }}
                swipeToClose={true}>

                <View style={styles.modalGreyline} />

                <View style={styles.modalContents}>
                    <Text style={styles.modalTitle1}>Options</Text>
                    <TouchableOpacity
                        onPress={() => {
                            modal1.close()
                        }}
                    >
                        <Entypo name='cross' size={25} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalIconContainer}>

                    <TouchableOpacity
                        onPress={() => {
                            modal1.close()
                            setTimeout(() => {
                                captureImage()
                            }, 100);
                        }}
                        style={{ flexDirection: "row", marginVertical: 10 }}>
                        <Feather name='camera' size={80} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            modal1.close()
                            setTimeout(() => {
                                sopenGallaryy()
                            }, 500);
                        }}
                        style={{ flexDirection: "row", marginVertical: 10 }}>
                        <MaterialIcons name='photo-library' size={80} color='black' />

                    </TouchableOpacity>
                </View>

            </Modal>
        )
    }

    const onSubmit = () => {
        var itemdata = []
        if (name != '' && address != '' && ratings != '' && selectedFile != '') {
            itemdata = {
                'name': name,
                'adress': address,
                'rating': ratings,
                'image': selectedFile
            }


            setTimeout(() => {
                console.log('data---->', itemdata);
                if (mode.item != '') {
                    global.Flatdata.splice(mode.index, 1, itemdata);
                } else {
                    global.Flatdata.push(itemdata)
                }

                props.navigation.navigate('dashboard', { item: itemdata })

            }, 1000);


        } else {
            alert('Please fill all the fields');
        }

    }

    return (

        <View style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />

            <View style={{ height: 50 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: width - 40, borderColor: '#cfd0d1', alignSelf: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }}>
                    <MaterialIcons name='arrow-back' size={20} />
                </TouchableOpacity>
                <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>{mode.item != '' ? 'Update' : 'Add New'}</Text>
                <View />
            </View>
            <View style={{ width: width - 40, alignSelf: "center", marginTop: 40 }}>
                <View style={styles.textInputView}>
                    <Text style={{ fontSize: 18 }}>Name</Text>
                    <TextInput
                        value={name}
                        placeholder={'Enter name here'}
                        placeholderTextColor={'#cfd0d1'}
                        style={{ height: 50, color: 'black', fontSize: 16, marginBottom: 10 }}
                        onChangeText={(text) => {
                            setName(text);
                        }}
                    />
                </View>
                <View style={styles.textInputView}>
                    <Text style={{ fontSize: 18 }}>Adress</Text>
                    <TextInput
                        value={address}
                        placeholder={'Enter address here'}
                        placeholderTextColor={'#cfd0d1'}
                        style={{ height: 50, color: 'black', fontSize: 16 }}
                        onChangeText={(text) => {
                            setAddress(text);
                        }}
                    />
                </View>
                <View style={styles.textInputView}>
                    <Text style={{ fontSize: 18 }}>Rating</Text>
                    <TextInput
                        maxLength={2}
                        value={ratings}
                        keyboardType='numeric'
                        placeholder={'Give some rating here'}
                        placeholderTextColor={'#cfd0d1'}
                        style={{ height: 50, color: 'black', fontSize: 16, marginBottom: 10 }}
                        onChangeText={(text) => {
                            setRatings(text);
                        }}
                    />
                </View>

                <TouchableOpacity
                    style={styles.uploadBtn}
                    onPress={() => {
                        // captureImage()
                        modal1.open()
                    }}
                >
                    {selectedFile != '' && <Image source={{ uri: selectedFile }} style={{ height: 30, width: 30, margin: 10 }} />}
                    <Text>{selectedFile == '' ? 'Upload image' : '...' + selectedFile.slice(80)}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.submitBtn}>
                <TouchableOpacity
                    onPress={() => {
                        onSubmit()
                    }}
                    style={{ marginVertical: 20, height: 40, backgroundColor: "#0f64f7", borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>

            {renderModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff', flex: 1
    },
    modalGreyline: { backgroundColor: "grey", padding: 3, borderRadius: 10, width: 80, alignSelf: "center", top: 5, marginTop: 5 },
    modalContents: { flexDirection: "row", margin: 10, alignItems: "center", margin: 10, justifyContent: "space-between", marginVertical: 20 },
    modalTitle1: {
        color: "black",
        borderRadius: 5, fontSize: 20,
        marginLeft: 10,
    },
    modalIconContainer: { width: width - 60, alignSelf: "center", flexDirection: "row", justifyContent: "space-around" },
    uploadBtn :{ borderWidth: 1, height: 50, alignItems: "center", borderStyle: 'dashed', borderColor: '#cfd0d1', borderRadius: 5, justifyContent: "center", marginVertical: 10, flexDirection: "row" },
    submitBtn:{ flex: 1, justifyContent: "flex-end", width: width - 40, alignSelf: "center" },
    textInputView:{ borderBottomWidth: 0.5, marginVertical: 10, borderColor: '#cfd0d1' }



});

export default operationScreen;
