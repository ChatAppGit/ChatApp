
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';




export default function LoginStack() {
    const Stack = createStackNavigator();
    return (

        <Stack.Navigator headerMode="none" >

            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />


        </Stack.Navigator>

    );
}



