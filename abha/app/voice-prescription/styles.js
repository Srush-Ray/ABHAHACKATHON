import {StyleSheet} from 'react-native';
import {scale} from '../utils';

const styles = StyleSheet.create({
imageButton: {
    width: scale(30),
    height: scale(30),
  },
  iconView:{
    alignItems:'center',
    marginVertical:scale(10)
  },
  containerView: {
    paddingVertical:scale(20),
    justifyContent:'center',
    color: '#B0171F',
  },
  resultEachContainer:{
    borderBottomColor:'#adb3af',
    borderBottomWidth:0.5,
},
prescriptionIcon:{
  width: scale(30),
  height: scale(30),
  marginRight:scale(10)
},
resultHeader:{
  paddingVertical:scale(5),
  paddingLeft:scale(10),
},
searchbarText:{
  marginHorizontal:scale(10)
},
inputTextView:{
  marginVertical:scale(10),
  marginHorizontal:scale(20)
},
selectView:{
  flexDirection:'row'
},
resultView:{
  textAlign:'left',
  marginVertical:scale(10),
  marginHorizontal:scale(10),
  justifyContent:'flex-start',
},
resultEachContainer:{
  borderBottomColor:'#adb3af',
  borderBottomWidth:0.5,
  flexDirection:'row',
  marginHorizontal:scale(30),
  paddingVertical:scale(10),
},
headerText:{
  fontWeight:'bold',
  marginHorizontal:scale(10),
  marginVertical:scale(20)
},
prescriotionHeaders:{
  paddingLeft:scale(20),
  paddingVertical:scale(5)
},

});

export default styles;
