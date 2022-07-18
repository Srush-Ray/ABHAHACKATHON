import {StyleSheet} from 'react-native';
import {scale} from '../../utils';

const styles = StyleSheet.create({
    doctorInfo:{
        flexDirection:'row',
        alignItems:'center'
    },
    viewContainer:{
        flex:1,
        backgroundColor:'white',
    },
    pageStyle:{
        paddingVertical:scale(30),
          paddingHorizontal:scale(30),
      },
      sectionView:{
        marginTop:scale(20)
      },
      rowView:{
        flexDirection:'row',
        justifyContent:'space-around',

      }, 
      degreeText:{
        fontWeight:'bold'
      },
      experienceView:{
        borderColor:'green',
        borderRadius:scale(10),
        paddingVertical:scale(5),
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderWidth:1,
        width:scale(220)
      },
      resultImage:{
        width: scale(100),
        height: scale(100),
        borderRadius:scale(20)
      },
      resultHeaderText:{
        fontWeight:'bold',
        color:'grey'
      },
      iconStyle:{
        height:scale(20),
        width:scale(20),
        marginRight:scale(10)
      },
      clinicView:{
        flexDirection:'row'
      },    
      line:{
          justifyContent:'center',
          alignSelf:'center',
          width:'90%',
          borderBottomColor:'grey',
          borderWidth:0.5,
      }
});

export default styles;
