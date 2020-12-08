
//import all the components we are going to use. 

import AsyncStorage from '@react-native-async-storage/async-storage';

const URL = {

  // base_url: 'http://192.168.43.173:3333/api',
  base_url: 'https://test.easycaller.in/api',
}



class ApiUrl {


  async getDataUsingGet(subUrl) {
    let token = '';
    try {
      token = JSON.parse(await AsyncStorage.getItem('chatApp_token'))
    }
    catch (e) {
      console.log(e)
    }

    // console.log(token)
    try {
      const response = await fetch(URL.base_url + subUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },

      });
      const json = await response.json();
      return { 'log': true, 'response': json };
    }
    catch (e) {

      return { 'log': false, 'response': e };
    }

  }

  async getDataUsingPost(subUrl, params) {
    let token = '';
    try {
      token = JSON.parse(await AsyncStorage.getItem('chatApp_token'))

    }
    catch (e) {
    }
    // console.log(token)
    // console.log(params)
    try {
      const response = await fetch(URL.base_url + subUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(params)
      });
      const json = await response.json();
      return { 'log': true, 'response': json };
    }
    catch (e) {

      return { 'log': false, 'response': e };
    }

  }


  async postFile(subUrl, params) {
    console.log(params, subUrl)
    try {
      const response = await fetch(URL.base_url + subUrl, {
        method: 'POST',

        body: params,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',

        },
      });

      const json = await response.json();

      return { 'log': true, 'response': json };
    }
    catch (e) {
      console.log(e)

      return { 'log': false, 'response': e };
    }

  }

}
const Api = new ApiUrl();

export default Api;