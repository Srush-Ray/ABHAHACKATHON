import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    homeViewContainer:{

    },
    horizontalView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    boxContainer:{
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:5,
        marginTop:30,
        width:110,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#d4d6d4',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,   
    }
});

export default styles;
