
import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import LoginStack from '../LoginStack'
import MainStack from '../MainStack'

// import Firebase from '../Utils/Firebase'
// import messaging from '@react-native-firebase/messaging';
export default function SplashScreen() {
    const Stack = createStackNavigator();



    React.useEffect(() => {
        console.log("Chat App")
        // console.log(navigation)
        // async function getFirebase(){
        //  await Firebase.requestUserPermission()
        //  const toekn= await Firebase.getFcmToken()
        //  //await Firebase.messageListener(navigation)
        // }
        // getFirebase();
    }, []);





    return (
        <NavigationContainer independent={true} >
            <Stack.Navigator headerMode="none" >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="LoginStack" component={LoginStack} />
                <Stack.Screen name="MainStack" component={MainStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

