import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, BackHandler, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { styles } from '../css/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import Config from '../Utils/Config';
import Api from '../Utils/Api';
import { API_URL } from '../Utils/Api_url';


const userList = [{
    id: 'er123',
    username: 'ChatRoom',

}]
let NAVIGATION = {}

import { useNavigation } from '@react-navigation/native';

const ItemContact = ({ user, navigation }) => (
    <View style={{ alignItems: 'center' }} >
        <TouchableOpacity style={styles.userView} onPress={() => navigation.navigate('Chat', { 'user': user })}>
            <Image source={{ uri: 'https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg' }} style={{ height: 40, width: 40, borderRadius: 20 }} />
            <View style={{ paddingLeft: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.username}</Text>
                {/* <Text style={{ fontSize: 15, }}></Text> */}
            </View>

        </TouchableOpacity>
        <View style={styles.userViewBorder} />
    </View>

);

class Tab1Screen extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            userList: [],
            isData: true,
        }

    }



    componentDidMount() {
        NAVIGATION = this.props.navigation
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // this._unsubscribe = this.props.navigation.addListener('focus', () => {
        //     this.getAllUser()
        // });
        // this.getAllUser()
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    handleBackButton() {
        if (NAVIGATION.isFocused()) {
            BackHandler.exitApp()

        }
    }




    // getAllUser = async () => {


    //     this.setState({ userList: [], isData: false })
    //     const responsedata = await Api.getDataUsingGet(API_URL.getUserList);
    //     //console.log(responsedata)
    //     if (responsedata.log) {
    //         if (responsedata.response.status && responsedata.response.error == null) {
    //             // this.setState({ userList: responsedata.response.data, itemList: responsedata.response.data, isData: true })
    //             this.setState({ isData: true })
    //         }

    //     }
    // }






    render() {
        const { isData } = this.state
        const { navigation } = this.props


        const renderItem = ({ item }) => (
            <ItemContact user={item} navigation={navigation} />

        );
        return (
            <View style={[styles.MainContainer, { paddingVertical: 10 }]}>
                {isData ?
                    <>
                        {userList.length > 0 ?
                            <FlatList data={userList} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
                            :
                            <Text>No user avilable !!</Text>
                        }
                    </>
                    :
                    <ActivityIndicator size="large" color={Config.colorSet.themColor} />
                }
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


export default connect(null, mapDispatchToProps)(Tab1Screen);



