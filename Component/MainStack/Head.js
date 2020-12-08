import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Config from '../Utils/Config'





const Head = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Config.colorSet.themColor} translucent={true} />
            <View style={{ flexDirection: 'row', backgroundColor: Config.colorSet.themColor, height: 80, alignItems: 'flex-end', paddingBottom: 20 }}>
                <Text style={{ fontSize: Config.fontSet.lSize, fontWeight: 'bold', paddingHorizontal: 20, color: 'white' }}>Meso</Text>
            </View>

        </>
    );



};

export default Head;


