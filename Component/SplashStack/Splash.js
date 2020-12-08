import React, { useEffect } from 'react';


import { View, ImageBackground, StyleSheet, Image, Animated, TouchableOpacity, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Config from '../Utils/Config';

import Api from '../Utils/Api';
import { API_URL } from '../Utils/Api_url';


// import Firebase from '../Utils/Firebase'

import { useNavigation } from '@react-navigation/native';

class Splash extends React.Component {










    getData = async () => {

        try {
            const value = JSON.parse(await AsyncStorage.getItem('chatApp_token'))
            console.log(value)
            if (value !== null) {
                const responsedata = await Api.getDataUsingGet(API_URL.me);
                console.log(responsedata)
                if (responsedata.log) {
                    if (responsedata.response.status && responsedata.response.error == null) {
                        this.props.addUser(responsedata.response.user)
                        this.props.navigation.navigate("MainStack")
                    }
                    else {
                        try {
                            await AsyncStorage.removeItem('chatApp_token')
                            this.props.navigation.navigate("LoginStack")
                        }
                        catch (e) { }
                    }
                }
            }
            else {
                this.props.navigation.navigate("LoginStack")
            }

        }
        catch (e) {
            this.props.navigation.navigate("LoginStack")
        }
    }






    componentDidMount() {

        const a = setTimeout(() => {
            this.getData()
            // this.notiFy();    

        }, 3000);





    }






















    render() {

        return (
            <View style={styles.MainContainer}>

                <MaterialCommunityIcons name="message-reply" size={45} color={Config.colorSet.themColor} />
            </View>
        );


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch({
            type:
                'SET_USER', payload: user
        }),
    }
}


export default connect(null, mapDispatchToProps)(Splash);




const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});