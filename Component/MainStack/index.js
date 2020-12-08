
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './Tabs';
import Chat from './ChatScreen';




export default function index() {
    const Stack = createStackNavigator();
    return (

        <Stack.Navigator headerMode="none" >

            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Chat" component={Chat} />


        </Stack.Navigator>

    );
}



