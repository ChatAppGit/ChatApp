import React, { Component } from 'react'
import { View,ActivityIndicator,Modal,Text } from 'react-native';

const LoadingModal=(prop)=>
{
    
return(
        <Modal animationType="slide" transparent={true} visible={prop.props} >
        <View style={{flex:1,backgroundColor:'white', opacity: 0.5,justifyContent:'center'}}>
        <ActivityIndicator size="large" color="black" />
        </View>
        </Modal>
);

};



export default LoadingModal;