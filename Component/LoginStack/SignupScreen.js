import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Image, Animated, TouchableOpacity, Text, Dimensions, TextInput, ScrollView, Modal } from 'react-native';
import { styles } from '../css/styles';
import Icon1 from 'react-native-vector-icons/FontAwesome5';


import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import LoadingModal from '../Utils/LoadingModal';
import Api from '../Utils/Api';
import Config from '../Utils/Config';
import { API_URL } from '../Utils/Api_url';
// import Firebase from '../Utils/Firebase'
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      seePass: true,
      checkemail: false,
      checkpass: false,

      emailMsg: 'Please enter valid email !!!',
      loadingModel: false,

    }

  }



  onSubmit = async () => {
    const { email, password, name } = this.state
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!reg.test(email)) {
      this.setState({ checkemail: true })
      return;
    }
    if (!password.match(passw)) {
      this.setState({ checkpass: true })
      return;
    }
    if (name.length == 0) {
      this.setState({ checkname: true })
      return;
    }

    let reqData = { "username": name, "email": email, "password": password, }
    this.setState({ loadingModel: true })
    let responsedata = await Api.getDataUsingPost(API_URL.registration, reqData);
    console.log(responsedata)
    if (responsedata.log && responsedata.response.status) {
      try {
        await AsyncStorage.setItem('chatApp_token', JSON.stringify(responsedata.response.token))
      }
      catch (e) {
        console.log(e)
      }
      this.userInfo()

    }
    else {
      alert("User name and email Alredy Exits")
      this.setState({ loadingModel: false })
    }



  }

















  userInfo = async () => {
    const responsedata = await Api.getDataUsingGet(API_URL.me);
    console.log(responsedata)
    if (responsedata.log) {
      if (responsedata.response.status && responsedata.response.error == null) {
        this.props.addUser(responsedata.response.user)
        this.setState({ loadingModel: false })
        this.props.navigation.navigate("MainStack")
      }
      else {
        this.setState({ loadingModel: false })
        try {
          await AsyncStorage.removeItem('chatApp_token')
          this.props.navigation.navigate("LoginStack")
        }
        catch (e) { }

      }

    }
  }



  render() {
    const { navigation } = this.props
    const { name, email, password, seePass, checkemail, checkpass, emailMsg, loadingModel } = this.state
    return (
      <>




        <View style={styles.MainContainer}>
          <Text style={styles.loginHead}>SIGN UP</Text>
          <TextInput placeholder=" Name  *" value={name} style={[styles.textField, { marginTop: 30 }]} onChangeText={text => this.setState({ name: text })} />



          <TextInput placeholder="Email id *" value={email} style={styles.textField} onChangeText={text => this.setState({ email: text, checkemail: false })} />
          {checkemail ?
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{emailMsg}</Text>
            </Animatable.View>
            : null
          }
          <View style={styles.textField}>
            <TextInput placeholder="Password *" value={password} style={{ width: '80%', height: 50 }} secureTextEntry={seePass} onChangeText={text => this.setState({ password: text })} />
            {seePass ?
              <FontAwesome5 name="eye-slash" color="black" size={15} style={styles.iconRight} onPress={() => this.setState({ seePass: false })} />
              : <FontAwesome5 name="eye" color="black" size={15} style={styles.iconRight} onPress={() => this.setState({ seePass: true })} />
            }
          </View>
          {checkpass ?
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={[styles.errorMsg, { textAlign: 'center' }]}>Password must be 8 digit long and contains one Capital ,one special character </Text>
            </Animatable.View>
            : null
          }


          <TouchableOpacity style={[styles.loinButton, { backgroundColor: Config.colorSet.themColor, }]} onPress={() => this.onSubmit()}>
            <Text style={{ fontWeight: 'bold' }}>SIGN UP</Text>
          </TouchableOpacity>






          <View style={styles.bottomView}>
            <TouchableOpacity style={[styles.loinButton, { flexDirection: 'row' }]} onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{ color: Config.colorSet.textColor }}> Already have an account?  </Text>
              <View>
                <Text style={{ color: Config.colorSet.textColor }}>Login</Text>
                <View style={{ backgroundColor: Config.colorSet.textColor, height: 2, borderRadius: 4 }} />
              </View>
            </TouchableOpacity>
          </View>


        </View>








        <LoadingModal props={loadingModel} />






      </>
    );


  }
};









const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch({
      type:
        'SET_USER', payload: user
    })
  }
}

export default connect(null, mapDispatchToProps)(SignUpScreen);


