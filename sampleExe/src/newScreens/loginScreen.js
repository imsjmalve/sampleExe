import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Dimensions, Image
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";

global.Flatdata = [];
const loginScreen = (props) => {

    const { width, height } = Dimensions.get('window');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const onpressLogin = () => {
        if (username.trim() != '' && password.trim() != '') {
            if (EMAIL_FORMAT.test(username)) {
                props.navigation.replace('dashboard')
            } else {
                alert('invalid email')
            }

        }else{
            alert('please fill all the fields')
        }
    }


    return (

        <View style={{ backgroundColor: '#ffff', flex: 1 }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <LinearGradient colors={['#0f64f7', '#639cff', '#0af3f7']} style={{ flex: 1, width: width, alignItems: "center", justifyContent: "center" }}>
                <View style={{ height: 10 }} />
                <Image source={require('../assets/icon2.png')} style={{ height: 100, width: 100 }} />
                <Text style={{ color: 'white', fontSize: 30, marginVertical: 10 }}>Exercise</Text>
                <View style={{ height: 50 }} />
                <View style={{ width: width - 80, marginVertical: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderColor: '#055df5' }}>
                        <Ionicons name='mail' size={20} color='white' />
                        <TextInput
                        maxLength={30}
                            keyboardType="email-address"
                            placeholder={'Enter your username here'}
                            placeholderTextColor={'rgba(255,255,255,0.5)'}
                            style={{ height: 50, color: 'white', marginLeft: 10, }}
                            onChangeText={(text) => {
                                setUsername(text);
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderColor: '#055df5', marginVertical: 10 }}>
                        <Fontisto name='locked' size={20} color='white' />
                        <TextInput
                        maxLength={30}
                            secureTextEntry={true}
                            placeholder={'Enter your password here'}
                            placeholderTextColor={'rgba(255,255,255,0.5)'}
                            style={{ height: 50, color: 'white', marginLeft: 10 }}
                            onChangeText={(text) => {
                                setPassword(text);
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            onpressLogin()
                        }}
                        activeOpacity={0.9} style={{ backgroundColor: "white", height: 40, alignItems: "center", justifyContent: "center", marginVertical: 40, borderRadius: 5 }} >
                        <Text style={{ color: '#0af3f7', fontWeight: "bold" }}>LOGIN</Text>
                    </TouchableOpacity>
                </View>

            </LinearGradient>

        </View>
    );
};

export default loginScreen;
