import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import Api from './Api';
import { API_URL } from './Api_url';

class FirebaseClass {



  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
      return true
    }
    else {
      return false
    }
  }

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // console.log(fcmToken)
      return fcmToken;
    } else {
      console.log("Nulll      ")
      return null;
    }
  }



  messageListener = async (navigation) => {


    messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
      alert('A new FCM message arrived!');
      this.handleScreen(navigation, remoteMessage)

    });

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );

        this.handleScreen(navigation, remoteMessage)
      }

    });

  }

  handleScreen = (navigation, remoteMessage) => {

    const remp = remoteMessage.data
    console.log(remoteMessage.data)
    if (remp.screen === "Specific_Vendor") {
      this.getVendorByIdFunc(navigation, remp.vendor_id)
    }
  }


  getVendorByIdFunc = async (navigation, id) => {
    const responsedata = await Api.getDataUsingGet(API_URL.getVendorById + id);
    //  console.log(responsedata)
    if (responsedata.log && responsedata.response.data !== null) {
      navigation.navigate("Home", { screen: "Specific", params: { 'shop': responsedata.response.data } });
    }
  }















}
const Firebase = new FirebaseClass();

export default Firebase;