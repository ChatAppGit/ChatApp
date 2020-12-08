import React, { useEffect } from 'react';


import { View, Text, Image, Animated, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { styles } from '../css/styles';

// import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Config from '../Utils/Config';
import Api from '../Utils/Api';
import { API_URL } from '../Utils/Api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

class Tab2Screen extends React.Component {





    logOut = async () => {
        try {
            await AsyncStorage.removeItem('chatApp_token')
            this.props.navigation.navigate('LoginStack')
        }
        catch (e) {
            console.log(e)
        }
    }



























    render() {
        const { user } = this.props
        console.log(this.props.user)
        return (
            <View style={styles.MainContainer}>
                <View style={{ flex: 1, width: Config.windowW, padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name:    {user[0] ? user[0].username : ''}</Text>

                </View>



                <TouchableOpacity style={styles.logOutView} onPress={() => this.logOut()}>
                    <Text style={styles.logOutText} >Log Out</Text>
                    <TouchableOpacity style={{ position: 'absolute', right: 10, }} onPress={() => this.logOut()} >
                        <MaterialCommunityIcons name="logout" size={Config.fontSet.iconSize} color={Config.colorSet.iconColor} />
                    </TouchableOpacity>
                </TouchableOpacity >

            </View >
        );


    }
};

const mapStateToProps = (state) => {
    return {

        user: state.UserInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch({
            type:
                'SET_USER', payload: user
        }),


    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tab2Screen);



