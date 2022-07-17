
import {
    StyleSheet,
      } from 'react-native';
import { scale } from '../../utils';
    
    const styles = StyleSheet.create({
        container: {
        //   flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          padding: 5,
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
          textAlign: 'center',
          padding: 12,
        },
        imageButton: {
          width: scale(20),
          height: scale(20),
        },
        textWithSpaceStyle: {
          flex: 1,
          textAlign: 'center',
          color: '#B0171F',
        },
      });
    
      export default styles;