// ##############################
// // // Tasks for TasksCard - see Dashboard view
// #############################

var API_URL = {





    me: '/login/me',
    login: '/login/login',
    registration: '/login/registration',
    getUserList: '/login/getUserList',
    messageList: '/rooms/messageList',
    addMessage: '/rooms/',

    upload: '/file/upload',
    download: '/file/download'



}

var PHOTO = {



    // url: 'http://192.168.43.173:3333/api/file/download/',
    url: 'https://test.easycaller.in/api/file/download/'
}



module.exports = {

    API_URL,
    PHOTO,

};