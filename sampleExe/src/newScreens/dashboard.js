import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    Text,
    View, Dimensions, Image,
    FlatList, TouchableOpacity
} from 'react-native';
import Modal from "react-native-modalbox";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";



const dashboard = (props) => {
    const [hotelData, setHotelData] = useState('')
    console.log('Flatdata', Flatdata);
    useEffect(() => {
        setHotelData(Flatdata)
    }, [])

    console.log('itemdata----aa gya>', props.route.params);
    const { width, height } = Dimensions.get('window');

  
    var modal1 = ''
    const renderModal = () => {
        return (
            <Modal
                style={{

                    height: width / 1.8,
                    borderTopRightRadius: 20, borderTopLeftRadius: 20,
                }}
                position={"bottom"}
                swipeArea={200}
                ref={(e) => { modal1 = e }}
                swipeToClose={true}>

                <View style={{ backgroundColor: "grey", padding: 3, borderRadius: 10, width: 80, alignSelf: "center", top: 5, marginTop: 5 }} />

                <View style={{ flexDirection: "row", margin: 10, alignItems: "center", margin: 10, justifyContent: "space-between", marginVertical: 20 }}>
                    <Text style={{
                        color: "black",
                        borderRadius: 5, fontSize: 20,
                        marginLeft: 10, fontFamily: "AvenirLTStd-Heavy"
                    }}>Options</Text>
                    <TouchableOpacity
                        onPress={() => {
                            modal1.close()
                        }}
                    >
                        <Entypo name='cross' size={25} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={{ width: width - 60, alignSelf: "center" }}>
             
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('operationScreen', {index:index, item:hotel})
                            modal1.close()
                        }}
                        style={{ flexDirection: "row", marginVertical: 10 }}>
                        <Feather name='edit' size={20} color={'black'} />
                        <Text style={{ marginLeft: 10,color:'black' }}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                       
                            modal1.close()
                            modal2.open()
                        }}
                        style={{ flexDirection: "row", marginVertical: 10 }}>
                        <AntDesign name='delete' size={20} color='black' />
                        <Text style={{ marginLeft: 10,color:'black' }}>Delete</Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        )
    }


    var modal2 = ''
    const renderVerifyModal = () => {
        return (
            <Modal
                style={{
                    height: width / 1.8,
                    borderTopRightRadius: 20, borderTopLeftRadius: 20,
                }}
                position={"bottom"}
                swipeArea={200}
                ref={(e) => { modal2= e }}
                swipeToClose={true}>

                <View style={{ backgroundColor: "grey", padding: 3, borderRadius: 10, width: 80, alignSelf: "center", top: 5, marginTop: 5 }} />

                <View style={{ flexDirection: "row", margin: 10, alignItems: "center", margin: 10, justifyContent: "space-between", marginVertical: 20 }}>
                    <Text style={{
                        color: "black",
                        borderRadius: 5, fontSize: 20,
                        marginLeft: 10, fontFamily: "AvenirLTStd-Heavy"
                    }}>Alert</Text>
                    <TouchableOpacity
                        onPress={() => {
                            modal2.close()
                        }}
                    >
                        <Entypo name='cross' size={25} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={{ width: width - 60, alignSelf: "center" }}>
                    <Text style={{fontSize:18, textAlign:"center", color:'black'}}>Are you sure you want to delete ?</Text>
                    <View style={{flexDirection:"row", justifyContent:"space-around", marginVertical:20}}>
                    <TouchableOpacity
                        onPress={() => {
                            modal2.close()
                        }}
                        style={{ backgroundColor:"#2cba13", width:100, alignItems:"center",justifyContent:"center" , borderRadius:10,height:40}}>
                        <Text style={{ marginLeft: 10,color:'white' }}>Cancel</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity
                        onPress={() => {
                            Flatdata.pop(index)
                            modal2.close()
                            setHotelData([...Flatdata])
                        }}
                        style={{ backgroundColor:"#ff3639", width:100, alignItems:"center",justifyContent:"center" , borderRadius:10,height:40}}>
                        <Text style={{ marginLeft: 10,color:'white' }}>Delete</Text>
                    </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )
    }

  
    const [index, setIndex] = useState('')
    const [hotel, setHotel] = useState('')

    return (

        <View style={{ backgroundColor: '#ffff', flex: 1 }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />

            <View style={{ height: 50 }} />
            <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>Hotels list</Text>
            <View style={{ width: width - 40, alignSelf: "center" }}>
                {Flatdata == '' ?
                    <View style={{ height: height / 1.2, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center" }}>No Data</Text>
                    </View>
                    :
                    <FlatList
                        style={{ height: height / 1.2 }}
                        data={hotelData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {

                            return (
                                <View>
                                  <View
                                        style={{ flexDirection: "row", marginVertical: 10, borderBottomWidth: 0.5, borderColor: '#b8b8b8' }}>
                                        <Image source={{ uri: item.image }} style={{ height: 80, width: 80, marginVertical: 5 }} />
                                        <View style={{ marginHorizontal: 10, width: width / 1.8,justifyContent:"center" }}>
                                            <Text style={{ fontSize: 16 }}>{item.name}</Text>
                                            <Text>{item.adress}</Text>
                                            <Text style={{ marginTop: 20 }}>Ratings: {item.rating}</Text>
                                        </View>
                                        <TouchableOpacity
                                        onPress={() => {
                                            modal1.open()
                                            console.log('item index', index);
                                            setIndex(index)
                                            setHotel(item)
                                        }}
                                        style={{alignSelf:"center"}}
                                        >
                                        <Entypo name='dots-three-vertical' size={20}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    />}
            </View>

            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('operationScreen',{item:''})
                }}
                style={{ height: 40, backgroundColor: "#0f64f7", borderRadius: 5, alignItems: "center", justifyContent: "center", width: width - 40, alignSelf: "center" }}>
                <Text style={{ color: 'white' }}>Add</Text>
            </TouchableOpacity>
            {renderModal()}
            {renderVerifyModal()}
        </View>
    );
};

export default dashboard;
