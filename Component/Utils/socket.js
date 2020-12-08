
// import { w3cwebsocket as W3CWebSocket } from "websocket";
import io from 'socket.io-client'

export class SocketConnection {
  connect() {
    this.socket = io('https://test.easycaller.in');
    return this
  }

  sendMessage(reqData) {
    console.log("ssssccchchch")
    this.socket.emit('chat', reqData);
  }


  updateMessage(reqData) {
    console.log("update")
    this.socket.emit('chatUp', reqData);
  }



  subscribe(channel, handler) {

    this.socket.on('chat', msg => {
      console.log(msg)
      handler(msg)
    });
    this.socket.on('chatUp', msg => {
      console.log(msg)
      handler(msg)
    });

    this.socket.onerror = function (error) {
      console.log('Connection Error', error);
    };

    return this.socket
  }

}

export default new SocketConnection()
