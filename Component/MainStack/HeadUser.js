import React, { useEffect } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import Config from '../Utils/Config'





const HeadUser = ({ user }) => {

    return (
        <>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Config.colorSet.themColor} translucent={true} />
            <View style={{ flexDirection: 'row', backgroundColor: Config.colorSet.themColor, height: 80, alignItems: 'flex-end', paddingBottom: 10, paddingHorizontal: 10 }}>
                <Image source={{ uri: 'https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg' }} style={{ height: 30, width: 30, borderRadius: 20 }} />
                <Text style={{ fontSize: Config.fontSet.lSize, fontWeight: 'bold', paddingHorizontal: 20, color: 'white' }}>{user ? user.username : ''}</Text>
            </View>

        </>
    );



};

export default HeadUser;

