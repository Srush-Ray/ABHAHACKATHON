
import {
StyleSheet,
  } from 'react-native';
import { scale } from '../utils';

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: 5,
    },
    resultEachContainer:{
        borderBottomColor:'#adb3af',
        borderBottomWidth:0.5,
    },
    resultHeader:{
      paddingVertical:scale(5),
      backgroundColor:'#adb3af',
      paddingLeft:scale(10),
    },
    resultHeaderText:{
      fontWeight:'bold',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    titleText: {
      fontSize: 22,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    buttonStyle: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 15,
      padding: 10,
      backgroundColor: '#8ad24e',
      marginRight: 2,
      marginLeft: 2,
    },
    buttonTextStyle: {
      color: '#fff',
      textAlign: 'center',
    },
    horizontalView: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
    },
    textStyle: {
      textAlign: 'left',
      paddingLeft:scale(30),
      padding: 12,
    },
    imageButton: {
      width: 50,
      height: 50,
    },
    textWithSpaceStyle: {
      flex: 1,
      textAlign: 'center',
      color: '#B0171F',
    },
  });

  export default styles;