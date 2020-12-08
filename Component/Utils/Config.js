import { Dimensions, Platform } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const _colorSet = {
    themColor: 'green',
    outMesColor: '#99ff99',
    inMesColor: '#fff',
    mainBackground: '#FFF',
    buttonBorder: '#F63F4D',
    iconColor: '#CCCCCC',
    textColor: '#323232',
    buttonColor: '#323232',
    buttonTextColor: '#FFF',
    overayColor: '#00000052',
    bordercolor: '#E0E0E0'

};


const _fontSet = {
    gSize: 28,
    lSize: 21,
    bSize: 16,
    fsize: 15,
    mSize: 13,
    xSize: 11,
    sSize: 10,
    iconSize: 30,



};
const _view = {
    widthSize: '80%'
}
const _navigation = null

const Config = {
    colorSet: _colorSet,
    fontSet: _fontSet,
    windowW: WINDOW_WIDTH,
    windowH: WINDOW_HEIGHT,
    catItemSize: 125,
    viewVal: _view,
    navigation: _navigation
};

export default Config;
