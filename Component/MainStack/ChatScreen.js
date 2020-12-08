import React, { useEffect } from 'react';
import { View, FlatList, ImageBackground, Text, TextInput, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { styles } from '../css/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Config from '../Utils/Config';
import Api from '../Utils/Api';
import { API_URL, PHOTO } from '../Utils/Api_url';
import connection from '../Utils/socket';
import HeadUser from './HeadUser';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants'
import LoadingModal from '../Utils/LoadingModal';
import * as FileSystem from 'expo-file-system';
let subscription;







const ItemIn = ({ mess }) => (

    <View style={styles.itemIn}>
        <View style={styles.inView}>
            <Text style={{ fontSize: 10, color: '#0000ff' }}>{mess.name}</Text>
            {mess.file_type === "image" ?
                <ImageBackground source={{ uri: PHOTO.url + mess.file_url }} style={{ height: 100, width: 150, borderRadius: 5 }}>
                </ImageBackground>
                : null
            }

            {mess.file_type === "pdf" ?
                <MaterialCommunityIcons name="file-pdf" color={'black'} size={50} style={{ alignSelf: 'center' }} />
                : null

            }
            {mess.file_type === "xlsx" || mess.file_type === "xls" ?
                <MaterialCommunityIcons name="microsoft-excel" color={'black'} size={50} style={{ alignSelf: 'center' }} /> : null
            }
            {mess.file_type === "docx" || mess.file_type === "doc" || mess.file_type === "txt" ?
                <MaterialCommunityIcons name="file-document" color={'black'} size={50} style={{ alignSelf: 'center' }} /> : null
            }

            {mess.file_type !== "text" && mess.file_type !== "image" ?
                <Text>{mess.file_url}</Text> : null

            }
            <Text style={styles.title}>{mess.message}</Text>
            <View style={{ flexDirection: 'row', height: 18, justifyContent: 'flex-end' }} >
                <Text style={styles.msgdate}>{mess.created_at.split(" ")[1]}</Text>

            </View>


        </View>
    </View>

);
const ItemOut = ({ mess }) => (
    <View style={styles.itemOut}>
        <View style={styles.outView}>
            {mess.file_type === "image" ?
                <ImageBackground source={{ uri: PHOTO.url + mess.file_url }} style={{ height: 100, width: 150, borderRadius: 5 }}>
                </ImageBackground>
                : null
            }
            {mess.file_type === "pdf" ?
                <MaterialCommunityIcons name="file-pdf" color={'black'} size={50} style={{ alignSelf: 'center' }} />
                : null

            }
            {mess.file_type === "xlsx" || mess.file_type === "xls" ?
                <MaterialCommunityIcons name="microsoft-excel" color={'black'} size={50} style={{ alignSelf: 'center' }} /> : null
            }
            {mess.file_type === "docx" || mess.file_type === "doc" || mess.file_type === "txt" ?
                <MaterialCommunityIcons name="file-document" color={'black'} size={50} style={{ alignSelf: 'center' }} /> : null
            }

            {mess.file_type !== "text" && mess.file_type !== "image" ?
                <Text>{mess.file_url}</Text> : null

            }
            <Text style={styles.title}>{mess.message}</Text>
            <View style={{ flexDirection: 'row', height: 18, justifyContent: 'flex-end' }} >
                <Text style={styles.msgdate}>{mess.created_at.split(" ")[1]}</Text>
                {mess.read_status == 3 ? <MaterialCommunityIcons name='check-all' size={13} color={'blue'} /> : <MaterialCommunityIcons name='check' size={13} />}
            </View>
        </View>
    </View >

);
class ChatScreen extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messageList: [],
            fileOptionModal: false,
            file_url: 'text',
            file_type: 'text',
            loadingModel: false,
            imageModal: false,
            uri: null,
            result: null
        }

    }
    componentDidMount() {
        connection.connect();
        subscription = connection.subscribe(`room${this.props.route.params.user.id}`, this.handleMessageAdd);
        this.fetchMesaage();


    }

    handleMessageAdd = message => {
        //   console.log("incooooo", message)
        const { read_status, file_type } = message;
        console.log(read_status)
        if (read_status == 2) {
            this.setState(prevState => ({
                messageList: [...prevState.messageList, message]
            }));
            if (message.sender_id !== this.props.user[0].id) {
                //  console.log("hhh")
                connection.updateMessage(message)
            }
            if (file_type == "image" || file_type == "file") {
                this.downloadImage(message)
            }
        }
        else {
            let temp = [...this.state.messageList]
            temp = temp.reverse()
            temp.every(item => {
                if (item.id == message.id) {
                    item.read_status = 3
                    return false;
                }
                return true;
            });
            this.setState({ messageList: temp.reverse() });
        }


    };


    _selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {

            this.setState({ result: result, uri: result.uri, imageModal: true, fileOptionModal: false })
        }

    }




    _uploadImage = async () => {
        let result = this.state.result
        let temp = result.uri.split("/");
        this.setState({ loadingModel: true, imageModal: false })
        let photo = { uri: result.uri, name: temp[temp.length - 1], type: 'image/jpeg' }
        console.log(photo)
        let data = new FormData();
        data.append('fileName', temp[temp.length - 1]);
        data.append('photo', photo);
        const responsedata = await Api.postFile(API_URL.upload, data);
        console.log(responsedata)
        if (responsedata.log) {

            this.setState({ loadingModel: false, fileOptionModal: false, 'file_url': responsedata.response.file_url, 'file_type': 'image', })
            this.send();
        }
        else {
            this.setState({ loadingModel: true })
        }

    }


    _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result)
        if (result.type == "success") {
            let temp = result.name.split(".");
            this.setState({ loadingModel: true, fileOptionModal: false })
            let photo = { uri: result.uri, name: result.name, type: 'image/jpeg' }
            console.log(photo)
            let data = new FormData();
            data.append('fileName', result.name);
            data.append('photo', photo);
            const responsedata = await Api.postFile(API_URL.upload, data);
            console.log(responsedata)
            if (responsedata.log) {

                this.setState({ loadingModel: false, fileOptionModal: false, 'file_url': responsedata.response.file_url, 'file_type': temp[1] })
                this.send()
            }
            else {
                this.setState({ loadingModel: true })
            }

        }




    }



    downloadImage = async (message) => {
        console.log("download")
        FileSystem.downloadAsync(
            PHOTO.url + message.file_url,
            FileSystem.cacheDirectory + message.file_url
        )
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
            })
            .catch(error => {
                console.error(error);
            });
    }











    send = async () => {
        const { route, user } = this.props
        let reqData = { "message": this.state.message, "sender_id": user[0].id, "name": user[0].username, "file_type": this.state.file_type, "file_url": this.state.file_url, 'read_status': 1 }
        connection.sendMessage(reqData)
        this.setState({ message: '', file_type: 'text', file_url: 'text', uri: null, imageModal: false })
    }


    fetchMesaage = async () => {
        const responsedata = await Api.getDataUsingGet(API_URL.messageList);
        // console.log(responsedata)
        if (responsedata.log && responsedata.response.status) {
            this.setState({ messageList: responsedata.response.data })
        }
    }




    render() {
        const { message, messageList, fileOptionModal, loadingModel, imageModal, uri } = this.state
        const { route, user } = this.props
        // console.log(route.params.user)

        const renderItem = ({ item }) => (

            item.sender_id == user[0].id ? <ItemOut mess={item} /> : <ItemIn mess={item} />
        );
        return (
            <>
                <HeadUser user={route.params.user} />
                <View style={[styles.MainContainer]}>
                    <FlatList data={messageList} renderItem={renderItem} style={{ padding: 10 }}
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                        onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                        keyExtractor={item => item.id.toString()} />
                    <View style={styles.messageView}>
                        <TouchableOpacity style={styles.attachView} onPress={() => this.setState({ fileOptionModal: !fileOptionModal })}>
                            <MaterialIcons name='attach-file' size={25} />
                        </TouchableOpacity>
                        <TextInput placeholder='Type Message .....' value={message} multiline={true} underlineColorAndroid='transparent' style={styles.messageText} onChangeText={text => this.setState({ message: text })} />
                        <TouchableOpacity style={styles.sendView} onPress={() => this.send(route.params.user)}>
                            <MaterialIcons name='send' size={25} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={fileOptionModal}
                    onRequestClose={() => {
                        this.setState({ 'fileOptionModal': false });
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ flexDirection: 'row', height: 50, width: '100%' }}>
                                <TouchableOpacity style={{ width: '50%', alignItems: 'center', borderRadius: 10, }} onPress={() => this._pickDocument()}>
                                    <View style={{ backgroundColor: 'red', padding: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <FontAwesome name="file-text" color="white" size={30} />
                                    </View>
                                    <Text>Document</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '50%', alignItems: 'center', borderRadius: 10 }} onPress={() => this._selectImage()} >
                                    <View style={{ backgroundColor: 'blue', padding: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <FontAwesome name="file-photo-o" color="white" size={30} />
                                    </View>
                                    <Text>Image</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={imageModal}
                    onRequestClose={() => {
                        this.setState({ 'imageModal': false });
                    }}>

                    <ScrollView style={{ backgroundColor: 'black', width: Config.windowW, height: Config.windowH }}>
                        <View style={{ width: '100%', }}>
                            {uri ?
                                <Image source={{ uri: uri }} style={{ height: Config.windowH - 100, borderRadius: 5 }} />
                                : null
                            }
                            <View style={styles.messageView}>

                                <TextInput placeholder='Type Message .....' value={message} multiline={true} underlineColorAndroid='transparent' style={[styles.messageText, { width: '88%' }]} onChangeText={text => this.setState({ message: text })} />
                                <TouchableOpacity style={styles.sendView} onPress={() => this._uploadImage()}>
                                    <MaterialIcons name='send' size={25} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                </Modal>









                <LoadingModal props={loadingModel} />




            </>
        );


    }
};



const mapStateToProps = (state) => {
    return {

        user: state.UserInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch({
            type:
                'SET_USER', payload: user
        }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);









