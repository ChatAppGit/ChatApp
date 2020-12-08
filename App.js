import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './Component/SplashStack'
import store from './store'
import { Provider } from 'react-redux'

export default function App() {
  console.log("hgghghhg")
  return (
    <Provider store={store}>
      <Splash />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
