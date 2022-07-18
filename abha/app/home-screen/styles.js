import {StyleSheet} from 'react-native';
import { scale } from '../utils';

const styles = StyleSheet.create({
    homeViewContainer:{
    },
    horizontalView:{
        justifyContent:'center',
        alignItems:'center',
    },
    iconSize:{
        height:scale(20),
        width:scale(20),
        marginRight:scale(10),
    },
    nhaIcon:{
        height:scale(200),
        width:scale(200),
        justifyContent:'center',
        alignSelf:'center'
    },
    boxContainer:{
        flexDirection:'row',
        borderRadius:scale(10),
        paddingVertical:scale(10),
        paddingHorizontal:scale(15),
        marginTop:scale(30),
        // marginHorizontal:scale(50),
        width:scale(250),
        height:scale(70),
        alignItems:'center',
        backgroundColor:'#ffffff',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,   
    },
    labeText:{
        fontWeight:'bold',
        fontSize:scale(15)
    }
});

export default styles;
