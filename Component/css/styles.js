

import { StyleSheet, Dimensions } from 'react-native';
import Config from '../Utils/Config';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWeidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Config.colorSet.MainContainer

    },


    iconRight: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    textField: {

        width: '80%',
        color: 'black',
        fontSize: 15,
        paddingLeft: 20,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 10,
        elevation: 1
    },
    loinButton: {
        width: '80%',
        height: 43,
        borderRadius: 5,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'

    },
    bottomView: {
        position: 'absolute',
        bottom: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginHead: {
        color: Config.colorSet.textColor,
        fontSize: Config.fontSet.gSize,
        fontWeight: 'bold'
    },
    itemIn: {
        width: Config.windowW - 20,
        alignItems: 'flex-start'
    },
    itemOut: {
        width: Config.windowW - 20,
        alignItems: 'flex-end'
    },
    inView: {
        backgroundColor: Config.colorSet.outMesColor,
        padding: 5,
        borderRadius: 5,
        marginVertical: 1

    },
    outView: {
        backgroundColor: Config.colorSet.inMesColor,
        padding: 5,
        borderRadius: 5,
        marginVertical: 1
    },
    msgdate: {
        fontSize: 10,

    },
    messageText:
    {
        width: screenWeidth - 90,
        paddingLeft: 10
    },
    messageView: {
        flexDirection: 'row',
        backgroundColor: "white",
        height: 60,
        width: Config.windowW,
        alignItems: 'center'
    },
    attachView: {
        backgroundColor: Config.colorSet.bordercolor,
        padding: 8,
        borderRadius: 30
    },
    sendView: {
        backgroundColor: Config.colorSet.themColor,
        padding: 8,
        borderRadius: 30
    },
    userView: {
        flexDirection: 'row',
        width: Config.windowW,
        padding: 10,
        margin: 2
    },
    userViewBorder: {
        height: 1,
        backgroundColor: Config.colorSet.bordercolor,
        width: Config.windowW - 10
    },
    logOutView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '85%',
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
    },
    logOutText: {
        position: 'absolute',
        left: 10,
        fontSize: Config.fontSet.fSize,
        color: Config.colorSet.textColor
    },
    centeredView: {
        flexDirection: 'column',
        height: Config.windowH - 130,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        width: Config.windowW - 20

    },
    tickIcon: {
        flexDirection: 'row',
        position: 'relative',
        bottom: 0,
        right: 3,
        height: 10,
        width: 50


    },








    title: {
        fontSize: 15,
    },


});


export { styles } 