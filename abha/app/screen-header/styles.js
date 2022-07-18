import {StyleSheet} from 'react-native';
import { scale } from '../utils';

const styles = StyleSheet.create({
    title:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#ABC9FF',
        justifyContent:'space-between',
        paddingHorizontal:scale(20)
    },
    appLogo:{
        height:scale(50),
        width:scale(50),
    },
    textView:{
    },
    titleText:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
    }
});

export default styles;
