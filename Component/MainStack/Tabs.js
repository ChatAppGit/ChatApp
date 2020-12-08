import React, { Component } from 'react'

import { View, Image, Text } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

import Head from './Head';
import Tab1 from './Tab1Screen';
import Tab2 from './Tab2Screen';
import Chat from './ChatScreen';





const createContactStack = ({ navigation }) =>

    <Stack.Navigator headerMode="none" >
        <Stack.Screen name="Tab1" component={Tab1} />

    </Stack.Navigator>

const creatProfileStack = ({ navigation }) =>

    <Stack.Navigator headerMode="none" >
        <Stack.Screen name="Tab2" component={Tab2} />

    </Stack.Navigator>



const Tabs = () => (
    <>
        <Head />
        <Tab.Navigator>

            <Tab.Screen name="Chat room" component={createContactStack} />
            <Tab.Screen name="Profile" component={creatProfileStack} />
        </Tab.Navigator>
    </>
)




export default Tabs;